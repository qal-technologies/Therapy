// Generate random user data
const userEmail = "user" + Math.floor(Math.random() * 1000) + "@example.com";
const joinDate = new Date();
joinDate.setMonth(joinDate.getMonth() - Math.floor(Math.random() * 12));

// Set user profile
document.getElementById('userEmail').textContent = userEmail || "user123@gmail.com";
document.getElementById('joinDate').textContent = joinDate.toLocaleString('default', { month: 'long', year: 'numeric' });

// Generate profile avatar
const profileAvatar = document.getElementById('profileAvatar');
const firstLetter = userEmail.charAt(0).toUpperCase();
const colors = ['#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4cc9f0', '#4895ef'];
const randomColor = colors[Math.floor(Math.random() * colors.length)];

profileAvatar.textContent = firstLetter;
profileAvatar.style.backgroundColor = randomColor;

// Payment data
const payments = [
    {
        id: 'PAY-' + Math.floor(Math.random() * 1000000),
        type: 'Virtual Session',
        date: new Date(2023, 5, 15),
        amount: '$800.00',
        status: 'completed',
        description: '1-hour virtual healing session'
    },
    {
        id: 'PAY-' + Math.floor(Math.random() * 1000000),
        type: 'In-Person Session',
        date: new Date(2023, 6, 2),
        amount: '$1600.00',
        status: 'completed',
        description: '2-hour in-person session in Monaco'
    },
    {
        id: 'PAY-' + Math.floor(Math.random() * 1000000),
        type: 'Community Session',
        date: new Date(2023, 6, 20),
        amount: '$550.00',
        status: 'pending',
        description: 'Accessible healing session'
    },
    {
        id: 'PAY-' + Math.floor(Math.random() * 1000000),
        type: 'Inner Circle',
        date: new Date(2023, 4, 10),
        amount: '$6,850.00',
        status: 'failed',
        description: 'Premium healing experience'
    }
];

// Render payment cards
const paymentsGrid = document.getElementById('paymentsGrid');

payments.forEach(payment => {
    const paymentCard = document.createElement('div');
    paymentCard.className = 'payment-card';

    let statusClass = '';
    if (payment.status === 'completed') statusClass = 'status-completed';
    else if (payment.status === 'pending') statusClass = 'status-pending';
    else statusClass = 'status-failed';

    paymentCard.innerHTML = `
                <div class="payment-header">
                    <span class="payment-code">${payment.id}</span>
                    <span class="payment-status ${statusClass}">${payment.status.toUpperCase()}</span>
                </div>
                <div class="payment-type">${payment.type}</div>
                <div class="payment-details">
                    <div class="payment-detail">
                        <span class="detail-label">Date:</span>
                        <span class="detail-value">${payment.date.toLocaleDateString()}</span>
                    </div>
                    <div class="payment-detail">
                        <span class="detail-label">Amount:</span>
                        <span class="detail-value">${payment.amount}</span>
                    </div>
                </div>
            `;

    paymentCard.addEventListener('click', () => {
        if (payment.status === 'completed') {
            showPayslip(payment);
        } else {
            window.location.href = `/payment?code=${payment.id}`;
        }
    });

    paymentsGrid.appendChild(paymentCard);
});

// Payslip modal functionality
const modal = document.getElementById('payslipModal');
const closeModal = document.getElementById('closeModal');

function showPayslip(payment) {
    document.getElementById('receiptId').textContent = payment.id;
    document.getElementById('receiptType').textContent = payment.type;
    document.getElementById('receiptAmount').textContent = payment.amount;
    document.getElementById('receiptStatus').textContent = payment.status.charAt(0).toUpperCase() + payment.status.slice(1);
    document.getElementById('receiptDescription').textContent = payment.description;
    document.getElementById('receiptDate').textContent = 'Date: ' + payment.date.toLocaleDateString();

    modal.style.display = 'flex';
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// FAQ data
const faqs = [
    { question: "What exactly happens in a session with Charlotte?", answer: "In each session, Charlotte offers a safe space of presence, deep listening, and emotional healing. It’s a real conversation — raw, compassionate, and transformative — designed to help you reconnect with your inner truth." },
    {
        question: "How do I know if a session is right for me?", answer: "If you’ve ever felt unseen, unheard, or quietly broken inside, this space was created for you. One honest conversation can begin to change everything."
    },
    {
        question: "Can I book if I live outside Europe?", answer: "Yes! You can book a virtual session from anywhere in the world. If you wish to attend in person, you’re warmly welcome to travel to Europe (Monaco) for your session."
    }, {
        question: "What happens after I make a payment?",
        answer: "Once your payment is verified, you’ll receive a confirmation message, and your booking will be officially secured. From there, you’ll receive full session details and preparation instructions."
    }, {
        question: "Can I sponsor someone else’s healing?",
        answer: "Yes. If you’d like to gift a session to someone in need, you can select the Sponsor a Session option at checkout. Your generosity could change a life."
    }, {
        question: "Are the books available worldwide?",
        answer: "Yes. The books will be available for shipping worldwide, or you can choose a digital copy depending on availability. Each book carries a piece of Charlotte’s healing journey to you."
    },
    {
        question: "Why do you accept gift cards as a payment method?", answer: "Gift cards allow fans from all over the world — regardless of country or banking restrictions — to easily and securely support their healing journey. They also help us confirm your place faster and securely."
    }
];

// Render FAQs
const FAQ = document.querySelector("section#faq div.answers");

FAQ.innerHTML = faqs.map((faq) => {
    const checks = () => {
        if (faq.extra) {
            return `
				<a class="extra" target="_blank" href="${faq.extra.link}">
				${faq.extra.text.toLowerCase()}
				</a>
				`;
        } else {
            return "";
        }
    };
    return `
		     <div class="answer">
            <div class="upper">
              <p class="question">${faq.question}?</p>

              <p class="open">></p>
            </div>
            <div class="lower">
            ${faq.answer}
			 ${checks()}
            </div>
          </div>
		`;
}).join("");

const questions = document.querySelectorAll(
    " section#faq div.answer"
);

questions.forEach((question) => {
    const upper = question.querySelector(".upper");
    const lower = question.querySelector(".lower");
    const arrow = question.querySelector(".open");

    lower.style.maxHeight = "0px";
    arrow.style.transform = "rotate(0deg)";

    upper.addEventListener("click", () => {
        const isOpen = lower.style.maxHeight !== "0px";

        if (isOpen) {
            lower.style.maxHeight = "0px";
            arrow.style.transform = "rotate(0deg)";
        } else {
            document.querySelectorAll(".lower").forEach((l) => {
                l.style.maxHeight = "0px";
            });
            document.querySelectorAll(".open").forEach((a) => {
                a.style.transform = "rotate(0deg)";
            });

            lower.style.maxHeight = "300px";
            arrow.style.transform = "rotate(90deg)";
        }
    });
});