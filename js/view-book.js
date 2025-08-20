document.addEventListener('DOMContentLoaded', () => {
    //book array:
    const BOOK = {
        title: 'Compagnon Féminin',
        // pages: Array.from({ length: 16 }, (_, i) => `This is book${i + 1}`),
        pages: [
            {
                chapter: 1,
                title: "title of chapter 1",
                inner: [
                    [
                        "<p>This content is supposed to be in chapter 1, page 1.</p> <p> This is extra text for page 1</p>"
                    ],
                    [
                        "<p>This content is supposed to be in chapter 1, page 2.</p> <p> This is extra text for page 2</p>"
                    ],

                    [
                        "<p>This content is supposed to be in chapter 1, page 3.</p> <p> This is extra text for page 3</p>"
                    ],

                    [
                        "<p>This content is supposed to be in chapter 1, page 4.</p> <p> This is extra text for page 4</p>"
                    ],

                    [
                        "<p>This content is supposed to be in chapter 1, page 5.</p> <p> This is extra text for page 5</p>"
                    ],

                ]
            }, {
                chapter: 2,
                title: "title of chapter 2",
                inner: [
                    [
                        "<p>This content is supposed to be in chapter 2, page 1.</p> <p> This is extra text for page 1</p>"
                    ],
                    [
                        "<p>This content is supposed to be in chapter 2, page 2.</p> <p> This is extra text for page 2</p>"
                    ],

                    [
                        "<p>This content is supposed to be in chapter 2, page 3.</p> <p> This is extra text for page 3</p>"
                    ],

                    [
                        "<p>This content is supposed to be in chapter 2, page 4.</p> <p> This is extra text for page 4</p>"
                    ],

                    [
                        "<p>This content is supposed to be in chapter 2, page 5.</p> <p> This is extra text for page 5</p>"
                    ],

                ]
            },

            {
                chapter: 3,
                title: "title of chapter 3",
                inner: [
                    [
                        "<p>This content is supposed to be in chapter 3, page 1.</p> <p> This is extra text for page 1</p>"
                    ],
                    [
                        "<p>This content is supposed to be in chapter 3, page 2.</p> <p> This is extra text for page 2</p>"
                    ],

                    [
                        "<p>This content is supposed to be in chapter 3, page 3.</p> <p> This is extra text for page 3</p>"
                    ],

                    [
                        "<p>This content is supposed to be in chapter 3, page 4.</p> <p> This is extra text for page 4</p>"
                    ],

                    [
                        "<p>This content is supposed to be in chapter 3, page 5.</p> <p> This is extra text for page 5</p>"
                    ],

                ]
            }
        ],

        chapters: [
            { title: 'Introduction — You Are Alone', page: 1 },
            { title: 'Part I — Seeing Clearly', page: 4 },
            { title: 'Part II — Turning Points', page: 8 },
            { title: 'Part III — Practice', page: 12 },
        ],
    };

    // DOM Elements
    const bookEl = document.getElementById('book');
    const leftEl = document.getElementById('leftPage').querySelector('.content');
    const rightEl = document.getElementById('rightPage').querySelector('.content');
    const pageIndicator = document.getElementById('pageInfo');
    const audioEl = document.getElementById('flipAudio');


    // helper methods:
    const qs = (sel, root = document) => root.querySelector(sel);
    const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];


    // ===== Responsive: single vs spread =====
    const mq = window.matchMedia('(min-width: 980px)');

    const chapters = BOOK.pages.map(obj => {
        return [obj.chapter];
    });
    const pages = BOOK.pages.map(obj => {
        return [obj.inner.map(pages => {
            return pages;
        })];
    });

    const titles = BOOK.pages.map

    //state:
    let state = {
        chapter: 1,
        page: 1,
        zoom: 1,
        soundOn: true,
        spread: true,
        bookmarks: [],
        total: pages.length,
    };

    const currentChapter = BOOK.pages.find(page => {

        return page.chapter === state.chapter;

    });

    console.log(currentChapter.inner);

    // Configuration
    const NUM_PAGES = state.total;



    function clamp(n, a, b) {
        const number = Math.max(a, Math.min(b, n));
        return number;
    }

    //////
    const PAGE_TURN_SOUND_SRC = '/src/audio/page-flip.mp3';
    const THUD_SOUND_SRC = '/src/audio/page-thud.mp3';
    const pageTurnSound = new Audio(PAGE_TURN_SOUND_SRC);
    const thudSound = new Audio(THUD_SOUND_SRC);


    /*--- Page Creation --
    // function createPages() {
    //     for (let i = 1; i <= NUM_PAGES; i++) {
    //         const page = document.createElement('div');
    //         page.classList.add('page');
    //         page.dataset.pageNum = i;

    //         const content = document.createElement('p');
    //         content.classList.add('page-content');

    //         content.innerText = `This is Page ${i}`
    //         content.style.width = '100%';
    //         content.style.height = '100%';
    //         content.style.objectFit = 'cover';
    //         page.appendChild(content);

    //         pagesContainer.insertBefore(page, document.querySelector('.back-cover'));
    //     }
    // }

    
    //*/


    // --- State Management & Persistence ---
    function saveState() {
        localStorage.setItem('bookState', JSON.stringify(state));
    }

    function loadState() {
        const savedState = localStorage.getItem('bookState');
        if (savedState) {
            state = JSON.parse(savedState);
        }
    }

    function applyLayout() {
        loadState();
        state.spread = mq.matches;
        bookEl.classList.toggle('spread', state.spread);

        /* Ensure left page is odd
        if (state.spread && state.page % 2 === 0) state.page -= 1;
        render();*/


        // First page is cover
        if (state.page === 1) renderCover();
        else if (state.page > BOOK.pages.length) renderEndCover();
        else render();

    }
    mq.addEventListener('change', applyLayout);

    function makePage(text, pageIdx) {
        const div = document.createElement('div');
        div.classList.add('page-content', "content");

        // Top: Chapter (left), Title (right)
        // const chapter = BOOK.chapters.findLast(ch => ch.page <= pageIdx + 1) || {};

        const direction = pageIdx > state.page ? true : false;
        // flip(direction);

        div.innerHTML = `
    <div class="page-top">
      <span class="chapter">${BOOK.title || ''}</span>
    </div>
    <div class="page-middle">${text}</div>
    <div class="page-bottom">
      <span class="page-num">${pageIdx}</span>
    </div>
  `;
        return div;
    }


    // ===== Render pages =====
    function render() {
        loadState();
        const total = BOOK.pages.length;
        const p = Math.max(state.page, Math.min(1, total));

        state.page = p;

        leftEl.innerHTML = '';
        rightEl.innerHTML = '';

        if (state.spread) {
            const leftIdx = Math.max(1, p);
            const rightIdx = Math.min(total, p + 1);

            leftEl.appendChild(makePage(BOOK.pages[leftIdx - 1], state.page));
            rightEl.appendChild(makePage(BOOK.pages[rightIdx - 1], state.page + 1));


            pageIndicator.textContent = `${rightIdx} / ${total}`;
        } else {
            leftEl.appendChild(makePage(BOOK.pages[p - 1], state.page));
            rightEl.appendChild(document.createElement('div'));

            pageIndicator.textContent = `${p} / ${total}`;
        }

        // Update bookmark state
        const bm = loadBookmark();
        const onThis = bm === state.page;

        qsa('#bookmarkBtn, #bookmarkBtnBottom').forEach(b => b.setAttribute('aria-pressed', onThis));
    }

    //rendering covers and ends::::
    function renderCover() {
        leftEl.innerHTML = '';
        rightEl.innerHTML = '';

        // On spread, show cover as single on left, blank right
        leftEl.appendChild(makeCover('cover'));
        if (state.spread) rightEl.innerHTML = '';
        pageIndicator.textContent = `Cover Page`;
    }

    function renderEndCover() {
        leftEl.innerHTML = '';
        rightEl.innerHTML = '';

        // On spread, show cover as single on right, blank left
        if (state.spread) leftEl.innerHTML = '';
        rightEl.appendChild(makeCover('end'));
        pageIndicator.textContent = `The End`;
    }

    function makeCover(type) {
        console.log(state.page);

        const div = document.createElement('div');
        div.className = 'cover content';

        div.innerHTML = `
        <h1>${BOOK.title}</h1>
        <p>${type === 'cover' ? 'Book by Charlotte Casiraghi' : 'Thanks for reading!'}</p>`;
        return div;
    }

    // ===== Flip animation =====
    function flip(forward = true) {
        // Determine which side to animate
        const total = BOOK.pages.length;
        if (forward && state.page >= (total)) return;
        if (!forward && state.page <= 1) return;

        const flip = document.createElement('div');
        flip.className = 'flip ' + (forward ? 'anim-forward' : 'anim-back');

        const front = document.createElement('div'); front.className = 'face front';
        const back = document.createElement('div'); back.className = 'face back';
        const shade = document.createElement('div'); shade.className = 'shade';

        // Snapshot current visible side
        if (forward) {
            // Animate right page to the left
            flip.style.right = 0; flip.style.left = 'auto';
            front.appendChild(makePage(BOOK.pages[(state.spread ? state.page + 1 : state.page) - 1]));
            const nextIdx = clamp((state.spread ? state.page + 2 : state.page + 1), 1, total);
            back.appendChild(makePage(BOOK.pages[nextIdx - 1]));
        } else {
            // Animate left page back to the right
            flip.style.left = 0; flip.style.right = 'auto';
            front.appendChild(makePage(BOOK.pages[state.page - 1]));
            const prevIdx = clamp((state.spread ? state.page - 1 : state.page - 1), 1, total);
            back.appendChild(makePage(BOOK.pages[prevIdx - 1]));

        }

        flip.append(front, back, shade);
        bookEl.appendChild(flip);

        if (state.soundOn) {
            try {
                audioEl.currentTime = 0;
                audioEl.play();
            }
            catch (e) {
                console.error("This is the error: ", e);
            }
        }

        flip.addEventListener('animationend', () => {
            applyLayout();
            flip.remove();
            // Update logical page index
            if (forward) {
                state.page += (state.spread ? 2 : 1);
            } else {
                state.page -= (state.spread ? 2 : 1);
                if (state.spread) state.page = Math.max(1, state.page - (state.page % 2 === 0 ? 1 : 0));
            }
            saveState();
            console.log(state.page);
        }, { once: true });
    }

    // Keyboard
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') flip(true);
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') flip(false);
        if ((e.ctrlKey || e.metaKey) && e.key === '+') zoom(0.1);
        if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) zoom(-0.1);
    });

    // --- UI Update ---
    function updateUI() {
        loadState();

        // Update page indicator
        pageIndicator.textContent = `${state.page} / ${state.total}`;

        // Update sound button
        toggleSound();

        // Update bookmark button
        gotoBookmark();
        toggleBookmark();

        // // Handle covers
        // const frontCover = document.querySelector('.front-cover');
        // if (state.page > 0) {
        //     frontCover.classList.add('flipped');
        // } else {
        //     frontCover.classList.remove('flipped');
        // }

        // const backCover = document.querySelector('.back-cover');
        if (state.page === 1) {
            renderCover();
        } else {
            applyLayout();
        }
    }

    // --- Event Handlers ---
    function goToPage(pageNumber) {
        const direction = pageNumber > state.page ? true : false;

        const index = clamp(pageNumber, 1, state.total);
        flip(direction);

        if (state.spread && index % 2 === 0) index -= 1;

        state.page = index;

        if (state.soundEnabled) {
            pageTurnSound.play().catch(e => console.error("Sound play failed:", e));
        }

        updateUI();
        updatePageEdges();
        saveState();
    }

    /*Sound toggle*/
    function toggleSound() {
        state.soundOn = !state.soundOn;
        qsa('#soundToggle, [data-hook="sound"]').forEach(b => b.setAttribute('aria-pressed', state.soundOn));

        const icon = state.soundOn ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';

        qsa('#soundToggle, [data-hook="sound"]').forEach(b => b.innerHTML = icon);
    }
    qsa('#soundToggle, [data-hook="sound"]').forEach(btn => btn.addEventListener('click', toggleSound));



    // Zoom
    function zoom(delta) {
        state.zoom = clamp(Number((state.zoom + delta).toFixed(2)), .6, 2.0);

        document.documentElement.style.setProperty('--zoom', state.zoom);
    }

    qsa('#zoomIn, #zoomInBottom, [data-hook="zoom-in"]').forEach(btn => btn.addEventListener('click', () => zoom(0.1)));
    qsa('#zoomOut, #zoomOutBottom, [data-hook="zoom-out"]').forEach(btn => btn.addEventListener('click', () => zoom(-0.1)));


    // Toggle bookmark
    function toggleBookmark() {
        let btn = document.getElementById('bookmarkBtn');
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
        updateUI();
        saveState();
    }

    function loadBookmark() {
        const p = parseInt(localStorage.getItem('bookmarkPage') || '');
        return Number.isFinite(p) ? clamp(p, 1, BOOK.pages.length) : null;
    }

    function gotoBookmark() {
        const p = loadBookmark();
        if (p) { state.page = p; render(); }
    }

    qsa('#bookmarkBtn, #bookmarkBtnBottom, [data-hook="bookmark"]').forEach(btn => btn.addEventListener('click', () => saveBookmark(state.page)));


    /////
    //////
    ///////


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


    qsa("#prevBtn").forEach(btn => btn.addEventListener("click", () => {
        flip(false);
    }));
    qsa("#nextBtn").forEach(btn => btn.addEventListener("click", () => {
        flip(true);
    }));

    // prevPageBtn.addEventListener('click', () => {
    //     if (state.page > 0) {
    //         goToPage(state.page - 1);
    //     } else {
    //         if (state.soundEnabled) thudSound.play();
    //     }
    // });

    // nextPageBtn.addEventListener('click', () => {
    //     if (state.page < NUM_PAGES) {
    //         goToPage(state.page + 1);
    //     } else {
    //         if (state.soundEnabled) thudSound.play();
    //     }
    // });


    // Search
    const searchBar = document.getElementById('search');
    searchBar.addEventListener('change', () => {
        const value = searchBar.value.trim();
        if (!value) return;

        const pageNum = parseInt(value, 10);
        if (!isNaN(pageNum) && pageNum > 0 && pageNum <= NUM_PAGES) {
            goToPage(pageNum);
        }

        // for titles:
        const match = BOOK.chapters.find(ch => ch.title.toLowerCase().includes(value.toLowerCase()));
        if (match) goToPage(match.page);

        searchBar.value = '';
    });


    // Fullscreen
    function toggleFullscreen() {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => { });
        else document.exitFullscreen();
    }
    qsa('#fullscreenBtn, [data-hook="fullscreen"]').forEach(btn => btn.addEventListener('click', toggleFullscreen));


    // --- Page Edges ---
    function updatePageEdges() {
        const leftEdges = document.getElementById('page-edges-left');
        const rightEdges = document.getElementById('page-edges-right');
        leftEdges.innerHTML = '';
        rightEdges.innerHTML = '';

        const edgeThickness = 0.5; // in px
        for (let i = 0; i < state.page; i++) {
            const edge = document.createElement('div');
            edge.className = 'page-edge';
            edge.style.left = `${i * edgeThickness}px`;
            leftEdges.appendChild(edge);
        }

        for (let i = state.page; i < NUM_PAGES; i++) {
            const edge = document.createElement('div');
            edge.className = 'page-edge';
            edge.style.right = `${(NUM_PAGES - 1 - i) * edgeThickness}px`;
            rightEdges.appendChild(edge);
        }
    }

    // --- Swipe Gestures ---
    let touchstartX = 0;
    let touchendX = 0;

    function handleGesture() {
        if (touchendX < touchstartX) {
            if (state.page < state.total) {
                goToPage(state.page + 1);
            }
        }

        if (touchendX > touchstartX) {
            if (state.page > 0) {
                goToPage(state.page - 1);
            }
        }
    }

    bookEl.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    bookEl.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    });

    // Init
    (function init() {
        // Title & search placeholder
        document.getElementById('bookTitle').textContent = BOOK.title;

        document.getElementById('search').placeholder = `Search chapter or page – ${BOOK.title}`;

    // Start from last read, otherwise bookmark if present
        loadState();
        const bm = loadBookmark();

        if (bm && !Number.isFinite(parseInt(localStorage.getItem('bookState') || ''))) state.page = bm;

        applyLayout();
    })();

});
