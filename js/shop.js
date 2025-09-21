import handleAlert from "/js/general.js";
import { handleAuthStateChange, getCurrentUser } from './auth.js';
import { addToCart as addToCartInDb, getCartItems } from './database.js';

// ... (audio and book data remain the same) ...

// --- REFACTORED CART LOGIC ---

async function handleAddToCartClick(e) {
    const user = getCurrentUser();
    if (!user) {
        handleAlert("Please login or register to add items to your cart.", "toast");
        setTimeout(() => {
            window.location.href = "/html/regs/Signup.html";
        }, 2000);
        return;
    }

    const bookItem = e.target.closest('.book-item');
    const bookId = bookItem.dataset.id;
    const book = BOOK_COLLECTION.find(b => b.id === bookId);

    if (book) {
        const selectedFormat = document.querySelector(`.book-item[data-id="${book.id}"] input[type="radio"]:checked`);
        if (!selectedFormat && book.formats.length > 0) {
            handleAlert('Please select a format before adding to cart', "toast");
            return;
        }

        const itemData = {
            id: book.id,
            title: book.title,
            author: "Charlotte Casiraghi",
            price: book.price,
            image: book.image,
            quantity: book.quantity,
            description: book.description,
            format: selectedFormat?.name || book.formats[0],
            addedAt: new Date(),
        };
        
        const button = e.currentTarget;
        button.disabled = true;
        button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;

        try {
            await addToCartInDb(user.uid, itemData);
            handleAlert(`${book.quantity} ${book.quantity > 1 ? 'copies' : 'copy'} of "${book.title}" added to cart!`, "toast");

            // Update cart count in UI
            const cartItems = await getCartItems(user.uid);
            handleCartUpdate(cartItems.length);

            // Optionally redirect
            setTimeout(() => {
                window.location.href = '/html/main/cart.html';
            }, 2000);

        } catch (error) {
            console.error("Error adding to cart:", error);
            handleAlert("Failed to add item to cart. Please try again.", "toast");
            button.disabled = false;
            button.innerHTML = 'Add to Cart';
        }
    }
}

function renderBookCollection(book) {
    // ... (this function's content is mostly the same)
    // The key change is the event listener at the end:

    // ... (innerHTML generation) ...

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCartClick);
    });

    // ... (other listeners like quantity change) ...
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // ... (existing DOMContentLoaded logic) ...

    // Update cart count on page load if user is logged in
    handleAuthStateChange(async (user) => {
        if (user) {
            const cartItems = await getCartItems(user.uid);
            handleCartUpdate(cartItems.length);
        }
    });
});

// Make sure to replace the old event listener attachment in renderBookCollection
// and the old addToCart function with the new handleAddToCartClick logic.
// The rest of the file (showDetailsModal, handleQuantityChange, etc.) can be adjusted
// to remove direct localStorage access and rely on the new auth-based flow.
