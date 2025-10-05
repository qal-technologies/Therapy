function handleAlert(
    message,
    type = "blur",
    titled = false,
    titleText = "",
    closing = false,
    closingConfig = [],
    options = {},
    arrange = "row",
    defaultFunction = () => { },
) {

    const parent = document.querySelector(".alert-message");
    if (!parent) return;

    parent.innerHTML = "";
    clearTimeout(timer);

    if (parent.dataset.countdownId) {
        try { clearInterval(Number(parent.dataset.countdownId)); } catch (e) { /* ignore */ }
        delete parent.dataset.countdownId;
    }

    parent.classList.remove("fadeOut", "shop");
    parent.style.display = "flex";

    let div;

    function closeAlert() {
        if (div) div.classList.add("zoom-out");
        parent.classList.add("fadeOut");

        timer = setTimeout(() => {
            parent.style.display = "none";
            parent.innerHTML = "";
            defaultFunction();
        }, 1200);
    }

    function fadeAlert() {
        timer = setTimeout(closeAlert, 4000);
    }

    if (type === "toast") {
        parent.classList.add("shop");
        const newMessage = document.createElement("p");
        newMessage.classList.add("alert-text", "moveUp");
        newMessage.innerHTML = message;
        parent.appendChild(newMessage);

        fadeAlert();
        return;
    } else {
        div = document.createElement("div");
        div.classList.add("alert-div", "zoom-in");

        // Title
        if (titled) {
            const newTitle = document.createElement("p");
            newTitle.classList.add("alert-title");
            newTitle.innerHTML = titleText || "Title";
            div.appendChild(newTitle);
        }

        if (message) {
            const newMessage = document.createElement("div");
            newMessage.classList.add("alert-text", "moveUp");
            newMessage.innerHTML = message;
            div.appendChild(newMessage);
        }

        let timerIntervalId = null;
        let timeLeft = 0;
        let timerP = null;
        let resendEl = null;

        if (options.timer && typeof options.timer.duration === "number") {
            timeLeft = Math.floor(options.timer.duration);

            timerP = document.createElement("p");
            timerP.classList.add("alert-timer");
            timerP.style.marginTop = "-4px";
            timerP.style.marginBottom = "8px";
            timerP.style.fontSize = "13px";
            timerP.style.color = "var(--mainText, #333)";
            timerP.innerHTML = `You can request a new code after: <span class="alert-timer-count" style="color:var(--link); font-weight:bold;">${timeLeft} seconds. </span> `;

            resendEl = document.createElement("p");
            resendEl.classList.add("alert-resend");
            resendEl.style.marginTop = "-4px";
            resendEl.style.marginBottom = "8px";
            resendEl.style.display = "none";
            resendEl.innerHTML = `<strong style="cursor:pointer; color: var(--link, #007bff);">Request a new OTP</strong>`;

            div.appendChild(timerP);
            div.appendChild(resendEl);

            const startCountdown = (restartDuration) => {

                if (timerIntervalId) clearInterval(timerIntervalId);
                const duration = typeof restartDuration === 'number' ? restartDuration : Math.floor(options.timer.duration);
                timeLeft = duration;
                const countSpan = div.querySelector(".alert-timer-count");
                if (countSpan) countSpan.textContent = `${timeLeft} seconds`;
                timerP.style.display = "block";
                resendEl.style.display = "none";

                timerIntervalId = setInterval(() => {
                    timeLeft--;
                    const span = div.querySelector(".alert-timer-count");
                    if (span) span.textContent = `${timeLeft} seconds`;
                    if (timeLeft <= 0) {
                        clearInterval(timerIntervalId);
                        timerIntervalId = null;
                        timerP.style.display = "none";
                        resendEl.style.display = "block";
                        if (typeof options.timer.onExpire === "function") {
                            try { options.timer.onExpire(); } catch (err) { console.error(err) }
                        }
                    }
                }, 1000);

                parent.dataset.countdownId = timerIntervalId;
            };

            startCountdown();
            if (resendEl) {
                resendEl.addEventListener("click", async (ev) => {
                    if (resendEl.dataset.sending === "1") return;
                    if (typeof options.timer.onResend !== "function") {
                        handleAlert("No resend handler provided.", "toast");
                        return;
                    }
                    try {
                        resendEl.dataset.sending = "1";
                        const innerBefore = resendEl.innerHTML;
                        resendEl.innerHTML = `<strong>Sending...</strong>`;

                        await Promise.resolve(options.timer.onResend());

                        startCountdown(Math.floor(options.timer.duration));
                    } catch (err) {

                        if (!div._pendingResendError) div._pendingResendError = err;
                    } finally {
                        resendEl.dataset.sending = "0";
                        resendEl.innerHTML = `<strong style="cursor:pointer; color: var(--link, #007bff);">Request a new OTP</strong>`;
                    }
                });
            }
        }

        if (options.input && options.input.id) {
            const inp = document.createElement("input");
            inp.type = options.input.type || "text";
            inp.id = options.input.id;
            if (options.input.placeholder) inp.placeholder = options.input.placeholder;
            if (options.input.required) inp.required = true;
            inp.classList.add("alert-input");
            inp.style.marginTop = "6px";
            inp.style.width = "100%";
            inp.style.boxSizing = "border-box";
            div.appendChild(inp);
        }

        const errorDiv = document.createElement("div");
        errorDiv.classList.add("alert-error");
        errorDiv.style.display = "none";
        errorDiv.style.marginTop = "10px";
        errorDiv.style.color = "red";
        div.appendChild(errorDiv);

        if (div._pendingResendError) {
            errorDiv.innerHTML = div._pendingResendError?.message || String(div._pendingResendError) || "An error occurred while resending OTP.";
            errorDiv.style.display = "block";
            delete div._pendingResendError;
        }

        if (closing) {
            const buttonParent = document.createElement("div");
            buttonParent.classList.add("button-parents");
            buttonParent.style.flexDirection = arrange?.toLowerCase() === "row" ? "row" : "column";

            if (closingConfig.length >= 3) {
                buttonParent.style.flexWrap = "wrap";
            }

            if (closingConfig.length === 0) {
                const newBtn = document.createElement("button");
                newBtn.classList.add("alert-button");
                newBtn.textContent = "Close";
                newBtn.style.width = arrange?.toLowerCase() === "column" ? "100%" : "160px";
                newBtn.addEventListener("click", closeAlert);
                buttonParent.appendChild(newBtn);
            }

            closingConfig.forEach(cfg => {
                const { text: btnText, type: btnType, onClick, loading } = cfg;
                const className = btnType?.toLowerCase() || "primary";

                const newBtn = document.createElement("button");
                newBtn.classList.add("alert-button", className);
                newBtn.textContent = btnText || "Close";
                newBtn.style.width = arrange?.toLowerCase() === "column" ? "100%" : "160px";

                const spinnerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;

                newBtn.addEventListener("click", async (ev) => {
                    errorDiv.style.display = "none";
                    errorDiv.innerHTML = "";

                    if (loading) {
                        newBtn.innerHTML = spinnerHTML;
                        newBtn.disabled = true;
                    }

                    if (loading) {
                        const delay = Math.floor(Math.random() * 1000) + 1000; // 1s - 2s
                        await new Promise(res => setTimeout(res, delay));
                    }

                    try {
                        if (onClick === "closeAlert") {
                            closeAlert();
                        } else if (typeof onClick === "function") {
                            const result = onClick(); // may be promise
                            const awaited = await Promise.resolve(result);
                            if (awaited === "closeAlert") {
                                closeAlert();
                            } else {
                                if (loading) newBtn.textContent = btnText || "Close";
                            }
                        } else {
                            defaultFunction();
                            if (loading) newBtn.textContent = btnText || "Close";
                        }
                        newBtn.disabled = false;
                    } catch (err) {
                        if (loading) newBtn.textContent = btnText || "Close";

                        errorDiv.innerHTML = err?.message || String(err) || "An error occurred";
                        errorDiv.style.display = "block";
                        newBtn.disabled = false;

                    }
                });

                buttonParent.appendChild(newBtn);
            });

            div.appendChild(buttonParent);
        } else {
            fadeAlert();
        }
    }

    parent.appendChild(div);
}