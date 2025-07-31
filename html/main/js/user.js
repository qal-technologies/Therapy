// DOM Elements
const elements = {
  userEmail: document.getElementById('userEmail'),
  fullName: document.getElementById('full-name'),
  profileAvatar: document.getElementById('profileAvatar'),
  paymentsGrid: document.getElementById('paymentsGrid'),
  cartContainer: document.querySelector(".cart-container"),
  modal: document.getElementById('payslipModal'),
  closeModal: document.getElementById('closeModal'),
  cartCounts: document.querySelectorAll(".cart-count")
};

// Generate random user
function createRandomUser() {
  const emails = ["user1@example.com", "user2@example.com", "user3@example.com"];
  const names = ["John Doe", "Jane Smith", "Alex Johnson"];
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF'];
  
  return {
    email: emails[Math.floor(Math.random() * emails.length)],
    name: names[Math.floor(Math.random() * names.length)],
    color: colors[Math.floor(Math.random() * colors.length)]
  };
}

// Initialize user profile
function initUserProfile() {
  const user = createRandomUser();
  
  if (elements.userEmail) elements.userEmail.textContent = user.email;
  if (elements.fullName) elements.fullName.textContent = user.name;
  if (elements.profileAvatar) {
    elements.profileAvatar.textContent = user.name.charAt(0);
    elements.profileAvatar.style.backgroundColor = user.color;
  }
}

// Sample payment data
const samplePayments = [
  {
    id: "TXN-123456",
    type: "session",
    title: "Healing Session",
    price: 100.00,
    status: "Completed",
    date: "2023-05-15"
  },
  {
    id: "TXN-789012",
    type: "book",
    title: "Healing Book",
    price: 25.00,
    status: "Completed", 
    date: "2023-04-10"
  }
];

// Sample cart data
const sampleCart = [
  {
    id: "BOOK-001",
    title: "Healing Guide",
    price: 19.99,
    quantity: 1
  },
  {
    id: "BOOK-002", 
    title: "Mindfulness Journal",
    price: 12.50,
    quantity: 2
  }
];

// Load or initialize data
function loadData(key, sampleData) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : sampleData;
  } catch (e) {
    console.error(`Error loading ${key}:`, e);
    return sampleData;
  }
}

// Save data
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Render payments
function renderPayments() {
  if (!elements.paymentsGrid) return;
  
  const payments = loadData("payments", samplePayments);
  
  if (payments.length === 0) {
    elements.paymentsGrid.innerHTML = `<p class="empty">No payments yet</p>`;
    return;
  }

  elements.paymentsGrid.innerHTML = payments.map(payment => `
    <div class="payment-card" data-id="${payment.id}">
      <div class="payment-header">
        <span>${payment.id}</span>
        <span class="status ${payment.status.toLowerCase()}">${payment.status}</span>
      </div>
      <div class="payment-title">${payment.title}</div>
      <div class="payment-details">
        <div>
          <span>Date:</span>
          <span>${payment.date}</span>
        </div>
        <div>
          <span>Amount:</span>
          <span>€${payment.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Add click handlers
  document.querySelectorAll('.payment-card').forEach(card => {
    card.addEventListener('click', () => {
      const paymentId = card.dataset.id;
      const payment = payments.find(p => p.id === paymentId);
      if (payment) showPaymentDetails(payment);
    });
  });
}

// Show payment details
function showPaymentDetails(payment) {
  if (!elements.modal) return;
  
  document.getElementById('receiptId').textContent = payment.id;
  document.getElementById('receiptType').textContent = payment.title;
  document.getElementById('receiptAmount').textContent = `€${payment.price.toFixed(2)}`;
  document.getElementById('receiptDate').textContent = payment.date;
  document.getElementById('receiptStatus').textContent = payment.status;
  
  elements.modal.style.display = 'flex';
}

// Render cart
function renderCart() {
  if (!elements.cartContainer) return;
  
  const cart = loadData("cart", sampleCart);
  updateCartCount(cart);

  if (cart.length === 0) {
    elements.cartContainer.innerHTML = `<p class="empty">Your cart is empty</p>`;
    return;
  }

  elements.cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="item-info">
        <h3>${item.title}</h3>
        <p>eBook · Instant download</p>
        <p>€${item.price.toFixed(2)}</p>
      </div>
      
      <div class="item-controls">
        <div class="quantity">
          <button class="minus">-</button>
          <span>${item.quantity}</span>
          <button class="plus">+</button>
        </div>
        
        <div class="subtotal">
          <span>Subtotal:</span>
          <span>€${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        
        <button class="remove">Remove</button>
        <button class="checkout">Checkout</button>
      </div>
      
      <div class="testimonial">
        <p>★★★★★ "Life-changing!" - Marie</p>
      </div>
    </div>
  `).join('');

  // Add cart event handlers
  document.querySelectorAll('.cart-item').forEach(item => {
    const itemId = item.dataset.id;
    
    // Quantity controls
    item.querySelector('.minus').addEventListener('click', () => {
      updateCartItem(itemId, -1);
    });
    
    item.querySelector('.plus').addEventListener('click', () => {
      updateCartItem(itemId, 1);
    });
    
    // Remove button
    item.querySelector('.remove').addEventListener('click', () => {
      removeCartItem(itemId);
    });
    
    // Checkout button
    item.querySelector('.checkout').addEventListener('click', () => {
      checkoutItem(itemId);
    });
  });
}

// Update cart count
function updateCartCount(cart) {
  const count = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  elements.cartCounts.forEach(el => el.textContent = count);
}

// Update cart item quantity
function updateCartItem(itemId, change) {
  const cart = loadData("cart", sampleCart);
  const item = cart.find(i => i.id === itemId);
  
  if (item) {
    item.quantity += change;
    if (item.quantity < 1) item.quantity = 1;
    saveData("cart", cart);
    renderCart();
  }
}

// Remove item from cart
function removeCartItem(itemId) {
  const cart = loadData("cart", sampleCart).filter(i => i.id !== itemId);
  saveData("cart", cart);
  renderCart();
}

// Checkout item
function checkoutItem(itemId) {
  const cart = loadData("cart", sampleCart);
  const item = cart.find(i => i.id === itemId);
  
  if (item) {
    alert(`Proceeding to checkout for: ${item.title}`);
    // In a real app, redirect to checkout page
  }
}

// Initialize app
function initApp() {
  initUserProfile();
  renderPayments();
  renderCart();
  
  // Close modal
  if (elements.closeModal) {
    elements.closeModal.addEventListener('click', () => {
      if (elements.modal) elements.modal.style.display = 'none';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === elements.modal) {
      elements.modal.style.display = 'none';
    }
  });
}

// Start the app
document.addEventListener('DOMContentLoaded', initApp);