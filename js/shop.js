// Global State Management (localStorage)
const State = {
  get paidFeatures() {
    return JSON.parse(localStorage.getItem('paidFeatures')) || [];
  },
  set paidFeatures(items) {
    localStorage.setItem('paidFeatures', JSON.stringify(items));
  }
};

//Audio source:
const audioSrc = {
  session: {
    "en": "/src/audio/book-audio.mp3",
    "fr": "/src/audio/book-audio.mp3",
  }
};

// Book Data:
const BOOK_COLLECTION = [
  {
    id: 'book-1',
    title: "THE BEAUTY OF LIVES",
    downloads: "5000+ Downloads",
    formats: ["eBook", "Hardcopy"],
    price: "20.00",
    status: "Sold Out",
    description: "Get instant access to the story that's changing lives. Read on any device, anytime, begin your journey in just one click.",
    image: "/src/images/book1.jpg",
    quantity:1,
  },
  {
    id: 'book-2',
    title: "THE ELEGANT STORY",
    downloads: "3000+ Downloads",
    formats: ["eBook", "Hardcopy"],
    price: "25.00",
    status: "Sold Out",
    description: "Another inspiring story that will change your perspective on healing and growth.",
    image: "/src/images/book2.jpg",
    quantity:1
  }
];

function handleAudio(lang) {
  const audioMessage = document.querySelector('#banner audio#book-audio-message');


  audioMessage.src = audioSrc.session[lang] || "/src/audio/book-audio.mp3";

  const listenBTN = document.querySelector("#banner button#play");

  if (listenBTN && audioMessage) {
    listenBTN.addEventListener('click', () => {
      if (!audioMessage.paused) {
        listenBTN.innerHTML = ` <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                  />
                </svg>`;
        audioMessage.pause();
      } else {
        listenBTN.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
</svg>`;
        audioMessage.play();
      }
    });
  }

  audioMessage.addEventListener("ended", () => {
    listenBTN.innerHTML = ` <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                  />
                </svg>`;
  });
}

// Handle Book Click
function handleBookClick(e) {
  const bookId = e.target.id;
  const hasAccess = State.paidFeatures.includes(bookId);

  if (!hasAccess) {
    showPaymentModal(bookId);
    return;
  }

  // Open book reader
  window.location.href = `/html/main/read.html?id=${bookId}`;
}

// // Show Payment Modal
// function showPaymentModal(bookId) {
//   const book = BOOKS.filter(book => {
//     return book.id == bookId;
//   })[0];


//   const language = navigator.language;


//   const transactionId = `TXN-${Math.random()
//     .toString(36)
//     .substring(2, 10)
//     .toUpperCase()}-${language.substring(0, 2).toUpperCase()}`;

//   const details = {
//     id: bookId,
//     type: "book",
//     description: `PURCHASE OF BOOK (${book.title}) - ${book.description} ${quantity > 1 ? "[2 Copies]" : ''}`,
//     title: book.title,
//     price: book.price,
//     date: new Date(),
//     transactionId: transactionId,
//     quantity: quantity,
//   };

//   const params = new URLSearchParams({
//     type: "book",
//     details: JSON.stringify(details)
//   }).toString();

//   const modal = document.getElementById('paymentModal');
//   modal.style.display = 'flex';

//   setTimeout(() => {
//     window.location.href = `/html/main/payment.html?${params}`;
//   }, 2000);
// }


function removeDetailsModal() {
  const modal = document.querySelector("#details-div");

  modal.style.display = "none";
}

function showDetailsModal() {
  const modal = document.querySelector("#details-div");

  modal.style.display = "block";
  renderBookCollection();

  const close = document.querySelector("#details-div button.close-details");


  close && close.addEventListener("click", removeDetailsModal);
}

function handleQuantityChange(e) {
  const parentId = e.target.closest('.qty-main-div').dataset.id;
  const book = BOOK_COLLECTION.find(b => b.id === parentId);
  
  if (!book) return;

  if (e.target.classList.contains('add')) {
    book.quantity++;
  } else if (e.target.classList.contains('minus')) {
    // Prevent quantity from going below 1
    book.quantity = Math.max(1, book.quantity - 1);
  }

  // Update the displayed quantity
  const qtyText = e.target.closest('.qty-main-div').querySelector('.qty-text');
  if (qtyText) {
    qtyText.textContent = book.quantity;
  }
}

// Render Book Collection:
function renderBookCollection() {
  const collectionContainer = document.getElementById('bookCollection');
  if (!collectionContainer) return;

  collectionContainer.innerHTML = BOOK_COLLECTION.map(book => `
    <div class="book-item" data-id="${book.id}">
      <img src="${book.image}" alt="${book.title}">
<div class="book-info">
      <h3 class="book-title">${book.title}</h3>
      <p class="book-author">Charlotte Casiraghi</p>

      <div class="book-downloads">
      <div class="download-stars">*****</div>
      <p class="download-text">${book.downloads}</p>
      </div>
      <div class="book-format">
        <div class="format-div">
        <input type="radio" name=${book.formats[0]} id=${book.formats[0]}>
        <div class="side">
          <p class="format-name">${book.formats[0]}</p>
          <p class="format-price">&euro; ${book.price}</p>
          </div>
        </div>

<div class="format-div last">
<input type="radio" name=${book.formats[1]} id=${book.formats[1]} ${book.status.toLowerCase() === "sold out" ? "disabled" : ""}>
          <div class="side">
          <p class="format-name">${book.formats[1]}</p>
          <p class="format-status ${book.status.toLowerCase()}">${book.status}</p>
          </div>
        </div>
      </div>
  </div>    

      <div class="book-description-div">
      <p class="description-title">
      eBook Description
      </p>
      <p class="description-text">
      ${book.description}
      </p>


       <div class="quantity">
        <p class="quantity-text">Qty</p>
        <div class="qty-main-div" data-id="${book.id}">
          <span class="qty-arrow minus">-</span>
          <p class="qty-text">${book.quantity}</p>
          <span class="qty-arrow add">+</span>
        </div>
      </div>
     </div>

      <button class="add-to-cart btn">Add to Cart</button>
    </div>

  `).join('');

  document.querySelectorAll('.qty-arrow').forEach(btn => {
    btn.addEventListener('click', handleQuantityChange);
  });

  // Add event listeners for Add to Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const bookItem = e.target.closest('.book-item');
      const bookId = bookItem.dataset.id;
      const book = BOOK_COLLECTION.find(b => b.id === bookId);

      if (book) {
        if (addToCart(book)) {
          alert(`${book.quantity} ${book.quantity > 1 ? 'copies' : 'copy'} of "${book.title}" added to cart!`);
          // Reset quantity after adding to cart
          book.quantity = 1;
          renderBookCollection();
        }
      }
    });
  });
}


// Improved Add to Cart Function
function addToCart(book) {
  let cart = JSON.parse(localStorage.getItem('carts')) || [];
  
  // Get selected format
  const selectedFormat = document.querySelector(`.book-item[data-id="${book.id}"] input[type="radio"]:checked`);
  if (!selectedFormat && book.formats.length > 0) {
    alert('Please select a format before adding to cart');
    return false;
  }

  // Check if book already in cart with same format
  const existingItemIndex = cart.findIndex(item => 
    item.id === book.id && item.format === selectedFormat?.name
  );

  if (existingItemIndex !== -1) {
    // Update quantity of existing item
    cart[existingItemIndex].quantity += book.quantity;
  } else {

const transactionId = `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${language.substring(0, 2).toUpperCase()}`;

    // Adding new item to cart
    cart.push({
      id: book.id,
      title: book.title,
      author: "Charlotte Casiraghi", 
      price: book.price,
      image: book.image,
      quantity: book.quantity,
transactionId: transactionId,
description:book.description,
image:book.image,
      format: selectedFormat?.name || book.formats[0]
    });
  }

  localStorage.setItem('carts', JSON.stringify(cart));
  return true;
}

// Initialize both sections
document.addEventListener('DOMContentLoaded', () => {
  const language = navigator.language;
  const lang = language.toLowerCase().substring(0, 2);

  handleAudio(lang);
  // renderBookCollection();

  const book = document.querySelector("#preview button.get-copy");
  const close = document.querySelector("#details-div button.close-details");

  book && book.addEventListener("click", showDetailsModal);
  close && close.addEventListener("click", removeDetailsModal);
});


