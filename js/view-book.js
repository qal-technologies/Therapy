

document.addEventListener('DOMContentLoaded', () => {
    const BOOK = {
        title: 'Compagnon Féminin',
        pages: [
            `<img src="/src/images/book1.jpg" alt="cover-page" class="cover-page"/>`,

`<p>---</p>`,
`
<div class="inner-content flex center-self text-center fx-top-30p">
    <h1 style="margin-bottom:-5px;">COMPAGNON FÉMININ</h1>
    <p class="text-center">A Journey Through Womanhood, Healing, and Hope</p>
</div>

    <div class="inner-content fx-btm-5p text-center">
        AUTHOR
        <h3>Charlotte Casiraghi</h3>
</div>`,


            `
<p class="wdth-100p pdtop-20">
<br/>
<br/>
<b>Copyright, © 2025 by Charlotte Casiraghi.</b>
<br/>
<span style="font-style:italic;">All rights reserved.</span>
</p>


<br/>
<p>
<i>First Edition.</i> 
<br/>
No part of this book may be reproduced without permission. 
</p>

<br/>
<p>
<b>Published by Monaco Press,</b>
<br/>
Avenue du Palais, Monaco.
<br/>
<br/>

<b>Printed in France.</b>
<br/>
<i>Library of Congress Cataloging-in-Publication Data forthcoming.</i>
</p>
`,

            
            `
            <h1>DEDICATION</h1>

• To the silent ones. <br/>
• To the women who cry behind closed doors.<br/>
• To the ones who stayed strong for too long.<br/>
• To the souls whoever felt invisible, unloved, or forgotten.

<br/>
<br/>
This is your book.
<br/>
I wrote it with trembling hands and an open heart,for you.


            `,
            `
            <h1>EPIGRAPH</h1>
And the day came when the pain to remain the same was greater than the fear to change.
<br/>
â€” AnaÃ¯s Nin
            `,

            `<h1>Foreword</h1>

<p>
<b>by Gabriela Ramos</b>
<br/>
<i>Assistant Directorate<br/>
General for Social and Human Sciences, UNESCO
</i>
</p>

----
<br/>
<p>
When I first met Charlotte Casiraghi at UNESCO's World Philosophy Day, she spoke with such grace and conviction about the importance of inner growth that I felt immediately drawn to her vision. She sees philosophy not as an abstract pursuit, but as a living practice, one that can help each of us understand ourselves and heal. In <b>Compagnon Féminin</b>, Charlotte has channelled that vision into a profound companion for women at every stage of life.
</p>

As you turn these pages, you will feel the presence of a friend who understands your fears, honours your strength, and speaks to your deepest desires. 
`,
            `
            <p>Charlotte combines her scholarly insight with intimate storytelling, inviting readers into a shared space of reflection and growth. Whether she is drawing wisdom from ancient thinkers or recounting the lessons she learned in the quiet of early mornings, her words offer guidance and compassion in equal measure.
            </p>

            <p>In my work with UNESCO, I have seen how giving people especially young women access to knowledge and a sense of purpose can transform communities. That same spirit animates this book. Charlotte invites us to embrace our own stories, to find meaning in our struggles, and to cultivate resilience and joy. She speaks to us not as an expert on a pedestal, but as a fellow traveller. The result is a deeply personal and yet universal guide: a reminder that healing and empowerment are possible for everyone, regardless of our circumstances.
            </p>

May Compagnon Féminin be the gentle hand that accompanies you through your hardest days and your brightest mornings. I believe these pages will become a refuge, a source of courage, and a cherished companion for women everywhere.`,
            `
            <h1> Preface</h1>
This book was born from a place of inquiry and compassionâ€”a desire to weave together the threads of my own experience into a companion that could travel with other women on their journeys. Over the years, I found myself asking the same question: how can we remain grounded in our own truth while navigating the complexities of modern womanhood? How can we honour our past, heal our pain, and create a life that is deeply our own?

<p>
I grew up in an extraordinary world of elegance and tradition, one forever marked by the early loss of my father. My childhood oscillated between the polished grandeur of royal halls and the quiet, dusty arenas where I learned to ride horses. Those horses became my sanctuary and teachers. In their eyes, I found a mirror for my own fears and strengths; in their gallop, I learned the discipline and grace that carry a woman through life.
</p>


            `,
`
<p>
Later, as I studied philosophy in Paris, the questions deepened. I realised that philosophyâ€”a discipline that seeks to make sense of life had the power to speak directly to the heart. 
</p>
        
Rather than remaining a purely intellectual pursuit, philosophy became a lens through which I began to understand grief, love, courage, and the importance of listening to our inner voice. These explorations led me to co-found Lesâ€¯Rencontres Philosophiques de Monaco, an open forum for discussing ideas that matter. It also led me here, to these pages.

<p>
Throughout this book, I share lessons and reflections drawn from my own path and from the wisdom of thinkers, poets, and everyday heroines. My goal is not to prescribe a one-size-fits-all solution but to offer a companion for the many seasons of life. We will explore sorrow and joy, strength and vulnerability, solitude and connection. 
</p>
 `,

            `
<p>
We will walk through the forests of healing and emerge with tools to cultivate confidence and purpose. Most of all, I hope these chapters remind you that you are never aloneâ€”that your experiences, however difficult or hidden, are understood and shared by women across the world.
</p>

<p>
When I reflect on my journey so farâ€”from the balmy evenings of Monaco Rose Ball to the early-morning arena runs, from the rigour of philosophy lectures to the quiet moments of parenting I see not a princess fleeing her destiny, but a woman embracing it on her own terms.
</p>

I see someone who sought freedom and found it not by escaping the past but by integrating it, transforming pain into wisdom and tradition into personal meaning.

<p>
If this book encourages you to do the same if it helps you to heal deeply, to live authentically, and to love boldly then I am grateful. My wish is for Compagnon Féminin to be a guide and a gentle friend, accompanying you through the peaks and valleys, holding space for your sorrow and celebrating your joy.</p>`,
            
            `
            <h1>Acknowledgments</h1>

I owe thanks to many who made this book possible:

<p>
<b>Family:</b> My mother, Princess Caroline, and my siblings Andrea, Pierre, and Alexandra, for their love and guidance; my grandmothers Grace and Jacqueline, whose legacies inspire me.
</p>

<p>
<b>Children:</b> My sons RaphaÃ«l and Balthazar, who bring daily purpose to my life.
</p>

<p>
<b>Mentors and Friends:</b> Albina du Boisrouvray (godmother) for her unwavering support of humanitarian causes; Julia Kristeva, whose friendship and mentorship in philosophy sustain me; Robert Maggiori, Joseph Cohen, and RaphaÃ«l Zagury-Orly, co-founders of our philosophical meetings; Anne Dufourmantelle, whose memory lives on in our letters and essays.
</p>

<p>
<b>Equestrian Team:</b> My trainers Jean-Michel and Thierry Rozier, and everyone at the Longines Global Champions Tour, for teaching me strength and humility in sport.
</p>
`,
            `
<p>
<b>Academic and Creative Collaborators:</b> Professors at the Sorbonne and Catholic Institute of Paris; the teams at AnOther Magazine, Above, and The Independent; Chanelâ€™s communications team for believing in my voice; the editors at Ã‰ditions du Seuil who brought Archipel des Passions to life.
</p>

<p>
<b>Philanthropic Partners:</b> The organizations for which I am honored to workâ€”UNAIDS, FXB France (founded by Albina du Boisrouvray), UNICEF Monacoâ€”and all who joined me on the Ever Manifesto project with Stella McCartney.
</p>
<p>
<b>Readers:</b> To every person who has ridden alongside me in spirit â€“ thank you.
</p>
`,
            `<h1>TABLE OF CONTENTS </h1>
Added later....

            `,
            `<p> Page is empty for now</p>`,
            `<h1>About the Author</h1>
            
            <p>
            <b>Charlotte Casiraghi</b> (b. 1986) is a MonÃ©gasque public figure known for her diverse pursuits.  She serves on the boards of cultural and charitable organizations (including the Princess Grace Foundation and UNICEF Monaco) and is an advocate for youth education and womenâ€™s empowerment.
            <br/>
            A former competitive show jumper, Charlotte also has a career in journalism and fashion media.  In 2015 she was appointed as an Ambassador for UNESCOâ€™s philosophy program.  She lives in Monaco and Paris with her two sons.
            </p>
            `,

            `<h1>
Other Works by the Author
            </h1>
            
<p>
<b>Archipel des Passions</b> (2018, essay dialogue on philosophy)
</p>

<p>
<b>Everlution</b> (2009, first issue of Ever Manifesto, co-founder)
</p>

<p>
<b>Ever Bamboo</b> (2011, second issue of Ever Manifesto)
(Note: Charlotte has written numerous articles for The Independent and AnOther Magazine and often pens prefaces for philosophical works.)
</p>
            `,
            `<div  class="cover-page"><p> This is the end page</p></div>`,
        ]
    };

    // DOM Elements
    const bookEl = document.getElementById('book');
    const leftEl = document.getElementById('leftPage').querySelector('.content');
    const rightEl = document.getElementById('rightPage').querySelector('.content');
    const pageIndicator = document.getElementById('pageInfo');
    const audioEl = document.getElementById('flipAudio');

    // ===== Responsive: single vs spread =====
    const mq = window.matchMedia('(min-width: 980px)');


    // helper methods:
    const qs = (sel, root = document) => root.querySelector(sel);
    const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];


    //////
    const PAGE_TURN_SOUND_SRC = '/src/audio/page-flip.mp3';
    const THUD_SOUND_SRC = '/src/audio/page-thud.mp3';
    const pageTurnSound = new Audio(PAGE_TURN_SOUND_SRC);
    const thudSound = new Audio(THUD_SOUND_SRC);


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
    };

    // Utils: =====>>>>>
    const clamp = (n, min, max) => {
        const number = Math.max(min, Math.min(max, n));
        return number;
    }
    const isCover = (idx) => idx === 0;
    const isEnd = (idx) => idx === LAST;


    // Configuration
    const NUM_PAGES = state.total;

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
    ${!checks ?`<div class="page-top">
      <span class="chapter">${title}</span>
    </div>` : ""}

    ${checks? html :`<div class="page-middle">${html}</div>`}
    ${!checks ?`<div class="page-bottom">
      <span class="page-num">${label}</span>
    </div>` :""}
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
                pageTurnSound.play();
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
    const SWIPE_MIN = 40;
    bookEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    bookEl.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].screenX - touchStartX;
        if (dx <= -SWIPE_MIN) flipForward();
        else if (dx >= SWIPE_MIN) flipBack();
    }, { passive: true });

    ///event listerners:
    document.getElementById('prevBtn').addEventListener('click', flipBack);
    document.getElementById('nextBtn').addEventListener('click', flipForward);


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
        localStorage.setItem("bookmarkPages", JSON.stringify(number));
        toggleBookmark();
        saveState();
    }

    function loadBookmark() {
        const saved = localStorage.getItem('bookmarkPage');
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
        if (value.toLowerCase().includes("e")) {
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

});
