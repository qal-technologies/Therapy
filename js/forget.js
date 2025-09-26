import handleAlert from './general.js';
import { changePassword } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("forgot-email");
    const resetButton = document.getElementById("forgot-button");
    console.log("hhhh");

    // Enable button only if email is typed
    emailInput.addEventListener("input", () => {
        resetButton.disabled = emailInput.value.trim() === "";
        console.log('hh')
    });

    resetButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();

        if (!email) {
            handleAlert("Please enter a valid email.", "blur", true, "<i class='bi bi-exclamation-circle text-danger'></i><br/> Invalid Email", true, [{ text: "OK", onClick: "closeAlert" }]);
            return;
        }

        resetButton.disabled = true;
        resetButton.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div> Sending...`;
        if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
            handleAlert("Please check the email you entered and try again.", "blur", true, "<i class='bi bi-exclamation-circle text-danger'></i> <br/> Invalid Email", true, [{ text: "OK", onClick: "closeAlert" }]);
            throw new Error("Please enter a valid email address.");
        }

        try {
                await changePassword(email);
                handleAlert(
                    `A reset link has been sent to <b>${email}</b>. <br/> Please check your inbox.`,
                    "blur",
                    true,
                    "<i class='bi bi-envelope-check text-success'></i><br/> Email Sent",
                    true,
                    [{ text: "Back to Login", onClick: () => window.location.replace("/html/regs/Signup.html?type=login") }]
                );
        } catch (error) {
            console.error("Password reset error:", error);
            const msg = error.message.replace("Firebase:", "").trim();
            handleAlert(`Failed to send reset email: ${msg}`, "blur", true, "<i class='bi bi-exclamation-triangle text-danger'></i><br/> Reset Failed", true, [{ text: "Try Again", onClick: "closeAlert" }]);
        } finally {
            resetButton.disabled = false;
            resetButton.innerHTML = `<p class="text">RESET PASSWORD</p>`;
        }
    });
});
