import { verifyResetCode, confirmNewPassword } from './auth.js';
import { sendEmail } from '../emailHelper.js';
import handleAlert, { getOS, handleRedirect, handleTranslateFirstLoad } from './general.js';

window.addEventListener('load', async() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode');

    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const updatePasswordButton = document.getElementById('update-password-button');
    const userEmailSpan = document.getElementById('user-email');
    const passwordError = document.querySelector('.password-error');

    await handleTranslateFirstLoad();

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

    if (!oobCode) {
        handleAlert('Invalid or expired password reset link. Please request another reset link on the Forgot Password page.', 'blur', true, "<i class='bi bi-exclamation-circle text-danger fs-2'></i> <br/> Verification Error", true, [{
            text: 'REQUEST LINK',
            onClick: () => handleRedirect('/html/regs/Forget.html', "replace"),
            loading:true,
        }]);
        return;
    }

    verifyResetCode(oobCode).then((email) => {
        if (userEmailSpan) {
            userEmailSpan.textContent = email;
        }

        handlePasswordAndViews();
        newPasswordInput.addEventListener('input', validatePasswords);
        confirmPasswordInput.addEventListener('input', validatePasswords);

        updatePasswordButton.addEventListener('click', (e) => {
            e.preventDefault();
            const newPassword = newPasswordInput.value;

            updatePasswordButton.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
            updatePasswordButton.disabled = true;

            confirmNewPassword(oobCode, newPassword).then(async () => {
                await sendEmail(email, 'password-changed', {
                    first_name: 'there' 
                });


                sessionStorage.setItem('userEmail', email);
                handleAlert('Your password updated successfully!<br/> You can login now to continue your journey.', 'blur', true, "<i class='bi bi-check-circle-fill text-success fs-2'></i> <br/> Updated!", true, [{
                    text: 'LOGIN',
                    onClick: () => handleRedirect('/html/regs/Signup.html?type=login', "replace"),
                    loading: true,
                }]);
            }).catch((error) => {
                if (error.includes("network")) {
                    handleAlert("Network error. Please check your internet connection and try again.", "blur", true, `${getOS() == "iOS" ? `<i class="bi bi-cloud-slash text-danger fs-2"></i>` : `<i class='bi bi-wifi-off text-danger fs-2'></i>`} <br/> Network Error`, true, [{
                        text: "Reload", onClick: () => window.location.reload(),
                        loading: true,
                    }]);

                    updatePasswordButton.innerHTML = '<p class="reset-text">UPDATE PASSWORD</p>';
                    updatePasswordButton.disabled = false;
                }

                handleAlert(`Error updating password: ${error.message}`, 'blur', true, "<i class='bi bi-exclamation-circle text-danger fs-2'></i> <br/> Update Error", true, [{
                    text: 'Try Again',
                    onClick: "closeAlert",
                    loading: true,
                }]);

                updatePasswordButton.innerHTML = '<p class="reset-text">UPDATE PASSWORD</p>';
                updatePasswordButton.disabled = false;
            });
        });
    }).catch(() => {
        handleAlert('Invalid or expired password reset link. Please request another reset link on the Forgot Password page.', 'blur', true, "<i class='bi bi-exclamation-circle text-danger fs-2'></i> <br/> Verification Error", true, [{
            text: 'REQUEST LINK',
            onClick: () => handleRedirect('/html/regs/Forget.html', "replace"),
            loading: true,
        }]);

        newPasswordInput.disabled = true;
        confirmPasswordInput.disabled = true;
        updatePasswordButton.disabled = true;
    });
});
