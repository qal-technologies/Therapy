import handleAlert from "./general.js";

function handleVerifyEmail(e) {
    const email = document.getElementById('reg-email')?.value;
    const emailInput = document.getElementById('reg-email');

    const randomCodes = ["109283", "3F8492", "083495", "W4EH37", "5YW45E", "O734T3", "9034FN", "2SX421", "R623UW", "03834D"];
    const otpCode = randomCodes[Math.floor(Math.random() * randomCodes.length)];
    sessionStorage.setItem("verification-otp-pp", JSON.stringify(otpCode));
    console.log(otpCode);


    const check = () => {
        const verifyInput = document.getElementById('email-otp');
        const errorDiv = document.querySelector(".alert-message .alert-error");
        const value = verifyInput?.value.trim();
        const gottenCode = JSON.parse(sessionStorage.getItem("verification-otp-pp"));

        if (!value || value === "") {
            if (errorDiv) {
                errorDiv.innerHTML = "Input can't be empty!";
                errorDiv.style.display = "flex";
            }
            verifyInput?.focus();
            return false;
        }

        const match = randomCodes.find(code => code === value);

        if (value === gottenCode || match) {
            handleAlert(`<p>Your email (<b>${email}</b>) has been verified successfully.</p>`, "blur", true, "<i class='bi bi-check-circle-fill text-success fs-2'></i> <br/> Email Verified", true, [{
                text: "Continue", onClick: async () => {
                    
                    handleAlert(`<p>You can't create a new account now. Upgrade your authentication plan to Essential or Professional.</p>`, "blur", true, "<i class='bi bi-x-circle-fill text-danger fs-2'></i> <br/> Error", true, [{ text: "Try Again", onClick: "closeAlert" }]);
                    return "closeAlert";
                }, loading: true,
            }]);
            return true;
        } else {
            if (errorDiv) {
                errorDiv.innerHTML = "The code you entered is invalid or expired. Please check your email and try again.";
                errorDiv.style.display = "flex";
            }
            return false;
        }
    }

    const onResend = async () => {
        // regenerate and save a fresh OTP
        const newOtp = randomCodes[Math.floor(Math.random() * randomCodes.length)];
        sessionStorage.setItem("verification-otp-pp", JSON.stringify(newOtp));
        console.log(newOtp);
        handleVerifyEmail(e)
        // await sendOTPToEmail(email, newOtp);
        return true; 
    };

    handleAlert(
        `<p>We've sent a code to your email: <b>${email}</b>. Please check your inbox. If you don't see it, check your spam/junk folder or search for '<b>Charlotte Casiraghi</b>'.</p>`,
        "blur",
        true,
        "Verify Email",
        true,
        [
            {
                text: "Change Email",
                onClick: () => {
                    emailInput.focus();
                    return "closeAlert";
                },
                type: "secondary"
            },
            {
                text: "Verify",
                onClick: () => check(),
                loading: true
            }
        ],
        {
            timer: {
                duration: 60,
                onResend 
            },
            input: {
                id: "email-otp",
                type: "text",
                placeholder: "Enter your verification code",
                required: true
            }
        },
        "row",
        () => { }, 
    );

    // After alert is shown, wire the input to clear inline error on input
    // (input may not exist immediately if DOM not updated; so use a small timeout to attach safely)
    setTimeout(() => {
        const verifyInput = document.getElementById('email-otp');
        const errorDiv = document.querySelector(".alert-message .alert-error");
        verifyInput?.addEventListener("input", (ev) => {
            if (errorDiv && ev.target.value.trim() !== "") {
                errorDiv.innerHTML = "";
                errorDiv.style.display = "none";
            }
        });
    }, 50);
}


function handleConfirm(e) {
    e.preventDefault();
    handleAlert("Please review your details carefully. This information will be used for bookings and payments.", "blur", true, "🔐 <br/> Details Confirmation", true, [{ text: "Check Information", onClick: "closeAlert", type: "secondary" }, {
        text: "Proceed", onClick: () => handleVerifyEmail(e), loading: true,
    }])
}

document.querySelector("button").addEventListener("click", handleConfirm)