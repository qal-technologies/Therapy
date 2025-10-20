// Jules: Added reset password logic
import { verifyResetCode, confirmNewPassword } from './auth.js';
import handleAlert, { handleRedirect } from './general.js';

window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode');

    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const updatePasswordButton = document.getElementById('update-password-button');
    const userEmailSpan = document.getElementById('user-email');
    const passwordError = document.querySelector('.password-error');

    // Jules: Function to handle password visibility toggle
    function handlePasswordAndViews() {
        const btns = document.querySelectorAll(".toggle-password");
        btns.forEach(btn => {
            btn.addEventListener("click", () => {
                const inputId = btn.getAttribute("data-target");
                const input = document.getElementById(inputId);
                const icon = btn.querySelector("i");
                if (!input) return;
                if (input.type === "password") {
                    input.type = "text";
                    icon?.classList.remove("bi-eye");
                    icon?.classList.add("bi-eye-slash");
                } else {
                    input.type = "password";
                    icon?.classList.remove("bi-eye-slash");
                    icon?.classList.add("bi-eye");
                }
            });
        });
    }

    // Jules: Function to validate passwords
    const validatePasswords = () => {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword.length > 0 && newPassword !== confirmPassword) {
            passwordError.textContent = 'Passwords do not match.';
            passwordError.style.display = 'block';
            updatePasswordButton.disabled = true;
        } else if (newPassword.length > 0 && newPassword.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            passwordError.style.display = 'block';
            updatePasswordButton.disabled = true;
        } else {
            passwordError.textContent = '';
            passwordError.style.display = 'none';
            updatePasswordButton.disabled = newPassword === '' || confirmPassword === '';
        }
    };

    // Jules: Initialize UI handlers immediately
    handlePasswordAndViews();
    newPasswordInput.addEventListener('input', validatePasswords);
    confirmPasswordInput.addEventListener('input', validatePasswords);

    if (!oobCode) {
        handleAlert('Invalid or expired password reset link.', 'blur', true, 'Error', true, [{
            text: 'OK',
            onClick: () => handleRedirect('/html/regs/Forget.html')
        }]);
        return;
    }

    verifyResetCode(oobCode).then((email) => {
        if (userEmailSpan) {
            userEmailSpan.textContent = email;
        }

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
    }).catch(() => {
        handleAlert('Invalid or expired password reset link.', 'blur', true, 'Error', true, [{
            text: 'OK',
            onClick: () => handleRedirect('/html/regs/Forget.html')
        }]);
        // Jules: Disable form if code is invalid
        newPasswordInput.disabled = true;
        confirmPasswordInput.disabled = true;
        updatePasswordButton.disabled = true;
    });
});
