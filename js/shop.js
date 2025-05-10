// Global State Management (localStorage)
const State = {
    get paidFeatures() {
        return JSON.parse(localStorage.getItem('paidFeatures')) || [];
    },
    set paidFeatures(items) {
        localStorage.setItem('paidFeatures', JSON.stringify(items));
    }
};

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
      <div class="book-info">
        <svg class="favorite-btn" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <div class="upper">
            <h3>${book.title}</h3>
            <h4>&euro; ${book.price}</h4>
        </div>
        <p>${book.description}</p>
      </div>
    </div>
  `).join('');

    // Add click handlers
    document.querySelectorAll('.book-image').forEach(img => {
        img.addEventListener('click', handleBookClick);
    });
}

// Handle Book Click
function handleBookClick(e) {
    const bookId = e.target.id;
    const hasAccess = State.paidFeatures.includes(bookId);

    console.log(bookId);
    if (!hasAccess) {
        showPaymentModal(bookId);
        return;
    }

    // Open book reader
    window.location.href = `/html/main/read.html?id=${bookId}`;
}

// Show Payment Modal
function showPaymentModal(bookId) {
    const book = BOOKS.filter(book => {
        return book.id == bookId;
    })[0];

    const details = {
        id: bookId,
        type: "pdf",
        description: book.description,
        title: book.title,
        price: book.price,
        date: new Date().toLocaleDateString()
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