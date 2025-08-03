window.addEventListener("DOMContentLoaded", () => {
    function getCarts() {
        //cart data:
        try {
            const fetchedCarts = localStorage.getItem("carts");

            let output;
            if (fetchedCarts) {
                output = JSON.parse(fetchedCarts);
            } else {
                output = [];
            }
            return output;
        } catch (error) {
            console.error(`An Error occured while fetching your order cart history - ${error}`);

            return;
        }
    }

    const carts = getCarts();
    document.querySelectorAll("span.cart-count").forEach(count => {
        count.innerHTML = carts.length;
    });

    const cartContainer = document.querySelector("div.cart-container");

    function removeCart(id) {
        const bookId = id;
        let carts = getCarts();

        if (carts) {
            carts = carts.filter(book => book.id !== bookId);
            const output = JSON.stringify(carts);
            localStorage.setItem("carts", output);

            window.location.reload();
            console.log("Cart item removed!");
        } else {
            console.log("Cart item not found!");
        }
    }

    if (carts.length == 0) {
        cartContainer.style.display = "flex";

        cartContainer.innerHTML = `<p style="min-width:100%; text-align:center; font-size:16px; padding-block:10vh; font-family:PoppinsMed; color:gray;">No Orders Yet</p>`
    } else {

    carts.forEach(cart => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-div");
        cartDiv.dataset.id = cart.id;

        cartDiv.innerHTML = `
  <div class="upper">
  <img class="cart-image" src="${cart.image}" alt="${cart.title}'s Image"/>

    <div class="item-info">
      <h3>${cart.title}</h3>
      <p class="ebook">eBook · Read instantly on all devices</p>

      <div class="under">
      <p class="price">€${cart.price}</p>
      <button class="remove">Remove</button>
      </div>
    </div>
</div>

    <div class="item-controls">
     <div class="subtotal">
        <span>Quantity:</span>
        <span>${(cart.quantity)}</span>
      </div>

      <div class="subtotal">
        <span>Subtotal:</span>
        <span>€${(cart.price * cart.quantity)}</span>
      </div>

      <button class="checkout">Proceed to Checkout</button>
      <p class="under-btn-text">Secure Payment · Encrypted </p>
    </div>
        `

        const removeButton = cartDiv.querySelector("button.remove");
        const payButton = cartDiv.querySelector("button.checkout");

        payButton.addEventListener("click", (e) => {
            e.stopPropagation();
            const params = new URLSearchParams({
                type: "book", details: JSON.stringify(cart)
            });

            setTimeout(() => {
                window.location.href = `/html/main/Payment.html?${params}`
            }, 800);
        });

        removeButton.addEventListener("click", () => {
            const id = cartDiv.dataset.id;
            removeCart(id);

        })

        cartContainer.appendChild(cartDiv);
    });
    }
});