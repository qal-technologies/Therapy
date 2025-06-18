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
            const BUTTON =icon.tagName == "BUTTON";

           BUTTON ? active  ? [
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

// Initialize
document.addEventListener('DOMContentLoaded', renderBooks);