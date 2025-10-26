import { sendEmail } from '../emailHelper.js';
import { login, logout } from '../js/auth.js';
import handleAlert from '../js/general.js'

// Hardcoded admin email for client-side check
// const ADMIN_EMAIL = "healingwithcharlottecasiraghi@gmail.com";
const ADMIN_EMAIL = "qaltech.company@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const requestOtpBtn = document.getElementById("request-otp-btn");
    const otpGroup = document.querySelector(".otp-group");
    const otpInput = document.getElementById("otp");
    const loginBtn = document.getElementById("login-btn");
    const error = document.querySelector('p.email-error');

    // 1. Handle Request OTP button click
    requestOtpBtn?.addEventListener("click", (e) => {
        e.preventDefault();

        error.innerHTML = '';
        if (error.classList.contains('fadeOut')) error.classList.remove("fadeOut");

        const email = emailInput.value.trim();

        if (email === ADMIN_EMAIL) {
            // Disable email input and button
            emailInput.disabled = true;
            requestOtpBtn.disabled = true;
            requestOtpBtn.textContent = "OTP Requested";

            // // Call Netlify function to send OTP
            sendOtp(email).then(value => {
                if (value) {
                    // Show OTP input field
                    otpGroup.style.display = "flex";
                    otpGroup.classList.add("moveUpNfadeIn");
                    otpInput.focus();

                    setTimeout(() => {
                        requestOtpBtn.classList.add('fadeOut');
                    }, 500);
                }
            });
        } else if (!email || email.length < 1) {
            error.innerHTML = "Email input can't be empty."

            emailInput.value = "";
            emailInput?.focus();

            error.classList.add("fadeIn");
        } else {
            error.innerHTML = "This email address is not authorized for admin access."

            emailInput?.focus();
            error.classList.add("fadeIn");
        }
    });

    emailInput?.addEventListener("input", () => {
        if (!error.classList.contains('fadeOut')) error.classList.add('fadeOut');

        error.innerHTML = '';
        error.classList.toggle("fadeIn");
    })

    async function sendOtp(email) {
        try {
            const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

            const { success, message } = await sendEmail(email, 'admin-otp', otpCode);

            if (!success) {
                throw new Error(`Failed to send OTP. because of: ${message}`);
            }

            if (success) {
                // Store OTP and expiry in sessionStorage
                const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
                sessionStorage.setItem('adminOtp', otpCode);
                sessionStorage.setItem('adminOtpExpiry', otpExpiry);
                handleAlert('An OTP has been sent to your email.', 'toast');
                return true;
            } else {
                throw new Error(message || 'An unknown error occurred.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            handleAlert(`Error: ${error.message}`, 'toast');
            // Re-enable the button if sending fails

            emailInput.disabled = false;
            requestOtpBtn.disabled = false;
            requestOtpBtn.textContent = "Request OTP";

            otpGroup.style.display = "none";
            return false;
        }
    }

    // 2. Handle the final login form submission
    loginBtn?.addEventListener("click", (e) => {
        e.preventDefault();

        const otp = otpInput.value.trim();
        const storedOtp = sessionStorage.getItem('adminOtp');
        const storedOtpExpiry = sessionStorage.getItem('adminOtpExpiry');

        if (!storedOtp || !storedOtpExpiry) {
            handleAlert('No OTP found. Please request one first.', 'toast');
            return;
        }

        if (Date.now() > parseInt(storedOtpExpiry, 10)) {
            handleAlert('Your OTP has expired. Please request a new one.', 'toast');
            sessionStorage.removeItem('adminOtp');
            sessionStorage.removeItem('adminOtpExpiry');
            window.location.reload();
            return;
        }

        if (otp === storedOtp) {
            loginBtn.disabled = true;
            loginBtn.textContent = "Verifying...";
            handleSuccessfulOtp(ADMIN_EMAIL);
        } else {
            handleAlert("Invalid OTP. Please try again.", 'toast');
            otpInput.value = "";
            otpInput.focus();
        }
    });

    async function handleSuccessfulOtp(email) {
        try {
            const password = "testing123";

            const userCredential = await login(email, password);
            const adminUser = userCredential.user;

            // 2. Generate a secure session token
            const sessionToken = generateSecureToken();

            // 3. Store the token in localStorage
            localStorage.setItem('adminSessionToken', sessionToken);
            localStorage.setItem('adminId', adminUser.uid);

            // 4. Update the token in Firestore via Netlify function
            await updateSessionTokenInFirestore(adminUser.uid, sessionToken);

            // 5. Redirect to the dashboard
            handleAlert('Login successful! Redirecting to dashboard...');
            window.location.href = 'dashboard.html';

        } catch (error) {
            console.error('Firebase login failed:', error);
            handleAlert('Failed to log in. Please check the console for details.', 'toast');
            loginBtn.disabled = false;
            loginBtn.textContent = "Login";
        } finally {
            // Clean up session storage
            sessionStorage.removeItem('adminOtp');
            sessionStorage.removeItem('adminOtpExpiry');
        }
    }

    function generateSecureToken() {
        // Simple and effective way to generate a random token
        return [...Array(30)].map(() => Math.random().toString(36)[2] || '0').join('');
    }

    async function updateSessionTokenInFirestore(adminId, token) {
        try {
            const response = await fetch('/.netlify/functions/update-admin-session-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminId, token }),
            });
            if (!response.ok) {
                throw new Error('Failed to update session token in Firestore.');
            }
        } catch (error) {
            console.error(error);
            logout();
            handleAlert('A critical error occurred with your session. Please try again.', 'toast');
        }
    };
});
