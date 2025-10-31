import handleAlert from './general.js';
import { handleAuthStateChange, logout, db } from './auth.js';
import { collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getUserData, getCartItems } from './database.js';

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

      payments.forEach(payment => {
        const paymentCard = document.createElement('div');
        paymentCard.className = 'payment-card';

        let statusClass = '';
        if (payment.status === true) statusClass = 'status-completed';
        else if (payment.status === false) statusClass = 'status-failed';
        else statusClass = 'status-pending';

        let statusName = '';
        if (payment.status === true) statusName = 'completed';
        else if (payment.status === false) statusName = 'failed';
        else statusName = 'pending';

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
                  <span class="payment-status ${statusClass}">${statusName.toUpperCase() || 'PENDING'}</span>
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
          showPayslip(payment);
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

    const modal = document.getElementById('payslipModal');
    const detailsContainer = modal.querySelector('.payslip-details');

    icon.className = 'status-icon';
    const existingReason = detailsContainer.querySelector('.failure-reason');
    if (existingReason) existingReason.remove();
    const existingButton = modal.querySelector('.payslip-footer .continue-btn');
    if (existingButton) existingButton.remove();

    let statusName = 'Pending';
    let statusClass = 'pending';
    let iconHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16"><path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443-.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 0 11.5 13v1h-7v-1a3.5 3.5 0 0 0 1.989-3.158C7.022 9.586 7.5 9.052 7.5 8.35z"/></svg> PENDING`;

    if (payment.status === true) {
      statusName = 'Completed';
      statusClass = 'completed';
      iconHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg> COMPLETED`;
    } else if (payment.status === false) {
      statusName = 'Failed';
      statusClass = 'failed';
      iconHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg> FAILED`;
    }

    icon.classList.add(statusClass);
    icon.innerHTML = iconHTML;

    const symbol = getCurrencySymbol(payment.currency);
    const options = { month: "long", day: "numeric", year: "numeric" };

    const paymentDate = payment.date && payment.date.seconds ? new Date(payment.date.seconds * 1000).toLocaleString("en-US", options) : new Date(payment.date).toLocaleString("en-US", options);


    document.getElementById('receiptId').textContent = payment.id;
    document.getElementById('receiptType').textContent = payment.title;
    document.getElementById('receiptAmount').textContent = `€${parseFloat(payment.price).toFixed(2)}`;
    document.getElementById('receiptMethod').textContent = payment.method;
    document.getElementById('receiptCurrency').textContent = payment.currency;
    document.getElementById('receiptConverted').textContent = `${symbol}${parseFloat(payment.converted || payment.price).toFixed(2)}`;
    document.getElementById('receiptStatus').textContent = statusName.toLocaleUpperCase();
    document.getElementById('receiptDescription').textContent = payment.description;
    document.getElementById('receiptDate').textContent = 'Date: ' + paymentDate;

    if (payment.status === false && payment.statusMessage) {
      const reasonElement = document.createElement('div');
      reasonElement.className = 'payslip-detail failure-reason';
      reasonElement.innerHTML = `
      <span class="detail-label">Reason:</span>
      <span class="detail-value">${payment.statusMessage.charAt(0).toUpperCase() + payment.statusMessage.slice(1)}</span>
    `;
      detailsContainer.appendChild(reasonElement);
    }

    const footer = modal.querySelector('.payslip-footer');
    const actionButton = document.createElement('button');
    actionButton.className = 'continue-btn';
    actionButton.title = 'Your Next Action';

    if (payment.status === true) {
      actionButton.textContent = 'Continue your journey';
      actionButton.addEventListener('click', (e) => {
        e.preventDefault();

        const params = new URLSearchParams({
          type: "pending",
          details: JSON.stringify(payment)
        }).toString();

        window.location.href = payment.paymentType.toLowerCase() === 'book' ? '/html/main/ViewBook.html' : `/html/main/Payment.html?${params}`;
      });
    } else {
      actionButton.textContent = 'Check Payment';
      actionButton.addEventListener('click', (e) => {
        e.preventDefault();

        const params = new URLSearchParams({
          type: "pending",
          details: JSON.stringify(payment)
        }).toString();
        window.location.href = `/html/main/Payment.html?${params}`;
      });
    }

    footer.appendChild(actionButton);
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
        const items = await getCartItems(user.uid);

        const paymentsQuery = query(collection(db, "users", user.uid, "payments"), orderBy("date", "desc"));
        onSnapshot(paymentsQuery, (snapshot) => {
          const userPayments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          renderUserProfile(userData, userPayments, items.length);
        });
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