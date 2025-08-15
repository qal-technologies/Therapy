// document.addEventListener('DOMContentLoaded', () => {
//     const book = document.getElementById('book');
//     const pages = Array.from(book.querySelectorAll('.page'));
//     const cover = book.querySelector('.cover');
//     const backCover = book.querySelector('.back-cover');
//     const prevPageBtn = document.getElementById('prev-page-btn');
//     const nextPageBtn = document.getElementById('next-page-btn');
//     const pageNumberInput = document.getElementById('page-number-input');
//     const fullscreenBtn = document.getElementById('fullscreen-btn');
//     const zoomInBtn = document.getElementById('zoom-in-btn');
//     const zoomOutBtn = document.getElementById('zoom-out-btn');

//     let currentPage = 0;
//     let numPages = pages.length;
//     let zoomLevel = 1;

//     // const pageTurnSound = new Audio('/src/audio/page-turn.mp3');
//     // const thudSound = new Audio('/src/audio/thud.mp3'); 

//     function updatePage() {
//         if (currentPage === 0) {
//             cover.classList.remove('flipped');
//         } else {
//             cover.classList.add('flipped');
//         }

//         if (currentPage === numPages) {
//             backCover.classList.add('flipped');
//         } else {
//             backCover.classList.remove('flipped');
//         }

//         pages.forEach((page, index) => {
//             if (index < currentPage) {
//                 page.classList.add('flipped');
//                 page.style.zIndex = index;
//             } else {
//                 page.classList.remove('flipped');
//                 page.style.zIndex = numPages - index;
//             }
//         });

//         pageNumberInput.value = currentPage;
//     }

//     pages.forEach((page, index) => {
//         page.style.marginLeft = `${index * 2 + 10}px`
//     })

//     function turnPage(direction) {
//         const newPage = currentPage + direction;

//         if (newPage >= 0 && newPage <= numPages) {
//             currentPage = newPage;
//             updatePage();
//             // pageTurnSound.play();
//         } else {
//             // thudSound.play();
//         }
//     }

//     nextPageBtn.addEventListener('click', () => turnPage(1));
//     prevPageBtn.addEventListener('click', () => turnPage(-1));

//     pageNumberInput.addEventListener('change', () => {
//         let newPage = parseInt(pageNumberInput.value, 10) - 1;
//         if (newPage >= 0 && newPage < numPages) {
//             currentPage = newPage;
//             updatePage();
//         } else {
//             pageNumberInput.value = currentPage + 1;
//         }
//     });

//     fullscreenBtn.addEventListener('click', () => {
//         if (document.fullscreenElement) {
//             document.exitFullscreen();
//         } else {
//             book.requestFullscreen();
//         }
//     });

//     zoomInBtn.addEventListener('click', () => {
//         zoomLevel = Math.min(2, zoomLevel + 0.1);
//         book.style.transform = `scale(${zoomLevel})`;
//     });

//     zoomOutBtn.addEventListener('click', () => {
//         zoomLevel = Math.max(0.5, zoomLevel - 0.1);
//         book.style.transform = `scale(${zoomLevel})`;
//     });

//     // Swipe gestures
//     let touchstartX = 0;
//     let touchendX = 0;

//     book.addEventListener('touchstart', e => {
//         touchstartX = e.changedTouches[0].screenX;
//     });

//     book.addEventListener('touchend', e => {
//         touchendX = e.changedTouches[0].screenX;
//         handleGesture();
//     });

//     function handleGesture() {
//         if (touchendX < touchstartX) {
//             turnPage(1);
//         }

//         if (touchendX > touchstartX) {
//             turnPage(-1);
//         }
//     }

//     updatePage();
// });
