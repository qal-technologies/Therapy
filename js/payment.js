document.addEventListener('DOMContentLoaded', () => {
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
        paypalIndex: 0,
        senderName: "",
        senderName: "",
        paymentStatus: null,
        paypalSections: null 
    };
}

function createPaypalSections(state) {
    return {
        1: createPaypalSection1(),
        2: createPaypalSection2(state),
        3: createPaypalSection3(state),
        4: createPaypalSection4(),
        5: createPaypalSection5(state)
    };
}


// ==================== DOM CACHING ====================
function cacheDOMElements() {
    return {
        currencyContinueBtn: document.getElementById('currency-continue'),
        makePaymentBtn: document.getElementById('make-payment-btn'),
        usdOption: document.getElementById('usd-option'),
        usdDropdown: document.getElementById('usd-dropdown'),
        currencyOptions: document.querySelectorAll('#currency-section .option-item'),
        currencyDropdownItems: document.querySelectorAll('.currency-dropdown-item'),
        paymentMethodOptions: document.querySelectorAll('#payment-method-section label.option-item'),
        currencyCode: document.querySelector('span.choosen-currency-code'),
        convertedText: document.querySelector('h2.converted'),
        titleDiv: document.querySelector("#conversion-section .option-list p.title"),
        paymentDisplay: document.querySelector("section#display.parent")
    };
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners(state, elements) {
    // Currency selection
    elements.usdOption.addEventListener('click', (e) => handleUsdOptionClick(e, state, elements));
    elements.currencyDropdownItems.forEach(item => {
        item.addEventListener('click', () => handleCurrencyDropdownClick(item, state, elements));
    });
    elements.currencyOptions.forEach(option => {
        option.addEventListener('click', (e) => handleCurrencyOptionClick(e, option, state, elements));
    });

    // Payment method selection
    elements.paymentMethodOptions.forEach(option => {
        option.addEventListener('click', () => handlePaymentMethodClick(option, state, elements));
    });

    // Button actions
    document.getElementById('proceed-button')?.addEventListener('click', (e) => handleProceedClick(e));
    elements.currencyContinueBtn?.addEventListener('click', (e) => handleCurrencyContinueClick(e, state, elements));
    document.getElementById('choose-method-btn')?.addEventListener('click', (e) => handleChooseMethodClick(e));
    elements.makePaymentBtn?.addEventListener('click', (e) => handleMakePaymentClick(e, state, elements));
}

// ==================== EVENT HANDLERS ====================
function handleUsdOptionClick(e, state, elements) {
    if (!e.target.closest('.currency-dropdown-item')) {
        document.querySelector('.currency-option-container').classList.toggle('open');
        elements.usdDropdown.classList.toggle('show');
        state.currencySelected = true;
    }
}

function handleCurrencyDropdownClick(item, state, elements) {
    const code = item.querySelector('.currency-code')?.textContent;
    const currency = item.querySelector('p')?.textContent || item.textContent.trim().split(' ').slice(1).join(' ');

    const optionLabel = elements.usdOption.querySelector('.option-label');
    optionLabel.innerHTML = `${currency} <span class="option-subtext">${code}</span>`;

    updateCurrencyState(state, code, currency);
    closeCurrencyDropdown(elements);
    updateSelectionStyles(elements.usdOption, elements.currencyOptions);
    checkCurrencySelection(state, elements);
}

function handleCurrencyOptionClick(e, option, state, elements) {

    if (option === elements.usdOption || e.target.closest('.currency-dropdown')) return;

    if (option !== elements.usdOption && !e.target.closest('.currency-dropdown')) {
        const code = option.querySelector('.option-subtext')?.textContent || "";
        const currency = option.querySelector('.option-label')?.textContent || option.textContent.trim().split(' ').slice(1).join(' ');

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
    button.textContent = 'Processing...';

    setTimeout(() => {
        document.getElementById('payment-details')?.classList.remove('active');
        document.getElementById('currency-section')?.classList.add('active');
        button.disabled = false;
        button.textContent = 'Proceed to Payment';
    }, 2000);
}

async function handleCurrencyContinueClick(e, state, elements) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.textContent = 'Converting...';

    try {
        if (state.currencyCode !== "EUR") {
            await convertCurrency(state, elements);

        } else {
            // Skip conversion for EUR
            document.getElementById('currency-section')?.classList.remove('active');
            document.getElementById('payment-method-section')?.classList.add('active');
        }
    } catch (error) {
        console.error('Conversion error:', error);
        elements.titleDiv.innerHTML = 'Error: Conversion service unavailable';

        document.getElementById('currency-section')?.classList.remove('active');
        document.getElementById('conversion-section')?.classList.add('active');
        document.getElementById("choose-method-btn").disabled = true;

    } finally {
        button.disabled = false;
        button.textContent = 'Continue';
    }
}

function handleChooseMethodClick(e) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.textContent = 'Redirecting...';

    setTimeout(() => {
        document.getElementById('conversion-section')?.classList.remove('active');
        document.getElementById('payment-method-section')?.classList.add('active');
        button.disabled = false;
        button.textContent = 'Choose Method';
    }, 2000);
}

function handleMakePaymentClick(e, state, elements) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.textContent = 'Processing...';

    setTimeout(() => {
        document.getElementById('payment-method-section')?.classList.remove('active');

        if (state.selectedMethod === "PayPal") {
            if (state.currencyCode === "EUR") {
                state.toPay = (parseFloat(state.amount) + parseFloat(state.charge)).toFixed(2);
            }
            state.paypalSections = createPaypalSections(state);
            handlePaypal(state, elements);
        } else {
            document.getElementById('loading-section')?.classList.add('active');
        }
    }, 2000);
}


function getCurrencySymbol(currencyCode) {
    const symbols = {
        "EUR": "€",
        "USD": "$",
        "CAD": "$",
        "AUD": "$",
        "GBP": "£",
        "CHF": "₣",
    };
    return symbols[currencyCode] || currencyCode;
}

// ==================== PAYPAL HANDLING ====================
function handlePaypal(state, elements) {
    state.paypalSections = createPaypalSections(state);

    const currentSection = state.paypalSections[state.paypalIndex + 1];

    if (currentSection) {
        // Clear and render new section
        elements.paymentDisplay.innerHTML = '';
        elements.paymentDisplay.insertAdjacentHTML('beforeend', currentSection);

        // Add click handlers for PayPal buttons
        document.querySelectorAll(".paypal-btn").forEach(btn => {
            btn.addEventListener('click', () => {
                state.paypalIndex++;
                handlePaypal(state, elements);
            });
        });

        document.querySelectorAll(".copy").forEach(btn => {
            btn.addEventListener('click', handleCopyClick);
        });

 if (state.paypalIndex + 1 === 4) {
            setupUploadSection(state);
        }
    }

    else {
        // Handle completion
        if (state.paymentStatus === false) {
            showPaymentError();
        } else {
            showPaymentSuccess();
        }
    }
}

function handleCopyClick(e) {
    const isEmail = e.target.closest('.info-div').querySelector('.info-title').textContent.includes('Email');
    const textToCopy = isEmail ?
        'paynowfunds@gmail.com' :
        `${getCurrencySymbol(state.currencyCode)}${state.toPay}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = e.target.textContent;
        e.target.textContent = 'Copied!';
        setTimeout(() => {
            e.target.textContent = originalText;
        }, 2000);
    });
}


function setupUploadSection(state) {
    const uploadTrigger = document.getElementById('upload-trigger');
    const fileInput = document.getElementById('receipt-upload');
    const uploadFeedback = document.querySelector('.upload-feedback');
    const fileNameDisplay = document.querySelector('.file-name');
    const senderNameInput = document.getElementById('sender-name-input');
const plusBTN = document.getElementById('add-button');

    // Set initial sender name if it exists in state
    if (state.senderName) {
        senderNameInput.value = state.senderName;
    }

    // File upload handling
    uploadTrigger.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = `File: ${file.name}`;
            uploadFeedback.style.display = 'block';
plusBTN.innerHTML ="✓";
plusBTN.style.color ="#0006a";
            
            // Here you would typically handle the file upload to a server
            // For now, we'll just show the UI feedback
            console.log('File selected:', file.name);
        }
    });

    // Sender name input handling
    senderNameInput.addEventListener('input', (e) => {
        state.senderName = e.target.value;
        console.log('Sender name updated:', state.senderName);
    });
}


function showPaymentSuccess() {
    document.getElementById('paypal-processing').querySelector('.processing').style.display = 'none';
    document.getElementById('paypal-processing').querySelector('.outcome').style.display = 'flex';
}

function showPaymentError() {
    const outcome = document.getElementById('paypal-processing').querySelector('.outcome');
    outcome.querySelector('.icon i').className = 'fa-solid fa-circle-xmark';
    outcome.querySelector('.display-title').textContent = 'Payment Unsuccessful';
    outcome.querySelector('.icon i').style.color = '#dc3545';

    document.getElementById('paypal-processing').querySelector('.processing').style.display = 'none';
    outcome.style.display = 'flex';
}

// ==================== HELPER FUNCTIONS ====================
function updateCurrencyState(state, code, currency) {
    state.currencySelected = true;
    state.currencyCode = code;
    state.selectedCurrency = currency;
}


function closeCurrencyDropdown(elements) {
    document.querySelector('.currency-option-container').classList.remove('open');
    elements.usdDropdown.classList.remove('show');
}

function updateSelectionStyles(selectedOption, allOptions) {
    allOptions.forEach(opt => opt.classList.remove('selected'));
    selectedOption.classList.add('selected');
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
    const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest/EUR';
    const response = await fetch(EXCHANGE_RATE_API);
    const data = await response.json();
    const rates = data.rates;

    if (state.currencyCode && state.currencyCode in rates) {

        const rate = rates[state.currencyCode];
        state.converted = (state.amount * rate).toFixed(2);
        state.charge = (0.98 * rate).toFixed(2);

        state.toPay = state.currencyCode === "EUR"
            ? (parseFloat(state.amount) + parseFloat(state.charge)).toFixed(2)
            : (parseFloat(state.converted) + parseFloat(state.charge)).toFixed(2);

        updateConversionUI(state, elements);
    } else {
        elements.titleDiv.innerHTML = 'Currency conversion not available';
    }

    document.getElementById('currency-section')?.classList.remove('active');
    document.getElementById('conversion-section')?.classList.add('active');
}

function updateConversionUI(state, elements) {
    const symbol = {
        "EUR": "€",
        "USD": "$",
        "CAD": "$",
        "AUD": "$",
        "GBP": "£",
        "CHF": "₣",
    };

    elements.titleDiv.innerHTML = `
        <span class="initial-amount">${state.amount} <span class="choosen-currency-code">EUR</span></span> 
        <i class="fas fa-exchange-alt"></i> 
        <span class="converted-amount">${state.converted} <span class="choosen-currency-code">${state.currencyCode}</span></span>
    `;

    elements.currencyCode.textContent = state.currencyCode;
    elements.convertedText.innerHTML = `
        ${symbol[state.currencyCode]} ${state.converted} <span class="choosen-currency-code">${state.currencyCode}</span>
    `;
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
        <p class="expiry">This payment link/account expires in: <span class="timeout">29:59</span></p>
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

  <div class="upload-feedback" style="display: none;">
                <p class="file-name"></p>
                <p class="upload-success">File uploaded successfully!</p>
            </div>

        </div>
        <div class="sender-name">
            <p><strong>Sender Name</strong></p>
           <input type="text" id="sender-name-input" placeholder="Enter sender's name">
        </div>
        <div class="proceed-div">
            <button class="continue-btn paypal-btn">SUBMIT</button>
        </div>
    </div>`;
}

function createPaypalSection5(state) {
    const iconClass = state.paymentStatus === false ? 'fa-circle-xmark' : 'fa-circle-check';
    const iconColor = state.paymentStatus === false ? 'color: #dc3545;' : 'color: #28a745;';


    function formatDateTime() {
        const now = new Date();

        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        };

        return now.toLocaleString('en-US', options) + ' at ' + now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
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
                <p class="display-title">${state.paymentStatus === false ? 'Payment Declined' : 'Payment Successful'}</p>
                <div class="inner-bottom">
                    <p class="display-title-price">0.00</p>
                    <p class="transaction-id">Transaction ID: <span class="id-text">${state.txn}</span></p>
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

// ==================== INITIALIZATION ====================
function initializePaymentFlow(state, elements) {
    document.getElementById('payment-details').classList.add('active');

    const urlParams = new URLSearchParams(window.location.search);
    const paymentType = urlParams.get('type');
    const paymentDetails = urlParams.get('details');

    // Redirect if no params
    if (!paymentType || !paymentDetails) {
        alert('No Payment Details Gotten, Please Book a Session!');
        window.location.href = '/html/main/Session.html';
        return;
    }

    try {
        // Parse payment details
        const details = JSON.parse(decodeURIComponent(paymentDetails));
        const language = navigator.language;

        // Generate transaction ID
        const transactionId = `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${language.substring(0, 2).toUpperCase()}`;

        state.txn = transactionId;
        state.amount = details.price;

        const description = details.type === "session" ?
            `${details.title.toUpperCase()} - Hours with Charlotte Casiraghi` :
            details.description || 'No description';

        document.getElementById('transaction-id').textContent = transactionId;
        document.getElementById('payment-amount').innerHTML =
            details.price ? `&euro;${details.price.toFixed(2)}` : 'N/A';
        document.getElementById('payment-description').textContent = description;
        document.getElementById('payment-date').textContent =
            details.date || new Date().toLocaleDateString();

    } catch (error) {
        console.error('Error parsing payment details:', error);
        window.location.href = '/html/main/Session.html';
        return;
    }

    // Initialize buttons
    elements.currencyContinueBtn.disabled = true;
    elements.makePaymentBtn.disabled = true;

    // Initialize checks
    checkCurrencySelection(state, elements);
    checkPaymentMethodSelection(state, elements);
}