import { handleAuthStateChange } from "./auth.js";
import { getUserData } from "./database.js";
import handleAlert from './general.js';
import BOOK from './books.js';

window.addEventListener('load', () => {
    handleAuthStateChange(async (user) => {
        if (!user) {
            handleAlert("Please login or create account to purchase and view book", "blur", true, '<i class="bi bi-book fs-2"></i>', true, [{ text: "Log in", onClick: () => window.location.href = "/html/regs/Signup.html?type=login" }, { text: "Register", onClick: () => window.location.href = "/html/regs/Signup.html?type=register", type: "secondary" }]);
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


                //////
                const PAGE_TURN_SOUND_SRC = '/src/audio/page-flip.mp3';
                const THUD_SOUND_SRC = '/src/audio/page-thud.mp3';
                const pageTurnSound = new Audio(PAGE_TURN_SOUND_SRC);
                const thudSound = new Audio(THUD_SOUND_SRC);
                pageTurnSound.preload = "auto";
                pageTurnSound.volume = 1.0;


                const LAST = BOOK.pages.length - 1;
                const INTERIOR_COUNT = Math.max(0, BOOK.pages.length - 2);

                //state:
                let state = {
                    page: 0,
                    zoom: 1,
                    soundOn: true,
                    spread: mq.matches,
                    bookmarks: [],
                    total: BOOK.pages.length,
                    pages: [],
                    numPages: 0,
                };


                // Utils: =====>>>>>
                const clamp = (n, min, max) => {
                    const number = Math.max(min, Math.min(max, n));
                    return number;
                }
                const isCover = (idx) => idx === 0;
                const isEnd = (idx) => idx === LAST;


                // --- State Management & Persistence ---
                function saveState() {
                    localStorage.setItem('bookState', JSON.stringify(state));
                }

                function loadState() {
                    const savedState = localStorage.getItem('bookState');
                    if (!savedState) return;

                    if (savedState) {
                        state = { ...state, ...JSON.parse(savedState) };
                    }
                }


                // creating pages======>
                function makePage(html, pageIdx) {
                    const div = document.createElement('div');
                    div.className = 'page-content content';
                    const checks = isCover(pageIdx) || isEnd(pageIdx);

                    const label = isCover(pageIdx) ? "" : isEnd(pageIdx) ? "" : `${pageIdx}`;
                    const title = isCover(pageIdx) ? "" : isEnd(pageIdx) ? "" : BOOK.title;

                    div.innerHTML = `
    ${!checks ? `<div class="page-top">
      <span class="chapter">${title}</span>
    </div>` : ""}

    ${checks ? html : `<div class="page-middle">${html}</div>`}
    ${!checks ? `<div class="page-bottom">
      <span class="page-num">${label}</span>
    </div>` : ""}
  `;
                    return div;
                }

                // for indicators======>
                function setIndicator() {
                    if (isCover(state.page)) {
                        pageIndicator.textContent = "Cover Page";
                        return;
                    }
                    if (isEnd(state.page)) {
                        pageIndicator.textContent = "The End"
                        return;
                    }

                    //for wider screen:=======>
                    if (state.spread) {
                        const leftIdx = state.page % 2 === 0 ? state.page + 2 : state.page + 1;
                        const rightIdx = Math.min(LAST - 1, leftIdx + 1);

                        const leftNum = leftIdx - 1;
                        const rightNum = rightIdx - 1;

                        pageIndicator.textContent = `${leftNum}-${rightNum} / ${INTERIOR_COUNT}`;
                    } else {
                        pageIndicator.textContent = `${state.page} / ${INTERIOR_COUNT}`;
                    }
                }



                function applyLayout() {
                    // loadState();
                    state.spread = mq.matches;
                    bookEl.classList.toggle('spread', state.spread);

                    if (state.spread && !isCover(state.page) && !isEnd(state.page) && state.page % 2 === 0) {
                        state.page = Math.min(LAST - 1, state.page + 1);
                    }

                    // First page is cover
                    render();

                }


                // ===== Render pages =====
                function render() {
                    leftEl.innerHTML = '';
                    rightEl.innerHTML = '';
                    bookEl.classList.remove('single-right', 'single-left');

                    if (isCover(state.page)) {
                        rightEl.appendChild(makePage(BOOK.pages[0], 0));
                        bookEl.classList.add('single-right');
                        setIndicator();
                        return;
                    }

                    if (isEnd(state.page)) {
                        leftEl.appendChild(makePage(BOOK.pages[LAST], LAST));
                        bookEl.classList.add('single-left');
                        setIndicator();
                        return;
                    }

                    if (state.spread) {
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
                    const endSound = isCover(state.page) || isEnd(state.page);

                    try {
                        if (isClosing) {
                            thudSound.currentTime = 0;
                            thudSound.play();
                        } else if (!isClosing && endSound) {
                            return;
                        } else if (!isClosing) {
                            pageTurnSound.currentTime = 0;
                            pageTurnSound.play().catch(err => {
                                console.warn("Autoplay blocked, will play on next interaction:", err);
                            });;
                        }
                    } catch { }
                }

                // ===== Flip animation =====
                function flip(forward = true) {
                    if (isCover(state.page) || isEnd(state.page)) return;


                    const flip = document.createElement('div');
                    flip.className = 'flip ';


                    const front = document.createElement('div'); front.className = 'face front';
                    const back = document.createElement('div'); back.className = 'face back';
                    const shade = document.createElement('div'); shade.className = 'shade';

                    const isSinglePage = bookEl.classList.contains("single-left") || bookEl.classList.contains("single-right") || !state.spread;

                    flip.style.width = isSinglePage ? "100%" : "50%";

                    if (forward) {
                        flip.style.right = 0;
                        flip.style.left = 'auto';
                        flip.style.transformOrigin = "left center";
                        flip.classList.add("anim-forward");

                        const current = currentRightIndex();
                        front.appendChild(makePage(BOOK.pages[current], current));


                        const nextIdx = nextRightSnapshotIndex();
                        back.appendChild(makePage(BOOK.pages[nextIdx], nextIdx));
                    } else {
                        flip.style.left = 0;
                        flip.style.right = 'auto';
                        flip.style.transformOrigin = "right center";
                        flip.classList.add("anim-back");


                        const current = currentLeftIndex();
                        front.appendChild(makePage(BOOK.pages[current], current));


                        const prevIdx = prevLeftSnapshotIndex();
                        back.appendChild(makePage(BOOK.pages[prevIdx], prevIdx));

                    }

                    flip.append(front, back, shade);
                    bookEl.appendChild(flip);

                    flip.addEventListener('animationend', () => flip.remove(), { once: true });
                }

                // Helpers for snapshots
                function currentLeftIndex() {
                    if (isCover(state.page)) return 0;
                    if (isEnd(state.page)) return LAST;
                    if (state.spread) return (state.page % 2 === 0) ? state.page + 1 : state.page;

                    return Math.max(1, state.page - 1);
                }
                function currentRightIndex() {
                    if (isCover(state.page)) return 0;
                    if (isEnd(state.page)) return LAST;
                    if (state.spread) {
                        const leftIdx = (state.page % 2 === 0) ? state.page + 1 : state.page;
                        return Math.min(LAST - 1, leftIdx + 1);
                    }
                    return state.page;
                }
                function nextRightSnapshotIndex() {
                    // what content will appear "under" when turning right page forward
                    if (isCover(state.page)) return Math.min(LAST - 1, 1); // next visible after cover
                    if (state.spread) return Math.min(LAST - 1, currentRightIndex() + 2);
                    return Math.min(LAST, state.page + 1);
                }
                function prevLeftSnapshotIndex() {
                    // what content will appear when turning left page backward
                    if (isEnd(state.page)) return Math.max(1, LAST - 1);
                    if (state.spread) return Math.max(1, currentLeftIndex() - 2);
                    return Math.max(0, state.page - 1);
                }

                // ===== Navigation (returns true if a "closing" move) =====
                function goNext() {
                    if (isEnd(state.page)) return false; // already closed at end

                    const wasCover = isCover(state.page);

                    if (state.spread) {
                        if (wasCover) {
                            // open to first interior spread (1–2) -> set left=1
                            state.page = 1;
                        } else {
                            // advance a leaf (2 pages)
                            state.page = Math.min(LAST, state.page + 2);
                            // if we hit LAST (end) or LAST-1+2 >= LAST -> close to end
                            if (state.page >= LAST) {
                                state.page = LAST;
                                return true; // closing
                            }
                            // keep left odd
                            if (state.page % 2 === 0) state.page += 1;
                            state.page = Math.min(LAST - 1, state.page);
                        }
                    } else {
                        // single page
                        state.page = Math.min(LAST, state.page + 1);
                        if (isEnd(state.page)) return true; // closing
                    }
                    return wasCover ? false : false;
                }

                function goPrev() {
                    if (isCover(state.page)) return false; // already closed at cover

                    const wasEnd = isEnd(state.page);

                    if (state.spread) {
                        if (wasEnd) {
                            // open back to last interior spread
                            state.page = Math.max(1, LAST - 1);
                        } else {
                            // go back a leaf (2 pages)
                            state.page = Math.max(0, state.page - 2);
                            if (state.page <= 0) {
                                state.page = 0; // cover
                                return true; // closing
                            }
                            // ensure left odd
                            if (state.page % 2 === 0) state.page += 1;
                            state.page = Math.max(1, state.page);
                        }
                    } else {
                        // single page
                        state.page = Math.max(0, state.page - 1);
                        if (isCover(state.page)) return true; // closing
                    }
                    return wasEnd ? false : false;
                }

                function flipForward() {
                    const closing = goNext();
                    playTurnSound(closing);
                    flip(true);
                    render();
                    saveState();
                }
                function flipBack() {
                    const closing = goPrev();
                    playTurnSound(closing);
                    flip(false);
                    render();
                    saveState();
                }

                // ===== Controls =====>>>>
                /*Sound toggle*/
                function toggleSound() {
                    state.soundOn = !state.soundOn;
                    const icon = state.soundOn ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';

                    qsa('#soundToggle,.soundToggle, [data-hook="sound"]').forEach(b => (b.innerHTML = icon));
                    saveState();
                }
                qsa('#soundToggle,.soundToggle, [data-hook="sound"]').forEach(btn => btn.addEventListener('click', toggleSound));



                // Zoom
                function zoom(delta) {
                    state.zoom = clamp(Number((state.zoom + delta).toFixed(2)), .6, 2.0);
                    document.documentElement.style.setProperty('--zoom', state.zoom);
                    saveState();
                }
                function toggleFullscreen() {
                    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => { });
                    else document.exitFullscreen();
                }
                qsa('#fullscreenBtn, [data-hook="fullscreen"]').forEach(btn => btn.addEventListener('click', toggleFullscreen));

                qsa('#zoomIn, #zoomInBottom, [data-hook="zoom-in"]').forEach(btn => btn.addEventListener('click', () => zoom(0.1)));
                qsa('#zoomOut, #zoomOutBottom, [data-hook="zoom-out"]').forEach(btn => btn.addEventListener('click', () => zoom(-0.1)));

                // Keyboard
                window.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowRight' || e.key === 'PageDown') flipForward();
                    if (e.key === 'ArrowLeft' || e.key === 'PageUp') flipBack();
                    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) zoom(0.1);
                    if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) zoom(-0.1);
                });

                // Swipe (mobile)
                let touchStartX = 0;
                let touchStartY = 0;
                const SWIPE_MIN = 40;

                bookEl.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                    touchStartY = e.changedTouches[0].screenY;
                }, { passive: true });

                bookEl.addEventListener('touchmove', (e) => {
                    if (touchStartX === 0) {
                        return;
                    }
                    const touchCurrentX = e.changedTouches[0].screenX;
                    const touchCurrentY = e.changedTouches[0].screenY;
                    const dx = touchCurrentX - touchStartX;
                    const dy = touchCurrentY - touchStartY;

                    // If the swipe is more horizontal than vertical, prevent default scrolling
                    if (Math.abs(dx) > Math.abs(dy)) {
                        e.preventDefault();
                    }
                }, { passive: false });

                bookEl.addEventListener('touchend', (e) => {
                    if (touchStartX === 0) {
                        return;
                    }

                    const dx = e.changedTouches[0].screenX - touchStartX;
                    if (dx <= -SWIPE_MIN) flipForward();
                    else if (dx >= SWIPE_MIN) flipBack();

                    touchStartX = 0;
                    touchStartY = 0;
                }, { passive: true });

                ///event listerners:
                document.getElementById('prevBtn').addEventListener('click', flipBack);
                document.getElementById('nextBtn').addEventListener('click', flipForward);


                // Toggle bookmark
                function toggleBookmark() {
                    // let btn = document.getElementById('bookmarkBtn');
                    let isBookmarked = state.bookmarks.includes(state.page);

                    const icon = isBookmarked ?
                        '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';

                    qsa('#bookmarkBtn, #bookmark, [data-hook="bookmark"]').forEach(btn => btn.innerHTML = icon);
                }

                qsa('#bookmarkBtn, #bookmark, [data-hook="bookmark"]').forEach(btn => btn.addEventListener('click', toggleBookmark));

                function saveBookmark(number) {
                    const page = number;
                    if (state.bookmarks.includes(page)) {
                        state.bookmarks = state.bookmarks.filter(b => b !== page);
                    } else {
                        state.bookmarks.push(page);
                    }
                    localStorage.setItem("bookmarkPages", JSON.stringify(number));
                    toggleBookmark();
                    saveState();
                }

                function loadBookmark() {
                    const saved = localStorage.getItem('bookmarkPages');
                    if (!saved) return;

                    const p = parseInt(saved);

                    console.log("loaded", p);
                    return Number.isFinite(p) ? p : null;
                }

                qsa('#bookmarkBtn, #bookmarkBtnBottom, [data-hook="bookmark"]').forEach(btn => btn.addEventListener('click', () => saveBookmark(state.page)));


                /////
                //////
                // for menu and expandablesss:

                // Menu panel (top) and bottom three-dots
                const menuBtn = document.getElementById('menuBtn');
                const menuPanel = document.getElementById('menuPanel');
                menuBtn.addEventListener('click', () => {
                    const open = !menuPanel.classList.contains('open');
                    menuPanel.classList.toggle('open', open);
                    menuBtn.setAttribute('aria-expanded', String(open));
                });

                document.addEventListener('click', (e) => {
                    if (!menuPanel.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
                        menuPanel.classList.remove('open');
                        menuBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                // Search
                const searchBar = document.getElementById('search');
                searchBar.addEventListener('change', () => {
                    const value = searchBar.value.trim();
                    searchBar.value = '';
                    if (!value) return;
                    if (value.toLowerCase().includes("cover") || value.toLowerCase().includes('end')) {
                        let direction = true;
                        value.toLowerCase().includes("cover") ? [state.page = 0, direction = false]
                            : value.toLowerCase().includes("end") ? [state.page = LAST, direction = true]
                                : "";

                        flip(direction);
                        playTurnSound(true);
                        render();
                        saveState();
                    }


                    const pageNum = parseInt(value, 10);
                    if (!Number.isFinite(pageNum) || pageNum < 0) return;

                    const idx = clamp(pageNum, 1, LAST - 1);
                    state.page = idx;
                    flip(true);
                    playTurnSound(false);
                    render();
                    saveState();
                });

                mq.addEventListener('change', applyLayout);

                // Init
                (function init() {
                    // Title & search placeholder
                    document.getElementById('bookTitle').textContent = BOOK.title;

                    document.getElementById('search').placeholder = `Search page – ${BOOK.title}`;

                    // Start from last read, otherwise bookmark;
                    loadState();
                    const bm = loadBookmark();
                    state.zoom = 1;

                    if (bm && !Number.isFinite(parseInt(localStorage.getItem('bookState') || ''))) state.page = bm;

                    applyLayout();
                })();

            } else {
                handleAlert("Please go to the Book Page and purchase the book to start reading...", "blur", true, "%", true, [{ text: "GET COPY", onClick: () => window.location.replace("/html/main/Shop.html") }, { text: "Close", onClick: () => window.location.replace("/html/main/Home.html") }]);
            }
        }
    });
});