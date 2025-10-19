// Jules: Added reset password logic
import { verifyResetCode, confirmNewPassword } from './auth.js';
import handleAlert, { handleRedirect } from './general.js';

window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode');
    const email = urlParams.get('email');

    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const updatePasswordButton = document.getElementById('update-password-button');
    const userEmailSpan = document.getElementById('user-email');
    const passwordError = document.querySelector('.password-error');

    if (userEmailSpan && email) {
        userEmailSpan.textContent = email;
    }

    if (!email) {
        handleAlert('No email address provided. Please try again.', 'blur', true, 'Error', true, [{
            text: 'OK',
            onClick: () => handleRedirect('/html/regs/Forget.html')
        }]);
        return;
    }

    if (!oobCode) {
        handleAlert('Invalid or expired password reset link.', 'blur', true, 'Error', true, [{
            text: 'OK',
            onClick: () => handleRedirect('/html/regs/Forget.html')
        }]);
        return;
    }

    verifyResetCode(oobCode).then(() => {
        // Code is valid
    }).catch(() => {
        handleAlert('Invalid or expired password reset link.', 'blur', true, 'Error', true, [{
            text: 'OK',
            onClick: () => handleRedirect('/html/regs/Forget.html')
        }]);
    });

    const validatePasswords = () => {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (newPassword !== confirmPassword) {
            passwordError.textContent = 'Passwords do not match.';
            updatePasswordButton.disabled = true;
        } else if (newPassword.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            updatePasswordButton.disabled = true;
        } else {
            passwordError.textContent = '';
            updatePasswordButton.disabled = false;
        }
    };

    newPasswordInput.addEventListener('input', validatePasswords);
    confirmPasswordInput.addEventListener('input', validatePasswords);

    updatePasswordButton.addEventListener('click', (e) => {
        e.preventDefault();
        const newPassword = newPasswordInput.value;

        updatePasswordButton.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
        updatePasswordButton.disabled = true;

        confirmNewPassword(oobCode, newPassword).then(() => {
            // sendChangedEmail(); // Placeholder function
            sessionStorage.setItem('userEmail', email);
            handleAlert('Password updated successfully!', 'blur', true, 'Success', true, [{
                text: 'OK',
                onClick: () => handleRedirect('/html/regs/Signup.html?type=login')
            }]);
        }).catch((error) => {
            handleAlert(`Error updating password: ${error.message}`, 'blur', true, 'Error', true, [{
                text: 'OK',
                onClick: 'closeAlert'
            }]);
            updatePasswordButton.innerHTML = '<p class="reset-text">UPDATE PASSWORD</p>';
            updatePasswordButton.disabled = false;
        });
    });
});
