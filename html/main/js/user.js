// Generate random user data
const userEmail = "user" + Math.floor(Math.random() * 1000) + "@example.com";
const userName = "John Doe";

//Create user object:
const userObj = {
    email: userEmail,
    name: userName,
}

// Payslip modal functionality
const modal = document.getElementById('payslipModal');

function getCurrencySymbol(currencyCode) {
    const symbols = {
        EUR: "€",
        USD: "$",
        CAD: "$",
        AUD: "$",
        GBP: "£",
        CHF: "₣",
    };
    return symbols[currencyCode] || currencyCode;
}

const storedPayments = [
    {
        id: "TXN-1239796-GR",
        paymentType: "session",
        title: 'Inner Circle',
        price: "200.00",
        currency: "AUD",
        converted: "189",
        method: "creditCard",
        status: true,
        statusName: "Completed",
        senderName: "Paschal Ngaoka",
        date: new Date(2024, 5, 4),
        description: "Premium healing experience",
        index: 3,
    }, {
        id: "TXN-149656-GR",
        paymentType: "book",
        title: 'Best Therapy Book',
        price: '550.00',
        currency: "CHF",
        converted: "790",
        method: "bank",
        status: false,
        statusName: "Failed",
        senderName: "John Doe",
        date: new Date(2025, 4, 10),
        description: "Best relief book you'll ever read",
        index: 5,
    }, {
        id: "TXN-123456-EN",
        paymentType: "session",
        title: 'Virtual Session',
        price: '800.00',
        currency: "GBP",
        converted: "1200.00",
        method: "paypal",
        status: null,
        statusName: "Pending",
        senderName: "Lucy Jay",
        description: '1-hour virtual healing session',
        date: new Date(2025, 2, 1),
        index: 5
    }, {
        id: 'TXN-03964283-ES',
        paymentType: 'session',
        title: 'In-Person Session',
        price: '1600.00',
        currency: "CHF",
        converted: "2400",
        method: "paypal",
        status: true,
        statusName: 'Completed',
        senderName: "Johnson Alfred",
        description: '2-hour in-person session in Monaco',
        date: new Date(2023, 6, 2),
        index: 5
    },
]

localStorage.setItem("payments", JSON.stringify(storedPayments));


let payments;
//Get Payment data
const gotten = localStorage.getItem("payments");
payments = JSON.parse(gotten) || {};


if (userObj && payments) {
    // Set user profile:
    document.getElementById('userEmail').textContent = userObj.email || "user123@gmail.com";
    document.getElementById('full-name').textContent = userObj.name;

    //get all necessary parameters:
    const firstLetter = userObj.name.charAt(0).toUpperCase();
    const colors = ['var(--link)', 'var(--highlight)', '#7209b7', 'var(--mainText)', 'var(--accent)', '#4895ef'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];


    // Generate and set profile avatar
    const profileAvatar = document.getElementById('profileAvatar');
    profileAvatar.textContent = firstLetter;
    profileAvatar.style.backgroundColor = randomColor;

    //cart data:
    const carts = [
        {
            id: "01",
            type: "book",
            description: "something short",
            title: "Book 1",
            price: "2.00",
            date: new Date(2025, 5, 15),
            quantity: 2,
            transactionId: "TXN-622134WER-FR"
        },
        {
            id: "02",
            type: "book",
            description: "something about the book or author",
            title: "Book 2",
            price: "9.40",
            date: new Date(2025, 4, 10),
            quantity: 1,
            transactionId: "TXN-1998255-ES"
        },
        {
            id: "03",
            type: "book",
            description: "all about this book here",
            title: "Book 3",
            price: "3.80",
            date: new Date(2023, 5, 15),
            quantity: 3,
            transactionId: "TXN-1256789-GR"
        }, {
            id: "04",
            type: "book",
            description: "book description",
            title: "Book 4",
            price: "6.99",
            date: new Date(2023, 5, 15),
            quantity: 1,
            transactionId: "TXN-0988765-EN"
        }
    ];

    const cartCount = document.querySelectorAll("span.cart-count").forEach(count => {
        count.innerHTML = carts.length;
    });

    // Render payment cards:
    const paymentsGrid = document.getElementById('paymentsGrid');

    payments.forEach(payment => {
        const paymentCard = document.createElement('div');
        paymentCard.className = 'payment-card';

        let statusClass = '';
        if (payment.status === true) statusClass = 'status-completed';
        else if (payment.status === false) statusClass = 'status-pending';
        else statusClass = 'status-failed';

        paymentCard.innerHTML = `
                <div class="payment-header">
                    <span class="payment-code">${payment.id}</span>
                    <span class="payment-status ${statusClass}">${payment.statusName.toUpperCase()}</span>
                </div>
                <div class="payment-type">${payment.title.toUpperCase()}</div>
                <div class="payment-details">
                    <div class="payment-detail">
                        <span class="detail-label">Date:</span>
                        <span class="detail-value">${new Date(payment.date).toLocaleDateString()}</span>
                    </div>
                    <div class="payment-detail">
                        <span class="detail-label">Amount:</span>
                        <span class="detail-value">
                        &euro; ${parseFloat(payment.price).toFixed(2)}</span>
                    </div>
                </div>
            `;

        paymentCard.addEventListener('click', () => {
            if (payment.status === true) {
                showPayslip(payment);
            } else {
                const params = new URLSearchParams({ type: "pending", details: JSON.stringify(payment) }).toString();

                setTimeout(() => {
                    window.location.href = `/html/main/payment.html?${params}`;
                }, 1000)
            }
        });

        if (payments.length < 1) {
            paymentsGrid.style.display = "flex";

            paymentsGrid.innerHTML = `<p style="min-width:100%; text-align:center; font-size:16px; font-family:PoppinsSemi; color:gray;">No Payment Yet</p>`
        } else {
            paymentsGrid.appendChild(paymentCard)
        }
    });


    const closeModal = document.getElementById('closeModal');

    function showPayslip(payment) {
        const icon = document.getElementById('icon');
        icon.classList.add(`${payment.statusName.toLowerCase()}`);
        icon.innerHTML += payment.statusName.toUpperCase();
        const symbol = getCurrencySymbol(payment.currency)

        document.getElementById('receiptId').textContent = payment.id;
        document.getElementById('receiptType').textContent = payment.title;
        document.getElementById('receiptAmount').textContent = `€${parseFloat(payment.price).toFixed(2)}`;
        document.getElementById('receiptMethod').textContent = payment.method;
        document.getElementById('receiptCurrency').textContent = payment.currency;
        document.getElementById('receiptConverted').textContent = `${symbol}${parseFloat(payment.converted).toFixed(2)}`;
        document.getElementById('receiptStatus').textContent = payment.statusName.charAt(0).toUpperCase() + payment.statusName.slice(1);
        document.getElementById('receiptDescription').textContent = payment.description;
        document.getElementById('receiptDate').textContent = 'Date: ' + new Date(payment.date).toLocaleDateString();

        modal.style.display = 'flex';
    }


    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const cartContainer = document.querySelector("div.cart-container");

    carts.forEach(cart => {
const price = cart.price * cart.quantity;
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");


        cartDiv.innerHTML = `
	<div class="upper item-info">
		<h3 class="cart-title">${cart.title.toUpperCase()}</h3>
		<p class="item-format">eBook · Read instantly on all devices</p>
        <p class="item-price">${cart.price}</p>

	</div>

	 <div class="cart-summary">
<div class="subtotal quantity">
        <span>Quantity:</span>
        <span class="amount quantity">${cart.quantity}</span>
      </div>
      
      <div class="subtotal">
        <span>Subtotal:</span>
        <span class="amount">€ ${price}</span>
      </div>
      
      <div class="checkout-controls">
        <label class="checkbox-container">
          <input type="checkbox" checked>
          <span class="checkmark"></span>
          <span class="checkout-label">Proceed to Checkout</span>
        </label>
        <p class="secure-payment">Secure payment · Encrypted</p>
      </div>
    </div>

<div class="testimonial">
      <p class="testimonial-title">Why readers love it ★★★★★★</p>
      <p class="testimonial-text">"Profound and life-changing" - Marie, Paris</p>
    </div>
	</div>
        `



        const payButton = cartDiv.querySelector("span.checkout-label");

        
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

            cartContainer.innerHTML = `<p style="min-width:100%; text-align:center; font-size:16px; font-family:PoppinsSemi; color:gray;">No Cart Yet</p>`
        } else {
            cartContainer.appendChild(cartDiv)
        }
    });


}


        
        <button class="remove-btn">Remove</button>
      </div>
    </div>
    
    <div class="cart-summary">
      <div class="subtotal">
        <span>Subtotal:</span>
        <span class="amount">€20</span>
      </div>
      
      <div class="checkout-controls">
        <label class="checkbox-container">
          <input type="checkbox" checked>
          <span class="checkmark"></span>
          <span class="checkout-label">Proceed to Checkout</span>
        </label>
        <p class="secure-payment">Secure payment · Encrypted</p>
      </div>
    </div>
    
    <div class="testimonial">
      <p class="testimonial-title">Why readers love it ★★★★★★</p>
      <p class="testimonial-text">"Profound and life-changing" - Marie, Paris</p>
    </div>

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});