document.addEventListener('DOMContentLoaded', () => {
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


    const state = {
        currencySelected: false,
        methodSelected: false,
        selectedCurrency: "",
        currencyCode: "",
        selectedMethod: "",
        converted: "",
        amount: 0,
        txn: "",
    };

    try {
        // Parse payment details
        const details = JSON.parse(decodeURIComponent(paymentDetails));
        const language = navigator.language;

        // Generate transaction ID
        const transactionId = `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${language.substring(0, 2).toUpperCase()}`;

        state.txn = transactionId;
        state.amount = details.price;

        const description = details.type = "session" ? `${details.title.toUpperCase()} - Hours with Charlotte Casiraghi` : details.description || 'No description';

        document.getElementById('transaction-id').textContent = transactionId;
        document.getElementById('payment-amount').innerHTML =
            details.price ? `&euro;${details.price.toFixed(2)}` : 'N/A';
        document.getElementById('payment-description').textContent = description;
        document.getElementById('payment-date').textContent =
            details.date || new Date().toLocaleDateString();

    } catch (error) {
        console.error('Error parsing payment details:', error);
        window.location.href = '/html/main/Session.html';
    }


    // Get buttons and disable them initially
    const currencyContinueBtn = document.getElementById('currency-continue');
    const makePaymentBtn = document.getElementById('make-payment-btn');
    currencyContinueBtn.disabled = true;
    makePaymentBtn.disabled = true;

    const usdOption = document.getElementById('usd-option');
    const usdDropdown = document.getElementById('usd-dropdown');
    const currencyOptions = document.querySelectorAll('.option-item');
    const currencyDropdownItems = document.querySelectorAll('.currency-dropdown-item');

    const paymentMethodOptions = document.querySelectorAll('#payment-method-section label.option-item');


    //for conversion:
    const currencyCode = document.querySelector('span.choosen-currency-code');
    const convertedText = document.querySelector('h2.converted');
    const titleDiv = document.querySelector("#conversion-section .option-list p.title");

    function checkCurrencySelection() {
        if (state.currencySelected) {
            currencyContinueBtn.disabled = !state.currencySelected;
        }
    }

    // Function to enable payment button
    function checkPaymentMethodSelection() {
        if (state.methodSelected) {
            makePaymentBtn.disabled = !state.methodSelected;
        }
    }

    usdOption.addEventListener('click', (e) => {
        if (!e.target.closest('.currency-dropdown-item')) {
            document.querySelector('.currency-option-container').classList.toggle('open');
            usdDropdown.classList.toggle('show');

            state.currencySelected = true;
        }
    });


    // Handle currency selection from dropdown
    currencyDropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const code = item.querySelector('.currency-code').textContent;
            const currency = item.querySelector('p')?.textContent || item.textContent.trim().split(' ').slice(1).join(' ');

            // Update the displayed text
            const optionLabel = usdOption.querySelector('.option-label');
            optionLabel.innerHTML = `${currency} <span class="option-subtext">${code}</span>`;

            state.currencySelected = true;
            state.currencyCode = code;
            state.selectedCurrency = currency;


            // Close dropdown
            document.querySelector('.currency-option-container').classList.remove('open');
            usdDropdown.classList.remove('show');

            // Update selection styling
            currencyOptions.forEach(opt => opt.classList.remove('selected'));
            usdOption.classList.add('selected');

            // Check if currency is selected
            checkCurrencySelection();
        });
    });

    // Handle regular currency selection
    currencyOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            if (option !== usdOption && !e.target.closest('.currency-dropdown')) {

                currencyOptions.forEach(opt => opt.classList.remove('selected'));

                const code = option.querySelector('.option-subtext')?.textContent;

                const currency = option.querySelector('.option-label')?.textContent || option.textContent.trim().split(' ').slice(1).join(' ');

                option.classList.add('selected');
                state.currencySelected = true;

                state.currencyCode = code;
                state.selectedCurrency = currency;


                // Close USD dropdown if open
                document.querySelector('.currency-option-container').classList.remove('open');
                usdDropdown.classList.remove('show');

                // Check if currency is selected
                checkCurrencySelection();
            }
        });
    });

    // Handle payment method selection
    paymentMethodOptions.forEach(option => {

        option.addEventListener('click', () => {
            const method = option.querySelector(".option-label");

            state.methodSelected = true;
            state.selectedMethod = method;

            checkPaymentMethodSelection();
        });
    });


    // Initialize checks
    checkCurrencySelection();
    checkPaymentMethodSelection();

    // Proceed to payment handler
    document.getElementById('proceed-button')?.addEventListener('click', (e) => {
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
    });

    const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest/EUR';

    document.getElementById('currency-continue')?.addEventListener('click', async function (e) {
        e.preventDefault();
        const button = e.target;

        button.disabled = true;
        button.textContent = 'Converting...';

        setTimeout(async () => {

            try {
                // Fetch conversion rates
                const response = await fetch(EXCHANGE_RATE_API);
                const data = await response.json();
                const rates = data.rates;

                // Check if selected currency is available in rates
                if (state.currencyCode && state.currencyCode in rates) {
                    const rate = rates[state.currencyCode];
                    state.converted = (state.amount * rate).toFixed(2);

                    // Update UI after conversion
                    document.getElementById('currency-section')?.classList.remove('active');

                    titleDiv.innerHTML = state.currencyCode !== "EUR" ? `<span class="initial-amount"> ${state.amount}<span class="choosen-currency-code">EUR</span></span> >> <span class="converted-amount">${state.converted}<span class="choosen-currency-code">${state.currencyCode}</span></span>` : ``;

                    currencyCode.textContent = state.currencyCode;
                    convertedText.innerHTML = state.currencyCode !== "EUR" ?
                        `${state.converted} <span class="choosen-currency-code">${state.currencyCode}</span>` :
                        `${state.amount}<span class="choosen-currency-code"> EUR</span>`;

                    document.getElementById('conversion-section')?.classList.add('active');
                } else {
                    // Fallback if currency not found
                    titleDiv.innerHTML = 'Currency conversion not available';
                    document.getElementById('conversion-section')?.classList.add('active');
                }
            } catch (error) {
                console.error('Conversion error:', error);
                titleDiv.innerHTML = 'Conversion service unavailable';
                document.getElementById('conversion-section')?.classList.add('active');
            } finally {
                button.disabled = false;
                button.textContent = 'Convert';
            }
        });
    });


    document.getElementById('choose-method-btn')?.addEventListener('click', function (e) {
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
    });

    document.getElementById('make-payment-btn')?.addEventListener('click', function (e) {
        e.preventDefault();
        const button = e.target;

        button.disabled = true;
        button.textContent = 'Processing...';

        setTimeout(() => {
            document.getElementById('payment-method-section')?.classList.remove('active');
            document.getElementById('loading-section')?.classList.add('active');

            // Here you would typically submit the form
            // document.getElementById('payment-form').submit();
        }, 2000);
    });
});