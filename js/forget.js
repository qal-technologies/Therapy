import handleAlert, { getOS, handleRedirect, translateElementFragment } from './general.js';
import { resetPassword } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("forgot-email");
    const resetButton = document.getElementById("forgot-button");
    const errorMsg = document.querySelector("p.email-error");
    const backBTN = document.querySelector("button.back-to-login");

    function validateEmailValue(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email.trim());
    }

    function handleStroll() {
        if (emailInput) {
            emailInput.focus();
            emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    handleStroll();

    // Enable button only if email is typed
    emailInput.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        const valid = validateEmailValue(value);
        if (errorMsg || valid) {
            errorMsg.style.display = "none";
            emailInput.style.borderColor = "var(--link)";
            errorMsg.innerHTML = "";
        }
        if (value.length >= 5) {
            if (valid) {
                resetButton.disabled = emailInput.value.trim() === "";
            } else {
                emailInput.style.borderColor = "red";
                errorMsg.style.display = "flex";
                errorMsg.innerHTML = 'Please enter a valid email address.'
                resetButton.disabled = true;
            }
        }
        console.log("user entering something....")
    });

    backBTN.addEventListener("click", () => {
        window.location.replace("/html/regs/Signup.html?type=login");
    })

    resetButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const valid = validateEmailValue(email);

        if (!email) {
            handleAlert("Please enter a valid email.", "blur", true, "<i class='bi bi-exclamation-circle text-danger fs-2'></i><br/> Invalid Email", true, [{ text: "OK", onClick: "closeAlert" }]);
            return;
        }


        if (!valid) {
            handleAlert("Invalid email address, please check the email you entered and try again.", "blur", true, "<i class='bi bi-exclamation-circle text-danger fs-2'></i> <br/> Invalid Email", true, [{ text: "OK", onClick: "closeAlert" }]);
            throw new Error("Please enter a valid email address.");
        } else {
            resetButton.disabled = true;
            resetButton.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
            try {
                const internet = navigator.onLine;
                const ios = getOS() === "iOS";

                if (!internet) {
                    handleAlert("Network error. Please check your internet connection and try again.", "blur", true, `${ios ? `<i class="bi bi-cloud-slash text-danger fs-2"></i>` : `<i class='bi bi-wifi-off text-danger fs-2'></i>`} <br/> Network Error`, true, [{ text: "Try Again", onClick: "closeAlert" }]);
                    return;
                }
                emailInput.disabled = true;

                const actionCodeSettings = {
                    url: `${window.location.origin}/html/regs/Signup.html?type=login`,
                    handleCodeInApp: true,
                };

                await resetPassword(email, actionCodeSettings);
                handleAlert(
                    `A reset link has been sent to <b>${email}</b>. <br/> Please check your inbox.`,
                    "blur",
                    true,
                    "<i class='bi bi-envelope-check text-success fs-2'></i><br/> Email Sent",
                    true,
                    [{ text: "Back to Login", onClick: () => window.location.replace("/html/regs/Signup.html?type=login") }]
                );


            } catch (error) {

                console.error("Password reset error:", error);
                const errorMessage = error.message.split('(').pop().split(')')[0].replace('auth/', '');
               

                if (errorMessage.includes("network-request-failed")) {
                    handleAlert("Network error. Please check your internet connection and try again.", "blur", true, `${getOS() === "iOS" ? `<i class="bi bi-cloud-slash text-danger fs-2"></i>` : `<i class='bi bi-wifi-off text-danger fs-2'></i>`} <br/> Network Error`, true, [{ text: "Try Again", onClick: "closeAlert" }]);
                    return;
                }

                const msg = error.message.replace("Firebase:", "").trim();
                handleAlert(`Failed to send reset email: ${msg}`, "blur", true, "<i class='bi bi-exclamation-triangle text-danger'></i><br/> Reset Failed", true, [{ text: "Try Again", onClick: "closeAlert" }]);
            } finally {
                emailInput.disabled = false;
                resetButton.disabled = false;
                resetButton.innerHTML = `<p class="reset-text">RESET PASSWORD</p>`;
                    translateElementFragment(resetButton, "")
            }
        }
    });

});
