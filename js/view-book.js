import { handleAuthStateChange } from "./auth.js";
import { getUserData } from "./database.js";
import handleAlert, { getOS, handleRedirect } from './general.js';
import BOOK from './books.js';

window.addEventListener('load', () => {
    handleAuthStateChange(async (user) => {
        try {
            if (!user) {
                handleAlert("Please login or create account to purchase and view book", "blur", true, '<i class="bi bi-book fs-2"></i>', true, [{ text: "Log in", onClick: () => handleRedirect("/html/regs/Signup.html?type=login") }, { text: "Register", onClick: () => handleRedirect("/html/regs/Signup.html?type=register"), type: "secondary" }]);
                return;
            }

            if (user) {
                const userdata = await getUserData(user.uid);
                const paid = userdata.bookPaid;

                if (paid == true) {
                    // DOM Elements:::::
                    const bookEl = document.getElementById('book');
                    const leftEl = document.getElementById('leftPage').querySelector('.content');
                    const rightEl = document.getElementById('rightPage').querySelector('.content');
                    const pageIndicator = document.getElementById('pageInfo');
                    // ===== Responsive: single vs spread =====
                    const mq = window.matchMedia('(min-width: 980px)');

                    // helper methods:
                    const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

                    // Show loader
                    const loader = `
            <div class="loading-spinner"></div>
          `;
                    const pages = [leftEl, rightEl];
                    pages.forEach(p => p.insertAdjacentHTML("beforebegin", loader)
                    );

                    // Hide book content initially
                    bookEl.style.visibility = 'hidden';

                    setTimeout(() => {
                        const loader = document.querySelectorAll('.loading-spinner');
                        loader?.forEach(l => l.remove());
                        bookEl.style.visibility = 'visible';
                    }, 500);


                    const PAGE_TURN_SOUND_SRC = '/src/audio/page-flip.mp3';
                    const THUD_SOUND_SRC = '/src/audio/page-thud.mp3';
                    const pageTurnSound = new Audio(PAGE_TURN_SOUND_SRC);
                    const thudSound = new Audio(THUD_SOUND_SRC);

                    let state = {
                        page: 0,
                        zoom: 1,
                        soundOn: true,
                        spread: mq.matches,
                        bookmarks: [],
                        total: BOOK.pages.length,
                    };

                    function unlockAudio() {
                        const ctx = new (window.AudioContext || window.webkitAudioContext)();
                        const src = ctx.createBufferSource();
                        src.buffer = ctx.createBuffer(1, 1, 22050, 22050);
                        src.connect(ctx.destination);
                        src.start(0);
                        document.removeEventListener('touchstart', unlockAudio);
                        document.removeEventListener('click', unlockAudio);
                        console.log("Audio context unlocked ✅");

                        state.soundOn = true;
                        saveState();
                    }

                    window.addEventListener('touchstart', unlockAudio, { once: true });
                    window.addEventListener('click', unlockAudio, { once: true });
                    window.addEventListener("touchmove", unlockAudio, { once: true });

                    pageTurnSound.preload = "auto";
                    pageTurnSound.volume = 1.0;

                    const LAST = BOOK.pages.length - 1;
                    const INTERIOR_COUNT = Math.max(0, BOOK.pages.length - 2);

                    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
                    const isCover = (idx) => idx === 0;
                    const isEnd = (idx) => idx === LAST;

                    function saveState() {
                        localStorage.setItem('bookState', JSON.stringify(state));
                    }

                    state.soundOn = true;
                    saveState();

                    function loadState() {
                        const savedState = localStorage.getItem('bookState');
                        if (!savedState) return false;

                        try {
                            const parsed = JSON.parse(savedState);
                            state = { ...state, ...parsed };

                            if (typeof state.soundOn !== 'boolean') {
                                state.soundOn = true;
                            }
                            return true;
                        } catch (e) {
                            console.error("Failed to parse saved book state:", e);
                            return false;
                        }
                    }

                    function makePage(html, pageIdx) {
                        const div = document.createElement('div');
                        div.className = 'page-content content';
                        const checks = isCover(pageIdx) || isEnd(pageIdx);
                        const label = checks ? "" : `${pageIdx}`;
                        const title = checks ? "" : BOOK.title;
                        div.innerHTML = `
                    ${!checks ? `<div class="notranslate page-top" translate="no"><span class="chapter">${title}</span></div>` : ""}
                    ${checks ? html : `<div class="page-middle">${html}</div>`}
                    ${!checks ? `<div class="page-bottom"><span class="page-num">${label}</span></div>` : ""}
                `;
                        return div;
                    }

                    function setIndicator() {
                        if (isCover(state.page)) {
                            pageIndicator.textContent = "Cover Page";
                            return;
                        }
                        if (isEnd(state.page)) {
                            pageIndicator.textContent = "The End";
                            return;
                        }
                        const total = INTERIOR_COUNT;
                        if (state.spread) {
                            const leftPage = state.page;
                            if (leftPage >= total) {
                                pageIndicator.textContent = `${leftPage} / ${total}`;
                            } else {
                                const rightPage = leftPage + 1;
                                pageIndicator.textContent = `${leftPage}-${rightPage} / ${total}`;
                            }
                        } else {
                            pageIndicator.textContent = `${state.page} / ${total}`;
                        }
                    }

                    function applyLayout() {
                        state.spread = mq.matches;
                        bookEl.classList.toggle('spread', state.spread);
                        if (state.spread && !isCover(state.page) && !isEnd(state.page) && state.page % 2 === 0) {
                            state.page = Math.min(LAST - 1, state.page + 1);
                        }
                        render();
                    }

                    function render() {
                        leftEl.innerHTML = '';
                        rightEl.innerHTML = '';
                        bookEl.classList.remove('single-right', 'single-left');

                        if (isCover(state.page)) {
                            rightEl.appendChild(makePage(BOOK.pages[0], 0));
                            bookEl.classList.add('single-right');
                        } else if (isEnd(state.page)) {
                            leftEl.appendChild(makePage(BOOK.pages[LAST], LAST));
                            bookEl.classList.add('single-left');
                        } else if (state.spread) {
                            const leftIdx = (state.page % 2 === 0) ? state.page + 1 : state.page;
                            const rightIdx = Math.min(LAST - 1, leftIdx + 1);
                            leftEl.appendChild(makePage(BOOK.pages[leftIdx], leftIdx));
                            rightEl.appendChild(makePage(BOOK.pages[rightIdx], rightIdx));
                        } else {
                            rightEl.appendChild(makePage(BOOK.pages[state.page], state.page));
                            bookEl.classList.add('single-right');
                        }
                        setIndicator();
                        document.documentElement.style.setProperty('--zoom', state.zoom);
                    }

                    function playTurnSound(isClosing) {
                        if (!state.soundOn) return;
                        isClosing = isCover(state.page) || isEnd(state.page);

                        try {
                            const sound = isClosing ? thudSound : pageTurnSound;
                            sound.currentTime = 0;
                            sound.play().catch(err => {
                                console.warn(`Sound playback failed: ${err}`);
                                // handleAlert(`Sound playback failed: ${err}`, "toast");
                            });
                        } catch (err) {
                            console.error("Error playing sound:", err);
                        }
                    }

                    function flip(forward = true) {
                        if ((forward && isEnd(state.page)) || (!forward && isCover(state.page))) return;

                        const flipEl = document.createElement('div');
                        flipEl.className = 'flip';
                        const front = document.createElement('div'); front.className = 'face front';
                        const back = document.createElement('div'); back.className = 'face back';
                        const shade = document.createElement('div'); shade.className = 'shade';

                        const isSinglePage = !state.spread || bookEl.classList.contains("single-left") || bookEl.classList.contains("single-right");
                        flipEl.style.width = isSinglePage ? "100%" : "50%";

                        if (forward) {
                            flipEl.style.right = 0;
                            flipEl.style.transformOrigin = "left center";
                            flipEl.classList.add("anim-forward");
                            const current = currentRightIndex();
                            front.appendChild(makePage(BOOK.pages[current], current));
                            const nextIdx = nextRightSnapshotIndex();
                            back.appendChild(makePage(BOOK.pages[nextIdx], nextIdx));
                        } else {
                            flipEl.style.left = 0;
                            flipEl.style.transformOrigin = "right center";
                            flipEl.classList.add("anim-back");
                            const current = currentLeftIndex();
                            front.appendChild(makePage(BOOK.pages[current], current));
                            const prevIdx = prevLeftSnapshotIndex();
                            back.appendChild(makePage(BOOK.pages[prevIdx], prevIdx));
                        }

                        flipEl.append(front, back, shade);
                        bookEl.appendChild(flipEl);
                        flipEl.addEventListener('animationend', () => flipEl.remove(), { once: true });
                    }

                    const currentLeftIndex = () => state.spread ? (state.page % 2 === 0 ? state.page + 1 : state.page) : state.page;
                    const currentRightIndex = () => state.spread ? Math.min(LAST - 1, currentLeftIndex() + 1) : state.page;
                    const nextRightSnapshotIndex = () => state.spread ? Math.min(LAST - 1, currentRightIndex() + 2) : Math.min(LAST, state.page + 1);
                    const prevLeftSnapshotIndex = () => state.spread ? Math.max(1, currentLeftIndex() - 2) : Math.max(0, state.page - 1);

                    function goNext() {
                        if (isEnd(state.page)) return false;
                        if (state.spread) {
                            state.page = isCover(state.page) ? 1 : Math.min(LAST, state.page + 2);
                            if (state.page % 2 === 0 && state.page < LAST) state.page += 1;
                        } else {
                            state.page = Math.min(LAST, state.page + 1);
                        }
                        return isEnd(state.page);
                    }

                    function goPrev() {
                        if (isCover(state.page)) return false;
                        if (state.spread) {
                            state.page = isEnd(state.page) ? ((LAST - 1) % 2 === 0 ? LAST - 2 : LAST - 1) : Math.max(0, state.page - 2);
                        } else {
                            state.page = Math.max(0, state.page - 1);
                        }
                        return isCover(state.page);
                    }

                    function flipForward() {
                        flip(true);
                        playTurnSound(goNext());
                        render();
                        saveState();
                    }
                    function flipBack() {
                        flip(false);
                        playTurnSound(goPrev());
                        render();
                        saveState();
                    }

                    function toggleSound() {
                        state.soundOn = !state.soundOn;
                        qsa('#soundToggle,.soundToggle, [data-hook="sound"]').forEach(b => (b.innerHTML = ""));

                        const icon = state.soundOn ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
                        qsa('#soundToggle,.soundToggle, [data-hook="sound"]').forEach(b => (b.innerHTML = icon));
                        saveState();
                    }

                    function volumeIconToggle() {
                        qsa('#soundToggle,.soundToggle, [data-hook="sound"]').forEach(b => (b.innerHTML = ""));

                        const icon = state.soundOn ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';

                        qsa('#soundToggle,.soundToggle, [data-hook="sound"]').forEach(b => (b.innerHTML = icon));
                    }

                    qsa('#soundToggle,.soundToggle, [data-hook="sound"]').forEach(btn => btn.addEventListener('click', toggleSound));

                    function zoom(delta) {
                        state.zoom = clamp(Number((state.zoom + delta).toFixed(2)), 0.6, 2.0);
                        document.documentElement.style.setProperty('--zoom', state.zoom);
                        saveState();
                    }

                    function toggleFullscreen() {
                        if (!document.fullscreenElement) {
                            document.body.requestFullscreen().catch(err => console.error("Fullscreen request failed:", err));
                        } else {
                            document.exitFullscreen();
                        }
                    }

                    function updateBookmarkIcon() {
                        const isBookmarked = state.bookmarks.includes(state.page);
                        const icon = isBookmarked ? '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';
                        qsa('[data-hook="bookmark"]').forEach(btn => btn.innerHTML = icon);
                    }

                    function saveBookmark(page) {
                        if (state.bookmarks.includes(page)) {
                            state.bookmarks = state.bookmarks.filter(b => b !== page);
                        } else {
                            state.bookmarks.push(page);
                        }
                        updateBookmarkIcon();
                        saveState();
                    }

                    function setupEventListeners() {
                        qsa('#soundToggle,.soundToggle, [data-hook="sound"]').forEach(btn => btn.addEventListener('click', toggleSound));

                        const allFullBTN = qsa('#fullscreenBtn, [data-hook="fullscreen"]');
                        if (getOS() == "iOS") {
                            allFullBTN.forEach(btn => {
                                btn.parentElement.remove();
                            });
                        } else {
                            allFullBTN.forEach(btn => btn.addEventListener('click', toggleFullscreen));
                        }

                        qsa('#zoomIn, #zoomInBottom, [data-hook="zoom-in"]').forEach(btn => btn.addEventListener('click', () => zoom(0.1)));
                        qsa('#zoomOut, #zoomOutBottom, [data-hook="zoom-out"]').forEach(btn => btn.addEventListener('click', () => zoom(-0.1)));
                        qsa('#bookmarkBtn, #bookmark, [data-hook="bookmark"]').forEach(btn => btn.addEventListener('click', () => saveBookmark(state.page)));

                        document.getElementById('prevBtn').addEventListener('click', flipBack);
                        document.getElementById('nextBtn').addEventListener('click', flipForward);

                        window.addEventListener('keydown', (e) => {
                            if (e.key === 'ArrowRight' || e.key === 'PageDown') flipForward();
                            if (e.key === 'ArrowLeft' || e.key === 'PageUp') flipBack();
                            if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) zoom(0.1);
                            if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) zoom(-0.1);
                        });

                        let touchStartX = 0;
                        bookEl.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
                        bookEl.addEventListener('touchend', e => {
                            if (touchStartX === 0) return;
                            const dx = e.changedTouches[0].screenX - touchStartX;
                            if (dx < -40) flipForward();
                            else if (dx > 40) flipBack();
                            touchStartX = 0;
                        }, { passive: true });

                        const menuBtn = document.getElementById('menuBtn');
                        const menuPanel = document.getElementById('menuPanel');
                        menuBtn.addEventListener('click', () => menuPanel.classList.toggle('open'));
                        document.addEventListener('click', (e) => {
                            if (!menuPanel.contains(e.target) && !menuBtn.contains(e.target)) {
                                menuPanel.classList.remove('open');
                            }
                        });

                        const searchBar = document.getElementById('search');
                        searchBar.addEventListener("focus", (e) => {
                            getOS() === "iOS" ? e.preventDefault() : "";
                        });

                        searchBar.addEventListener('change', (e) => {
                            e.preventDefault();
                            const value = searchBar.value.trim().toLowerCase();
                            searchBar.value = '';
                            searchBar.blur();

                            if (!value) return;
                            if (value.includes("cover")) state.page = 0;
                            else if (value.includes('end')) state.page = LAST;
                            else {
                                const pageNum = parseInt(value, 10);
                                if (!Number.isFinite(pageNum)) return;
                                state.page = clamp(pageNum, 1, LAST - 1);
                            }
                            applyLayout();
                            saveState();
                        });

                        mq.addEventListener('change', applyLayout);
                    }

                    (function init() {
                        document.getElementById('bookTitle').textContent = BOOK.title;
                        document.getElementById('search').placeholder = `Search page – ${BOOK.title}`;

                        if (!loadState()) {
                            const bookmarkedPage = state.bookmarks.length > 0 ? state.bookmarks[state.bookmarks.length - 1] : null;
                            if (bookmarkedPage) state.page = bookmarkedPage;
                        }
                        state.zoom = 1;
                        if (state.soundOn == false) {
                            state.soundOn = true;
                            volumeIconToggle();
                        }

                        document.body.currentCSSZoom = 1;
                        
                        setupEventListeners();
                        applyLayout();
                        updateBookmarkIcon();

                    })();

                } else {
                    handleAlert("Please go to the Book Page and purchase the book to start reading...", "blur", true, '<i class="bi bi-book fs-2"></i>', true, [{ text: "GET COPY", onClick: () => handleRedirect("/html/main/Shop.html", "replace") }, { text: "Close", onClick: () => handleRedirect("/html/main/Home.html"), type: "secondary" }]);
                }

            }
        } catch (error) {
            const errorMessage = error.message.split('(').pop().split(')')[0].replace('/', '');
            console.error("Error parsing payment details:", errorMessage);
            const ios = getOS() === "iOS";

            if (errorMessage.includes("client is offline")) {
                handleAlert("Network error. Please check your internet connection and try again.", "blur", true, `${ios ? `<i class="bi bi-cloud-slash text-danger fs-2"></i>` : `<i class='bi bi-wifi-off text-danger fs-2'></i>`} <br/> Network Error`, true, [{
                    text: "Try Again", onClick: () => {
                        window.location.reload();
                        return "closeAlert";
                    }
                }]);
            }
        }
    });
});