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
    const searchBar = document.getElementById('search-bar');
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    // State
    let state = {
        currentPage: 0,
        soundEnabled: true,
        bookmarks: [],
        zoomLevel: 1,
        pages: [],
        numPages: 0,
    };

    const pageTurnSound = new Audio('/src/audio/page-turn.mp3');
    const thudSound = new Audio('/src/audio/thud.mp3');

    // --- Page Creation & Pagination ---
    async function paginateBook() {
        const response = await fetch('/src/book-content.html');
        const bookHTML = await response.text();

        const tempRenderDiv = document.createElement('div');
        tempRenderDiv.innerHTML = bookHTML;

        const allNodes = Array.from(tempRenderDiv.childNodes);

        const measuringDiv = document.createElement('div');
        measuringDiv.style.position = 'absolute';
        measuringDiv.style.left = '-9999px';
        measuringDiv.style.width = '310px'; // var(--book-width) - padding
        measuringDiv.style.height = '460px'; // var(--book-height) - padding
        measuringDiv.style.visibility = 'hidden';
        document.body.appendChild(measuringDiv);

        let pageContents = [];
        let currentPageContent = '';

        for (const node of allNodes) {
            if (node.nodeType !== Node.ELEMENT_NODE && !node.textContent.trim()) continue;

            if (node.nodeName === 'H1') {
                if (currentPageContent) {
                    pageContents.push(currentPageContent);
                }
                currentPageContent = node.outerHTML;
                continue;
            }

            measuringDiv.innerHTML = currentPageContent + node.outerHTML;
            if (measuringDiv.scrollHeight > measuringDiv.clientHeight) {
                pageContents.push(currentPageContent);
                currentPageContent = node.outerHTML;
            } else {
                currentPageContent += node.outerHTML;
            }
        }
        if (currentPageContent) {
            pageContents.push(currentPageContent);
        }

        document.body.removeChild(measuringDiv);

        state.pages = pageContents;
        state.numPages = state.pages.length;

        renderAllPages();
    }

    function renderAllPages() {
        pagesContainer.innerHTML = '';

        const frontCover = document.createElement('div');
        frontCover.classList.add('hard', 'front-cover');
        const frontContent = document.createElement('div');
        frontContent.classList.add('page-content');
        frontContent.innerHTML = `<h1>The Book Title</h1><img src="/src/images/book1.jpg" alt="Book Cover" style="width:100%;height:100%;object-fit:cover;">`;
        frontCover.appendChild(frontContent);
        pagesContainer.appendChild(frontCover);

        state.pages.forEach((content, i) => {
            const page = document.createElement('div');
            page.classList.add('page');
            page.dataset.pageNum = i + 1;

            const front = document.createElement('div');
            front.classList.add('page-face', 'front');
            front.innerHTML = `<div class="page-content">${content}</div>`;

            const back = document.createElement('div');
            back.classList.add('page-face', 'back');

            page.appendChild(front);
            page.appendChild(back);

            if ((i + 1) % 2 !== 0) {
                page.classList.add('odd');
            }
            pagesContainer.appendChild(page);
        });

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
        localStorage.setItem('bookState', JSON.stringify({
            currentPage: state.currentPage,
            soundEnabled: state.soundEnabled,
            bookmarks: state.bookmarks,
            zoomLevel: state.zoomLevel,
        }));
    }

    function loadState() {
        const savedState = localStorage.getItem('bookState');
        if (savedState) {
            Object.assign(state, JSON.parse(savedState));
        }
    }

    // --- UI Update ---
    function updateUI() {
        pageIndicator.textContent = `${state.currentPage} / ${state.numPages}`;
        soundToggleBtn.innerHTML = state.soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';

        const isBookmarked = state.bookmarks.includes(state.currentPage);
        bookmarkBtn.innerHTML = isBookmarked ? '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';

        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            const pageNum = parseInt(page.dataset.pageNum);
            if (pageNum < state.currentPage) {
                page.classList.add('flipped');
            } else {
                page.classList.remove('flipped');
            }
        });

        const frontCover = document.querySelector('.front-cover');
        if (state.currentPage > 0) {
            frontCover.classList.add('flipped');
        } else {
            frontCover.classList.remove('flipped');
        }

        const backCover = document.querySelector('.back-cover');
        if (state.currentPage === state.numPages) {
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

        state.currentPage = Math.max(0, Math.min(pageNumber, state.numPages));
        if (state.soundEnabled) {
            pageTurnSound.play().catch(e => console.error("Sound play failed:", e));
        }
        updateUI();
        updatePageEdges();
        saveState();
    }

    let touchstartX = 0;
    let touchendX = 0;

    // --- Initialization ---
    async function init() {
        loadState();
        await paginateBook();
        updateUI();
        updatePageEdges();

        prevPageBtn.addEventListener('click', () => {
            if (state.currentPage > 0) {
                goToPage(state.currentPage - 1);
            } else {
                if (state.soundEnabled) thudSound.play();
            }
        });

        nextPageBtn.addEventListener('click', () => {
            if (state.currentPage < state.numPages) {
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

        searchBar.addEventListener('change', () => {
            const pageNum = parseInt(searchBar.value, 10);
            if (!isNaN(pageNum) && pageNum > 0 && pageNum <= state.numPages) {
                goToPage(pageNum);
            }
            searchBar.value = '';
        });

        fullscreenBtn.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.querySelector('.book-viewer-container').requestFullscreen();
            }
        });

        book.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        });

        book.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleGesture();
        });

        function handleGesture() {
            if (touchendX < touchstartX) {
                if (state.currentPage < state.numPages) {
                    goToPage(state.currentPage + 1);
                }
            }

            if (touchendX > touchstartX) {
                if (state.currentPage > 0) {
                    goToPage(state.currentPage - 1);
                }
            }
        }
    }

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

        for (let i = state.currentPage; i < state.numPages; i++) {
            const edge = document.createElement('div');
            edge.className = 'page-edge';
            edge.style.right = `${(state.numPages - 1 - i) * edgeThickness}px`;
            rightEdges.appendChild(edge);
        }
    }

    init();
});
