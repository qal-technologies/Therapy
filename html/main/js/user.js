// Generate random user data
const userEmail = "user" + Math.floor(Math.random() * 1000) + "@example.com";
const userNames = ["John Doe", "Jane Smith", "Alex Johnson", "Emily Brown"];
const userName = userNames[Math.floor(Math.random() * userNames.length)];


// Create user object with validation
const userObj = {
    email: userEmail || "user123@gmail.com",
    name: userName || "Guest User",
};


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

// DOM Elements - cached for better performance
const domElements = {
    userEmail: document.getElementById('userEmail'),
    fullName: document.getElementById('full-name'),
    profileAvatar: document.getElementById('profileAvatar'),
    paymentsGrid: document.getElementById('paymentsGrid'),
    cartContainer: document.querySelector("div.cart-container"),
    modal: document.getElementById('payslipModal'),
    closeModal: document.getElementById('closeModal')
};


function initializePaymentData() {
    const defaultPayments = [
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
    ];

    try {
        const stored = localStorage.getItem("payments");
        if (!stored) {
            localStorage.setItem("payments", JSON.stringify(defaultPayments));
            return defaultPayments;
        }
        return JSON.parse(stored);
    } catch (e) {
        console.error("Error loading payments:", e);
        return defaultPayments;
    }
}

const payments = initializePaymentData();


// Initialize user profile
function initializeUserProfile() {
    if (!domElements.userEmail || !domElements.fullName || !domElements.profileAvatar) return;

    domElements.userEmail.textContent = userObj.email;
    domElements.fullName.textContent = userObj.name;

    const colors = ['var(--link)', 'var(--highlight)', '#7209b7', 'var(--mainText)', 'var(--accent)', '#4895ef'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    domElements.profileAvatar.textContent = userObj.name.charAt(0).toUpperCase();
    domElements.profileAvatar.style.backgroundColor = randomColor;
}

function initializeCartData() {
    const defaultCart = [
        {
            id: "01",
            type: "book",
            description: "something short",
            title: "Book 1",
            price: "2.00",
            date: new Date(),
            quantity: 2,
            transactionId: "TXN-" + Math.random().toString(36).substr(2, 8).toUpperCase()
        },
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
        },
    ];

    try {
        return defaultCart;
    } catch (e) {
        console.error("Error loading cart:", e);
        return defaultCart;
    }
}

//carts:
const carts = initializeCartData();

    // Update cart count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll("span.cart-count");
    cartCountElements.forEach(el => {
        el.textContent = carts.length;
    });
}

    / Render payment cards with better error handling
function renderPaymentCards() {
    if (!domElements.paymentsGrid) return;

    if (payments.length === 0) {
        domElements.paymentsGrid.innerHTML = `
            <p style="min-width:100%; text-align:center; font-size:16px; 
                      font-family:PoppinsSemi; color:gray;">
                No Payment Yet
            </p>`;
        return;
    }

    domElements.paymentsGrid.innerHTML = '';
    
    payments.forEach(payment => {
        try {
            const paymentCard = document.createElement('div');
            paymentCard.className = 'payment-card';

            let statusClass = '';
            if (payment.status === true) statusClass = 'status-completed';
            else if (payment.status === false) statusClass = 'status-failed';
            else statusClass = 'status-pending';

            paymentCard.innerHTML = `
                <div class="payment-header">
                    <span class="payment-code">${payment.id || 'N/A'}</span>
                    <span class="payment-status ${statusClass}">
                        ${(payment.statusName || 'Pending').toUpperCase()}
                    </span>
                </div>
                <div class="payment-type">${(payment.title || 'Untitled').toUpperCase()}</div>
                <div class="payment-details">
                    <div class="payment-detail">
                        <span class="detail-label">Date:</span>
                        <span class="detail-value">
                            ${payment.date ? new Date(payment.date).toLocaleDateString() : 'N/A'}
                        </span>
                    </div>
                    <div class="payment-detail">
                        <span class="detail-label">Amount:</span>
                        <span class="detail-value">
                            €${payment.price ? parseFloat(payment.price).toFixed(2) : '0.00'}
                        </span>
                    </div>
                </div>
            `;

            paymentCard.addEventListener('click', () => handlePaymentClick(payment));
            domElements.paymentsGrid.appendChild(paymentCard);
        } catch (e) {
            console.error("Error rendering payment card:", e);
        }
    });
}

function handlePaymentClick(payment) {
    if (payment.status === true) {
        showPayslip(payment);
    } else {
        const params = new URLSearchParams({
            type: "pending",
            details: JSON.stringify(payment)
        }).toString();

        setTimeout(() => {
            window.location.href = `/html/main/payment.html?${params}`;
        }, 1000);
    }
}

    // Show payslip with validation
function showPayslip(payment) {
    if (!domElements.modal) return;

    const symbol = getCurrencySymbol(payment.currency || 'EUR');
    
    document.getElementById('receiptId').textContent = payment.id || 'N/A';
    document.getElementById('receiptType').textContent = payment.title || 'Untitled';
    document.getElementById('receiptAmount').textContent = 
        `€${payment.price ? parseFloat(payment.price).toFixed(2) : '0.00'}`;
    document.getElementById('receiptMethod').textContent = payment.method || 'Unknown';
    document.getElementById('receiptCurrency').textContent = payment.currency || 'EUR';
    document.getElementById('receiptConverted').textContent = 
        `${symbol}${payment.converted ? parseFloat(payment.converted).toFixed(2) : '0.00'}`;
    document.getElementById('receiptStatus').textContent = 
        payment.statusName ? 
        payment.statusName.charAt(0).toUpperCase() + payment.statusName.slice(1) : 
        'Pending';
    document.getElementById('receiptDescription').textContent = payment.description || 'No description';
    document.getElementById('receiptDate').textContent = 
        'Date: ' + (payment.date ? new Date(payment.date).toLocaleDateString() : 'N/A');

    domElements.modal.style.display = 'flex';
}

// Render cart items with improved structure
function renderCartItems() {
    if (!domElements.cartContainer) return;

    if (carts.length === 0) {
        domElements.cartContainer.innerHTML = `
            <p style="min-width:100%; text-align:center; 
                      font-size:16px; font-family:PoppinsSemi; color:gray;">
                No Items in Cart
            </p>`;
        return;
    }

    domElements.cartContainer.innerHTML = '';

    carts.forEach(cart => {
        try {
            const cartDiv = document.createElement("div");
            cartDiv.classList.add("cart-item");

            const price = (parseFloat(cart.price) || 0) * (cart.quantity || 1);
            
            cartDiv.innerHTML = `
                <div class="upper item-info">
                    <h3 class="cart-title">${(cart.title || 'Untitled').toUpperCase()}</h3>
                    <p class="item-format">eBook · Read instantly on all devices</p>
                    <p class="item-price">${cart.price || '0.00'}</p>
                </div>

                <div class="cart-summary">
                    <div class="subtotal quantity">
                        <span>Quantity:</span>
                        <span class="amount quantity">${cart.quantity || 1}</span>
                    </div>
                    
                    <div class="subtotal">
                        <span>Subtotal:</span>
                        <span class="amount">€ ${price.toFixed(2)}</span>
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
            `;


        const payButton = cartDiv.querySelector(".checkout-label");
            if (payButton) {
                payButton.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const params = new URLSearchParams({
                        type: "book", 
                        details: JSON.stringify(cart)
                    });

                    setTimeout(() => {
                        window.location.href = `/html/main/Payment.html?${params}`;
                    }, 800);
                });
            }

            domElements.cartContainer.appendChild(cartDiv);
        } catch (e) {
            console.error("Error rendering cart item:", e);
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeUserProfile();
    updateCartCount();
    renderPaymentCards();
    renderCartItems();

    if (domElements.closeModal) {
        domElements.closeModal.addEventListener('click', () => {
            if (domElements.modal) {
                domElements.modal.style.display = 'none';
            }
        });
    }

    window.addEventListener('click', (e) => {
        if (domElements.modal && e.target === domElements.modal) {
            domElements.modal.style.display = 'none';
        }
    });
});