import { signInWithEmailAndPassword, auth } from '../js/auth.js';

// Hardcoded admin email for client-side check
const ADMIN_EMAIL = "healingwithcharlottecasiraghi@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const requestOtpBtn = document.getElementById("request-otp-btn");
    const otpGroup = document.querySelector(".otp-group");
    const otpInput = document.getElementById("otp");
    const loginBtn = document.getElementById("login-btn");

    // 1. Handle Request OTP button click
    requestOtpBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();

        if (email === ADMIN_EMAIL) {
            // Disable email input and button
            emailInput.disabled = true;
            requestOtpBtn.disabled = true;
            requestOtpBtn.textContent = "OTP Requested";

            // Show OTP input field
            otpGroup.style.display = "block";
            otpInput.focus();

            // Call Netlify function to send OTP
            sendOtp(email);

        } else {
            alert("This email address is not authorized for admin access.");
        }
    });

    async function sendOtp(email) {
        try {
            const response = await fetch('/.netlify/functions/send-admin-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to send OTP.');
            }

            const data = await response.json();
            if (data.success) {
                // Store OTP and expiry in sessionStorage
                const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
                sessionStorage.setItem('adminOtp', data.otp);
                sessionStorage.setItem('adminOtpExpiry', otpExpiry);
                alert('An OTP has been sent to your email.');
            } else {
                throw new Error(data.message || 'An unknown error occurred.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert(`Error: ${error.message}`);
            // Re-enable the button if sending fails
            emailInput.disabled = false;
            requestOtpBtn.disabled = false;
            requestOtpBtn.textContent = "Request OTP";
            otpGroup.style.display = "none";
        }
    }

    // 2. Handle the final login form submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const otp = otpInput.value.trim();
        const storedOtp = sessionStorage.getItem('adminOtp');
        const storedOtpExpiry = sessionStorage.getItem('adminOtpExpiry');

        if (!storedOtp || !storedOtpExpiry) {
            alert('No OTP found. Please request one first.');
            return;
        }

        if (Date.now() > parseInt(storedOtpExpiry, 10)) {
            alert('Your OTP has expired. Please request a new one.');
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
            alert("Invalid OTP. Please try again.");
            otpInput.value = "";
            otpInput.focus();
        }
    });

    async function handleSuccessfulOtp(email) {
        try {
            // This is a placeholder for the actual password.
            // In a real application, this should be handled more securely.
            const password = "password123"; // Replace with the actual password

            // 1. Sign in to Firebase
            // NOTE: The firebase-config.js needs to be imported here.
            // I will add the import statement.
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const adminUser = userCredential.user;

            // 2. Generate a secure session token
            const sessionToken = generateSecureToken();

            // 3. Store the token in localStorage
            localStorage.setItem('adminSessionToken', sessionToken);
            localStorage.setItem('adminId', adminUser.uid);

            // 4. Update the token in Firestore via Netlify function
            await updateSessionTokenInFirestore(adminUser.uid, sessionToken);

            // 5. Redirect to the dashboard
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'dashboard.html';

        } catch (error) {
            console.error('Firebase login failed:', error);
            alert('Failed to log in. Please check the console for details.');
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
            // In a real app, you might want to handle this more gracefully,
            // e.g., by logging the user out.
            alert('A critical error occurred with your session. Please try again.');
        }
    });
});
