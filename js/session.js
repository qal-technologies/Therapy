const sessionTypes = [
  {
    type: "virtual",
    route: "virtual",
    name: "VIRTUAL SESSION",
    price: "800",
    description:
      "You don't need to travel to be heard. This session brings you and me face-to-face-virtually, but intimately. I will be with you, fully present, to listen, reflect, and help you begin to heal.",
    button: "BOOK NOW",
    bonus: [
      "BONUS! Exclusive live webinar with Charlotte Casiraghi before the event",
      "BONUS! Exclusive discounts from event sponsors",
      "5+ hours of live online content",
      "Event recordings and additional resources",
      "Guided workshops, live polling, and more for interactive learning",
      "Breakout sessions, live chats, and other unique networking opportunities", "Access to the Healing Live App"
    ]
  },
  {
    type: "in-person",
    route: "inPerson",
    name: "IN-PERSON SESSION",
    extra: "(in Europe/Monaco)",
    price: "1600",
    description:
      "There are things that only silence and physical presence can heal. Sit with me, in person, in a space that holds truth, tenderness, and transformation.",
    button: "BOOK NOW",
    bonus: [
      "Private one-on-one time with Charlotte Casiraghi in a serene, carefully selected healing environment",
      "Bonus healing kit provided at session", "Follow-up reflection message", "Access to session notes and personal progress tools"
    ]
  },
  {
    type: "inner",
    route: "inner",
    name: "INNER CIRCLE EXPERIENCE",
    extra: "This plan is sold out for now",
    price: "6,850",
    description:
      "For those who seek not just a session, but a sanctuary.",
    button: "SOLD OUT",
    bonus: ["Private extended session", "Signed Personal letter", "Custom healing plan", "Soul-to-soul guided ritual", "Curated gifts and energy cleansing tools", "Ongoing private check-ins for 2 weeks"]
  },
  {
    type: "community",
    route: "community",
    name: "COMMUNITY SESSION",
    extra: "Accessible Plan",
    price: "550",
    description:
      "Healing should not be a luxury. Full session, full attention, at a reduced rate for those in need. Your story matters just as much.",
    button: "BOOK NOW",
    bonus: [
      "Same full session as others", "Gentle sliding scale available on request", "Private and confidential", "Follow-up resources sent digitally", "Option for one-time check-in after the session"
    ]
  },
];

const faq = [
  {
    question: "How does a one-on-one session with Charlotte work?", answer: "After booking, you’ll receive a personalized confirmation and simple instructions to join your private session — whether virtually or in person. Charlotte will guide the conversation with care, presence, and depth, responding to what your soul needs most."
  },
  {
    question: "What is the difference between a virtual and in-person session?", answer: "Virtual sessions happen securely online (video call) and are just as personal and transformative. In-person sessions take place in a private, serene setting in Monaco or Paris, allowing for deeper connection, presence, and healing energy."
  },
  {
    question: "Are the sessions confidential?", answer: "Absolutely. Every conversation with Charlotte is completely private, sacred, and protected. Your story, emotions, and healing remain between you and her alone."
  },
  {
    question: "How do I pay for my session?", answer: "After choosing your session type, you’ll be guided through a simple and secure payment process. We accept credit cards,debit cards and gift cards, bank transfer, and PayPal to ensure flexibility and security."
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
]

const BASE_PATHS = {
  audio: "/src/audio"
};

//Audio source:
const audioSrc = {
  session: {
    "en": `${BASE_PATHS.audio}/session-english.mp3`,
    "fr": `${BASE_PATHS.audio}/session-french.mp3`,
    "es": `${BASE_PATHS.audio}/session-spanish.mp3`,
    "de": `${BASE_PATHS.audio}/session-german.mp3`,
    "it": `${BASE_PATHS.audio}/session-italian.mp3`
  }
};

let timer;
function handleAlert(message) {
  const parent = document.querySelector(".alert-message");
  const div = document.querySelector(".alert-div");
  const text = document.querySelector(".alert-message .alert-text");
  const close = document.querySelector(".alert-message .alert-button");

  if (parent.classList.contains("fadeOut")) {
    parent.classList.remove("fadeOut");
    div.classList.remove("zoom-out");
  }

  parent.style.display = "flex";
  text.innerHTML = message;

  close.addEventListener("click", () => {
    clearTimeout(timer);

    const adding = div.classList.add("zoom-out");

    text.innerHTML = "";
    parent.classList.add("fadeOut");

    timer = adding && setTimeout(() => {
      parent.style.display = "none";
    }, 1000);
  })

}

window.addEventListener("DOMContentLoaded", () => {
    const language = navigator.language;
    const lang = language.toLowerCase().substring(0, 2);

    const sessions = document.querySelector("section#sessions");
    const FAQ = document.querySelector('section#faq div.answers');


    const audioMessage2 = document.querySelector('#sessions audio#audio-message2');

    audioMessage2.src = audioSrc.session[lang] || "/src/audio/AUD-20250424-WA0165.mp3";

  sessions.innerHTML += sessionTypes.map((session) => {
    const details = {
      name: session.name,
      price: session.price,
      type: session.route,
    };

    const params = new URLSearchParams({
      type: "session",
      details: JSON.stringify(details)
    }).toString();

    let bonuses = session.bonus.map(bonus => {
      if (bonus.length > 0) {
        const bonusDiv = `
			<div class="bonus">
			<div class="svg-div">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="check"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"
                />
                <path
                  d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"
                />
              </svg>
			  </div>
              <p>${bonus}</p>
          </div>
				`
        return bonusDiv;
      } else {
        return "";
      }
    });

    return ` <div id="session" class="${session.type}">
          <div class="upper">
            <p class="recommendation">SELLING FAST!</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="fire"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"
              />
            </svg>
          </div>

          <div class="middle">
            <div class="session-name">${session.name}</div>
            <p class="extra">${session.extra || ""}</p>

            <p class="intro">
             ${session.description || ""}
            </p>
            <p class="price">&euro; ${session.price} <span class="highlight">EUR</span></p>

            <a id="book" class="${session.type}" disabled=${session.type == "inner" ? true : false} ${session.type !== "inner" ? `href="/html/main/Book.html?${params}"` : ""}>${session.button}</a>
          </div>

			<div id="message" class="${session.type}">
${bonuses.join('')}
		  </div>

		  <div id="waitlist" class="${session.type}">
		  <a id="waitBTN">JOIN WAITLIST  >></a>
		  </div>
        </div>`
  }).join("");

    const listenBTN = document.querySelector("#sessions button#play2");

    if (listenBTN && audioMessage2) {
        listenBTN.addEventListener('click', () => {
            if (!audioMessage2.paused) {
                listenBTN.innerHTML = ` <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                  />
                </svg>`;
                audioMessage2.pause();
            } else {
                listenBTN.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
</svg>`;
                audioMessage2.play();
            }
        });
    }

    audioMessage2.addEventListener("ended", () => {
        listenBTN.innerHTML = ` <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                  />
                </svg>`;
    });

    FAQ.innerHTML = faq.map((faq) => {
        const checks = () => {
            if (faq.extra) {
                return `
				<a class="extra" target="_blank" href="${faq.extra.link}">
				${faq.extra.text.toLowerCase()}
				</a>
				`
            } else {
                return ""
            }
        }
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
		`
    }).join("");

    const questions = document.querySelectorAll(" section#faq .answers div.answer");

  questions.forEach((question) => {

    const upper = question.querySelector('.upper');
    const lower = question.querySelector('.lower');
    const arrow = question.querySelector('.open');

    lower.style.maxHeight = '0px';
    arrow.style.transform = 'rotate(0deg)';

    upper.addEventListener('click', () => {
      const isOpen = lower.style.maxHeight !== '0px';

      if (isOpen) {
        lower.style.maxHeight = '0px';
        arrow.style.transform = 'rotate(0deg)';
      } else {
        document.querySelectorAll('.lower').forEach(l => {
          l.style.maxHeight = '0px';
        });
        document.querySelectorAll('.open').forEach(a => {
          a.style.transform = 'rotate(0deg)';
        });

        lower.style.maxHeight = '300px';
        arrow.style.transform = 'rotate(90deg)';
      }
    });
  });

  document.querySelector("#sessions #waitlist.inner a").addEventListener("click", () => {
    handleAlert(`
	joined!	Thank you for reserving your place for the Private Extended Healing Experience. This is an intimate, limited offering	`
    )
  })
});