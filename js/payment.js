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
        giftCardIndex: 0,
        safeIndex: 0,
        senderName: "",
    
        paymentStatus: null,
        creditCardSections: null,
        creditCardError: false,
        paypalSections: null,
        bankSections: null,
        redeemSections: null,
        paySafeSections: null,
        cardAmount: 0,
        paymentTimer: null,
        pending: false,
        pendingIndex: "",
        initialContent: "",
        details: "",
        country: "",
        giftCardTutorial: {
            currentStep: 0,
            type: "store",
            online: [
                {
                    image: "/src/images/online-1.jpg",
                    title: "Step 1: Visit a Trusted Gift Card Website",
                    description: `Start by visiting a secure and trusted website in your country where digital gift cards are sold. Look for reputable platforms that list Steam, Apple, and Razer Gold cards. Before proceeding, always check that: The web address begins with “https://”
A padlock icon appears in the address bar, confirming it’s secure. Once you’re sure the site is legitimate, browse the available cards and choose your preferred option.`
                },
                {
                    image: "/src/images/online-2.jpg",
                    title: "Step 2: Choose the Gift Card Type",
                    description: `From the available options on the secure website, select your preferred gift card. Only choose from the accepted brands: Steam, Apple, or Razer Gold.
                    
Before continuing, make sure:
The card clearly displays the correct value (e.g., $50, £50, €50, or your local currency equivalent). The brand logo is correct and matches the one you need. In the example shown, the user selects a $50 Apple card, but you can choose any of the accepted brands based on your preference.`
                },
                {
                    image: "/src/images/online-3.jpg",
                    title: "Step 3: Enter Payment Details Securely",

                    description: `Once you reach the secure payment page, enter your credit or debit card information, including:
<br/>
> Card number
<br/>
> Expiration date
<br/>
> CVV/security code (the 3-digit code on the back of your card)
<br/>
> Billing address
<br/><br/>

Double-check that all details are correct beforproceeding.
<br/>
Click the Continue or Pay button to confirm your payment.<br/>
Always make sure the website is secure (look for “https://” and a padlock icon in the address bar) before entering any personal or payment information.`
                },
                {
                    image: "/src/images/online-4.jpg",
                    title: "Step 4: Payment Confirmation Screen",
                    description: `After completing your payment, you’ll see a confirmation message on the website, such as “Thank you for your order.”
<br/>
You should also receive a confirmation email containing your purchase details. If there’s an option to returto the order page or view more details, you can clicit to check the status of your purchase. Next, open your email inbox and look for the confirmation email. Inside, you’ll find your digital gift card code or instructions on how to access it.`
                },
                {
                    image: "/src/images/online-5.jpg",
                    title: "Step 5: Open Your Email and Copy the Gift Card Code",
                    description: "You’ll receive an email with your digital gift card code. This code is required to redeem your gift card on our redeem code payment method. Carefully copy the code exactly as it appears in the email to avoid errors. Keep the email saved in a safe place in case you need to refer to it again later. Once you have the code, you can proceed to our redeem code payment method to activate and use your gift card balance."
                }
            ],
            store: [
                {
                    image: "/src/images/store-1.jpg",
                    title: "Step 1: Walk Into the Store",
                    description: "Start the physical gift card process by walking into a major retail store, supermarket, or electronics shop in your country. Look for well-known chains or local stores that sell gift cards,these can often be found in supermarkets, convenience stores, tech shops, bookstores, or department stores. Most places have a dedicated section for gift cards, usually located near the electronics area, the checkout counters, or the prepaid card display. Once inside, simply head to that section to browse the available options."
                },
                {
                    image: "/src/images/store-2.jpg",
                    title: "Step 2: Locate the Gift Card Section and Select an Accepted Card",
                    description: `Inside the store, head to the area where gift cards are displayed. This is often a dedicated rack or wall near the electronics section, the checkout counters, or the customer service desk. You’ll find many brands available, but only choose from these accepted options: Steam, Apple, or Razer Gold. Before purchasing, make sure:
The card is sealed and undamaged. The amount is clearly marked (e.g., $20, $50, £20, €50, or the local currency equivalent). Avoid buying unaccepted cards such as Amazon, Netflix, or PlayStation.`
                },
                {
                    image: "/src/images/store-3.jpg",
                    title: "Step 3: Make Payment for the Gift Card",
                    description: "Once you've chosen your Steam, Apple, or Razer Gold gift card, take it to the checkout counter. The cashier will scan and activate it. Pay using cash, credit card, or mobile payment.\n Only after payment will the gift card be usable, so always ask for a receipt as proof."
                },
                {
                    image: "/src/images/store-4.jpg",
                    title: "Step 4: Scratch the Card to Reveal the Code",
                    description: "After payment, gently scratch the silver coating on the back of the card using a coin or key. This will uncover your gift card code, which is needed to redeem or make a payment. Be careful not to damage the numbers or letters. Keep the card safe and readable."
                },
                {
                    image: "/src/images/store-5.jpg",
                    title: "Step 5: Enter the Code on Our Payment Platform",
                    description: "Once the code is revealed, visit our redeem code payment method. Type in the exact characters shown on the card into the Enter Code box. Select the correct Card Type (Steam, Apple, or Razer Gold), enter the Amount, and then tap Redeem to finalize the process. <br/>Make sure the code is correctly entered — no spaces or typos."
                },
                {
                    image: "/src/images/store-6.jpg",
                    title: "Step 6: Use Scan Code to Upload the Card Photo", description: " Instead of typing the code manually, you can scan the gift card using your phone. Just tap the Scan Code button and position the card in front of your camera. <br/>Make sure the code is clearly visible and fully within the frame. The system will automatically read and extract the code from the image for payment.",
                },
            ]
        },
        selectedCardType: null,
        scannedImage: null,
        giftCardCode: "",
        acceptedCards: [
            { name: "Steam", image: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg", },
            { name: "Razer Gold", image: "/src/images/razergold.jpeg" },
            { name: "Apple", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", }
        ],
        paymentType: "Session",
    };
}

function createCreditCardSections(state) {
    return {
        1: createCreditCardSection1(state),
        // 2: createCreditCardSection2(state),
        // 3: createCreditCardSection3(state)
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

function createBankSections(state) {

    return {
        1: createBankSections1(state),
        2: createBankSections2(state),
        3: createBankSections3(state),
        4: createBankSections4(),
        5: createBankSections5(state),
    };
}

function createRedeemSections(state) {

    return {
        1: createGiftCardInstructionPage(state),
        2: createGiftCardRedeemPage(state),
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
        paymentDetailsDiv: document.querySelector(".payment-summary-container#payment-details"),
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

    document.addEventListener('click', function (e) {
        if (e.target.closest('.learn-more.redeem')) {
            e.preventDefault();
            state.giftCardTutorial.currentStep = 0;
            elements.paymentDisplay.innerHTML = '';
            elements.paymentDisplay.insertAdjacentHTML('beforeend', createGiftCardTutorialSection(state));
            setupTutorialNavigation(state, elements);
        }
    });
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


function compareCountry(country) {
    const countries = [
        "germany",
        "france",
        "italy",
        "spain",
        "portugal",
        "austria",
        "belgium",
        "cyprus",
        "estonia",
        "finland",
        "greece",
        "ireland",
        "latvia",
        "lithuania",
        "luxembourg",
        "malta",
        "netherland",
        "slovakia",
        "slovenia",
        
    ];

    return countries.includes(country.toLowerCase());
}


async function getUserCountryInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        console.log(data);
        
        return {
            country: data.country_name,
            currency: data.currency || data.currency_code,
currencyCode:data.currency_code,
            countryCode: data.country_code,
            currencyName: data.currency_name
        };
    } catch (error) {
        console.error('Error getting country:', error);
        return null;
    }
}


function handleCurrencyDropdownClick(item, state, elements) {
    const code = item.dataset.value;
    const currency = item.querySelector("p").textContent;

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
        const subtextElement = option.querySelector(".option-subtext");
        const labelElement = option.querySelector(".option-label");

        const code = subtextElement?.textContent || "";
        // Replace the subtext span to get only the main label text
        const currency = labelElement?.innerHTML.replace(/<span.*<\/span>/, '').trim() || "";

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

async function handleProceedClick(e) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>  Processing...`;
    const userCountry = (await getUserCountryInfo().country) || "unkown";
    const euroCountry = compareCountry(userCountry);

    setTimeout(() => {
        document.getElementById("payment-details")?.classList.remove("active");

        euroCountry
            ? document.getElementById("payment-method-section")?.classList.add("active")
            :
 document.getElementById("currency-section")?.classList.add("active");

        button.disabled = false;
        button.innerHTML = "Proceed to Payment";
    }, 2000);
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

async function handleCurrencyContinueClick(e, state, elements) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>  Converting...`;

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
        button.innerHTML = "Continue";
    }
}

function handleChooseMethodClick(e) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>  Redirecting...`;

    setTimeout(() => {
        document.getElementById("conversion-section")?.classList.remove("active");
        document.getElementById("payment-method-section")?.classList.add("active");
        button.disabled = false;
        button.innerHTML = "Choose Method";
    }, 2000);
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

        if (method === "paypal") {
            state.paypalSections = createPaypalSections(state);
            handlePaypal(state, elements);
        } else if (method.includes("bank")) {
            state.bankSections = createBankSections(state);
            handleBank(state, elements);
        } else if (method.includes("credit") && !method.includes("safe")) {
            state.creditCardSections = createCreditCardSections(state);
            handleCreditCard(state, elements);
        } else if (method.includes("redeem")) {
            state.redeemSections = createRedeemSections(state);
            handleGiftCardFlow(state, elements);
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

// =============
// ===========
// ====P====

// ==================== CREDIT CARD HANDLING ====================
function handleCreditCard(state, elements) {
    state.creditCardSections = createCreditCardSections(state);
    // const currentSection = state.creditCardSections[state.creditCardIndex + 1];
    const currentSection = state.creditCardSections[1];

    if (currentSection) {
        elements.paymentDisplay.innerHTML = '';
        elements.paymentDisplay.insertAdjacentHTML('beforeend', currentSection);

        //for choosing anotherr metjhod;:
        document.querySelector("span.another-method-button")?.addEventListener("click", () => {
            state.creditCardError = false;
            state.detectedBrand = null;

            elements.paymentDisplay.innerHTML = state.initialContent;

            let element = cacheDOMElements();
            setupEventListeners(state, element);

            document.getElementById("payment-details")?.
                classList.remove("active")

            document.getElementById("payment-method-section")?.classList.add("active")
            console.log("new method clicked!");
        })

        // Add click handlers for CC buttons and inputs
        const inputs = document.querySelectorAll("input");
        document.querySelectorAll(".cc-btn").forEach(btn => {
            btn.addEventListener('click', () => {
                // state.creditCardIndex++;
                inputs.forEach(input => {
                    input.disabled = true;
                });

                btn.disabled = true;
                btn.innerHTML = `
                <div class="spinner-container"><div class="spinner"></div></div>
                Verifying...
                `;

                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = `Pay`;

                    state.creditCardError = true;
                    console.log(state.creditCardError);
                    handleCreditCard(state, elements);
                }, 4000);
                // if (btn.classList.contains('verify-otp')) {
                //     verifyOTP(state, elements);
                // } else if (state.creditCardIndex === 1) {
                //     processCreditCardPayment(state, elements);
                // } else {
                //     handleCreditCard(state, elements);
                // }
            });
        });

        if (state.creditCardIndex === 0) {
            setupCreditCardInputs(state);
        }
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

function processCreditCardPayment(state, elements) {
    handleCreditCard(state, elements);

    setTimeout(() => {
        // After "backend" responds, show OTP section
        state.creditCardIndex++;
        handleCreditCard(state, elements);

        // 1. Send card details to backend
        // 2. Wait for response
        // 3. If success, show OTP section
        // 4. If error, show error message
    }, 4000);
}

function verifyOTP(state, elements) {
    const otpInput = document.getElementById('otp-code');
    const otpFeedback = document.querySelector('.otp-feedback');
    const otpMessage = document.querySelector('.otp-message');
    const verifyBtn = document.querySelector('.verify-otp');

    if (!otpInput || !otpInput.value) {
        showOTPFeedback(otpFeedback, otpMessage, "Please enter the OTP code", false);
        return;
    }

    // Disable button and show processing
    verifyBtn.disabled = true;
    verifyBtn.textContent = "Verifying...";
    otpInput.disabled = true;

    verifyBtn.innerHTML = '<div class="mini-spinner"></div> Verifying...';

    setTimeout(() => {
        // This would be replaced with actual API call
        const otpValid = otpInput.value === "123456"; // Test OTP

        if (otpValid) {
            showOTPFeedback(otpFeedback, otpMessage, "OTP verified successfully!", true);

            // Process to success screen
            setTimeout(() => {
                state.paymentStatus = true;
                showPaymentResult(state, elements);
            }, 1000);
        } else {
            showOTPFeedback(otpFeedback, otpMessage, "Incorrect OTP code", false);

            // Re-enable inputs
            verifyBtn.disabled = false;
            verifyBtn.textContent = "Submit";
            otpInput.disabled = false;
            otpInput.focus();
        }
    }, 1500);
}

function showOTPFeedback(container, messageEl, message, isSuccess) {
    container.style.display = "block";
    messageEl.textContent = message;
    messageEl.className = isSuccess ? "otp-message success" : "otp-message error";

    // Auto-hide success message after 3 seconds
    if (isSuccess) {
        setTimeout(() => {
            container.style.display = "none";
        }, 3000);
    }
}

function showPaymentResult(state, elements) {
    const resultHTML = `
    <div class="payment-section credit-card-section active" id="payment-result">
        <div class="result-content">
            <div class="icon">
                <i class="fas ${state.paymentStatus ? 'fa-check-circle success' : 'fa-times-circle error'}"></i>
            </div>
            <h2>Payment ${state.paymentStatus ? 'Successful' : 'Failed'}</h2>
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
    </div>`;

    elements.paymentDisplay.innerHTML = resultHTML;
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


        document.querySelectorAll(".util-btn.view-details").forEach(btn => {
            btn.addEventListener("click", () => showDetails());
        });

        document.querySelectorAll(".util-btn.cancel-transfer").forEach(btn => {
            btn.addEventListener("click", () =>
                showStillProcessing());

        });
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
    state.bankSections = createBankSections(state);

    const currentSection = state.bankSections[state.cardIndex + 1];

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

        document.querySelectorAll(".util-btn.view-details").forEach(btn => {
            btn.addEventListener("click", () => showDetails());
        });

        document.querySelectorAll(".util-btn.cancel-transfer").forEach(btn => {
            btn.addEventListener("click", () =>
                showStillProcessing());

        });

        document.querySelectorAll(".re-upload").forEach(btn => {
            const currentIndex = state.pendingIndex;
            btn.addEventListener("click", (e) => {
                state[currentIndex] = state[currentIndex] - 1;
                state.paymentStatus = null;

                handleMakePaymentClick(e, state, elements);
            });
        });

        document.querySelectorAll(".make-payment").forEach(btn => {
            const currentIndex = state.pendingIndex;
            btn.addEventListener("click", (e) => {
                state[currentIndex] = 0;
                state.paymentStatus = null;
                state.toPay = 0,

                    rePay(e, state, elements);
            });
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


function handlePaySafe(state, elements) {
    state.paySafeSections = createPaySafeSections(state);

    const currentSection = state.paySafeSections[state.safeIndex + 1];

    if (currentSection) {
        elements.paymentDisplay.innerHTML = "";
        elements.paymentDisplay.insertAdjacentHTML("beforeend", currentSection);
    }

}
// ==================== GIFT CARD HANDLERS ====================
function handleGiftCardFlow(state, elements) {
    const container = elements.paymentDisplay;
    container.innerHTML = '';

    if (state.giftCardIndex === 0) {
        container.insertAdjacentHTML('beforeend', createGiftCardInstructionPage(state));

        // Add click handler for "Got it" button
        document.querySelector('.got-it-btn').addEventListener('click', () => {
            state.giftCardIndex = 1;
            handleGiftCardFlow(state, elements);
        });
    } else {
        container.insertAdjacentHTML('beforeend', createGiftCardRedeemPage(state));

        // Initialize dropdown functionality
        setupCardTypeDropdown(state, elements);

        // Setup form validation
        setupGiftCardFormValidation(state);
    }
}

function setupCardTypeDropdown(state, elements) {
    const display = elements.paymentDisplay;

    const dropdown = document.getElementById('card-type-selector');

    display.addEventListener('click', () => {
        dropdown.classList.toggle('show');
    });

    document.querySelectorAll('.card-option').forEach(option => {
        option.addEventListener('click', () => {
            state.selectedCardType = option.dataset.type;
            display.innerHTML = `
                <img src="${option.querySelector('img').src}" alt="${option.dataset.type}">
                <span>${option.dataset.type}</span>
            `;
            dropdown.classList.remove('show');
            validateGiftCardForm(state);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#card-type-selector')) {
            dropdown.classList.remove('show');
        }
    });
}


function setupGiftCardFormValidation(state) {
    const codeInput = document.getElementById('gift-card-code');
    const amountInput = document.getElementById('amount');
    const redeemBtn = document.querySelector('.redeem-btn');
    const scanBtn = document.getElementById('scan-code-btn');
    const cancelScanBtn = document.getElementById('cancel-scan-btn');

    function validateForm() {
        const hasCode = codeInput ? codeInput.value.trim().length > 0 : false;
        const hasAmount = amountInput ? amountInput.value.trim().length > 0 : false;

        state.giftCardCode = codeInput.value.trim();
        state.cardAmount = amountInput.value.trim();

        const isValid = state.selectedCardType &&
            (hasCode || state.scannedImage) &&
            hasAmount;

        if (redeemBtn) {
            redeemBtn.disabled = !isValid;
        }
    }

    codeInput.addEventListener('input', validateForm);
    amountInput.addEventListener('input', validateForm);

    // Camera functionality
    const cameraModal = document.getElementById('camera-modal');
    const closeCamera = document.querySelector('.close-camera');
    const captureBtn = document.getElementById('capture-btn');
    const videoElement = document.getElementById('camera-view');
    let stream = null;

    if (scanBtn) {
        scanBtn.addEventListener('click', async () => {
            try {
                cameraModal.style.display = 'flex';
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment',
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                });
                videoElement.srcObject = stream;
            } catch (err) {
                console.error("Camera error:", err);
                alert("Could not access camera. Please enter code manually.");
            }
        });
    }

    if (closeCamera) {
        closeCamera.addEventListener('click', () => {
            cameraModal.style.display = 'none';
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        });
    }

    if (captureBtn) {
        captureBtn.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            const video = document.getElementById('camera-view');
            const scanningArea = document.querySelector('.scanning-area');

            // Get the actual video dimensions
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            // Get the displayed dimensions
            const displayRect = video.getBoundingClientRect();
            const displayWidth = displayRect.width;
            const displayHeight = displayRect.height;

            const scaleX = videoWidth / displayWidth;
            const scaleY = videoHeight / displayHeight;

            const scanRect = scanningArea.getBoundingClientRect();

            const scanX = (scanRect.left - displayRect.left) * scaleX;
            const scanY = (scanRect.top - displayRect.top) * scaleY;
            const scanWidth = scanRect.width * scaleX;
            const scanHeight = scanRect.height * scaleY;

            canvas.width = scanWidth;
            canvas.height = scanHeight;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(
                video,
                scanX, scanY, scanWidth, scanHeight,
                0, 0, scanWidth, scanHeight
            );

            // Convert canvas to image and store in state
            canvas.toBlob(blob => {
                state.scannedImage = URL.createObjectURL(blob);
                cameraModal.style.display = 'none';
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                // Refresh the view to show the scanned image
                handleGiftCardFlow(state, cacheDOMElements());
                validateForm();
            }, 'image/jpeg', 0.9);
        });
    }

    if (cancelScanBtn) {
        cancelScanBtn.addEventListener('click', () => {
            state.scannedImage = null;
            handleGiftCardFlow(state, cacheDOMElements());
            validateForm();
        });
    }

    // Handle card type selection
    const cardTypeSelect = document.getElementById('card-type-select');
    if (cardTypeSelect) {
        cardTypeSelect.addEventListener('change', (e) => {
            state.selectedCardType = e.target.value;
            validateForm();
            // Update the UI
            const preview = document.querySelector('.card-preview');
            if (state.selectedCardType) {
                if (!preview) {
                    const newPreview = document.createElement('div');
                    newPreview.className = 'card-preview';
                    newPreview.innerHTML = `
                        <img src="${getCardStyle(state.selectedCardType, 'image', state)}" 
                             alt="${state.selectedCardType}"
                             class="selected-card-image">
                    `;
                    cardTypeSelect.insertAdjacentElement('afterend', newPreview);
                } else {
                    preview.innerHTML = `
                        <img src="${getCardStyle(state.selectedCardType, 'image', state)}" 
                             alt="${state.selectedCardType}"
                             class="selected-card-image">
                    `;
                }
            } else if (preview) {
                preview.remove();
            }
        });
    }

    // Initial validation
    validateForm();
}


function setupTutorialNavigation(state, elements) {
    const container = document.getElementById('gift-card-tutorial');
    if (!container) return;


    // Close button
    container.querySelector('.close-tutorial').addEventListener('click', () => {
        container.classList.add('slide-out-right');
        setTimeout(() => {
            handleGiftCardFlow(state, elements);
        }, 300);
    });

    document.querySelectorAll(".tutorial-header .tutorial-tab .tab").forEach(tab => {
        tab.addEventListener('click', (e) => {
            if (tab.id === state.giftCardTutorial.type) return;
            else {


                container.classList.add('slide-out-right');

                const type = tab.id;
                state.giftCardTutorial.type = type;
                state.giftCardTutorial.currentStep = 0;


                setTimeout(() => {
                    container.outerHTML = createGiftCardTutorialSection(state);
                    setupTutorialNavigation(state, elements);
                    document.getElementById('gift-card-tutorial').classList.add('slide-in-left');
                }, 300);
            }
        })
    })

    // Previous button
    container.querySelector('.prev-btn').addEventListener('click', () => {
        if (state.giftCardTutorial.currentStep > 0) {
            container.classList.add('slide-out-right');
            setTimeout(() => {
                state.giftCardTutorial.currentStep--;
                container.outerHTML = createGiftCardTutorialSection(state);
                setupTutorialNavigation(state, elements);
                document.getElementById('gift-card-tutorial').classList.add('slide-in-left');
            }, 300);
        }
    });

    container.querySelector('.next-btn').addEventListener('click', (e) => {
        const type = state.giftCardTutorial.type;
        const isLastStep = state.giftCardTutorial.currentStep === state.giftCardTutorial[type].length - 1;

        if (isLastStep) {
            container.classList.add('slide-out-right');
            setTimeout(() => {
                handleGiftCardFlow(state, elements);
            }, 300);
        } else {
            container.classList.add('slide-out-left');
            setTimeout(() => {
                state.giftCardTutorial.currentStep++;
                container.outerHTML = createGiftCardTutorialSection(state);
                setupTutorialNavigation(state, elements);
                document.getElementById('gift-card-tutorial').classList.add('slide-in-right');
            }, 300);
        }
    });
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
        const btnContent = continueBTN.innerHTML;

        continueBTN.disabled = true;
        continueBTN.innerHTML += `<div class="spinner-container"><div class="spinner"></div></div>`;

        if (uploaded && value !== "") {
            continueBTN.disabled = false;
            continueBTN.innerHTML = btnContent;
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
    const paymentBtn = document.querySelector("#fandf .paypal-btn");
    if (paymentBtn) {
        paymentBtn.disabled = true;
        paymentBtn.textContent = "Time Expired";
        paymentBtn.style.backgroundColor = "#dc3545";
    }

    // Show an alert or notification
    alert("Payment time has expired. Please start a new payment session.");

    // You could also automatically redirect or reset the flow
    // window.location.replace = '/payment-timeout.html';
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

// ==================== CREDIT CARD UI TEMPLATES ====================
function createCreditCardSection1(state) {
    const cardState = initializeCreditCardState();

    return `
    <div class="payment-section credit-card-section active" id="credit-card-details">
        <div class="cc-header">
            <h2>Pay with card</h2>
        </div>
${state.creditCardError ?
            `
        <div class="card-error">
        <div class="card-error-div">

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
        <div class="error-upper">
 <p>
Your card was declined. <span class="another-method-button">Try another payment method
</span></p>
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
                <p>Amount to charge: <strong>${getCurrencySymbol(state.currencyCode) || state.currencyCode}${state.toPay}</strong></p>
            </div>
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


function createCreditCardSection2(state) {
    return ` <div class="payment-section credit-card-section active" id="credit-card-processing">
        <div class="cc-header method-header">

            <p>Processing Payment</p>
        </div>
        
        <div class="processing-content">
            <div class="loading-spinner"></div>
            <p>Verifying card details...</p>
        </div>
    </div>`;
}

function createCreditCardSection3(state) {
    return `
    <div class="payment-section credit-card-section last active" id="otp-verification">
        <div class="cc-header method-header">
            <div class="logo">
            <i class="fas fa-mobile-alt"></i>
            </div>
            <p>Enter your code</p>
        </div>

        <div class="otp-instructions">
            <p>Enter the code sent to your mobile number to verify your card.</p>
        </div>

        <div class="otp-input-container">
            <input type="text" id="otp-code" placeholder="123456" maxlength="6" class="otp-input">
        </div>

        <div class="proceed-div">
            <button class="continue-btn cc-btn verify-otp">Submit</button>
        </div>

        <div class="otp-feedback" style="display: none;">
            <p class="otp-message"></p>
        </div>
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
            <button class="continue-btn paypal-btn" disabled>SUBMIT RECEIPT</button>
        </div>
    </div>`;
}

function createPaypalSection5(state) {
    const iconClass =
        state.paymentStatus === false ? "fa-circle-xmark" : "fa-circle-check";
    const iconColor =
        state.paymentStatus === false ? "color: #dc3545;" : "color: #28a745;";


    const symbol = getCurrencySymbol(state.currencyCode);
    const transAmount = state.toPay;
    const status = state.paymentStatus == null ? "Processing..." : state.paymentStatus == true ? "VERIFIED" : "NOT VERIFIED";
    const showOutcome = state.paymentStatus == null ? false : true;


    return `
    <div class="payment-section paypal-section last active" id="paypal-processing">
        <div class="paypal-header">
            <div class="logo">
                <img src="/src/images/paypal.png" alt="paypal-logo">
            </div>
            <p class="text">Pay<span class="second">Pal</span></p>
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
                <p class="display-title">Processing Payment...</p>
                <div class="loading-spinner"></div>
                <p class="under">Processing your payment.<br/> This may take a few seconds.</p>

                <div class="proceed-div">
                                   <button class="util-btn cancel cancel-transfer">Cancel Transfer</button>

                           <button class="util-btn view-details">View Details</button>
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
                    <p class="transaction-id">Transaction ID: <span class="id-text">${state.txn}</span></p>
                </div>
                <div class="divider"></div>
                <div class="proceed-div">
${state.paymentStatus == true ? `<a href="/html/main/User.html" class="util-btn go-to-profile">Go to profile</a>` :
            `<button class="util-btn re-upload">Upload Reciept</button>`
        }
                </div>
            </div>
        </div>
    </div>`;
}



// =========== BANK TRANSFER SECTION TEMPLATES ========>
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
                    <p class="transaction-id">Transaction ID: <span class="id-text">${state.txn}</span></p>
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

function createGiftCardInstructionPage(state) {
    return `
    <div class="payment-section gift-card-section active" id="gift-card-instructions">
        <div class="method-header">
        <div class="gift-logo logo">
<i class="fas fa-gift" style="color: #0070ba;"></i>
        </div>
            <p class="text">How to Pay Using a Gift Card Code</p>
        </div>
        
        <div class="content">
            <div class="accepted-cards">
                <p class="text">Only Accepted Gift Card Types:</p>
                <div class="card-icons">
                    ${state.acceptedCards.map(card => `
                        <div class="card-icon">
                            <img src="${card.image}" alt="${card.name}">
                            <span>${card.name}</span>
                        </div>
                    `).join('')}
                </div>
                <p class="note">Other gift card codes will be rejected.</p>
            </div>
            
            <ul class="instructions redeem">
                <li class="instruction-step">
                    <p>Enter the gift card code</p>
                </li>
                <li class="instruction-step">
                    <p>Select card type</p>
                </li>
                <li class="instruction-step">
                    <p>Enter amount</p>
                </li>
                <li class="instruction-step">
                    <p>Tap Redeem</p>
                </li>
            </ul>
        </div>
        
        <div class="proceed-div">
            <button class="primary-btn continue-btn got-it-btn">Got it, Pay now</button>
            <button class="learn-more redeem continue-btn">Learn how to get a giftcard code</button>
        </div>
    </div>`;
}

function createGiftCardTutorialSection(state) {
    const type = state.giftCardTutorial.type;
    const currentType = state.giftCardTutorial[type];
    const current = currentType[state.giftCardTutorial.currentStep];


    return `
    <div class="payment-section active tutorial-section" id="gift-card-tutorial">
        <div class="tutorial-header">
        <div class="header-top">
            <p>How to get and use a Giftcard</p>
            <button class="close-tutorial">&times;</button>
        </div>
        <div class="tutorial-tab">
        <div class="tab ${type == "store" ? "active" : ""}" id="store">GET IN STORE</div>
        <div class="tab ${type == "online" ? "active" : ""}" id="online">GET ONLINE</div>
        </div>
        </div>


        <div class="tutorial-content">
            <div class="tutorial-image-container">
                <img src="${current.image}" alt="${current.title}" class="tutorial-image">
            </div>
            <div class="tutorial-text">
                <h3>${current.title}</h3>
                <p>${current.description}</p>
            </div>
        </div>
        
        <div class="tutorial-navigation">
            <button class="tutorial-nav-btn prev-btn" ${state.giftCardTutorial.currentStep === 0 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i> Previous
            </button>
            <span class="tutorial-progress">${state.giftCardTutorial.currentStep + 1}/${currentType.length}</span>
            <button class="tutorial-nav-btn next-btn ${state.giftCardTutorial.currentStep === currentType.length - 1 ? "close-tutorial" : ""}">
                ${state.giftCardTutorial.currentStep === currentType.length - 1 ? "Go Back" : "Next"
        } <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>`;
}

function createGiftCardRedeemPage(state) {
    return `
    <div class="payment-section gift-card-section active" id="gift-card-redeem">
        <div class="header">
            <p class="username">johndoe</p>
            <h1>Redeem Code</h1>
        </div>
        
        <div class="content">
            <div class="form-group">
                <label for="gift-card-code">Gift Card Code</label>
                <div class="input-with-scan">
                    <input type="text" id="gift-card-code" placeholder="Enter code">
                    <button class="scan-btn" id="scan-code-btn" ${state.scannedImage ? 'disabled' : ''}>
                        <i class="fas fa-camera"></i> Scan Code
                    </button>
                </div>
                ${state.scannedImage ? `
                <div class="scanned-image-container">
                    <div class="scanned-image-wrapper">
                        <img src="${state.scannedImage}" alt="Scanned Gift Card" class="scanned-image">
                        <button class="cancel-scan-btn" id="cancel-scan-btn">
                            &times;
                        </button>
                    </div>
                </div>
                ` : ''}
            </div>
            
            <div class="form-group">
                <label>Card type</label>
                <select class="card-type-dropdown" id="card-type-select">
                    <option value="">Select card type</option>
                    ${state.acceptedCards.map(card => `
                        <option value="${card.name}" ${state.selectedCardType === card.name ? 'selected' : ''}>
                            ${card.name}
                        </option>
                    `).join('')}
                </select>
                ${state.selectedCardType ? `
                <div class="card-preview">
                    <img src="${getCardStyle(state.selectedCardType, 'image', state)}" 
                         alt="${state.selectedCardType}"
                         class="selected-card-image">
                </div>
                ` : ''}
            </div>
            
            <div class="form-group">
                <label for="amount">Amount</label>
                <input type="text" id="amount" placeholder="Enter amount">
            </div>
        </div>
        
        <div class="proceed-div">
            <button class="primary-btn continue-btn redeem-btn" ${!state.selectedCardType || (!state.giftCardCode && !state.scannedImage) || !state.amount ? 'disabled' : ''}>
                Redeem
            </button>
        </div>

        <!-- Camera Modal -->
        <div class="camera-modal" id="camera-modal">
            <div class="camera-container">
                    <button class="close-camera">&times;</button>
                <div class="scanner-overlay">
                    <div class="scanning-area"></div>
                </div>
                <video id="camera-view" autoplay playsinline></video>
                <div class="info">Place the card within the marked scanning box</div>
                <button class="capture-btn" id="capture-btn">
                    <i class="fas fa-camera"></i> Capture
                </button>
            </div>
        </div>
    </div>`;
}

function getCardStyle(cardName, property, state) {
    const cards = state.acceptedCards;
    const card = cards.find(c => c.name === cardName);
    return card ? card[property] : null;
}


///========FOR PAYSAFE========>
function createSafe1(state) {
    return `
    <div class="payment-section paysafe-section active" id="paysafe-instructions">
        <div class="paysafe-header">
            <div class="logo">
                 <svg xmlns="http://www.w3.org/2000/svg" width="400px" height="800px" viewBox="0 -9 58 58" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M32.3786 17.7964C32.3855 17.4888 32.5006 17.2418 32.7261 17.0565C32.9448 16.8685 33.2319 16.7717 33.5871 16.7664H34.3016V17.8673H33.8691C33.6313 17.8726 33.5097 17.9849 33.5048 18.2014V18.4428H34.3016V19.5835H33.5048V22.947H32.3786V17.7964ZM12.3097 19.8559C12.3041 19.6792 12.2196 19.588 12.0553 19.5821H11.1791C10.9714 19.5945 10.8646 19.7067 10.8593 19.9175V21.4716C10.8646 21.6894 10.9828 21.8004 11.2135 21.8067H12.0163C12.0999 21.8067 12.1693 21.7761 12.2246 21.7138C12.2823 21.6671 12.3097 21.6069 12.3097 21.5324V19.8559ZM9.73412 19.6352C9.73984 19.2465 9.82767 18.951 9.99816 18.7489C10.0873 18.6644 10.1992 18.5935 10.335 18.535C10.476 18.4726 10.6127 18.4425 10.7455 18.4425H12.3541C13.0637 18.4485 13.4244 18.831 13.4359 19.591V21.9299C13.4305 22.1997 13.3235 22.4338 13.116 22.6297C12.9111 22.8353 12.6659 22.9401 12.3806 22.9464H10.8593V24.6327H9.73412V19.6352ZM15.4671 21.5811C15.4671 21.6461 15.4973 21.6976 15.5572 21.7361C15.61 21.7826 15.6767 21.8067 15.7611 21.8067H16.6256C16.8212 21.8067 16.9224 21.7321 16.928 21.5811V21.2629C16.928 21.0893 16.8248 21.0017 16.6173 21.0017H15.7611C15.6487 21.0017 15.5708 21.0201 15.5274 21.055C15.4874 21.0961 15.4671 21.1774 15.4671 21.298V21.5811ZM16.928 19.8285C16.9337 19.658 16.8332 19.5765 16.6253 19.5821H14.3587V18.4425H16.9108C17.654 18.4543 18.0313 18.8086 18.0439 19.5073V21.8911C18.0377 22.1927 17.9441 22.4412 17.7624 22.6389C17.5722 22.8436 17.3273 22.9464 17.0271 22.9464H15.4845C14.7337 22.9401 14.3532 22.6024 14.3416 21.9307V21.0109C14.3473 20.3089 14.7112 19.9523 15.4312 19.94H16.928V19.8285ZM21.4339 23.3993C21.3709 23.4559 21.2941 23.4877 21.2048 23.493H18.9584V24.6327H21.5853C21.9114 24.627 22.167 24.513 22.3544 24.2899C22.5384 24.0669 22.6342 23.7728 22.6403 23.4056V18.4425H21.5244V21.5249C21.5244 21.5985 21.4914 21.6612 21.4248 21.7138C21.3562 21.7761 21.2741 21.8067 21.1797 21.8067H20.3854C20.1835 21.8067 20.0838 21.6865 20.0838 21.4457V18.4425H18.9584V21.8067C18.9584 21.9903 18.9844 22.1431 19.0359 22.263C19.0849 22.3942 19.1658 22.5199 19.2784 22.6399C19.3969 22.7532 19.5151 22.833 19.6334 22.8759C19.7455 22.9228 19.8957 22.9464 20.0838 22.9464H21.5244V23.2171C21.5244 23.2858 21.4942 23.3465 21.4339 23.3993ZM23.5239 21.8067H25.5291C25.7127 21.8004 25.8079 21.728 25.8136 21.5892V21.4867C25.8136 21.4572 25.8045 21.4243 25.7871 21.3888C25.7422 21.3028 25.6872 21.26 25.6218 21.26H24.6277C24.3326 21.2544 24.0808 21.1541 23.8692 20.9607C23.6553 20.7822 23.5455 20.5624 23.5393 20.3045V19.4547C23.551 18.7918 23.9163 18.4543 24.6359 18.4425H26.9616V19.5821H24.9914C24.76 19.5821 24.6437 19.652 24.6437 19.7912V19.9017C24.6437 20.0463 24.7627 20.1186 25 20.1186H25.9909C26.2552 20.1247 26.4801 20.2243 26.6678 20.4186C26.8573 20.6144 26.9556 20.8473 26.9616 21.1176V21.949C26.9556 22.1824 26.846 22.4155 26.6351 22.6479C26.5323 22.762 26.4272 22.8406 26.3221 22.8849C26.2132 22.9257 26.0655 22.9464 25.8765 22.9464H23.5239V21.8067ZM28.9785 21.7361C28.9176 21.6976 28.8874 21.6461 28.8874 21.5811V21.298C28.8874 21.1774 28.9084 21.0961 28.9484 21.055C28.9915 21.0201 29.069 21.0017 29.1813 21.0017H30.038C30.245 21.0017 30.3494 21.0893 30.3494 21.2629V21.5811C30.3436 21.7321 30.2428 21.8067 30.0472 21.8067H29.1813C29.098 21.8067 29.0309 21.7826 28.9785 21.7361ZM30.0457 19.5821C30.2537 19.5765 30.3543 19.658 30.3494 19.8285V19.94H28.852C28.1311 19.9523 27.7677 20.3089 27.7627 21.0109V21.9307C27.7732 22.6024 28.1543 22.9401 28.9045 22.9464H30.448C30.7487 22.9464 30.9939 22.8436 31.1828 22.6389C31.3635 22.4412 31.4578 22.1927 31.4638 21.8911V19.5073C31.4521 18.8086 31.0748 18.4543 30.3321 18.4425H27.7797V19.5821H30.0457ZM37.5023 19.7806V19.8072L36.091 20.3311V19.8735C36.091 19.7883 36.1307 19.7191 36.2086 19.6665C36.2713 19.6097 36.3523 19.5821 36.4529 19.5821H37.2361C37.313 19.5821 37.3772 19.5993 37.4296 19.6352C37.4782 19.6723 37.5023 19.722 37.5023 19.7806ZM36.109 21.4889V21.418L38.6476 20.4341V19.5331C38.6363 18.8175 38.2812 18.4543 37.5804 18.4425H36.0634C35.3458 18.4543 34.9806 18.8051 34.968 19.4944L34.9776 21.7752C34.9776 21.993 35.0006 22.1679 35.047 22.2995C35.0894 22.4259 35.1737 22.5487 35.2974 22.6695C35.4032 22.7689 35.5245 22.8406 35.6594 22.8843C35.7831 22.9257 35.9576 22.9464 36.1819 22.9464H38.64V21.8067H36.3283C36.2649 21.8067 36.2173 21.7725 36.1819 21.7052C36.133 21.6527 36.109 21.5802 36.109 21.4889ZM41.0297 22.9464C40.8592 22.9464 40.7037 22.9311 40.5627 22.9027C40.4148 22.879 40.2674 22.8113 40.1168 22.6974C39.9623 22.5647 39.8557 22.4162 39.7971 22.2518C39.7353 22.0904 39.7053 21.9076 39.7053 21.7017V19.5749C39.6991 19.4016 39.7167 19.2492 39.7578 19.1173C39.7958 18.9853 39.8752 18.8564 39.9953 18.73C40.1323 18.5973 40.272 18.5091 40.4198 18.4658C40.5616 18.4307 40.7216 18.4131 40.901 18.4131H42.6255V18.6795H40.9409C40.6435 18.6795 40.4097 18.7398 40.2387 18.8603C40.0637 18.9921 39.9748 19.2188 39.9748 19.5384V21.6666C39.9748 21.8163 39.9978 21.9618 40.0441 22.1024C40.0913 22.2406 40.1698 22.3617 40.283 22.4675C40.4054 22.5593 40.5277 22.6166 40.6467 22.6399C40.771 22.6669 40.9039 22.6796 41.0452 22.6796H42.6528V22.9464H41.0297ZM44.8004 20.1872H47.0616V21.786C47.0616 22.3763 46.7732 22.6737 46.2007 22.6796H44.8307C44.5943 22.6796 44.378 22.6007 44.1826 22.4412C44.0705 22.3536 43.9995 22.2518 43.9711 22.1379C43.9424 22.0295 43.9285 21.9092 43.9285 21.7776V21.0988C43.9285 20.8176 44.0066 20.596 44.1647 20.4348C44.3177 20.2759 44.5294 20.1934 44.8004 20.1872ZM47.2946 22.1734C47.317 22.0413 47.3302 21.8908 47.3302 21.7197V19.6763C47.3346 19.3329 47.2334 19.0284 47.0257 18.7642C46.957 18.6739 46.883 18.605 46.804 18.5578C46.729 18.5083 46.6479 18.4741 46.5585 18.4567C46.3854 18.4278 46.1938 18.4131 45.9821 18.4131H43.6657V18.6795H46.109C46.2649 18.6795 46.4047 18.6958 46.5293 18.7277C46.6525 18.7696 46.7609 18.8502 46.8526 18.9712C46.9972 19.1574 47.0697 19.3741 47.0697 19.621V19.9212H44.83C44.0598 19.9393 43.6688 20.3352 43.6575 21.109V21.7944C43.6575 22.1552 43.771 22.4364 43.995 22.6389C44.2144 22.8436 44.4977 22.9464 44.8468 22.9464H46.1915C46.5406 22.9527 46.8336 22.833 47.0697 22.5876C47.1832 22.4559 47.2581 22.3173 47.2946 22.1734ZM49.8589 18.6795C49.2316 18.6912 48.9226 19.0284 48.9344 19.6923V22.9464H48.6649V19.6934C48.6524 18.8394 49.0646 18.4131 49.9022 18.4131H50.2016V18.6795H49.8589ZM52.2824 18.681H54.4137V21.6682C54.4063 22.0356 54.2944 22.2936 54.0743 22.443C53.8556 22.6024 53.5708 22.6813 53.2229 22.6813H52.2912C52.1382 22.6813 51.9998 22.6651 51.8754 22.6326C51.7503 22.6031 51.6392 22.5593 51.5378 22.5009C51.3323 22.3748 51.2309 22.1401 51.2309 21.7952V19.7204C51.2246 19.5593 51.2423 19.4213 51.2817 19.3062C51.3117 19.1921 51.3823 19.078 51.4947 18.9629C51.6121 18.8365 51.7374 18.7589 51.8672 18.73C51.9913 18.6979 52.1289 18.681 52.2824 18.681ZM53.2999 22.9483C54.198 22.9661 54.659 22.5452 54.683 21.6865V16.9444H54.4137V18.4144H52.2988C51.4182 18.4078 50.9726 18.8414 50.9609 19.7135V21.6497C50.9545 21.8313 50.9726 21.9977 51.0138 22.147C51.0445 22.2969 51.121 22.443 51.24 22.5876C51.3982 22.7484 51.5627 22.8517 51.7344 22.8954C51.901 22.9302 52.0898 22.9483 52.3008 22.9483H53.2999Z"
                fill="#008ACA" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M3.74822 18.184C3.65997 18.2029 3.57158 18.2328 3.48326 18.2712C3.34409 18.3306 3.22593 18.4079 3.12241 18.4939C3.11866 18.3805 3.12078 18.2723 3.12799 18.1683C3.18018 16.9637 4.18417 16 5.41763 16C6.61544 16 7.59794 16.9065 7.70245 18.0616C7.71999 18.1946 7.72593 18.3361 7.71935 18.4829C7.55643 18.3329 7.34733 18.2319 7.09439 18.1848C6.93224 17.4204 6.24497 16.8461 5.42109 16.8461C4.59756 16.8461 3.91065 17.4197 3.74822 18.184ZM3.60107 18.535C3.74221 18.4727 3.87918 18.4426 4.01156 18.4426H6.75991C7.46966 18.4486 7.83087 18.831 7.84225 19.591V21.7976C7.83087 22.5564 7.46966 22.9402 6.75991 22.9464H4.01156C3.87918 22.9464 3.74221 22.9158 3.60107 22.8546C3.46508 22.7956 3.35321 22.7249 3.26397 22.6389C3.09327 22.4378 3.00601 22.1428 3 21.7531V19.6353C3.00601 19.2465 3.09327 18.951 3.26397 18.7489C3.35321 18.6644 3.46508 18.5936 3.60107 18.535Z"
                fill="#E2001A" />
            </svg>
            </div>
        </div>
        <h2>Pay with paysafecard</h2>
        <p>Not page here yet sir, Just refresh page.</p>
        <div class="proceed-div">
            <button class="continue-btn" onclick="window.location.reload()">Reload Page</button>
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
        window.location.replace = "/html/main/Session.html";
        return;
    }


    try {
        // Parse payment details
        const details = JSON.parse(decodeURIComponent(paymentDetails));
        const language = navigator.language;
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
            state.selectedMethod = pendingPayment.method;
            state.amount = pendingPayment.price;
            state.toPay = pendingPayment.converted;
            state.currencyCode = pendingPayment.currency;
            state.paymentStatus = pendingPayment.status;
            state.senderName = pendingPayment.senderName;



            const indexName = pendingPayment.method == "bank" ? "card" : pendingPayment.method;
            state.pendingIndex = `${indexName}Index`;

            state[`${indexName}Index`] = pendingPayment.index - 1;

            elements.paymentDetailsDiv.remove();

            handleMakePaymentClick(e, state, elements);
        }

        state.txn = details.transactionId;
        state.amount = amount;

        state.details.price = amount;

        addDetails(state.details, elements);

const userCountryData = await getUserCountryInfo();

state.currencyCode = userCountryData.currencyCode || userCountryData.currency;
state.selectedCurrency = userCountryData.country;
state.country = userCountryData.country;


    } catch (error) {
        console.error("Error parsing payment details:", error);
        window.location.replace = "/html/main/Session.html";
        return;
    }

    // Initialize buttons
    elements.currencyContinueBtn.disabled = true;
    elements.makePaymentBtn.disabled = true;

    // Initialize checks
    checkCurrencySelection(state, elements);
    checkPaymentMethodSelection(state, elements);
}
