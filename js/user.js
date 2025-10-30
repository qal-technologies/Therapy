import { handleAuthStateChange, logout } from './auth.js';
import { getUserData, getUserPayments, getCartItems } from './database.js';
import handleAlert from './general.js';


// --- INITIALIZATION ---
window.addEventListener('load', () => {
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


function renderUserProfile(user, payments, cartNumber) {
  if (!user) return;

  // Set user profile details
  document.getElementById('userEmail').textContent = user.details.email || "";
  document.getElementById('full-name').textContent = `${user.details.firstName} ${user.details.lastName}`;

  const firstLetter = (user.details.firstName || 'U').charAt(0).toUpperCase();
  document.title = `${user.details.firstName} | A Space to Heal`;

  const profileAvatar = document.getElementById('profileAvatar');
  profileAvatar.textContent = firstLetter;
  profileAvatar.style.backgroundColor = 'var(--link)';

  //for count:
  const cartCount = document.querySelectorAll("span.cart-count")?.forEach(count => {
    count.innerHTML = cartNumber;
  });



  // Render payment cards
  const paymentsGrid = document.getElementById('paymentsGrid');
  if (payments && payments.length > 0) {
    paymentsGrid.innerHTML = '';

    payments.sort((a, b) => {
      const dateA = a.date?.seconds ? a.date.seconds * 1000 : new Date(a.date).getTime();
      const dateB = b.date?.seconds ? b.date.seconds * 1000 : new Date(b.date).getTime();
      return dateB - dateA;
    });


    payments.forEach(payment => {
      const paymentCard = document.createElement('div');
      paymentCard.className = 'payment-card';

      let statusClass = '';
      if (payment.status === true) statusClass = 'status-completed';
      else if (payment.status === false) statusClass = 'status-failed';
      else statusClass = 'status-pending';

      let statusName = '';
      if (payment.status === true) statusName = 'completed';
      else if (payment.status === false) statusClass = 'failed';
      else statusClass = 'pending';



      const optionsDate = {
        month: "long",
        day: "numeric",
        year: "numeric",
      };

      const optionsTime = {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      };

      let jsDate;
      if (payment.date && payment.date.seconds) {
        jsDate = new Date(payment.date.seconds * 1000);
      } else {
        jsDate = new Date(payment.date);
      }

      const paymentDate = jsDate.toLocaleString("en-US", optionsDate);
      const paymentTime = jsDate.toLocaleString("en-US", optionsTime);

      paymentCard.innerHTML = `
              <div class="payment-header">
                <div class="header-upper">
                  <div class="indicator-circle ${statusClass}"></div>
                  <span class="payment-status ${statusClass}">${statusName.toUpperCase()}</span>
                </div>
                <div class="header-lower">
                  <div class="payment-type">${payment.title.toUpperCase()}</div>
                  <span class="payment-code">Transaction ID: ${payment.id}</span>
                </div>
              </div>

              <div class="payment-details">
                  <div class="payment-detail">
                      <span class="detail-label">Date:</span>
                      <span class="detail-value">${paymentDate}</span>
                  </div>
                  <div class="payment-detail">
                      <span class="detail-label">Time:</span>
                      <span class="detail-value">${paymentTime}</span>
                  </div>
                  <div class="payment-detail">
                      <span class="detail-label">Amount:</span>
                      <span class="detail-value">&euro;${parseFloat(payment.price).toFixed(2)}</span>
                  </div>
              </div>
            `;

      paymentCard.addEventListener('click', () => {
        if (payment.status === true) {
          showPayslip(payment);
        } else {
          const params = new URLSearchParams({
            type: "pending",
            details: JSON.stringify(payment)
          }).toString();
          window.location.href = `/html/main/Payment.html?${params}`;
        }
      });
      paymentsGrid.appendChild(paymentCard);
    });
  } else {
    paymentsGrid.innerHTML = `
        <div class="no-payments-message">
          <p>No payment history yet.</p>
          <span>When you make a payment, it will appear here.</span>
        </div>`;
    paymentsGrid.style.justifyContent = "center";
  }
}

function showPayslip(payment) {
  const icon = document.getElementById('icon');

  icon.classList.add(`completed`);
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-circle-fill"
								viewBox="0 0 16 16">
								<path
									d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
							</svg> COMPLETED`;
  const symbol = getCurrencySymbol(payment.currency);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const paymentDate = payment.date && payment.date.seconds ?
    new Date(payment.date.seconds * 1000).toLocaleString("en-US", options) :
    payment.date.toLocaleString();

  document.getElementById('receiptId').textContent = payment.id;
  document.getElementById('receiptType').textContent = payment.title;
  document.getElementById('receiptAmount').textContent = `€${parseFloat(payment.price).toFixed(2)}`;
  document.getElementById('receiptMethod').textContent = payment.method;
  document.getElementById('receiptCurrency').textContent = payment.currency;
  document.getElementById('receiptConverted').textContent = `${symbol}${parseFloat(payment.converted).toFixed(2)}`;
  document.getElementById('receiptStatus').textContent = 'Completed';
  document.getElementById('receiptDescription').textContent = payment.description;
  document.getElementById('receiptDate').textContent = 'Date: ' + paymentDate;

  modal.style.display = 'flex';
}


function setupEventListeners() {
  const closeModal = document.getElementById('closeModal');
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }


  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

  handleAuthStateChange(async (user) => {
    const body = document.querySelector('body');
    body.style.display = 'block';

    if (user) {
      try {
        const userData = await getUserData(user.uid);
        const userPayments = await getUserPayments(user.uid);
        const items = await getCartItems(user.uid);

        renderUserProfile(userData, userPayments, items.length);
        setupEventListeners();
      } catch (error) {
        console.error("Error fetching user data:", error);
        handleAlert(`Could not fetch user data because: ${error}. Please try again later.`, "toast");
      }
    } else {
      handleAlert("You are not logged in. Redirecting...", "toast");
      setTimeout(() => {
        window.location.replace("/html/regs/Signup.html");
      }, 1500);
    }
  });
});