import handleAlert, { handleRedirect, translateElementFragment } from './general.js';
import { handleAuthStateChange } from './auth.js';
import {
    getPaymentById,
    updateUserPayment,
    updateGlobalTransaction,
    updateUserData
} from './database.js';

// ==================== STATE MANAGEMENT ====================
function initializeState() {
    return {
        userId: null,
        methodSelected: false,
        selectedCurrency: "",
        currencyCode: "EUR",
        selectedMethod: "",
        converted: "",
        amount: 0,
        txn: "",
        charge: 0.00,
        toPay: 0,
        creditCardIndex: 1,
        creditCardSections: null,
        creditCardError: false,
        creditCardTrials: 0,
        safeIndex: 0,
        paySafeSections: null,
        codes: [],
        pending: false,
        pendingIndex: "",
        paymentStatus: null,
        statusMessage: "",
        initialContent: "",
        details: {},
        country: "",
        paymentType: "Session",
    };
}


const formatter = new Intl.NumberFormat('en-US');

function formatDateTime(timestamp) {
    if (!timestamp) return "";

    let date;
    date = typeof timestamp === "object" && timestamp.seconds ?
        new Date(timestamp.seconds * 1000) :
        new Date(timestamp);

    const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
    };

    return (
        date.toLocaleString("en-US", options) +
        " at " +
        date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    );
}


function createCreditCardSections(state) {
    return {
        1: createCreditCardSection1(state),
    };
}

function createPaySafeSections(state) {
    return {
        1: createSafe2(state),
        2: createSafe3(state),
    }
}

// ==================== DOM CACHING ====================
function cacheDOMElements() {
    return {
        makePaymentBtn: document.getElementById("make-payment-btn"),
        paymentMethodOptions: document.querySelectorAll(
            "#payment-method-section label.option-item"
        ),
        currencyCode: document.querySelector("span.choosen-currency-code"),
        paymentDisplay: document.querySelector("section#display.parent"),
        paymentDetailsDiv: document.querySelector(".payment-summary-container#payment-details"),
    };
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners(state, elements) {
    elements.paymentMethodOptions.forEach((option) => {
        option.addEventListener("click", () =>
            handlePaymentMethodClick(option, state, elements)
        );
    });

    document
        .getElementById("proceed-button")
        ?.addEventListener("click", async (e) => await handleProceedClick(e, state));


    elements.makePaymentBtn?.addEventListener("click", (e) =>
        handleMakePaymentClick(e, state, elements)
    );
}

async function getUserCountryInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        return {
            country: data.country_name,
            currency: data.currency || data.currency_code,
            currencyCode: data.currency_code,
            countryCode: data.country_code,
            currencyName: data.currency_name
        };
    } catch (error) {
        console.error('Error getting country:', error);
        return null;
    }
}

function updateSelectionStyles(selectedOption, allOptions) {
    allOptions.forEach((opt) => opt.classList.remove("selected"));
    selectedOption.classList.add("selected");
}

function handlePaymentMethodClick(option, state, elements) {
    const method = option.className.includes("card") ? "Credit Card" : option.className.includes("paysafe") ? "Paysafe Card" : option.textContent.trim();
    state.methodSelected = true;
    state.selectedMethod = method.toString().replace(" ", "");

    console.log(method, state.selectedMethod, option.className);

    updateSelectionStyles(option, elements.paymentMethodOptions);
    checkPaymentMethodSelection(state, elements);
}

async function handleProceedClick(e, state) {
    e.preventDefault();

    const button = document.getElementById("proceed-button");
    button.disabled = true;
    button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>  Processing...`;

    await convertCurrency(state)
        .then((value) => {
            value ?
                setTimeout(() => {
                    document.getElementById("payment-details")?.classList.remove("active");
                    document.getElementById("payment-method-section")?.classList.add("active");

                    button.disabled = false;
                    button.innerHTML = "Proceed to Payment";
                }, 500)

                :
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = "Proceed to Payment";
                }, 100)
        });
}


function handleMakePaymentClick(e, state, elements) {
    e.preventDefault();

    const button = elements.makePaymentBtn;
    button.disabled = true;
    button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>  Processing...`;

    setTimeout(async () => {
        document
            .getElementById("payment-method-section")
            ?.classList.remove("active");

        const method = state.selectedMethod.toLowerCase();

        if ((method.includes("credit") || method.includes("debit")) && !method.includes("safe")) {
            handleCreditCard(state, elements);
        } else if (method.includes("safe")) {
            await handlePaySafe(state, elements);
        }

        button.disabled = true;
    }, 1500);
}


function checkPaymentMethodSelection(state, elements) {
    if (state.methodSelected) {
        elements.makePaymentBtn.disabled = false;
    }
}

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

function initializeCreditCardState() {
    return {
        cardBrands: [
            {
                name: "Visa",
                image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
                colors: ["#1a1f71", "#ffffff"],
                pattern: "linear-gradient(135deg, #1a1f71 0%, #1a1f71 50%, #f7b600 50%, #f7b600 100%)"
            },
            {
                name: "Mastercard",
                image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
                colors: ["#eb001b", "#f79e1b"],
                pattern: "linear-gradient(135deg, #eb001b 0%, #eb001b 50%, #f79e1b 50%, #f79e1b 100%)"
            },
            {
                name: "American Express",
                image: "https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png",
                colors: ["#016fd0", "#ffffff"],
                pattern: "linear-gradient(135deg, #016fd0 0%, #016fd0 70%, #ffffff 70%, #ffffff 100%)"
            },
            {
                name: "Discover",
                image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg",
                colors: ["#ff6000", "#ffffff"],
                pattern: "linear-gradient(135deg, #ff6000 0%, #ff6000 60%, #ffffff 60%, #ffffff 100%)"
            }
        ],
        detectedBrand: null
    };
}

function backToMethod(state, elements) {
    setTimeout(() => {
        state.creditCardTrials = 0;
        state.creditCardError = false;
        state.methodSelected = false;
        state.selectedMethod = "";
        state.creditCardIndex = 1;
        state.safeIndex = 0;
        state.paymentStatus = null;
        state.statusMessage = "",

            elements.paymentDisplay.innerHTML = state.initialContent;
        document.getElementById("loading-section").classList.remove("active");

        let element = cacheDOMElements();
        setupEventListeners(state, element);

        element.makePaymentBtn.disabled = !state.methodSelected;

        document.getElementById("payment-details")?.
            classList.remove("active")

        document.getElementById("payment-method-section")?.classList.add("active")
    }, 3000);
}

// ==================== CREDIT CARD HANDLING ====================
function handleCreditCard(state, elements) {
    state.creditCardSections = createCreditCardSections(state);
    const currentSection = state.creditCardSections[state.creditCardIndex];

    if (currentSection) {
        elements.paymentDisplay.innerHTML = '';
        elements.paymentDisplay.insertAdjacentHTML('beforeend', currentSection);

        const inputs = document.querySelectorAll("input");
        inputs.forEach(input => {
            input.disabled = state.creditCardTrials > 1;
        });

        document.querySelectorAll(".cc-btn").forEach(btn => {

            btn.addEventListener('click', () => {
                inputs.forEach(input => {
                    input.disabled = true;
                });

                btn.disabled = true;
                btn.innerHTML = `
                <div class="spinner-container"><div class="spinner"></div></div>
                Verifying...
                `;

                setTimeout(() => {
                    state.creditCardError = true;
                    state.creditCardTrials = state.creditCardTrials + 1;

                    btn.disabled = false;
                    btn.innerHTML = `Pay`;

                    if (state.creditCardTrials > 1) {
                        btn.disabled = true;
                        state.detectedBrand = null;

                        // then for redirecting bk to selecting methods

                        backToMethod(state, elements);
                    }

                    handleCreditCard(state, elements);
                }, 4000);

            });
        });

        setupCreditCardInputs(state);
    }
}

function setupCreditCardInputs(state) {
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('card-name');
    const submitBtn = document.querySelector('#credit-card-details .cc-btn')
    const cardState = initializeCreditCardState();

    function detectCardBrand(number) {
        const cleaned = number.replace(/\s+/g, '');
        if (/^4/.test(cleaned)) return "Visa";
        if (/^5[1-5]/.test(cleaned)) return "Mastercard";
        if (/^3[47]/.test(cleaned)) return "American Express";
        if (/^6(?:011|5)/.test(cleaned)) return "Discover";
        return null;
    }



    function validateInputs() {
        const isCardValid = cardNumber.value.replace(/\s/g, '').length >= 15;
        const isExpiryValid = /^\d{2}\s?\/\s?\d{2}$/.test(expiryDate.value);
        const isCvvValid = cvv.value.length >= 3;
        const isNameValid = cardName.value.trim().length > 2;

        submitBtn.disabled = !(isCardValid && isExpiryValid && isCvvValid && isNameValid);
    }


    // Format card number with spaces
    if (cardNumber) {
        cardNumber.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\s+/g, '');
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g'))?.join(' ') || value;
            }
            e.target.value = value;

            // Detect card brand
            state.detectedBrand = detectCardBrand(value);
            validateInputs();

            // Update UI to show detected brand
            const cardBrands = document.querySelectorAll('.card-brand');
            cardBrands.forEach(brand => {
                brand.classList.remove('active');
                if (brand.querySelector('img').alt === state.detectedBrand) {
                    brand.classList.add('active');
                }
            });


            // Update card icon in input field
            const inputIcon = document.querySelector('.input-with-icon .card-icon');
            if (state.detectedBrand) {
                const brand = cardState.cardBrands.find(b => b.name === state.detectedBrand);
                if (!inputIcon) {
                    const iconDiv = document.createElement('div');
                    iconDiv.className = 'card-icon';
                    iconDiv.style.background = brand.pattern;
                    iconDiv.innerHTML = `<img src="${brand.image}" alt="${brand.name}">`;
                    document.querySelector('.input-with-icon').appendChild(iconDiv);
                } else {
                    inputIcon.style.background = brand.pattern;
                    inputIcon.innerHTML = `<img src="${brand.image}" alt="${brand.name}">`;
                }
            } else if (inputIcon) {
                inputIcon.remove();
            }

        });
    }



    // Format expiration date
    if (expiryDate) {
        expiryDate.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
            validateInputs();
        });
    }

    // Validate CVV
    if (cvv) {
        cvv.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '');
            validateInputs();
        });
    }

    // Validate card name
    if (cardName) {
        cardName.addEventListener('input', validateInputs);
    }

    // Initial validation
    validateInputs();
}


function saveCodeToArray(state, input) {
    if (!input) return;
    const code = input.value.trim();

    if (code.length == 16) {
        state.codes.push(code);
        return true;
    }

    return false;
}

function addNewCode(state) {
    const inputDiv = document.querySelector(".steps .inputs");
    const inputsLength = inputDiv.childElementCount;
    const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];


    if (!inputDiv) return;

    const newInput = document.createElement("input");
    newInput.placeholder = "Type your code here";
    newInput.classList.add("paysafe-code-input");
    newInput.id = `paysafe-code-${inputsLength + 1}`;
    newInput.name = `paysafe-code-${inputsLength + 1}`;
    newInput.type = "tel";
    newInput.maxLength = "16";
    const btns = document.querySelector(".paysafe-section .continue-btn")

    inputDiv.insertAdjacentElement("beforeend", newInput);
    translateElementFragment(newInput, userLang);

    newInput.addEventListener("input", () => {
        const toggle = saveCodeToArray(state, newInput)

        btns.disabled = !toggle;
    });

}

const paySafeSteps = [
    {
        title: "How Paysafecard Works",
        message: `<h3 style="text-align:center;">🔑 Step 1 </h3> 
Buy a paysafecard voucher online or at a shop near you.
You’ll receive a paper slip or digital code containing your 16-digit code.`,
        buttons: [
            { text: "Next >", action: "next" }
        ]
    },
    {
        title: "How Paysafecard Works",
        message: `<h3 style="text-align:center;">🖊️ Step 2 </h3> Come back here and type the 16-digit code into the payment box.`,
        buttons: [
            {
                text: "< Back", action: "prev"
                , type: "secondary"
            },
            { text: "Next >", action: "next" }
        ]
    },
    {
        title: "How Paysafecard Works",
        message: `<h3 style="text-align:center;">✨ Step 3 </h3> Click Pay. That's it, your payment is complete instantly.  <br/> <br/> Ready to continue? Your book/session is waiting for you.`,
        buttons: [
            { text: "< Back", action: "prev", type: "secondary" },
            {
                text: "Back to payment",
                action: "closeAlert"
            }
        ]
    }
];

function showFlow(steps, index = 0) {
    const step = steps[index];

    handleAlert(
        step.message,
        "blur",
        true,
        step.title,
        true,
        step.buttons.map(btn => ({
            text: btn.text,
            onClick: btn.action === "next"
                ? () => showFlow(steps, index + 1)
                : btn.action === "prev"
                    ? () => showFlow(steps, index - 1)
                    : btn.action,
            type: btn.type || "primary",
        })),
        "row"
    );
}

function stepsAlerts() {
    showFlow(paySafeSteps);
}

const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];
const LINKS = {
    online: {
        "en": "https://www.paysafecard.com/en-gb/buy-paysafecard-online-3/",
        "fr": "https://www.paysafecard.com/fr-fr/acheter-paysafecard-en-ligne/",
        "es": "https://www.paysafecard.com/es-es/comprar-paysafecard-online/",
        "de": "https://www.paysafecard.com/de-de/paysafecard-online/",
        "it": "https://www.paysafecard.com/it-it/acquista-paysafecard-online/",
        "pt": "https://www.paysafecard.com/pt-pt/comprar-paysafecard-online/",
    },
    store: {
        "en": "https://www.paysafecard.com/en-us/find-sales-outlet/",
        "fr": "https://www.paysafecard.com/fr-fr/trouver-un-point-de-vente/",
        "es": "https://www.paysafecard.com/es-es/buscar-puntos-de-venta/",
        "de": "https://www.paysafecard.com/de-de/verkaufsstelle-finden-1/",
        "it": "https://www.paysafecard.com/it-it/trova-un-punto-vendita/",
        "pt": "https://www.paysafecard.com/pt-pt/pesquisar-pontos-de-venda/",
    }
}

const safeFlow = {

    start: {
        message: "Do you need help finding a shop near you to buy a Paysafecard voucher, or would you like guidance on how to use it to complete your payment for your book/session?",
        title: "🌸 <br/> Companion Support",
        buttons: [
            { text: "Yes, guide me", action: "guide" },
            { text: "No, thank you", action: "closeAlert", type: "secondary" }
        ]
    },
    guide: {
        message: "We're here to make this easy for you. <br/> Please choose what you need right now:",
        title: "🌸 Companion Support",
        buttons: [
            {
                text: "Buy paysafecard online", action: () => {
                    window.open(`${LINKS.online[userLang]}`);
                    return "closeAlert";
                }, type: "secondary"
            },
            {
                text: "Find a Store Near Me", action: () => {
                    window.open(`${LINKS.store[userLang]}`);
                    return "closeAlert";
                }, type: "secondary"
            },
            {
                text: "Show Me How Paysafecard Works", action: () => stepsAlerts(),
                type: "secondary"
            },
            {
                text: "Talk to us",
                action: () => handleAlert(`Need help? Write to us now and explain your problem. Our team will respond quickly and fix it for you.  <br/><br/>
                            <div style="display:flex; gap:6px;"> 
                            <i class="bi bi-envelope"></i> Email Us </div>
                            `, "blur", true, "✉️ Companion Support", true, [{
                    text: "Message Now", onClick: () => {
                        handleRedirect("mailto:healingwithcharlottecasiraghi@gmail.com");

                        return "closeAlert"
                    }
                }])
                , type: "secondary"
            }
        ],
        arrange: "column"
    }
};

function runFlow(flow, state = "start") {
    const step = flow[state];
    handleAlert(
        step.message,
        "blur",
        true,
        step.title,
        true,
        step.buttons.map(btn => ({
            text: btn.text,
            onClick: typeof btn.action === "string"
                ? btn.action === "closeAlert" ? "closeAlert" : () => runFlow(flow, btn.action)
                : btn.action,
            type: btn.type,
        })),
        {},
        step.arrange
    );
}

function safeAlerts() {
    runFlow(safeFlow, "start");
}


//==================== PAYMENT POLLING & RESULTS ====================>>>>

const delay = ms => new Promise(res => setTimeout(res, ms));

let attempts = 0;
async function pollForPaymentStatus(txnId) {
    let payment = await getPaymentById(txnId);

    while (payment === null && attempts < 40) {
        await delay(2500);
        attempts++;

        payment = await getPaymentById(txnId);
    }
    return payment;
}

async function savePaymentData(state) {
    const { userId, txn } = state;

    if (!txn || !userId) {
        handleAlert("Missing transaction ID or User ID. Skipping save.", "blur", false, "", true, [{ text: "OK", onClick: "closeAlert" }]);

        console.warn("Missing transaction ID or User ID. Skipping save.");
        return false;
    }

    const title = state.paymentType.toLowerCase() == "session" ? "Booked a session" : "Bought a Book";
    const index = state.selectedMethod.toLowerCase().includes("safe") ? 2 : 1;

    const paymentData = {
        id: txn,
        paymentType: state.paymentType,
        pending: true,
        title: title || "N/A",
        price: state.amount,
        currency: state.currencyCode,
        converted: state.toPay,
        method: state.selectedMethod,
        status: state.paymentStatus,
        statusName: state.paymentStatus === true ? "Completed" : (state.paymentStatus === false ? "Failed" : "Pending"),
        statusMessage: state.statusMessage || "",
        description: state.details.description,
        date: new Date(),
        index: index,
        userId: userId,
    };

    try {
        await updateGlobalTransaction(txn, paymentData);
        await updateUserPayment(userId, txn, paymentData);
        return true;
    } catch (error) {
        console.error("Error saving payment data:", error);
        handleAlert(`Could not save payment data, because: ${error}`, "blur", false, "", true, [{ text: "OK", onClick: "closeAlert" }]);
    }
    return false;
}

function triggerVibration() {
    if (navigator.vibrate) {
        navigator.vibrate(800);
    }
}

async function showResultScreen(state, elements, finalPayment) {
    let resultHTML;
    if (!finalPayment || finalPayment.status == null) {
        resultHTML = `
    <div class="payment-section paysafe-section active" id="paysafe-thank-you">
            <div class="paysafe-header">
                <div class="logo">
                    <img src="/src/images/paysafe.png" alt="Paysafe Logo">
                </div>
                <h2>Thank you.</h2>
            </div>

            <div class="steps">
                <p class="verification-text">Your Paysafecard payment is being processed. You will receive a
                    confirmation email once the code is verified.</p>
            </div>

            <div class="proceed-div">
                <a href="/html/main/User.html" class="continue-btn">OK</a>
            </div>
        </div>
    `
    } else {

        // Update state with the final payment details
        state.paymentStatus = finalPayment.status;
        state.statusMessage = finalPayment.statusMessage;
        await savePaymentData(state);

        const { status, statusMessage, paymentType } = finalPayment;
        triggerVibration();
        if (status === true) {
            if (paymentType.toLowerCase() === "book") {
                await updateUserData(state.userId, { bookPaid: true })
            }
        }
        // Determine result content based on status
        const isSuccess = status === true;
        const resultTitle = isSuccess && paymentType.toLowerCase() !== "session" ? 'Payment Successful' : isSuccess && paymentType.toLowerCase() === "session" ? "✨ Your Session is Confirmed" : (statusMessage.includes("used") ? 'Code Already Used' : (statusMessage.includes("incomplete") ? 'Payment Not Fully Covered' : "Incorrect Code"));
        const resultMessage = isSuccess && paymentType.toLowerCase() !== "session" ?
            'Your payment with Paysafecard is complete.<br/><br/>Thank you for your trust.' : isSuccess && paymentType.toLowerCase() === "session" ? "Thank you for booking your session. <br/> To keep this experience truly personal, I handle confirmations directly myself. <br/>Please send me a short nessage on Facebook so I can: <br/> • Personally confirm your time with you. <br/> • Share important preparations notes before we meet. <br/> • Be sure you feel seen and supported from the very start." :
                (statusMessage.includes("used") ?
                    "The Paysafecode you entered has already been used. Please try a different code." : (statusMessage.includes("incomplete") ? `Only part of the payment went through. The code does not cover the full amount. <br/> ${statusMessage}` :
                        "The Paysafecard code you entered is not correct. Please check the digits and try again."));

        resultHTML = `
        <div class="payment-section paysafe-section active" id="paysafe-outcome">
            <div class="paysafe-header">
                <div class="logo"><img src="/src/images/paysafe.png" alt="Paysafe Logo"></div>
            </div>
            <div class="outcome-section">
                <i class="${isSuccess ? paymentType.toLowerCase() === "session" ? 'session' : 'bi bi-check-circle-fill' : (!isSuccess && statusMessage.includes("incomplete") ? 'bi bi-dash-circle-fill' : 'bi bi-x-circle-fill')}"></i>
                <h1>${resultTitle}</h1>
            </div>
            <div class="steps">
                <p class="verification-text ${isSuccess && paymentType.toLowerCase() === 'session' ? 'session' : ''}">${resultMessage}</p>
            </div>
            <div class="proceed-div">
                ${isSuccess ? paymentType.toLowerCase() === "session" ?
                `<a href="https://www.facebook.com/charlotte.casiraghi.992551" target="_blank" class="continue-btn facebook "> <i class="bi bi-facebook"></i> Message Me on Facebook</a>` : `<a href="/html/main/User.html" class="continue-btn success">Continue</a>` : (
                `<button class="continue-btn try-again">${!isSuccess && statusMessage.includes("incomplete") ? "Add Another Code" : "Try Again"
                } </button>`)
            }
                <p class="small-text">${isSuccess ?
                `A confirmation has been sent to your email.` :
                `Need help? <a href="mailto:healingwithcharlottecasiraghi@gmail.com" style="color:var(--link); font-weight:bold;">Contact Support</a>`
            }</p>
            </div>
        </div>`;
    }

    elements.paymentDisplay.innerHTML = resultHTML;

    const tryAgainBtn = document.querySelector(".continue-btn.try-again");

    if (tryAgainBtn) {
        tryAgainBtn.addEventListener("click", () => {
            backToMethod(state, elements);
        });
    }
}

async function handlePaySafe(state, elements) {
    state.paySafeSections = createPaySafeSections(state);

    const currentSection = state.paySafeSections[state.safeIndex + 1];

    if (state.safeIndex === 1 && state.pending) {
        const finalPayment = await pollForPaymentStatus(state.txn);
        await showResultScreen(state, elements, finalPayment);
    } else if (currentSection) {

        if (state.safeIndex == 1) {
            await updateUserData(state.userId, { codes: state.codes });
            await savePaymentData(state);
        };

        elements.paymentDisplay.innerHTML = "";
        elements.paymentDisplay.insertAdjacentHTML("beforeend", currentSection);

        const btns = document.querySelectorAll(".paysafe-section .continue-btn")

        btns.forEach(btn => btn.addEventListener("click", () => {

            btn.disabled = true;

            btn.innerHTML = `
                <div class="spinner-container"><div class="spinner"></div></div>
                ${state.safeIndex !== 1 ? "Loading..." : "Verifying..."}
                `;

            setTimeout(async () => {
                await handlePaySafe(state, elements)
            }, 2000);

        }));


        if (state.safeIndex == 0) {
            btns[0].disabled = true;
            state.pending = false;

            const firstInput = document.querySelector(".steps input.paysafe-code-input");
            firstInput.addEventListener("input", () => {
                const toggle = saveCodeToArray(state, firstInput)

                btns[0].disabled = !toggle;
            }
            );

            const addButton = document.querySelector("button.another-code");
            addButton.addEventListener('click', () => addNewCode(state));


            setTimeout(() => {
                safeAlerts();
            }, 3000);
        };

        state.safeIndex = state.safeIndex <= 0 ? state.safeIndex + 1 : 1;
    }

}


async function convertCurrency(state) {
    const EXCHANGE_RATE_API = "https://api.exchangerate-api.com/v4/latest/EUR";

    try {
        const response = await fetch(EXCHANGE_RATE_API);
        const data = await response.json();
        const rates = data.rates;

        if (state.currencyCode !== "EUR") {
            if (state.currencyCode && state.currencyCode in rates) {
                const rate = rates[state.currencyCode];
                state.converted = (state.amount * rate).toFixed(2);
                // state.charge = (0.98 * rate).toFixed(2);

                state.toPay = (parseFloat(state.converted) + parseFloat(state.charge)).toFixed(2);
            } else {
                console.error("Currency conversion not available");
                alert("Currency conversion not available");
            }
        } else {
            state.toPay = (parseFloat(state.amount) + parseFloat(state.charge)).toFixed(2);
        }
        return true;
    } catch (error) {
        console.error("Conversion error:", error);
        handleAlert(`An error occured because of: ${error} `);

        state.converted = (state.amount).toFixed(2);
        state.toPay = (parseFloat(state.converted) + parseFloat(state.charge)).toFixed(2);

    }
    return false;
}

// ==================== CREDIT CARD UI TEMPLATES ====================
function createCreditCardSection1(state) {
    const cardState = initializeCreditCardState();

    return `
    <div class="payment-section credit-card-section active" id="credit-card-details">
        
${state.creditCardError || state.creditCardTrials > 1 ?
            `
        <div class="card-error">
        <div class="card-error-div">

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
        <div class="error-upper">
 <p>
Your card was declined. ${state.creditCardTrials > 1 ? `Try another payment method
            ` : `Try another credit or debit card.`}
            </p>
<p>Code: card_declined</p>
</div>
        </div>
        </div>`
            : ``
        }
        <div class="cc-form">
            <div class="card-brands">
                ${cardState.cardBrands.map(brand => `
                    <div class="card-brand ${state.detectedBrand === brand.name ? 'active' : ''}" >
                        <img src="${brand.image}" alt="${brand.name}">
                    </div>
                `).join('')}
            </div>

            <div class="form-group">
                <label for="card-number">Card number</label>
                <div class="input-with-icon">
                    <input type="tel" id="card-number" placeholder="" maxlength="19" class="card-input">

                    ${state.detectedBrand ? `<div class="card-icon">
                        <img src="${cardState.cardBrands.find(b => b.name === state.detectedBrand).image}" alt="${state.detectedBrand}"/>
                    </div>` : ''}
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="expiry-date">MM / YY</label>
                    <input type="tel" id="expiry-date" placeholder="" maxlength="5" class="card-input">
                </div>
                <div class="form-group">
                    <label for="cvv">CVC</label>
                    <input type="tel" id="cvv" placeholder="" maxlength="3" class="card-input">
                </div>
            </div>
            
            <div class="form-group">
                <label for="card-name">Name on card</label>
                <input type="text" id="card-name" placeholder="" class="card-input">
            </div>
            
           <!--div class="amount-display">
                <p>Amount to charge: <strong>${getCurrencySymbol(state.currencyCode) || state.currencyCode} ${formatter.format(state.toPay)}</strong></p>
            </div-->
        </div>

        <div class="proceed-div">
            <button class="continue-btn cc-btn" disabled>Pay</button>
            <div class="stripe-branding">
                <span>Powered by</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe">
            </div>
        </div>
    </div>`;
}

///========FOR PAYSAFE========>
function createSafe1() {
    return `<div class="payment-section paysafe-section active" id="paysafe-instructions">
            <div class="paysafe-header">
                <!-- <div class="logo">
                <img src="/src/images/paysafe.png" alt="Paysafe Logo">
            </div> -->
                <h2>How to Pay with Paysafecard</h2>
                <p class="small-text">Simple, Safe & Easy - No credit or debit card needed</p>
            </div>

            <div class="steps">
                <div class="step">
                    <img src="/src/images/card.jpg" class="bi bi-bag-fill" alt=""/>
                    <div class="step-text">

                        <p class="step-header">Step 1: <br />
                            Buy a Paysafecard Voucher
                        </p>

                    <p class="step-text-under">
                        Go to a supermarket, kiosk, or petrol station. Look for the Paysafecard logo at the counter. If you don't see it, just ask the cashier: "Do you sell Paysafecard?"
                    </p>
                    </div>
                </div>

                <div class="step">
                    <img src="/src/images/receipt.jpg"  class="bi bi-receipt" alt=""/>
                    <div class="step-text">
                
                        <p class="step-header">Step 2: <br />
                            Get Your Secure PIN
                        </p>
                
                    <p class="step-text-under">
                        When you buy the Paysafecard, you will receive a receipt. On this receipt, you will see a 16-digit code (numbers).
This code is your money. Keep it safe, just like cash.
                    </p>
                    </div>
                </div>

                <div class="step">
                   <img src="/src/images/phone.jpg" class="bi bi-file-lock2" alt="phone image"/>
                    <div class="step-text">
                
                        <p class="step-header">Step 3: <br />
                            Enter Your Code Online
                        </p>
                
                    <p class="step-text-under">
                        On the next screen, type the 16-digit code from your receipt (example: 1234 5678 9012 3456). Then click “Pay Now".You will see an almost instant confirmation once the payment is done.
                    </p>
                    </div>
                </div>
            </div>

            <div class="proceed-div">
                <button class="continue-btn">Continue</button>
            </div>
        </div>`;
}

function createSafe2(state) {
    return `
        <div class="payment-section paysafe-section active" id="paysafe-code-page">
            <div class="paysafe-header">
                <div class="logo">
                    <img src="/src/images/paysafe.png" alt="Paysafe Logo">
                </div>
                <h2>Enter your 16-digit Paysafecard code</h2>

                <p class="small-text">This code is on your Paysafecard receipt or card.</p>
            </div>

            <div class="steps">
                <div class="inputs">
                    <input type="tel" maxlength="16" name="paysafe-code-1" id="paysafe-code-1"
                        class="paysafe-code-input" placeholder="Type your code here">
                </div>

           <div class="middle">
                <button class="another-code" title="Add Another Code">+ Add another code</button>

                <span class="small-text">If one code doesn't cover the full amount, just press <b>'Add another code'</b> and type the new 16-digit number. Keep doing this until the full amount is covered.</span>
</div>
                <div class="amount-display">
                    <p class="label-text">Amount to Pay:</p> <span class="price-to-pay">${getCurrencySymbol(state.currencyCode) || state.currencyCode} ${formatter.format(Math.round(state.toPay))}</span>
                </div>
            </div>

            <div class="proceed-div">
                <button class="continue-btn">Pay Now</button>
            </div>
        </div>
    `;
}

function createSafe3(state) {
    return `
    <div class="payment-section paysafe-section active" id="paysafe-thank-you">
            <div class="paysafe-header">
                <div class="logo">
                    <img src="/src/images/paysafe.png" alt="Paysafe Logo">
                </div>
                <h2>Thank you.</h2>
            </div>

            <div class="steps">
                <p class="verification-text">Your Paysafecard payment is being processed. You will receive a
                    confirmation email once the code is verified.</p>
            </div>

            <div class="proceed-div">
                <a href="/html/main/User.html" class="continue-btn">OK</a>
            </div>
        </div>
    `
}

///==========ADDING RELEVANT DETAILS====-----====>>
function addDetails(details, elements) {
    const paymentDetailsDiv = elements.paymentDetailsDiv;
    const date = formatDateTime(details.date);

    const description =
        details.type === "session"
            ? `${details.title.toUpperCase()} - Hours with Charlotte Casiraghi`
            : details.description || `<div class="spinner-container"><div class="spinner"></div></div>`;

    if (document.contains(paymentDetailsDiv)) {
        document.getElementById("transaction-id").textContent = details.transactionId || details.id;
        document.getElementById("payment-amount").innerHTML = details.price
            ? `&euro;${details.price}`
            : "N/A";
        document.getElementById("payment-description").textContent = description;
        document.getElementById("payment-date").textContent =
            date || formatDateTime();
    }
}

// ==================== INITIALIZATION ====================
async function initializePaymentFlow(e, state, elements) {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentType = urlParams.get("type");
    const paymentDetails = urlParams.get("details");

    // Redirect if no params
    if (!paymentType || !paymentDetails) {
        handleAlert("No Payment Details Gotten, Please Book a Session!", "blur", false, "", true, [{ text: "OK", onClick: () => handleRedirect("/html/main/Session.html", "replace") }]);

        return;
    }

    try {
        // Parse payment details
        const details = JSON.parse(decodeURIComponent(paymentDetails));
        state.txn = details.transactionId || details.id || `TXN-${Date.now()}`;
        const existingPayment = await getPaymentById(state.txn);

        if (existingPayment || details.pending) {
            const paymentToProcess = existingPayment;
            state.details = paymentToProcess;


            if (!paymentToProcess) {
                handleAlert('Payment not found, please try again!', "blur", true, "Not Found", true, [{ text: "OK", onClick: () => handleRedirect('/html/main/User.html', "replace") }]);
                return false;
            }

            // Update state from the stored payment record:::::::
            state.pending = true;
            state.txn = paymentToProcess.id;
            state.selectedMethod = paymentToProcess.method || "paysafe";
            state.amount = paymentToProcess.price;
            state.toPay = paymentToProcess.converted;
            state.currencyCode = paymentToProcess.currency || "EUR";
            state.paymentStatus = paymentToProcess.status || null;
            state.statusMessage = paymentToProcess.statusMessage || "";

            const indexName = paymentToProcess.method == "bank" ? "creditCard" : "safe";
            state.pendingIndex = `${indexName}Index`;

            state[`${indexName}Index`] = state.pendingIndex == "creditCardIndex" ? 1 : paymentToProcess.index;

            // Hide the initial details view as we will poll for results
            if (elements.paymentDetailsDiv) {
                elements.paymentDetailsDiv.style.display = 'none';
            }

            // Start polling for the final status
            const finalPayment = await pollForPaymentStatus(state.txn);
            await showResultScreen(state, elements, finalPayment);

            ///////
            if (paymentToProcess.method && paymentToProcess.method.toLowerCase().includes("credit")) {

                handleMakePaymentClick(e, state, elements);
            }

        } else {
            state.details = details;
            state.paymentType = paymentType.charAt(0).toUpperCase() + paymentType.slice(1);

            let amount;
            if (paymentType === "book") {
                const price = parseFloat(details.price);
                const quantity = parseFloat(details.quantity);

                amount = (price * quantity).toFixed(2);
            } else {
                amount = parseFloat(details.price).toFixed(2);
            }
            const userCountryData = await getUserCountryInfo();
            /////------>>>>>>

            state.txn = details.transactionId || details.id;
            state.amount = amount;
            state.details.price = amount;
            state.currencyCode = userCountryData?.currencyCode || userCountryData?.currency || "EUR";
            state.selectedCurrency = userCountryData?.country || "Euro";
            state.country = userCountryData?.country || "France";

            document.getElementById("payment-details").classList.add("active");
            addDetails(state.details, elements);

            return true;
        }
    } catch (error) {
        console.error("Error parsing payment details:", error);
        handleAlert(`Error parsing payment details because: ${error}`, "blur", false, "", true, [{ text: "OK", onClick: () => handleRedirect("/html/main/Session.html", "replace") }]);

        return false;
    } finally {
        const loader = document.getElementById("loading-section");
        loader?.classList.remove("active");
        loader?.remove();
    }

    // Initialize buttons
    elements.makePaymentBtn.disabled = true;

    // Initialize checks
    checkPaymentMethodSelection(state, elements);
    return true;
}


document.addEventListener("DOMContentLoaded", (e) => {
    handleAuthStateChange(async (user) => {
        if (user) {
            const state = initializeState();
            const elements = cacheDOMElements();
            setupEventListeners(state, elements);

            state.userId = user.uid;
            state.initialContent = elements.paymentDisplay.innerHTML;

            await initializePaymentFlow(e, state, elements);
        } else {
            handleAlert("You must be logged in to make a payment.", "blur", false, "", true, [{ text: "OK", onClick: () => handleRedirect("/html/regs/Signup.html") }]);
        }
    });
});