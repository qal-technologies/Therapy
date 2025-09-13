document.addEventListener("DOMContentLoaded", async (e) => {
    // Initialize state and DOM elements
    const state = initializeState();
    const elements = cacheDOMElements();

    // Setup event listeners
    setupEventListeners(state, elements);

    //saving initial content:
    state.initialContent = elements.paymentDisplay.innerHTML;

    // Initialize payment flow
    await initializePaymentFlow(e, state, elements);
});

// ==================== STATE MANAGEMENT ====================
function initializeState() {
    return {
        methodSelected: false,
        selectedCurrency: "",
        currencyCode: "EUR",
        selectedMethod: "",
        converted: "",
        amount: 0,
        txn: "",
        charge: 0.98,
        toPay: 0,
        creditCardIndex:1,
        creditCardSections: null,
        creditCardError: false,
        creditCardTrials: 0,
        safeIndex: 0,
        paySafeSections: null,
        pending: false,
        pendingIndex: "",
        paymentStatus:"",
        initialContent: "",
        details: "",
        country: "",
        paymentType: "Session",
    };
}

function createCreditCardSections(state) {
    return {
        1: createCreditCardSection1(state),
    };
}

function createPaySafeSections(state) {
    return {
        1: createSafe1(state),
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
    // Payment method selection
    elements.paymentMethodOptions.forEach((option) => {
        option.addEventListener("click", () =>
            handlePaymentMethodClick(option, state, elements)
        );
    });

    // Button actions
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
        console.log(data);

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
    const method = option.querySelector(".option-label").textContent;
    state.methodSelected = true;
    state.selectedMethod = method.toString().replace(" ", "");

    updateSelectionStyles(option, elements.paymentMethodOptions);

    checkPaymentMethodSelection(state, elements);
}


const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

async function handleProceedClick(e, state) {
    e.preventDefault();
    const button = e.target;
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
            }, 500) :
                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = "Proceed to Payment";
                }, 500)
        });
    
   /* console.log(state);*/
}

function handleMakePaymentClick(e, state, elements) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.innerHTML = ` <div class="spinner-container"><div class="spinner"></div></div> Processing...`;

    setTimeout(() => {
        document
            .getElementById("payment-method-section")
            ?.classList.remove("active");
        if (state.currencyCode === "EUR") {
            state.toPay = (
                parseFloat(state.amount) + parseFloat(state.charge)
            ).toFixed(2);
        }

        const method = state.selectedMethod.toLowerCase();

        if (method.includes("credit") && !method.includes("safe")) {
            state.creditCardSections = createCreditCardSections(state);
            handleCreditCard(state, elements);
        } else if (method.includes("safe")) {
            state.paySafeSections = createPaySafeSections(state);
            handlePaySafe(state, elements);
        } else {
            document.getElementById("loading-section")?.classList.add("active");
        }
    }, 2000);
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
                image: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
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

// ==================== CREDIT CARD HANDLING ====================
function handleCreditCard(state, elements) {
    state.creditCardSections = createCreditCardSections(state);
    const currentSection = state.creditCardSections[state.creditCardIndex];

    if (currentSection) {
        elements.paymentDisplay.innerHTML = '';
        elements.paymentDisplay.insertAdjacentHTML('beforeend', currentSection);

        //for choosing anotherr methhod;:
        document.querySelectorAll("span.another-method-button")?.forEach(span => {
            span.addEventListener("click", () => {
                state.creditCardError = false;
                state.detectedBrand = null;
                state.methodSelected = false;
                state.selectedMethod = "";


                elements.paymentDisplay.innerHTML = state.initialContent;

                let element = cacheDOMElements();
                setupEventListeners(state, element);

                document.getElementById("payment-details")?.
                    classList.remove("active")

                document.getElementById("payment-method-section")?.classList.add("active")
            });
        });

        // Add click handlers for CC buttons and inputs
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
                    btn.disabled = state.creditCardTrials > 1 ? true : false;
                    btn.innerHTML = `Pay`;

                    state.creditCardError = true;
                    state.creditCardTrials = state.creditCardTrials + 1;

                    console.log(state.creditCardError);
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
        const isCvvValid = cvv.value.length >= 3 && cvv.value.length <= 4;
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
        });
    }


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

function handlePaySafe(state, elements) {
    state.paySafeSections = createPaySafeSections(state);

    const currentSection = state.paySafeSections[state.safeIndex + 1];

    if (currentSection) {
        elements.paymentDisplay.innerHTML = "";
        elements.paymentDisplay.insertAdjacentHTML("beforeend", currentSection);
    }

}

function checkPaymentMethodSelection(state, elements) {
    if (state.methodSelected) {
        elements.makePaymentBtn.disabled = false;
    }
}

function formatDateTime(date) {
    const now = new Date(date);

    const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
    };

    return (
        now.toLocaleString("en-US", options) +
        " at " +
        now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    );
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
                state.charge = (0.98 * rate).toFixed(2);

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
            alert("An error occured:", error);
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
Your card was declined. ${state.creditCardTrials > 1 ? `<span class="another-method-button">Try another payment method
            </span>` : `Try another credit or debit card.`}
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
                    <input type="text" id="card-number" placeholder="4242 4242 4242 4242" maxlength="19" class="card-input">
                    ${state.detectedBrand ? `<div class="card-icon" style="background: ${cardState.cardBrands.find(b => b.name === state.detectedBrand).pattern}">
                        <img src="${cardState.cardBrands.find(b => b.name === state.detectedBrand).image}" alt="${state.detectedBrand}">
                    </div>` : ''}
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="expiry-date">MM / YY</label>
                    <input type="text" id="expiry-date" placeholder="05 / 25" maxlength="5" class="card-input">
                </div>
                <div class="form-group">
                    <label for="cvv">CVC</label>
                    <input type="text" id="cvv" placeholder="123" maxlength="4" class="card-input">
                </div>
            </div>
            
            <div class="form-group">
                <label for="card-name">Name on card</label>
                <input type="text" id="card-name" placeholder="John Doe" class="card-input">
            </div>
            
           <div class="amount-display">
                <p>Amount to charge: <strong>${getCurrencySymbol(state.currencyCode) || state.currencyCode} ${formatter(state.toPay)}</strong></p>
            </div>
        </div>
         ${state.creditCardTrials > 1 ? `
        <div>
         <span class="another-method-button">Try another payment method
            </span>
            
        </div>
            `: ""}
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
function createSafe1(state) {
    return `<div class="payment-section paysafe-section active" id="paysafe-instructions">
            <div class="paysafe-header">
                <!-- <div class="logo">
                <img src="/src/images/paysafe.png" alt="Paysafe Logo">
            </div> -->
                <h2>How to Pay with Paysafecard</h2>
                <p class="small-text">Simple, Safe & Easy - No Bank Account Needed</p>
            </div>

            <div class="steps">
                <div class="step">
                    <i src="/src/images/logo.jpg" class="bi bi-bag-fill" alt=""></i>
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
                    <i src="/src/images//logo.jpg"  class="bi bi-receipt" alt=""></i>
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
                    <i src="/src/images//logo.jpg" alt="" class="bi bi-phone-lock"></i>
                    <div class="step-text">
                
                        <p class="step-header">Step 3: <br />
                            Enter Your Code Online
                        </p>
                
                    <p class="step-text-under">
                        On the next screen, type the 16-digit code from your receipt (example: 1234 5678 9012 3456). Then click “Pay Now with Paysafecard".You will see an almost instant confirmation once the payment is done.
                    </p>
                    </div>
                </div>
            </div>

            <div class="proceed-div">
                <button class="continue-btn">Continue</button>
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
            : details.description || "No description";

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
    document.getElementById("payment-details").classList.add("active");

    let payments;
    //Get Payment data
    const gotten = localStorage.getItem("payments");
    payments = JSON.parse(gotten) || {};



    const urlParams = new URLSearchParams(window.location.search);
    const paymentType = urlParams.get("type");
    const paymentDetails = urlParams.get("details");

    // Redirect if no params
    if (!paymentType || !paymentDetails) {
        alert("No Payment Details Gotten, Please Book a Session!");
        window.location.replace("/html/main/Session.html");
        return;
    }


    try {
        // Parse payment details
        const details = JSON.parse(decodeURIComponent(paymentDetails));
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

        if (paymentType === "pending") {
            const paymentID = details.id;

            const pendingPayment = payments.find(payment => {
                return payment.id === paymentID;
            });

            if (!pendingPayment) {
                alert('Payment not found, Please try again!');
                console.log("Payment not found, Please try again!");

                window.location.replace('/html/main/User.html');
            }

            state.txn = paymentID;
            state.pending = true;
            state.selectedMethod = pendingPayment?.method || "paysafe";
            state.amount = pendingPayment?.price;
            state.toPay = pendingPayment?.converted;
            state.currencyCode = pendingPayment?.currency || "EUR";
            state.paymentStatus = pendingPayment?.status;



            const indexName = pendingPayment.method == "bank" ? "creditCard" : "safe";
            state.pendingIndex = `${indexName}Index`;

            state[`${indexName}Index`] = state.pendingIndex == "creditCardIndex" ? 1 : pendingPayment.index - 1;

            elements.paymentDetailsDiv.remove();

            handleMakePaymentClick(e, state, elements);
        }

        state.txn = details.transactionId;
        state.amount = amount;

        state.details.price = amount;

        addDetails(state.details, elements);

        const userCountryData = await getUserCountryInfo();

        state.currencyCode = userCountryData?.currencyCode || userCountryData?.currency || "EUR";
        state.selectedCurrency = userCountryData?.country || "Euro";
        state.country = userCountryData?.country || "France";

        console.log(state);
    } catch (error) {
        console.error("Error parsing payment details:", error);
        window.location.replace("/html/main/Session.html");
        return;
    }

    // Initialize buttons
    elements.makePaymentBtn.disabled = true;

    // Initialize checks
    checkPaymentMethodSelection(state, elements);
}
