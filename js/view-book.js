document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const book = document.getElementById('book');
    const pagesContainer = document.querySelector('.pages-container');
    const pageIndicator = document.getElementById('page-indicator');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const topToolbarIcons = document.querySelector('.top-toolbar-icons');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');

    // Configuration
    const NUM_PAGES = 10; // Total number of pages
    const PAGE_TURN_SOUND_SRC = 'https://actions.google.com/sounds/v1/ui/page_turn.ogg';
    const THUD_SOUND_SRC = 'https://actions.google.com/sounds/v1/impacts/thud.ogg';
    const pageTurnSound = new Audio(PAGE_TURN_SOUND_SRC);
    const thudSound = new Audio(THUD_SOUND_SRC);

    // State
    let state = {
        currentPage: 0,
        soundEnabled: true,
        bookmarks: [],
        zoomLevel: 1,
    };

    // --- Page Creation ---
    function createPages() {
        // Front Cover
        const frontCover = document.createElement('div');
        frontCover.classList.add('hard', 'front-cover');
        const frontContent = document.createElement('div');
        frontContent.classList.add('page-content');
        frontContent.innerHTML = `<h1>The Book Title</h1><img src="/src/images/book1.jpg" alt="Book Cover" style="width:100%;height:100%;object-fit:cover;">`;
        frontCover.appendChild(frontContent);
        pagesContainer.appendChild(frontCover);


        for (let i = 1; i <= NUM_PAGES; i++) {
            const page = document.createElement('div');
            page.classList.add('page');
            page.dataset.pageNum = i;

            const front = document.createElement('div');
            front.classList.add('page-face', 'front');
            const frontImg = document.createElement('img');
            frontImg.src = `/src/images/medical/01/${i}.jpg`;
            front.appendChild(frontImg);

            const back = document.createElement('div');
            back.classList.add('page-face', 'back');
            if (i < NUM_PAGES) {
                const backImg = document.createElement('img');
                backImg.src = `/src/images/medical/01/${i + 1}.jpg`;
                back.appendChild(backImg);
            }


            page.appendChild(front);
            page.appendChild(back);

            // For double-page layout
            if (i % 2 !== 0) {
                page.classList.add('odd');
            }

            pagesContainer.appendChild(page);
        }

        // Back Cover
        const backCover = document.createElement('div');
        backCover.classList.add('hard', 'back-cover');
        const backContent = document.createElement('div');
        backContent.classList.add('page-content');
        backContent.innerHTML = `<h2>The End</h2>`;
        backCover.appendChild(backContent);
        pagesContainer.appendChild(backCover);
    }

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

    // --- UI Update ---
    function updateUI() {
        // Update page indicator
        pageIndicator.textContent = `${state.currentPage} / ${NUM_PAGES}`;

        // Update sound button
        soundToggleBtn.innerHTML = state.soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';

        // Update bookmark button
        const isBookmarked = state.bookmarks.includes(state.currentPage);
        bookmarkBtn.innerHTML = isBookmarked ? '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';

        // Flip pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            const pageNum = parseInt(page.dataset.pageNum);
            if (pageNum < state.currentPage) {
                page.classList.add('flipped');
            } else {
                page.classList.remove('flipped');
            }
        });

        // Handle covers
        const frontCover = document.querySelector('.front-cover');
        if (state.currentPage > 0) {
            frontCover.classList.add('flipped');
        } else {
            frontCover.classList.remove('flipped');
        }

        const backCover = document.querySelector('.back-cover');
        if (state.currentPage === NUM_PAGES) {
            backCover.classList.add('flipped');
        } else {
            backCover.classList.remove('flipped');
        }
    }


    // --- Event Handlers ---
    function goToPage(pageNumber) {
        const direction = pageNumber > state.currentPage ? 'forward' : 'backward';
        const pageToFlip = direction === 'forward' ? document.querySelector(`.page[data-page-num="${pageNumber}"]`) : document.querySelector(`.page[data-page-num="${state.currentPage}"]`);

        book.classList.add('flipping');
        if (pageToFlip) {
            pageToFlip.addEventListener('transitionend', () => {
                book.classList.remove('flipping');
            }, { once: true });
        }

        state.currentPage = Math.max(0, Math.min(pageNumber, NUM_PAGES));
        if (state.soundEnabled) {
            pageTurnSound.play().catch(e => console.error("Sound play failed:", e));
        }
        updateUI();
        updatePageEdges();
        saveState();
    }

    prevPageBtn.addEventListener('click', () => {
        if (state.currentPage > 0) {
            goToPage(state.currentPage - 1);
        } else {
            if (state.soundEnabled) thudSound.play();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (state.currentPage < NUM_PAGES) {
            goToPage(state.currentPage + 1);
        } else {
            if (state.soundEnabled) thudSound.play();
        }
    });

    soundToggleBtn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        updateUI();
        saveState();
    });

    bookmarkBtn.addEventListener('click', () => {
        const page = state.currentPage;
        if (state.bookmarks.includes(page)) {
            state.bookmarks = state.bookmarks.filter(b => b !== page);
        } else {
            state.bookmarks.push(page);
        }
        updateUI();
        saveState();
    });

    hamburgerMenu.addEventListener('click', () => {
        topToolbarIcons.classList.toggle('open');
    });

    zoomInBtn.addEventListener('click', () => {
        state.zoomLevel = Math.min(2, state.zoomLevel + 0.1);
        book.style.transform = `scale(${state.zoomLevel})`;
        saveState();
    });

    zoomOutBtn.addEventListener('click', () => {
        state.zoomLevel = Math.max(0.5, state.zoomLevel - 0.1);
        book.style.transform = `scale(${state.zoomLevel})`;
        saveState();
    });

    // Search
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('change', () => {
        const pageNum = parseInt(searchBar.value, 10);
        if (!isNaN(pageNum) && pageNum > 0 && pageNum <= NUM_PAGES) {
            goToPage(pageNum);
        }
        searchBar.value = '';
    });

    // Fullscreen
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    fullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.querySelector('.book-viewer-container').requestFullscreen();
        }
    });


    // --- Page Edges ---
    function updatePageEdges() {
        const leftEdges = document.getElementById('page-edges-left');
        const rightEdges = document.getElementById('page-edges-right');
        leftEdges.innerHTML = '';
        rightEdges.innerHTML = '';

        const edgeThickness = 0.5; // in px
        for (let i = 0; i < state.currentPage; i++) {
            const edge = document.createElement('div');
            edge.className = 'page-edge';
            edge.style.left = `${i * edgeThickness}px`;
            leftEdges.appendChild(edge);
        }

        for (let i = state.currentPage; i < NUM_PAGES; i++) {
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
            if (state.currentPage < NUM_PAGES) {
                goToPage(state.currentPage + 1);
            }
        }

        if (touchendX > touchstartX) {
            if (state.currentPage > 0) {
                goToPage(state.currentPage - 1);
            }
        }
    }

    book.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    book.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    });

    // --- Initialization ---
    function init() {
        createPages();
        loadState();
        updateUI();
        updatePageEdges();
    }

    init();
});
