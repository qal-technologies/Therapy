// Global State Management (localStorage)
const State = {
  get paidFeatures() {
    return JSON.parse(localStorage.getItem('paidFeatures')) || [];
  },
  set paidFeatures(items) {
    localStorage.setItem('paidFeatures', JSON.stringify(items));
  }
};

let quantity = 1;

// Book Data
const BOOKS = [
  {
    id: 'book-1',
    image: '/src/images/logo.jpg',
    title: "Journey to Self",
    description: "A guide to inner healing...",
    price: 129.99
  }, {
    id: 'book-2',
    image: '/src/images/logo.jpg',
    title: "Best Therapy",
    description: "A guide to inner healing...",
    price: 119.99
  }, {
    id: 'book-3',
    image: '/src/images/logo.jpg',
    title: "Self Motivation",
    description: "A guide to inner healing...",
    price: 149.99
  }, {
    id: 'book-4',
    image: '/src/images/logo.jpg',
    title: "Best Words for You",
    description: "A guide to inner healing...",
    price: 319.99
  }
];

// Render Books
function renderBooks() {
  const container = document.getElementById('bookContainer');
  container.innerHTML = BOOKS.map(book => `
    <div class="book-card">
      <img 
        src="${book.image}" 
        class="book-image" 
        alt="${book.title}"
        id="${book.id}"
      >
      <div class="book-info" id="book-info">
      <button class="favorite-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="add-to-cart" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>
</button>
        <div class="upper">
            <h3>${book.title}</h3>
            <h4>&euro; ${book.price}</h4>
        </div>
        <p>${book.description}</p>
      </div>

      <div class="favorite-btn bottom-btn"> Add to cart  <span>+</span></div>
    </div>
  `).join('');

  // // Add click handlers
  document.querySelectorAll('.book-image').forEach(card => {
    card.addEventListener('click', handleBookClick);
  });

  document.querySelectorAll(".favorite-btn").forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bookTitle = e.currentTarget.parentElement.querySelector(".upper h3").textContent;


      btn.classList.toggle("clicked");
      const active = btn.classList.contains("clicked");
      const icon = e.currentTarget;
      const BUTTON = icon.tagName == "BUTTON";

      BUTTON ? active ? [
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="add-to-cart" viewBox="0 0 16 16">
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/></svg>`, alert(`Item (${bookTitle}) added to cart!`)] : [
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="add-to-cart" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>`
        , alert(`Item (${bookTitle}) removed from cart!`)] : ""
    });
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

// for quantitySelection :
function selectQuantity() {
  quantity++;
}
// reseting quantity:
function resetQuantity() {
  quantity = 1;
}

// Show Payment Modal
function showPaymentModal(bookId) {
  const book = BOOKS.filter(book => {
    return book.id == bookId;
  })[0];


  const language = navigator.language;


  const transactionId = `TXN-${Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase()}-${language.substring(0, 2).toUpperCase()}`;

  const details = {
    id: bookId,
    type: "book",
    description: `PURCHASE OF BOOK (${book.title}) - ${book.description} ${quantity > 1 ? "[2 Copies]" : ''}`,
    title: book.title,
    price: book.price,
    date: new Date(),
    transactionId: transactionId,
    quantity: quantity,
  };

  const params = new URLSearchParams({
    type: "book",
    details: JSON.stringify(details)
  }).toString();

  const modal = document.getElementById('paymentModal');
  modal.style.display = 'flex';

  setTimeout(() => {
    window.location.href = `/html/main/payment.html?${params}`;
  }, 2000);
}

const FEATURED_BOOK = {
  title: "Guérir n'est pas joli",
  author: "Charlotte Casiraghi",
  description: `"I didn't write this book to be sold. I wrote it to survive."`,
  description2: `These pages were my secret. My breath between battles. My whispers in the dark. Now, I'm offering them to you. Not on Amazon. Not in bookstores. Just here. Just us.`,
  subtitle: "Healing isn't always beautiful.",
  cta: "GET YOUR COPY"
};

const BOOK_COLLECTION = [
  {
    id: 'book-5',
    title: "THE BOOK TITLE",
    author: "Author Name",
    downloads: "5000+ Downloads",
    formats: ["eBook", "Hardcopy"],
    price: "2.50",
    status: "Sold Out",
    description: "Get instant access to the story that's changing lives. Read on any device, anytime, begin your journey in just one click.",
    image: "/src/images/logo.jpg"
  },
  {
    id: 'book-6',
    title: "ANOTHER BOOK",
    author: "Another Author",
    downloads: "3000+ Downloads",
    formats: ["eBook", "Audio"],
    price: "1.80",
    status: "Available",
    description: "Another inspiring story that will change your perspective on healing and growth.",
    image: "/src/images/logo.jpg"
  }
];

// Render Main Book Page
function renderBookMain() {
  const mainSection = document.createElement('div');
  mainSection.id = 'book-main';
  mainSection.innerHTML = `
    <h1 class="book-title">${FEATURED_BOOK.title}</h1>
    <p class="book-subtitle">${FEATURED_BOOK.subtitle}</p>
    <div class="book-description">
    ${FEATURED_BOOK.description}
    <br/>
    ${FEATURED_BOOK.description2}
    </div>
    <a class="book-cta" href="#book-section">${FEATURED_BOOK.cta}</a>
  `;

  // Insert after the banner section
  const banner = document.getElementById('banner');
  banner.appendChild(mainSection);
}

// Render Book Collection
function renderBookCollection() {
  // Render book items
  const collectionContainer = document.getElementById('bookCollection');
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
      Description
      </p>
      <p class="description-text">
      ${book.description}
      </p>
      </div>
      <button class="add-to-cart btn">Add to Cart</button>
    </div>
  `).join('');

  // Add click handlers for Add to Cart buttons
  document.querySelectorAll('.book-item .add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const bookItem = e.target.closest('.book-item');
      const bookId = bookItem.dataset.id;
      const book = BOOK_COLLECTION.find(b => b.id === bookId);

      if (book) {
        addToCart(book);
        alert(`${book.title} added to cart!`);
      }
    });
  });
}

// Add to Cart Function
function addToCart(book) {
  let cart = JSON.parse(localStorage.getItem('carts')) || [];

  // Check if book already in cart
  const existingItem = cart.find(item => item.id === book.id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      quantity: 1
    });
  }

  localStorage.setItem('carts', JSON.stringify(cart));
}

// Initialize both sections
document.addEventListener('DOMContentLoaded', () => {
  /*renderBooks();*/
  renderBookMain();
  renderBookCollection();
});


