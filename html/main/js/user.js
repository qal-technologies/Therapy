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

function getPayments() {
  // const demoPayments = [
  //   {
  //     id: "TXN-1239796-GR",
  //     paymentType: "session",
  //     title: 'Inner Circle',
  //     price: "200.00",
  //     currency: "AUD",
  //     converted: "189",
  //     method: "creditCard",
  //     status: true,
  //     statusName: "Completed",
  //     senderName: "Paschal Ngaoka",
  //     date: new Date(2024, 5, 4),
  //     description: "Premium healing experience",
  //     index: 3,
  //   }, {
  //     id: "TXN-149656-GR",
  //     paymentType: "book",
  //     title: 'Best Therapy Book',
  //     price: '550.00',
  //     currency: "CHF",
  //     converted: "790",
  //     method: "bank",
  //     status: false,
  //     statusName: "Failed",
  //     senderName: "John Doe",
  //     date: new Date(2025, 4, 10),
  //     description: "Best relief book you'll ever read",
  //     index: 5,
  //   }, {
  //     id: "TXN-123456-EN",
  //     paymentType: "session",
  //     title: 'Virtual Session',
  //     price: '800.00',
  //     currency: "GBP",
  //     converted: "1200.00",
  //     method: "paypal",
  //     status: null,
  //     statusName: "Pending",
  //     senderName: "Lucy Jay",
  //     description: '1-hour virtual healing session',
  //     date: new Date(2025, 2, 1),
  //     index: 5
  //   }, {
  //     id: 'TXN-03964283-ES',
  //     paymentType: 'session',
  //     title: 'In-Person Session',
  //     price: '1600.00',
  //     currency: "CHF",
  //     converted: "2400",
  //     method: "paypal",
  //     status: true,
  //     statusName: 'Completed',
  //     senderName: "Johnson Alfred",
  //     description: '2-hour in-person session in Monaco',
  //     date: new Date(2023, 6, 2),
  //     index: 5
  //   },
  // ];

  try {
    const fetchedPayment = localStorage.getItem("payments");

    let output;
    if (fetchedPayment ) {
      output = JSON.parse(fetchedPayment);

    } else {
      output = demoPayments;

      // const saved = JSON.stringify(demoPayments)
      // localStorage.setItem("payments", saved);
    }
    
    return output;
  } catch (error) {
    console.error(`An Error occured while fetching your payment history - ${error}`);

    return;
  }
}

function getCarts() {
  //cart data:

  try {
    const fetchedCarts = localStorage.getItem("carts");

    let output;
    if (fetchedCarts) {
      output = JSON.parse(fetchedCarts);
    } else {
      output = demoCarts;
    }
    return output;
  } catch (error) {
    console.error(`An Error occured while fetching your order cart history - ${error}`);

    return;
  }
}

//Get Payment data:
const payments = getPayments();


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

  const carts = getCarts();
  const cartCount = document.querySelectorAll("span.cart-count").forEach(count => {
    count.innerHTML = carts.length || 0;
  });

  const closeModal = document.getElementById('closeModal');

  function showPayslip(payment) {
    const icon = document.getElementById('icon');
    icon.classList.add(`${payment.statusName.toLowerCase()}`);
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-circle-fill"
								viewBox="0 0 16 16">
								<path
									d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
							</svg> ${payment.statusName.toUpperCase()}`;
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


}
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});