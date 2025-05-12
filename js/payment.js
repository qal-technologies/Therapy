document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('payment-details').classList.add('active');

    const urlParams = new URLSearchParams(window.location.search);
    const paymentType = urlParams.get('type');
    const paymentDetails = urlParams.get('details');


    // Redirect if no params
    if (!paymentType || !paymentDetails) {
        alert('No Payment Details Gotten, Please Book a Session!')
        window.location.href = '/html/main/Session.html';
        return;
    }

    try {
        // Parse payment details
        const details = JSON.parse(decodeURIComponent(paymentDetails));
const language = navigator.language;

        // Generate transaction ID
        const transactionId = `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${language.substring(0, 2).toUpperCase()}`

        document.getElementById('transaction-id').textContent = transactionId;
        document.getElementById('payment-amount').innerHTML =
            details.price ? `&euro;${details.price.toFixed(2)}` : 'N/A';
        document.getElementById('payment-description').textContent =
            `${details.title.toUpperCase()} - Hours with Charlotte Casiraghi`|| 'No description';
        document.getElementById('payment-date').textContent =
            details.date || new Date().toLocaleDateString();

    } catch (error) {
        console.error('Error parsing payment details:', error);
        window.location.href = '/html/main/Session.html';
    }


    const usdOption = document.getElementById('usd-option');
    const usdDropdown = document.getElementById('usd-dropdown');
    const currencyOptions = document.querySelectorAll('.option-item');
    const currencyDropdownItems = document.querySelectorAll('.currency-dropdown-item');


    usdOption.addEventListener('click', (e) => {
        if (!e.target.closest('.currency-dropdown-item')) {
            document.querySelector('.currency-option-container').classList.toggle('open');
            usdDropdown.classList.toggle('show');
        }
    });

    // Handle currency selection from dropdown
    currencyDropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const value = item.getAttribute('data-value');
            const code = item.querySelector('.currency-code').textContent;
            const currency = item.querySelector('p').textContent;

            // Update the displayed text
            const optionLabel = usdOption.querySelector('.option-label');
            optionLabel.innerHTML = `${currency} <span class="option-subtext">${code}</span>`;

            // Close dropdown
            document.querySelector('.currency-option-container').classList.remove('open');
            usdDropdown.classList.remove('show');

            // Update selection styling
            currencyOptions.forEach(opt => opt.classList.remove('selected'));
            usdOption.classList.add('selected');
        });
    });

    // Handle regular currency selection
    currencyOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            if (option !== usdOption && !e.target.closest('.currency-dropdown')) {
                currencyOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Close USD dropdown if open
                document.querySelector('.currency-option-container').classList.remove('open');
                usdDropdown.classList.remove('show');
            }
        });
    });


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

    document.getElementById('currency-continue')?.addEventListener('click', function (e) {
        e.preventDefault();
        const button = e.target;

        button.disabled = true;
        button.textContent = 'Loading...';

        setTimeout(() => {
            document.getElementById('currency-section')?.classList.remove('active');
            document.getElementById('payment-method-section')?.classList.add('active');
            button.disabled = false;
            button.textContent = 'Continue'; // Reset button text
        }, 2000);
    });

    document.getElementById('make-payment-btn')?.addEventListener('click', function (e) {
        e.preventDefault();
        const button = e.target;

        button.disabled = true;
        button.textContent = 'Redirecting...';

        setTimeout(() => {
            document.getElementById('payment-method-section')?.classList.remove('active');
            document.getElementById('loading-section')?.classList.add('active');

            // Here you would typically submit the form
            // document.getElementById('payment-form').submit();
        }, 2000);
    });
});