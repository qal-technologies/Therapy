window.addEventListener("DOMContentLoaded", () => {
    function getCarts() {
        //cart data:
        const demoCarts = [
            {
                id: "01",
                type: "book",
                description: "something short",
                title: "Book 1",
                price: "2.00",
                date: new Date(),
                quantity: 2,
                transactionId: "TXN-622134WER-FR"
            },
            {
                id: "02",
                type: "book",
                description: "something about the book or author",
                title: "Book 2",
                price: "9.40",
                date: new Date(),
                quantity: 1,
                transactionId: "TXN-1998255-ES"
            },
            {
                id: "03",
                type: "book",
                description: "all about this book here",
                title: "Book 3",
                price: "3.80",
                date: new Date(),
                quantity: 3,
                transactionId: "TXN-1256789-GR"
            }, {
                id: "04",
                type: "book",
                description: "book description",
                title: "Book 4",
                price: "6.99",
                date: new Date(),
                quantity: 1,
                transactionId: "TXN-0988765-EN"
            }
        ];

        try {
            const fetchedCarts = localStorage.getItem("carts");

            let output;
            if (fetchedCarts) {
                output = JSON.parse(fetchedCarts);
            } else {
                output = demoCarts;

                // const saved = JSON.stringify(demoCarts)
                // localStorage.setItem("cart", saved);

            }
            return output;
        } catch (error) {
            console.error(`An Error occured while fetching your order cart history - ${error}`);

            return;
        }
    }

    const carts = getCarts();
    const cartCount = document.querySelectorAll("span.cart-count").forEach(count => {
        count.innerHTML = carts.length;
    });

    const cartContainer = document.querySelector("div.cart-container");


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

        if (carts.length < 1) {
            cartContainer.style.display = "flex";

            cartContainer.innerHTML = `<p style="min-width:100%; text-align:center; font-size:16px; font-family:PoppinsSemi; color:gray;">No Orders Yet</p>`
        } else {
            cartContainer.appendChild(cartDiv)
        }
    });
});