const faq = {

    answer1: [
        { question: "What exactly happens in a session with Charlotte?", answer: "In each session, Charlotte offers a safe space of presence, deep listening, and emotional healing. It’s a real conversation, raw, compassionate, and transformative, designed to help you reconnect with your inner truth." },
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
            question: "What is a Paysafecard and how do I pay with it?", answer: "A Paysafecard is like cash in the form of a receipt.<br/>You don’t need a bank account, credit card, or computer knowledge to use it. This is how it works, step by step:<p><b>Step 1: Buy a Paysafecard</b><br/>Go to a supermarket, petrol station, or kiosk near you. Look for the Paysafecard logo. At the counter, ask for a Paysafecard of the amount you need (for example: 50€, 100€, etc.).</p><p><b>Step 2: Get Your Secure Code</b><br/>The cashier will give you a small receipt. On it, you will see a 16-digit number (this is your secret code).<br/>Keep it safe,it works just like cash.</p><p><b>Step 3: Pay Online with Your Code</b><br/>When you come back to this website to pay, you will see a box that says:<br/>“Enter your Paysafecard code.”<br/>Type in the 16-digit number from your receipt.</p><p><b>Step 4: Confirm Payment</b><br/>After typing the number, simply press “Pay Now with Paysafecard.”<br/>Your payment is confirmed instantly.<br/>No personal details, no bank needed.</p><p><b>Important Tips:</b><br/>Think of the Paysafecard like using cash,safe, simple, and private.<br/> If the amount is bigger than one card, you can add more than one code until the full payment is covered.<br/>Always keep your receipt safe until payment is completed.</p>"
        }
    ],
    answer2: [
        {
            question: "How does a one-on-one session with Charlotte work?", answer: "After booking, you’ll receive a personalized confirmation and simple instructions to join your private session, whether virtually or in person. Charlotte will guide the conversation with care, presence, and depth, responding to what your soul needs most."
        },
        {
            question: "What is the difference between a virtual and in-person session?", answer: "Virtual sessions happen securely online (video call) and are just as personal and transformative. In-person sessions take place in a private, serene setting in Monaco or Paris, allowing for deeper connection, presence, and healing energy."
        },
        {
            question: "Are the sessions confidential?", answer: "Absolutely. Every conversation with Charlotte is completely private, sacred, and protected. Your story, emotions, and healing remain between you and her alone."
        },
        {
            question: "How do I pay for my session?", answer: "After choosing your session type, you’ll be guided through a simple and secure payment process. We accept credit cards, debit cards and paysafecard 16 digit prepaid codes to ensure flexibility and security."
        },
        {
            question: "What happens after I make a payment?",
            answer: "Once your payment is confirmed, you will receive a welcome message and personalized instructions on how to prepare for your session. You’ll also receive the official booking confirmation."
        }, {
            question: "Can I reschedule or cancel my session?", answer: "Yes, you can reschedule your session with at least 72 hours' notice. Cancellations are reviewed individually, but we encourage rescheduling to honor the healing process."
        },
        {
            question: "What if I cannot afford a full session?",
            answer: "We believe healing should be accessible. A limited number of support-priced sessions are available each month. You can also apply for a sponsored session funded by our generous community."
        }, {
            question: "What languages are sessions offered in?",
            answer: "Charlotte speaks English and French fluently. You can select your preferred language during booking."
        }, {
            question: "What if I have more questions before booking?",
            answer: "You can reach out directly through our private messaging portal. Charlotte’s team",
            extra: {
                text: "(healingwithcharlottecasiraghi@gmail.com).",
                link: "mailto:healingwithcharlottecasiraghi@gmail.com"
            }
        }
    ],
}

window.addEventListener("DOMContentLoaded", () => {
    let user = false;

    const FAQ = document.querySelector("section#faq div.answers");
    const FAQ2 = document.querySelector("section#faq div.second");

    const actionTab = document.querySelector("a.register");
    const actionText = actionTab.firstElementChild;

    if (user) {
        actionTab.href = "/html//main/User.html";
        actionText.innerHTML = "PROFILE";
    }

    FAQ.innerHTML = faq.answer1.map((faq) => {
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

    FAQ2.innerHTML = faq.answer2.map((faq) => {
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
});
