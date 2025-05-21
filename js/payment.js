document.addEventListener("DOMContentLoaded", () => {
    // Initialize state and DOM elements
    const state = initializeState();
    const elements = cacheDOMElements();

    // Setup event listeners
    setupEventListeners(state, elements);

    // Initialize payment flow
    initializePaymentFlow(state, elements);
});

// ==================== STATE MANAGEMENT ====================
function initializeState() {
    return {
        currencySelected: false,
        methodSelected: false,
        selectedCurrency: "",
        currencyCode: "EUR",
        selectedMethod: "",
        converted: "",
        amount: 0,
        txn: "",
        charge: 0.98,
        toPay: 0,
        creditCardIndex: 0,  
        paypalIndex: 0,
        cardIndex: 0,
        senderName: "",
        senderName: "",
        paymentStatus: null,
        creditCardSection: null,
        paypalSections: null,
        BankSection: null,
        paymentTimer: null,
    };
}

function createCreditCardSections(state) {
    return {
        1: createCreditCardSection1(state),
        2: createCreditCardSection2(state),
        3: createCreditCardSection3(state)
    };
}

function createPaypalSections(state) {
    return {
        1: createPaypalSection1(),
        2: createPaypalSection2(state),
        3: createPaypalSection3(state),
        4: createPaypalSection4(),
        5: createPaypalSection5(state),
    };
}

function createBankSection(state) {
    return {
        1: createBankSection1(),
        2: createBankSection2(state),
        3: createBankSection3(state),
        4: createBankSection4(),
        5: createBankSection5(state),
    };
}

// ==================== DOM CACHING ====================
function cacheDOMElements() {
    return {
        currencyContinueBtn: document.getElementById("currency-continue"),
        makePaymentBtn: document.getElementById("make-payment-btn"),
        usdOption: document.getElementById("usd-option"),
        usdDropdown: document.getElementById("usd-dropdown"),
        currencyOptions: document.querySelectorAll(
            "#currency-section .option-item"
        ),
        currencyDropdownItems: document.querySelectorAll(".currency-dropdown-item"),
        paymentMethodOptions: document.querySelectorAll(
            "#payment-method-section label.option-item"
        ),
        currencyCode: document.querySelector("span.choosen-currency-code"),
        convertedText: document.querySelector("h2.converted"),
        titleDiv: document.querySelector(
            "#conversion-section .option-list p.title"
        ),
        paymentDisplay: document.querySelector("section#display.parent"),
    };
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners(state, elements) {
    // Currency selection
    elements.usdOption.addEventListener("click", (e) =>
        handleUsdOptionClick(e, state, elements)
    );
    elements.currencyDropdownItems.forEach((item) => {
        item.addEventListener("click", () =>
            handleCurrencyDropdownClick(item, state, elements)
        );
    });
    elements.currencyOptions.forEach((option) => {
        option.addEventListener("click", (e) =>
            handleCurrencyOptionClick(e, option, state, elements)
        );
    });

    // Payment method selection
    elements.paymentMethodOptions.forEach((option) => {
        option.addEventListener("click", () =>
            handlePaymentMethodClick(option, state, elements)
        );
    });

    // Button actions
    document
        .getElementById("proceed-button")
        ?.addEventListener("click", (e) => handleProceedClick(e));
    elements.currencyContinueBtn?.addEventListener("click", (e) =>
        handleCurrencyContinueClick(e, state, elements)
    );
    document
        .getElementById("choose-method-btn")
        ?.addEventListener("click", (e) => handleChooseMethodClick(e));
    elements.makePaymentBtn?.addEventListener("click", (e) =>
        handleMakePaymentClick(e, state, elements)
    );
}

// ==================== EVENT HANDLERS ====================
function handleUsdOptionClick(e, state, elements) {
    if (!e.target.closest(".currency-dropdown-item")) {
        document
            .querySelector(".currency-option-container")
            .classList.toggle("open");
        elements.usdDropdown.classList.toggle("show");
        state.currencySelected = true;
    }
}

function handleCurrencyDropdownClick(item, state, elements) {
    const code = item.querySelector(".currency-code")?.textContent;
    const currency =
        item.querySelector("p")?.textContent ||
        item.textContent.trim().split(" ").slice(1).join(" ");

    const optionLabel = elements.usdOption.querySelector(".option-label");
    optionLabel.innerHTML = `${currency} <span class="option-subtext">${code}</span>`;

    updateCurrencyState(state, code, currency);
    closeCurrencyDropdown(elements);
    updateSelectionStyles(elements.usdOption, elements.currencyOptions);
    checkCurrencySelection(state, elements);
}

function handleCurrencyOptionClick(e, option, state, elements) {
    if (option === elements.usdOption || e.target.closest(".currency-dropdown"))
        return;

    if (
        option !== elements.usdOption &&
        !e.target.closest(".currency-dropdown")
    ) {
        const code = option.querySelector(".option-subtext")?.textContent || "";
        const currency =
            option.querySelector(".option-label")?.textContent ||
            option.textContent.trim().split(" ").slice(1).join(" ");

        updateSelectionStyles(option, elements.currencyOptions);
        updateCurrencyState(state, code, currency);

        closeCurrencyDropdown(elements);
        checkCurrencySelection(state, elements);
    }
}

function handlePaymentMethodClick(option, state, elements) {
    const method = option.querySelector(".option-label").textContent;
    state.methodSelected = true;
    state.selectedMethod = method.toString().replace(" ", "");

    updateSelectionStyles(option, elements.paymentMethodOptions);

    checkPaymentMethodSelection(state, elements);
}

function handleProceedClick(e) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.textContent = "Processing...";

    setTimeout(() => {
        document.getElementById("payment-details")?.classList.remove("active");
        document.getElementById("currency-section")?.classList.add("active");
        button.disabled = false;
        button.textContent = "Proceed to Payment";
    }, 2000);
}

async function handleCurrencyContinueClick(e, state, elements) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.textContent = "Converting...";

    try {
        if (state.currencyCode !== "EUR") {
            await convertCurrency(state, elements);
        } else {
            // Skip conversion for EUR
            document.getElementById("currency-section")?.classList.remove("active");
            document
                .getElementById("payment-method-section")
                ?.classList.add("active");
        }
    } catch (error) {
        console.error("Conversion error:", error);
        elements.titleDiv.innerHTML = "Error: Conversion service unavailable";

        document.getElementById("currency-section")?.classList.remove("active");
        document.getElementById("conversion-section")?.classList.add("active");
        document.getElementById("choose-method-btn").disabled = true;
    } finally {
        button.disabled = false;
        button.textContent = "Continue";
    }
}

function handleChooseMethodClick(e) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.textContent = "Redirecting...";

    setTimeout(() => {
        document.getElementById("conversion-section")?.classList.remove("active");
        document.getElementById("payment-method-section")?.classList.add("active");
        button.disabled = false;
        button.textContent = "Choose Method";
    }, 2000);
}

function handleMakePaymentClick(e, state, elements) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.textContent = "Processing...";

    setTimeout(() => {
        document
            .getElementById("payment-method-section")
            ?.classList.remove("active");
        if (state.currencyCode === "EUR") {
            state.toPay = (
                parseFloat(state.amount) + parseFloat(state.charge)
            ).toFixed(2);
        }

        if (state.selectedMethod === "PayPal") {
            state.paypalSections = createPaypalSections(state);
            handlePaypal(state, elements);
        } else if (state.selectedMethod.includes("Bank")) {
            state.BankSection = createBankSection(state);
            handleBank(state, elements);
        } else if (state.selectedMethod.includes("Credit")) {
            state.creditCardSections = createCreditCardSections(state);
            handleCreditCard(state, elements);
        }
        else {
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

// =============
// ===========
// ====P====

// ==================== CREDIT CARD HANDLING ====================
function handleCreditCard(state, elements) {
    state.creditCardSections = createCreditCardSections(state);
    const currentSection = state.creditCardSections[state.creditCardIndex + 1];

    if (currentSection) {
        elements.paymentDisplay.innerHTML = '';
        elements.paymentDisplay.insertAdjacentHTML('beforeend', currentSection);

        // Add click handlers for CC buttons
        document.querySelectorAll(".cc-btn").forEach(btn => {
            btn.addEventListener('click', () => {
                state.creditCardIndex++;

                // Handle form submission on last section
                if (state.creditCardIndex + 1 === Object.keys(state.creditCardSections).length) {
                    processCreditCardPayment(state);
                }

                handleCreditCard(state, elements);
            });
        });

        // Add input formatting for credit card fields
        if (state.creditCardIndex + 1 === 2) {
            setupCreditCardInputs();
        }
    }
}

function setupCreditCardInputs(state) {
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('card-name');
    const submitBtn = document.querySelector('#credit-card-details .cc-btn');

    function validateInputs() {
        const isCardValid = cardNumber.value.replace(/\s/g, '').length === 16;
        const isExpiryValid = /^\d{2}\/\d{2}$/.test(expiryDate.value);
        const isCvvValid = cvv.value.length >= 3 && cvv.value.length <= 4;
        const isNameValid = cardName.value.trim().length > 0;

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
            validateInputs();
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

function processCreditCardPayment(state) {
    // In a real app, you would process the payment here
    // This is just a simulation
    setTimeout(() => {
        state.paymentStatus = true; // or false if payment failed
        showPaymentResult(state);
    }, 3000);
}

function showPaymentResult(state) {
    const processingSection = document.getElementById('credit-card-processing');
    if (processingSection) {
        processingSection.innerHTML = `
            <div class="cc-header">
                <i class="far fa-credit-card"></i>
                <h2>Payment ${state.paymentStatus ? 'Successful' : 'Failed'}</h2>
            </div>
            <div class="payment-result">
                <div class="icon">
                    <i class="fas ${state.paymentStatus ? 'fa-check-circle success' : 'fa-times-circle failure'}"></i>
                </div>
                <p>${state.paymentStatus ? 'Your payment was processed successfully!' : 'There was an error processing your payment.'}</p>
                <div class="transaction-details">
                    <p>Amount: ${getCurrencySymbol(state.currencyCode)}${state.toPay}</p>
                    <p>Transaction ID: ${state.txn}</p>
                </div>
                <div class="proceed-div">
                    <button class="continue-btn" onclick="window.location.href='/html/main/User.html'">
                        ${state.paymentStatus ? 'Continue' : 'Try Again'}
                    </button>
                </div>
            </div>
        `;
    }
}



// =============
// ===========
// ====PAS====

// ==================== PAYPAL HANDLING ====================
function handlePaypal(state, elements) {
    state.paypalSections = createPaypalSections(state);

    const currentSection = state.paypalSections[state.paypalIndex + 1];

    if (currentSection) {
        // Clear and render new section
        elements.paymentDisplay.innerHTML = "";
        elements.paymentDisplay.insertAdjacentHTML("beforeend", currentSection);

        // Add click handlers for PayPal buttons
        document.querySelectorAll(".paypal-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                state.paypalIndex++;
                handlePaypal(state, elements);
            });
        });

        document.querySelectorAll(".copy").forEach((btn) => {
            btn.addEventListener("click", (e) => handleCopyClick(e, state));
        });

        if (state.paypalIndex + 1 === 4) {
            setupUploadSection(state);
        }

        // Start countdown timer when section 3 is shown
        if (state.paypalIndex + 1 === 3) {
            startPaymentTimer(state);
        }
    } else {
        // Handle completion
        if (state.paymentStatus === false) {
            showPaymentError();
        } else {
            showPaymentSuccess();
        }
    }
}

// =============
// ===========
// ====Q====


// ==================== BANK HANDLING ====================
function handleBank(state, elements) {
    state.BankSection = createBankSection(state);

    const currentSection = state.BankSection[state.cardIndex + 1];

    if (currentSection) {
        // Clear and render new section
        elements.paymentDisplay.innerHTML = "";
        elements.paymentDisplay.insertAdjacentHTML("beforeend", currentSection);

        // Add click handlers for PayPal buttons
        document.querySelectorAll(".card-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                state.cardIndex++;
                handleBank(state, elements);
            });
        });

        document.querySelectorAll(".card-section .copy").forEach((btn) => {
            btn.addEventListener("click", (e) => handleCopyClick(e, state));
        });

        document.querySelectorAll(".view-details").forEach(btn => {
            btn.addEventListener("click", () => showDetails());
        });

        if (state.cardIndex + 1 === 4) {
            setupUploadSection(state);
        }

        // Start countdown timer when section 3 is shown
        if (state.cardIndex + 1 === 3) {
            startPaymentTimer(state);
        }
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

    const textToCopy = state.selectedMethod == "PayPal" ? isEmail
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

        continueBTN.disabled = true;
        if (uploaded && value !== "") {
            continueBTN.disabled = false;
        }
    });
}

function startPaymentTimer(state) {
    let timeout = state.selectedMethod.includes("Bank") ? 120 : 30;

    let timeLeft = timeout * 60;

    const timerElement = document.getElementById("payment-timer");

    if (state.paymentTimer) {
        clearInterval(state.paymentTimer);
    }

    // Update timer immediately
    updateTimerDisplay(timerElement, timeLeft);

    // Start countdown
    state.paymentTimer = setInterval(() => {
        timeLeft--;

        // Update display
        updateTimerDisplay(timerElement, timeLeft);

        // Handle timer completion
        if (timeLeft <= 0) {
            clearInterval(state.paymentTimer);
            timerExpired(state);
        }

        if (state.paymentStatus === false) {
            showPaymentError();
        } else if (state.paymentStatus === true) {
            showPaymentSuccess();
        }
    }, 1000);
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

    // Format as MM:SS with leading zeros
    element.textContent = timeString;

    // Add warning class when under 5 minutes
    if (seconds <= 300) {
        // 5 minutes = 300 seconds
        element.classList.add("warning");
    } else {
        element.classList.remove("warning");
    }
}

function timerExpired(state) {
    // Disable the payment button
    const paymentBtn = document.querySelector("#fandf .paypal-btn");
    if (paymentBtn) {
        paymentBtn.disabled = true;
        paymentBtn.textContent = "Time Expired";
        paymentBtn.style.backgroundColor = "#dc3545";
    }

    // Show an alert or notification
    alert("Payment time has expired. Please start a new payment session.");

    // You could also automatically redirect or reset the flow
    // window.location.href = '/payment-timeout.html';
}

function showPaymentSuccess() {
    document
        .getElementById("paypal-processing")
        .querySelector(".processing").style.display = "none";
    document
        .getElementById("paypal-processing")
        .querySelector(".outcome").style.display = "flex";
}

function showPaymentError() {
    const outcome = document
        .getElementById("paypal-processing")
        .querySelector(".outcome");
    outcome.querySelector(".icon i").className = "fa-solid fa-circle-xmark";
    outcome.querySelector(".display-title").textContent = "Payment Unsuccessful";
    outcome.querySelector(".icon i").style.color = "#dc3545";

    document
        .getElementById("paypal-processing")
        .querySelector(".processing").style.display = "none";
    outcome.style.display = "flex";
}

// ==================== HELPER FUNCTIONS ====================
function updateCurrencyState(state, code, currency) {
    state.currencySelected = true;
    state.currencyCode = code;
    state.selectedCurrency = currency;
}

function closeCurrencyDropdown(elements) {
    document.querySelector(".currency-option-container").classList.remove("open");
    elements.usdDropdown.classList.remove("show");
}

function updateSelectionStyles(selectedOption, allOptions) {
    allOptions.forEach((opt) => opt.classList.remove("selected"));
    selectedOption.classList.add("selected");
}

function checkCurrencySelection(state, elements) {
    if (state.currencySelected) {
        elements.currencyContinueBtn.disabled = false;
    }
}

function checkPaymentMethodSelection(state, elements) {
    if (state.methodSelected) {
        elements.makePaymentBtn.disabled = false;
    }
}

async function convertCurrency(state, elements) {
    const EXCHANGE_RATE_API = "https://api.exchangerate-api.com/v4/latest/EUR";
    const response = await fetch(EXCHANGE_RATE_API);
    const data = await response.json();
    const rates = data.rates;

    if (state.currencyCode && state.currencyCode in rates) {
        const rate = rates[state.currencyCode];
        state.converted = (state.amount * rate).toFixed(2);
        state.charge = (0.98 * rate).toFixed(2);

        state.toPay =
            state.currencyCode === "EUR"
                ? (parseFloat(state.amount) + parseFloat(state.charge)).toFixed(2)
                : (parseFloat(state.converted) + parseFloat(state.charge)).toFixed(2);

        updateConversionUI(state, elements);
    } else {
        elements.titleDiv.innerHTML = "Currency conversion not available";
    }

    document.getElementById("currency-section")?.classList.remove("active");
    document.getElementById("conversion-section")?.classList.add("active");
}

function updateConversionUI(state, elements) {
    const symbol = {
        EUR: "€",
        USD: "$",
        CAD: "$",
        AUD: "$",
        GBP: "£",
        CHF: "₣",
    };

    elements.titleDiv.innerHTML = `
        <span class="initial-amount">${state.amount} <span class="choosen-currency-code">EUR</span></span> 
        <i class="fas fa-exchange-alt"></i> 
        <span class="converted-amount">${state.converted} <span class="choosen-currency-code">${state.currencyCode}</span></span>
    `;

    elements.currencyCode.textContent = state.currencyCode;
    elements.convertedText.innerHTML = `
        ${symbol[state.currencyCode]} ${state.converted
        } <span class="choosen-currency-code">${state.currencyCode}</span>
    `;
}

function showDetails() {
    const detailsDiv = document.querySelector(".payment-info#processing-details");
    const button = document.querySelector(".view-details");

    if (detailsDiv && button) {
        const isShowing = detailsDiv.classList.contains("show");
        detailsDiv.classList.toggle("show");
        button.textContent = isShowing ? "View Details" : "Hide Details";
    }
}

// ==================== CARD SECTION TEMPLATES ====================
function createCreditCardSection1(state) {
    return `
    <div class="payment-section credit-card-section active" id="credit-card-first">
        <div class="cc-header method-header">
        <div class="logo">
            <i class="far fa-credit-card"></i>
            </div>
            <p>Credit/Debit Card Payment</p>
        </div>

        <div class="cc-instructions">
            <p>Please have your card ready. We accept:</p>
            <div class="cc-icons">
                <i class="fab fa-cc-visa"></i>
                <i class="fab fa-cc-mastercard"></i>
                <i class="fab fa-cc-amex"></i>
                <i class="fab fa-cc-discover"></i>
            </div>
        </div>

        <div class="cc-instructions ul">
            <p>You'll need your:</p>
            <ul class="card-ul">
            <li>Card number</li>
                <li>Expiration date</li>
                <li>CVV</li>
            </ul>
                <p style="margin-top:10px;">A <strong style="color:#003087; font-size:18px;">${getCurrencySymbol(state.currencyCode)}${state.charge}</strong> processing fee will be added</p>

        </div>

        <div class="proceed-div">
            <button class="continue-btn cc-btn">Continue to Payment</button>
        </div>
    </div>`;
}

function createCreditCardSection2(state) {
    return `
    <div class="payment-section credit-card-section active" id="credit-card-details">
         <div class="cc-header method-header">
        <div class="logo">
            <i class="far fa-credit-card"></i>
            </div>
            <p>Card Details</p>
        </div>

        <div class="cc-form">
         <div class="form-group cc-icons">
                <i class="fab fa-cc-visa"></i>
                <i class="fab fa-cc-mastercard"></i>
                <i class="fab fa-cc-amex"></i>
                <i class="fab fa-cc-discover"></i>
            </div>

            <div class="form-group">
                <label for="card-number">Card Number</label>
                <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19" class="card-input">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="expiry-date">Expiration Date</label>
                    <input type="text" id="expiry-date" placeholder="MM/YY" maxlength="5" class="card-input">
                </div>
                <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="123" maxlength="4" class="card-input">
                </div>
            </div>
            <div class="form-group">
                <label for="card-name">Name on Card</label>
                <input type="text" id="card-name" placeholder="John Smith" class="card-input">
            </div>
            <div class="amount-display">
                <p>Amount to charge: <span style="font-family:PoppinsSemi;">${getCurrencySymbol(state.currencyCode)}${state.toPay}</span></p>
            </div>
        </div>
        <div class="proceed-div">
            <button class="continue-btn cc-btn" disabled>Submit Payment</button>
        </div>
    </div>`;
}

function createCreditCardSection3(state) {
    return `
    <div class="payment-section credit-card-section active" id="credit-card-processing">
         <div class="cc-header method-header">
        <div class="logo">
            <i class="far fa-credit-card"></i>
            </div>
            <p>Processing Payment</p>
        </div>

        <div class="processing-content">
            <div class="loading-spinner"></div>
            <p>Please wait while we process your payment...</p>
        </div>

        <p>TRANSACTION ID: <span>${state.txn}</span></p>
    </div>`;
}

// ==================== PAYPAL SECTION TEMPLATES ====================
function createPaypalSection1() {
    return `
    <div class="payment-section paypal-section active" id="paypal-first">
        <div class="paypal-header">
            <div class="logo">
                <img src="/src/images/paypal.png" alt="paypal-logo">
            </div>
            <p class="text">Pay<span class="second">Pal</span></p>
        </div>
        <h2>To pay successfully</h2>
        <ul>
            <li>Transfer the exact amount showed in the session type you selected</li>
            <li>Make the payment within 30 minutes of generating your one-off beneficiary details</li>
            <li>After payment upload a Screenshot or receipt of the payment</li>
            <li>Only click Pay Now when you are all set to make the transfer.</li>
        </ul>
        <div class="proceed-div">
            <button class="continue-btn paypal-btn">Pay Now</button>
        </div>
    </div>`;
}

function createPaypalSection2(state) {
    const symbol = getCurrencySymbol(state.currencyCode);
    const amount = state.currencyCode === "EUR" ? state.amount : state.converted;
    const total = state.toPay;

    return `
    <div class="payment-section paypal-section active" id="paypal-amount-to-pay">
        <div class="paypal-header">
            <div class="logo">
                <img src="/src/images/paypal.png" alt="paypal-logo">
            </div>
            <p class="text">Pay<span class="second">Pal</span></p>
        </div>
        <p class="once">Once you continue, we'll redirect you to our trusted payment provider to complete your deposit.</p>
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
            <button class="continue-btn paypal-btn">CONTINUE</button>
        </div>
    </div>`;
}

function createPaypalSection3(state) {
    const symbol = getCurrencySymbol(state.currencyCode);
    const amount = state.toPay;

    return `
    <div class="payment-section paypal-section active" id="fandf">
        <div class="paypal-header">
            <div class="logo">
                <img src="/src/images/paypal.png" alt="paypal-logo">
            </div>
            <p class="text">Pay<span class="second">Pal</span></p>
        </div>
        <h1>PayPal Payment (F&F)</h1>
        <p class="fandf-text">Use this email and amount to send via PayPal Family & Friends only</p>
        <div class="payment-info">
            <div class="info-div">
                <div class="left">
                    <p class="info-title">Email to Pay:</p>
                    <p class="info-text">paynowfunds@gmail.com</p>
                </div>
                <button class="copy">Copy Email</button>
            </div>
            <div class="info-div">
                <div class="left">
                    <p class="info-title">Amount:</p>
                    <p class="info-text">${symbol}${amount}</p>
                </div>
                <button class="copy">Copy Amount</button>
            </div>
        </div>
        <div class="important">
            <p><strong>Important:</strong></p>
            <ol>
                <li>Go to your PayPal account.</li>
                <li>Choose <strong>Send</strong> > select <strong>Friends & Family</strong> (not Goods/Services).</li>
                <li>Enter the<strong> email and amount</strong> exactly.</li>
                <li>Add no <strong>note/message</strong>.</li>
                <li>Complete the transaction.</li>
            </ol>
        </div>
               <p class="expiry">This payment link/account expires in: <span class="timeout" id="payment-timer">30:00</span></p>

        <div class="proceed-div">
            <button class="continue-btn paypal-btn">I HAVE MADE MY PAYMENT</button>
            <p style="text-align: center; font-size: 12px; margin-top: 5px;">(Click only after sending payment successfully)</p>
        </div>
    </div>`;
}

function createPaypalSection4() {
    return `
    <div class="payment-section paypal-section active" id="paypal-upload">
        <div class="paypal-header">
            <div class="logo">
                <img src="/src/images/paypal.png" alt="paypal-logo">
            </div>
            <p class="text">Pay<span class="second">Pal</span></p>
        </div>
        <h2 class="upload-title">Upload Payment Receipt</h2>
        <p class="upload-text">
            Upload a receipt or screenshot and enter the name of the PayPal account that sent the payment.</p>
        <div class="upload-section">
            <p><strong>Payment Receipt</strong></p>
                <input type="file" id="receipt-upload" style="display: none;" accept="image/*,.pdf">
            <div class="upload-box" id="upload-trigger">
                <p id="add-button" >+</p>
                <p>Upload File</p>
            </div>

  <div class="upload-feedback moveUpNfadeIn" style="display: none;">
                <p class="file-name"></p>
                <p class="upload-success">File uploaded successfully!</p>
            </div>

        </div>
        <div class="sender-name">
            <p><strong>Sender Name</strong></p>
           <input type="text" id="sender-name-input" placeholder="Enter sender's name">
        </div>
        <div class="proceed-div">
            <button class="continue-btn paypal-btn" disabled>SUBMIT RECEIPT</button>
        </div>
    </div>`;
}

function createPaypalSection5(state) {
    const iconClass =
        state.paymentStatus === false ? "fa-circle-xmark" : "fa-circle-check";
    const iconColor =
        state.paymentStatus === false ? "color: #dc3545;" : "color: #28a745;";


    function formatDateTime() {
        const now = new Date();

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

    return `
    <div class="payment-section paypal-section active" id="paypal-processing">
        <div class="paypal-header">
            <div class="logo">
                <img src="/src/images/paypal.png" alt="paypal-logo">
            </div>
            <p class="text">Pay<span class="second">Pal</span></p>
        </div>

        <div class="paypal-display">
            <div class="display-inner processing">
                <p class="display-title">Processing Payment...</p>
                <div class="loading-spinner"></div>
                <p class="under">Please wait while we process your payment.</p>
            </div>
            <div class="display-inner outcome" style="display: none;">
                <div class="icon"><i class="fa-solid ${iconClass}" style="${iconColor}"></i></div>
                <p class="display-title">${state.paymentStatus === false
            ? "Payment Declined"
            : "Payment Successful"
        }</p>
                <div class="inner-bottom">
                    <p class="display-title-price">0.00</p>
                    <p class="transaction-id">Transaction ID: <span class="id-text">${state.txn
        }</span></p>
                </div>
                <div class="divider"></div>
                <div class="proceed-div">
                    <a class="continue-btn" id="return" href="/html/main/User.html">Return to Dashboard</a>
                    <p class="completed-time">Completed on <span class="main-time">${formatDateTime()}</span></p>
                </div>
            </div>
        </div>
    </div>`;
}



// ==================== BANK TRANSFER SECTION TEMPLATES ====================
function createBankSection1() {
    return `
    <div class="payment-section card-section active" id="paypal-first">
        <div class="method-header">
            <div class="logo">
                           <i class="fas fa-university"></i>
            </div>
            <p class="text">Bank Transfer</p>
        </div>
        <h2>Secure your Session Payment</h2>
        <p style="margin-bottom:5px;">To ensure a smooth and successful transaction:</p>

        <ul>
            <li>Transfer the exact amount displayed for your session</li>
            <li>Complete payment within <b>2 hours</b> of receiving your account details</li>
            <li>Upload a clear Screenshot or receipt of the payment</li>
            <li>Click <b>Pay Securely Now</b> only when you're ready to transfer</li>
        </ul>
        <div class="proceed-div">
            <button class="continue-btn card-btn">Pay Securely Now</button>
        </div>
    </div>`;
}

function createBankSection2(state) {
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

function createBankSection3(state) {
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

function createBankSection4() {
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

function createBankSection5(state) {
    const iconClass =
        state.paymentStatus === false ? "fa-circle-xmark" : "fa-circle-check";
    const iconColor =
        state.paymentStatus === false ? "color: #dc3545;" : "color: #28a745;";


    const symbol = getCurrencySymbol(state.currencyCode);
    const transAmount = state.toPay;
    const status = state.paymentStatus == null ? "Processing..." : state.paymentStatus == true ? "VERIFIED" : "NOT VERIFIED";




    function formatDateTime() {
        const now = new Date();

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

    return `
    <div class="payment-section card-section active" id="paypal-processing">
        <div class="method-header">
            <div class="logo">
                            <i class="fas fa-university"></i>
            </div>
        </div>


         <div class="payment-info hide" id="processing-details">
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

        <div class="paypal-display">
            <div class="display-inner processing">
                <p class="display-title">Processing Transfer...</p>
                <div class="loading-spinner"></div>
                <p class="under">Processing your bank transfer.<br/> This may take a few seconds.</p>
            </div>
            <div class="display-inner outcome" style="display: none;">
                <div class="icon"><i class="fa-solid ${iconClass}" style="${iconColor}"></i></div>
                <p class="display-title">${state.paymentStatus === false
            ? "Payment Declined"
            : "Payment Successful"
        }</p>
                <div class="inner-bottom">
                    <p class="display-title-price">0.00</p>
                    <p class="transaction-id">Transaction ID: <span class="id-text">${state.txn
        }</span></p>
                </div>
                <div class="divider"></div>
            </div>
                <div class="proceed-div">
                                    <button class="util-btn cancel">Cancel Transfer</button>

                           <button class="util-btn view-details">View Details</button>
                </div>
        </div>
    </div>`;
}

// ==================== INITIALIZATION ====================
function initializePaymentFlow(state, elements) {
    document.getElementById("payment-details").classList.add("active");

    const urlParams = new URLSearchParams(window.location.search);
    const paymentType = urlParams.get("type");
    const paymentDetails = urlParams.get("details");

    // Redirect if no params
    if (!paymentType || !paymentDetails) {
        alert("No Payment Details Gotten, Please Book a Session!");
        window.location.href = "/html/main/Session.html";
        return;
    }

    try {
        // Parse payment details
        const details = JSON.parse(decodeURIComponent(paymentDetails));
        const language = navigator.language;

        // Generate transaction ID
        const transactionId = `TXN-${Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase()}-${language.substring(0, 2).toUpperCase()}`;

        state.txn = transactionId;
        state.amount = details.price;

        const description =
            details.type === "session"
                ? `${details.title.toUpperCase()} - Hours with Charlotte Casiraghi`
                : details.description || "No description";

        document.getElementById("transaction-id").textContent = transactionId;
        document.getElementById("payment-amount").innerHTML = details.price
            ? `&euro;${details.price.toFixed(2)}`
            : "N/A";
        document.getElementById("payment-description").textContent = description;
        document.getElementById("payment-date").textContent =
            details.date || new Date().toLocaleDateString();
    } catch (error) {
        console.error("Error parsing payment details:", error);
        window.location.href = "/html/main/Session.html";
        return;
    }

    // Initialize buttons
    elements.currencyContinueBtn.disabled = true;
    elements.makePaymentBtn.disabled = true;

    // Initialize checks
    checkCurrencySelection(state, elements);
    checkPaymentMethodSelection(state, elements);
}
