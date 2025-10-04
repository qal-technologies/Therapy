import { handleAuthStateChange } from './auth.js';
import { getCartItems, removeCartItem } from './database.js';
import handleAlert from './general.js';

async function renderCart(userId) {
    const cartContainer = document.querySelector("div.cart-container");
    if (!cartContainer) return;

    try {
        const carts = await getCartItems(userId);
        document.querySelectorAll("span.cart-count").forEach(count => {
            count.innerHTML = carts.length;
        });

        if (carts.length === 0) {
            cartContainer.style.display = "flex";
            cartContainer.innerHTML = `<p style="min-width:100%; text-align:center; font-size:16px; padding-block:10vh; font-family:PoppinsMed; color:gray;">Your cart is empty.</p>`;
        } else {
            cartContainer.innerHTML = ''; 
            carts.forEach(cart => {
                const cartDiv = document.createElement("div");
                cartDiv.classList.add("cart-div");
                cartDiv.dataset.id = cart.id; 

                cartDiv.innerHTML = `
                  <div class="upper">
                    <img class="cart-image" src="${cart.image}" alt="${cart.title}'s Image"/>
                    <div class="item-info">
                      <h3>${cart.title}</h3>
                      <p class="ebook">${cart.format} · Read instantly on all devices</p>
                      <div class="under">
                        <p class="price">€${cart.price}</p>
                        <button class="remove">Remove</button>
                      </div>
                    </div>
                  </div>
                  <div class="item-controls">
                    <div class="subtotal">
                      <span>Quantity:</span>
                      <span>${cart.quantity}</span>
                    </div>
                    <div class="subtotal">
                      <span>Subtotal:</span>
                      <span>€${(cart.price * cart.quantity).toFixed(2)}</span>
                    </div>
                    <button class="checkout">Proceed to Checkout</button>
                    <p class="under-btn-text">Secure Payment · Encrypted</p>
                  </div>`;

                cartContainer.appendChild(cartDiv);
            });
        }
    } catch (error) {
        console.error("Error rendering cart:", error);
        handleAlert("Could not load your cart. Please try again later.", "toast");
    }
}


function setupEventListeners(userId) {
    const cartContainer = document.querySelector("div.cart-container");

    cartContainer.addEventListener('click', async (e) => {
        const target = e.target;
        const cartDiv = target.closest('.cart-div');
        if (!cartDiv) return;

        const itemId = cartDiv.dataset.id;

        if (target.classList.contains('remove')) {
            try {
                await removeCartItem(userId, itemId);
                handleAlert("Item removed from cart.", "toast");
                renderCart(userId);
            } catch (error) {
                console.error("Error removing item:", error);
                handleAlert("Failed to remove item. Please try again.", "toast");
            }
        }

        if (target.classList.contains('checkout')) {
            // This part remains the same as it prepares for the payment page
            const carts = await getCartItems(userId);
            const cartItem = carts.find(item => item.id === itemId);
            if (cartItem) {
                const params = new URLSearchParams({
                    type: "book",
                    details: JSON.stringify(cartItem)
                });
                window.location.href = `/html/main/Payment.html?${params}`;
            }
        }
    });
}

window.addEventListener('load', () => {
    handleAuthStateChange((user) => {
        if (user) {
            renderCart(user.uid);
            setupEventListeners(user.uid);
        } else {
            handleAlert("Please log in to view your cart.", "toast");
            setTimeout(() => {
                window.location.replace("/html/regs/Signup.html");
            }, 1500);
        }
    });
});