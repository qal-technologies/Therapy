import handleAlert from "/js/general.js";
import { getUserData, updateUserData } from "./database.js";
import { handleAuthStateChange } from "./auth.js";

const reviews = [
	 [
		{
			name: "Vale´rie",
			from: "France",
			message:
				"I booked the session thinking maybe she'd just say something comforting. I didn't expect to cry. I didn't expect to feel seen. and I never imagined that a woman I admired from afar could hold space for me like that. Charlotte didn't just listen, she reached inside the silence I had lived with for years.",
		},
		{
			name: "Ana",
			from: "Spain",
			message:
				"After my breakup, I felt like a shadow. One conversation with Charlotte helped me find my voice again. I left the session calmer, wiser, and ready to start living for real. This wasn't therapy. It was transformation.",
		},
		{
			name: "Michael",
			from: "UK",
			message:
				"I lost my daughter two years ago. I never told anyone what it did to me. In our session, Charlotte didn't rush me. She just stayed present. I don't think I've ever felt that kind of softness from anyone before. She gave me something I didn't know I needed: a place to breathe.",
		},
	],

	[
		{
			name: "Nadia",
			from: "Germany",
			message:
				"At first, I wasn't sure it would be real. But everything felt so personal. The emails, the voice messages, even how the payment was confirmed - it was all so human. I booked one session and ended up booking three. I feel held, not judged.",
		},
		{
			name: "Davide",
			from: "Italy",
			message:
				"Being part of her Inner Circle was beyond anything I've ever experienced. She didn't speak like a celebrity. She spoke like someone who knows. Charlotte is pure energy. If you ever get the chance to book, take it. I'd pay double.",
		},
		{
			name: "Tatiana",
			from: "Portugal",
			message:
				"Charlotte didn't fix me. She reminded me that I could begin again. Her words stay with me like prayers I forgot I knew. Book your session. Don't wait until you break.",
		},
	]
];

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
			"BONUS! Exclusive live webinar with Charlotte Casiraghi before the session",
			"BONUS! Exclusive discounts from session sponsors",
			"5+ hours of live online content",
			"Session recordings and additional resources",
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
]

const HOME_BASE_PATH = {
	audio: "/src/audio"
};

//Audio source:
const HOME_AUDIO_SRC = {
	banner: {
		"en": `${HOME_BASE_PATH.audio}/home-english.mp3`,
		"fr": `${HOME_BASE_PATH.audio}/home-french.mp3`,
		"es": `${HOME_BASE_PATH.audio}/home-spanish.mp3`,
		"de": `${HOME_BASE_PATH.audio}/home-german.mp3`,
		"it": `${HOME_BASE_PATH.audio}/home-italian.mp3`
	},
	session: {
		"en": `${HOME_BASE_PATH.audio}/session-english.mp3`,
		"fr": `${HOME_BASE_PATH.audio}/session-french.mp3`,
		"es": `${HOME_BASE_PATH.audio}/session-spanish.mp3`,
		"de": `${HOME_BASE_PATH.audio}/session-german.mp3`,
		"it": `${HOME_BASE_PATH.audio}/session-italian.mp3`
	}
};

window.addEventListener("DOMContentLoaded", () => {
	let user = true;

	const language = navigator.language;
	const testimonies = document.querySelector("section#testimonies");
	const testimonies2 = document.querySelector("section#testimonies2");

	const sessions = document.querySelector("section#sessions");
	const FAQ = document.querySelector('section#faq div.answers');

	const playBTN = document.querySelector(".message button#play");

	const audioMessage = document.querySelector('#banner audio#audio-message');
	const audioMessage2 = document.querySelector('#sessions audio#audio-message2');

	const bannerBTN = document.querySelector("a.register");
	const BTNText = bannerBTN.firstElementChild;

	const lang = language.toLowerCase().substring(0, 2);

	audioMessage.src = HOME_AUDIO_SRC.banner[lang] || "/src/audio/AUD-20250421-WA0054.mp3";
	audioMessage2.src = HOME_AUDIO_SRC.session[lang] || "/src/audio/AUD-20250424-WA0165.mp3";

	if (user) {
		bannerBTN.href = "/html/main/Book.html";
		BTNText.innerHTML = "BOOK NOW";
	};

	playBTN.addEventListener('click', () => {
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
			audioMessage2.pause()
		};

		if (!audioMessage.paused) {
			playBTN.innerHTML = ` <svg
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
			audioMessage.pause();
		} else {
			playBTN.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
</svg>`;
			audioMessage.play();
			audioMessage2.pause()
		}
	});

	audioMessage.addEventListener("ended", () => {
		playBTN.innerHTML = ` <svg
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
	})

	testimonies.innerHTML = reviews[0].map((review) => {
		return `
		<div id="testimony">
				<div class="rating">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="star"
						viewBox="0 0 16 16">
						<path
							d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="star"
						viewBox="0 0 16 16">
						<path
							d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="star"
						viewBox="0 0 16 16">
						<path
							d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="star"
						viewBox="0 0 16 16">
						<path
							d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="star"
						viewBox="0 0 16 16">
						<path
							d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
					</svg>
				</div>
				<div class="user"><span class="highlight">${review.name} </span>, ${review.from}</div>
				<div class="message">
					<p>
						${review.message}
					</p>
				</div>
				
			</div>
	`;
	}).join("");

	testimonies2.innerHTML += reviews[1].map((review) => {
		return `
		<div id="testimony">
				<div class="rating">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="star"
						viewBox="0 0 16 16">
						<path
							d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="star"
						viewBox="0 0 16 16">
						<path
							d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="star"
						viewBox="0 0 16 16">
						<path
							d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="star"
						viewBox="0 0 16 16">
						<path
							d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="star"
						viewBox="0 0 16 16">
						<path
							d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
					</svg>
				</div>
				<div class="user"><span class="highlight">${review.name} </span>, ${review.from}</div>
				<div class="message">
					<p>
						${review.message}
					</p>
				</div>
				
			</div>
	`;
	}).join("");

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
${session.type == "inner" ?
				`
		  <div id="waitlist" class="${session.type}">
		  <a id="waitBTN">JOIN WAITLIST  >></a>
		  </div>` : ""
			}
        </div>`
	}).join("");


	const listenBTN = document.querySelector("#sessions button#play2");

	if (listenBTN && audioMessage2) {
		listenBTN.addEventListener('click', () => {
			if (!audioMessage.paused) {
				playBTN.innerHTML = ` <svg
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
				audioMessage.pause()
			};

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
				audioMessage.pause();
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
	})

	FAQ.innerHTML = faq.map((faq) => {
		const checks = () => {
			if (faq.extra) {
				return `
				<a class="extra" target="_blank" href="${faq.extra.link}">
				${faq.extra.text.toUpperCase()}
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

				lower.style.maxHeight = "1000px";
				arrow.style.transform = 'rotate(90deg)';
			}
		});
	});


	handleAuthStateChange(async (user) => {
		const waitlistBTN = document.querySelector("#sessions #waitlist.inner a#waitBTN");
		const userdata = user ? (await getUserData(user.uid)) : { waitlist: false };
		waitlistBTN.disabled = userdata.waitlist;

		if (!userdata.waitlist) {
			waitlistBTN.addEventListener("click", async () => {
				if (user) {
					if (waitlistBTN.disabled == true) return;

					waitlistBTN.disabled = true;
					waitlistBTN.ariaDisabled = true;
					waitlistBTN.style.fontSize = "12px";
					waitlistBTN.innerHTML = `  <div class="spinner-container"><div class="spinner"></div></div> Adding you to the queue...`;

					await updateUserData(user.uid, { waitlist: true });

					setTimeout(() => {
						handleAlert(`
 Thank you for reserving your place for the Private Extended Healing Experience. This is an intimate, limited offering,and you’re now one step closer to joining the next opening.
 
 <br/>
 📩 What’s next:
 <br/>
 You’ll receive a confirmation email shortly.
 <br/>
 We’ll personally notify you the moment a spot becomes available.
 <br/>
 Priority is given in the order sign-ups are received, so you’re in line.
 
 <br/><br/>
 Until then, breathe deeply and know,your sanctuary is waiting.`, "blur", true, `✨ You're on the List!`, true, [{ text: "OK", onClick: "closeAlert" }]);

						waitlistBTN.style.fontSize = "13.5px";
						waitlistBTN.textContent = '✅ Added to waitlist!';
					}, 1000);
				}
				else {
					handleAlert("You must be logged in to join waitlist!",
						"blur",
						false, "",
						true,
						[{
							text: "LOGIN", onClick: () => window.location.href = "/html/regs/Signup.html", type: "primary"
						}, {
							text: "Close", onClick: "closeAlert", type: "secondary"
						}]);
				}
			});
		} else {
			waitlistBTN.style.fontSize = "13.5px";
			waitlistBTN.textContent = '✅ Added to waitlist!';
		}
	});
});