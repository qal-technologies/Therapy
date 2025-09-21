import handleAlert from "/js/general.js";
import { handleAuthStateChange, getCurrentUser } from './auth.js';
import { addToCart as addToCartInDb, getCartItems } from './database.js';

const BOOK_COLLECTION = [
  {
    id: 'book-1',
    title: "COMPAGNON FÉMININ",
    price: "25.00",
    formats: ["eBook", "Hardcopy"],
    status: "Sold Out",
    description: `This ebook is limited to just 5,000 readers...`,
    image: "/src/images/book1.jpg",
    quantity: 1,
  },
  {
    id: 'book-2',
    title: "THE ELEGANT STORY",
    price: "25.00",
    formats: ["eBook", "Hardcopy"],
    status: "Sold Out",
    description: "Another inspiring story...",
    image: "/src/images/book2.jpg",
    quantity: 1
  }
];

function showDetailsModal(e) {
    const modal = document.querySelector("#details-div");
    if (!modal) return;

    modal.style.display = "block";
    const bookId = e.target.closest(".sub-preview").dataset.id;
    const book = BOOK_COLLECTION.find(b => b.id == bookId);
    renderBookCollection(book);
}

function removeDetailsModal() {
  const modal = document.querySelector("#details-div");
  if (modal) modal.style.display = "none";
}

function handleQuantityChange(e) {
  const parentId = e.target.closest('.qty-main-div').dataset.id;
  const book = BOOK_COLLECTION.find(b => b.id === parentId);
  if (!book) return;

  if (e.target.classList.contains('add')) {
    book.quantity++;
  } else if (e.target.classList.contains('minus')) {
    book.quantity = Math.max(1, book.quantity - 1);
  }

  const qtyText = e.target.closest('.qty-main-div').querySelector('.qty-text');
  if (qtyText) qtyText.textContent = book.quantity;
}

function handleCartUpdate(count) {
  const cartCount = document.querySelector(".details-top span.cart-count");
  if(cartCount) cartCount.textContent = count;
}

function renderBookCollection(book) {
  const collectionContainer = document.getElementById('bookCollection');
  if (!collectionContainer) return;

  collectionContainer.innerHTML = `
    <div class="book-item" data-id="${book.id}">
      <img src="${book.image}" alt="${book.title}">
      <div class="book-info">
        <h3 class="book-title">${book.title.toUpperCase()}</h3>
        <p class="book-author">Charlotte Casiraghi</p>
        <div class="book-format">
          <p style="font-weight:bolder; min-width:100%; text-align:left; margin-top:10px; font-size:18px;">Select Book Format</p>
          <div class="format-div">
            <input type="radio" name="format" id="eBook" value="eBook" checked>
            <div class="side"><p class="format-name">eBook</p><p class="format-price">&euro; ${book.price}</p></div>
          </div>
          <div class="format-div last">
            <input type="radio" name="format" id="Hardcopy" value="Hardcopy" ${book.status.toLowerCase() === "sold out" ? "disabled" : ""}>
            <div class="side"><p class="format-name">Hardcopy</p><p class="format-status ${book.status.toLowerCase()}">${book.status}</p></div>
          </div>
        </div>
      </div>
      <div class="book-description-div">
        <p class="description-title">eBook Description</p>
        <p class="description-text">${book.description}</p>
        <div class="quantity">
          <p class="quantity-text">Select Number of Copies</p>
          <div class="qty-main-div" data-id="${book.id}">
            <span class="qty-arrow minus">-</span>
            <p class="qty-text">${book.quantity}</p>
            <span class="qty-arrow add">+</span>
          </div>
        </div>
      </div>
      <button class="add-to-cart btn">Add to Cart</button>
    </div>`;

  document.querySelectorAll('.qty-arrow').forEach(btn => btn.addEventListener('click', handleQuantityChange));
  document.querySelector('.add-to-cart').addEventListener('click', handleAddToCartClick);
}

async function handleAddToCartClick(e) {
    const user = getCurrentUser();
    if (!user) {
        handleAlert("Please login or register to add items to your cart.", "toast");
        setTimeout(() => window.location.href = "/html/regs/Signup.html", 2000);
        return;
    }

    const bookItem = e.target.closest('.book-item');
    const bookId = bookItem.dataset.id;
    const book = BOOK_COLLECTION.find(b => b.id === bookId);
    if (!book) return;

    const selectedFormat = document.querySelector('input[name="format"]:checked');
    if (!selectedFormat) {
        handleAlert('Please select a format.', "toast");
        return;
    }

    const itemData = {
        bookId: book.id,
        title: book.title,
        price: book.price,
        image: book.image,
        quantity: book.quantity,
        format: selectedFormat.value,
    };

    const button = e.currentTarget;
    button.disabled = true;
    button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;

    try {
        await addToCartInDb(user.uid, itemData);
        handleAlert("Added to cart!", "toast");
        const cartItems = await getCartItems(user.uid);
        handleCartUpdate(cartItems.length);
        button.disabled = false;
        button.innerHTML = 'Add to Cart';
    } catch (error) {
        console.error("Error adding to cart:", error);
        handleAlert("Failed to add item. Please try again.", "toast");
        button.disabled = false;
        button.innerHTML = 'Add to Cart';
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const bookButtons = document.querySelectorAll("#preview button.get-copy");
    bookButtons.forEach(btn => btn.addEventListener("click", showDetailsModal));

    const closeButton = document.querySelector("#details-div button.close-details");
    closeButton?.addEventListener("click", removeDetailsModal);

    handleAuthStateChange(async (user) => {
        const cartCount = document.querySelector(".details-top span.cart-count");
        if (user && cartCount) {
            const items = await getCartItems(user.uid);
            cartCount.textContent = items.length;
        } else if (cartCount) {
            cartCount.textContent = 0;
        }
    });
});
