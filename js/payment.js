document.addEventListener('DOMContentLoaded', () => {
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

        // Generate transaction ID
        const transactionId = 'TXN' + Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

        // Populate payment details
        document.getElementById('payment-name').textContent = details.name || 'N/A';
        document.getElementById('payment-type').textContent = paymentType;
        document.getElementById('transaction-id').textContent = transactionId;
        document.getElementById('payment-amount').textContent =
            details.amount ? `$${details.amount.toFixed(2)}` : 'N/A';
        document.getElementById('payment-description').textContent =
            details.description || 'No description';
        document.getElementById('payment-date').textContent =
            details.date || new Date().toLocaleDateString();

    } catch (error) {
        console.error('Error parsing payment details:', error);
        window.location.href = '/html/main/Session.html';
    }

    // Payment method selection
    const methodOptions = document.querySelectorAll('.method-option');
    const proceedButton = document.getElementById('proceed-button');
    let selectedMethod = null;

    methodOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove previous selection
            methodOptions.forEach(m => m.classList.remove('selected'));
            // Set new selection
            option.classList.add('selected');
            selectedMethod = option.dataset.method;
            proceedButton.disabled = false;
        });
    });

    // Proceed to payment handler
    proceedButton.addEventListener('click', () => {
        proceedButton.disabled = true;
        proceedButton.textContent = 'Processing...';

        // Simulate payment processing
        setTimeout(() => {
            alert(`Payment successful! Transaction ID: ${document.getElementById('transaction-id').textContent
                }`);
            proceedButton.disabled = false;
            proceedButton.textContent = 'Proceed to Payment';
        }, 2000);
    });
});