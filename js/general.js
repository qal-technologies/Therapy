import { getCurrentUser, handleAuthStateChange, logout } from './auth.js';
import { getUserData, updateUserData } from './database.js';

let show = false;
const header = document.querySelector("header#header");
const menu = document.querySelector("header#header div#menu");

window.onload = async () => {
    const year = document.querySelector("footer span#year");
    const backButton = document.querySelector("div#back-button");
    const refreshButton = document.querySelector("div#refresh-button");
    const emailInput = document.querySelector("#subscribe-email");
    const emailBTN = document.querySelector(".newsletter-form button");

    const date = new Date().getFullYear();
    if (year) year.innerHTML = date;

    menu && menu.addEventListener("click", () => {
        if (!show) {
            header.classList.add("heightShow");
            menu.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="menu" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
</svg>`;
        } else {
            header.classList.remove("heightShow");
            menu.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    viewBox="0 -960 960 960"
    width="30"
    class="menu">
    <path
    d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>`;
        }
        show = !show;
    });


    function initTicker() {
        const tickerItems = [
            {
                text: `A Transformative Journey with Charlotte Casiraghi`
            },
            {
                text: "Discover insights and tools to navigate a world on edge. Learn to become a better version of yourself."
            }, {
                text: `A Transformative Journey with Charlotte Casiraghi`
            },
            {
                text: "Discover insights and tools to navigate a world on edge. Learn to become a better version of yourself."
            }
        ];

        const ticker = document.getElementById('ticker');
        if (!ticker) return;

        let tickerWidth = 0;
        let animationFrame;

        function createTicker() {
            ticker.innerHTML = '';
            tickerWidth = 0;

            tickerItems.forEach(item => {
                const span = document.createElement('span');
                span.className = `ticker-item${item.class ? ' ' + item.class : ''}`;
                span.textContent = item.text;
                ticker.appendChild(span);
                tickerWidth += span.offsetWidth + 60;
            });

            startAnimation();
        }

        function startAnimation() {
            let position = 0;
            const speed = 1.2;

            function animate() {
                position -= speed;

                if (position <= -tickerWidth) {
                    position = 0;
                }

                ticker.style.transform = `translateX(${position}px)`;
                animationFrame = requestAnimationFrame(animate);
            }

            animate();
        }

        ticker && createTicker();
        window.addEventListener("resize", () => {
            cancelAnimationFrame(animationFrame);
            createTicker();
        });

        window.addEventListener('unload', () => {
            cancelAnimationFrame(animationFrame);
        });
    }

    let backClicked = false;
    function goBackButton() {
        if (backClicked) return;
        backClicked = true;

        window.history.back();

        setTimeout(() => {
            backClicked = false;
        }, 1000);
    }

    backButton && backButton.addEventListener("click", goBackButton);
    refreshButton && refreshButton.addEventListener("click", () => {
        const ask = confirm("Are you sure you want to reload the page?");
        const proceed = ask && confirm("All saved progress would be erased if you refresh this page");

        proceed && window.location.reload();
    })
    initTicker();

    function handleTranslate() {
        // load Google Translate script
        function loadGoogleTranslate() {
            var gtScript = document.createElement('script');
            gtScript.src = "https://translate.google.com/translate_a/element.js?cb=initTranslate";
            document.head.appendChild(gtScript);
            if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
                const meta = document.createElement("meta");
                meta.name = "google";
                meta.content = "notranslate";
                document.head.appendChild(meta);
            }
        }

        // Google calls this when script loads
        window.initTranslate = function () {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'fr,es,de,it',
                autoDisplay: false
            }, 'google_translate_element');

            autoTranslate();
        };

        function autoTranslate() {
            let userLang = navigator.language || navigator.userLanguage;
            userLang = userLang.split("-")[0];
            console.log(userLang)

            if (userLang === "en") return;

            const interval = setInterval(() => {
                let select = document.querySelector(".goog-te-combo");
                if (select) {
                    select.value = userLang;
                    select.dispatchEvent(new Event("change"));
                    clearInterval(interval);
                }
            }, 500);
        }

        loadGoogleTranslate();
    }

    if (!document.querySelector("link[rel='preload'][as='font']")) {
        const link = document.createElement("link");
        link.rel = "preload";   
        link.as = "font";
        link.href = "/src/fonts/Poppins-Medium.ttf";
        link.type = "font/ttf";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
    }

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js").catch(error => {
            console.error("Service Worker registration failed:", error);
        });
    }

    await handleAuthStateChange(async user => {
        const actionTab = document.querySelectorAll("a.login");
        const navDiv = document.querySelector("header#header div#nav");
        handleTranslate();

        if (navDiv && user) {
            const logoutBTN = document.createElement("button");
            logoutBTN.classList.add("nav-main", "logout");
            logoutBTN.title = "Log out";
            logoutBTN.id = "logout-button";
            logoutBTN.innerText = "LOG OUT";

            logoutBTN.addEventListener("click", async (e) => {
                e.preventDefault();
                try {
                    await logout();
                    handleAlert("Please log in again if you'd like to continue.", "blur", true, "<i class='bi bi-exclamation-triangle text-danger fs-2'></i> <br/> You have been logged out.", true, [{ text: "OK", onClick: () => window.location.replace('/html/main/Home.html') }]);
                } catch (error) {
                    handleAlert(`Failed to log out, because: ${error}.`, "toast");
                }
            });

            navDiv.appendChild(logoutBTN);
        }

        if (actionTab) {
            actionTab.forEach(tab => {
                const actionText = tab.firstElementChild;
                if (user) {
                    tab.href = "/html/main/User.html";
                    actionText.innerHTML = "PROFILE";
                } else {
                    tab.href = "/html/regs/Signup.html";
                    actionText.innerHTML = "REGISTER";
                }
            });
        }

        if (emailBTN && emailInput) {
            emailBTN.disabled = true;

            emailInput.addEventListener("input", () => {
                const BTN = document.querySelector(".newsletter-form button");
                if (!BTN) return;
                const value = emailInput.value.trim();
                const check = value === "" ? true : false;
                BTN.disabled = check;
            });

            if (user) {
                const thisUser = await getUserData(user.uid);
                if (thisUser.emailSub == true) {
                    emailInput.disabled = true;
                    emailInput.placeholder = "You have already subscribed..."
                    emailBTN.disabled = true;
                    emailBTN.innerHTML = `<p class="text">Subscribed</p>`;
                } else {
                    emailBTN.addEventListener("click", async () => {
                        if (emailBTN.disabled || emailInput.value.trim() == "") return;

                        emailBTN.disabled = true;
                        emailBTN.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;

                        await updateUserData(user.uid, { emailSub: true });
                        setTimeout(() => {
                            handleAlert("Your subscription has been confirmed. From now on, you’ll receive thoughtful updates, healing insights, and special messages directly in your inbox. <br/> We’ll be here to gently stay connected with you each day.", "blur", true, "✉️ Companion Support", true, [{ text: "OK", onClick: "closeAlert" }]);

                            emailBTN.innerHTML = `<p class="text">Subscribed</p>`;

                            emailInput.value = "";
                            emailBTN.disabled = true;
                        }, 100);
                    })
                }
            } else if (!user) {
                emailBTN.addEventListener("click", () => {
                    handleAlert("To subscribe to our newsletter, please log in or create an account.", "blur", true, "✉️ <br/> Login or Register", true, [{ text: "Log in", onClick: () => { handleRedirect("/html/regs/Signup.html?type=login"); } }, { text: "Register", onClick: () => { handleRedirect("/html/regs/Signup.html?type=register"); } }]);
                    return;
                });
            }
        }
    });

}

window.onresize = () => {
    const navWidth = header.clientWidth;

    if (navWidth >= 800) {
        header.classList.remove("heightShow");
        menu.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    viewBox="0 -960 960 960"
    width="30"
    class="menu">
    <path
    d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>`;

        show = !show;
    }
};

export function handleRedirect(href = "", type = "default") {
    const current = window.location.href;

    const data = {
        new: href,
        previous: current,
    };

    const stored = sessionStorage.getItem("url-navigation");
    const lastNav = stored ? JSON.parse(stored) : null;

    if (type.toLowerCase() === "backwards") {
        const previous = lastNav?.previous?.toLowerCase();
        if (!lastNav || !lastNav.previous || !previous || previous.includes("login") || previous.includes("signup")) {
            sessionStorage.setItem("url-navigation", JSON.stringify(data));
            window.location.href = "/html/main/Home.html";
        } else {
            sessionStorage.setItem("url-navigation", JSON.stringify(data));
            window.location.href = lastNav.previous;
        }
    }
    else if (type.toLowerCase() === "replace") {
        sessionStorage.setItem("url-navigation", JSON.stringify(data));
        window.location.replace(href);
    }
    else {
        sessionStorage.setItem("url-navigation", JSON.stringify(data));
        window.location.href = href;
    }
}

// let timer;
// function handleAlert(
//     message,
//     type = "blur",
//     titled = false,
//     titleText = "",
//     closing = false,
//     closingConfig = [],
//     arrange = "row",
//     options = {},
//     defaultFunction = () => { },
// ) {
//     const parent = document.querySelector(".alert-message");
//     if (!parent) return;

//     parent.innerHTML = "";
//     clearTimeout(timer);

//     if (parent.dataset.countdownId) {
//         try { clearInterval(Number(parent.dataset.countdownId)); }
//         catch (e) { console.error("The error is: ", e) };

//         delete parent.dataset.countdownId;
//     }

//     parent.classList.remove("fadeOut", "shop");
//     parent.style.display = "flex";

//     let div, errorDiv;

//     function closeAlert() {
//         if (div) div.classList.add("zoom-out");
//         parent.classList.add("fadeOut");

//         timer = setTimeout(() => {
//             parent.style.display = "none";
//             parent.innerHTML = "";
//             defaultFunction();
//         }, 1200);
//     }

//     function fadeAlert() {
//         timer = setTimeout(closeAlert, 4000);
//     }

//     if (type === "toast") {
//         parent.classList.add("shop");
//         const newMessage = document.createElement("p");
//         newMessage.classList.add("alert-text", "moveUp");
//         newMessage.innerHTML = message;
//         parent.appendChild(newMessage);

//         fadeAlert();
//         return;
//     } else {
//         div = document.createElement("div");
//         div.classList.add("alert-div", "zoom-in");

//         if (titled) {
//             const newTitle = document.createElement("p");
//             newTitle.classList.add("alert-title");
//             newTitle.innerHTML = titleText || "Title";
//             div.appendChild(newTitle);
//         }

//         if (message) {
//             const newMessage = document.createElement("p");
//             newMessage.classList.add("alert-text", "moveUp");
//             newMessage.innerHTML = message;
//             div.appendChild(newMessage);
//         }

//         let timerIntervalId = null;
//         let timeLeft = 0;
//         let timerP = null;
//         let resendEl = null;

//         errorDiv = document.createElement("div");
//         errorDiv.classList.add("alert-error");
//         div.appendChild(errorDiv);


//         // Buttons
//         if (closing) {
//             const buttonParent = document.createElement("div");
//             buttonParent.classList.add("button-parents");
//             buttonParent.style.flexDirection = arrange === "row" ? "row" : "column";

//             if (closingConfig.length >= 3) {
//                 buttonParent.style.flexWrap = "wrap";
//             }

//             if (closingConfig.length === 0) {
//                 const newBtn = document.createElement("button");
//                 newBtn.classList.add("alert-button");
//                 newBtn.textContent = "Close";
//                 newBtn.style.width = arrange === "column" ? "100%" : "160px";
//                 newBtn.addEventListener("click", closeAlert);
//                 buttonParent.appendChild(newBtn);
//             }

//             closingConfig.forEach(cfg => {
//                 const { text: btnText, type: btnType, onClick, loading } = cfg;
//                 const className = btnType || "primary";

//                 const newBtn = document.createElement("button");
//                 newBtn.classList.add("alert-button", className);
//                 newBtn.textContent = btnText || "Close";
//                 newBtn.style.width = arrange === "column" ? "100%" : "160px";

//                 const spinnerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;

//                 async function handleClick() {
//                     // reset error
//                     errorDiv.style.display = "none";
//                     errorDiv.innerHTML = "";

//                     if (loading) {
//                         newBtn.disabled = true;
//                         newBtn.innerHTML = spinnerHTML;

//                         const delay = Math.floor(Math.random() * 1000) + 1000;
//                         await new Promise(res => setTimeout(res, delay));
//                     }

//                     try {
//                         if (onClick === "closeAlert") {
//                             if (!loading) return closeAlert();

//                             closeAlert();
//                         } else if (typeof onClick === "function") {
//                             const result = await onClick();

//                             if (result === "closeAlert") {
//                                 closeAlert();
//                             } else {
//                                 if (loading) newBtn.textContent = btnText || "Close";
//                             }
//                         } else {
//                             defaultFunction();
//                         }
//                         newBtn.disabled = false;
//                     } catch (err) {
//                         if (loading) newBtn.textContent = btnText || "Close";

//                         errorDiv.innerHTML = err?.message || "An error occurred";
//                         errorDiv.style.display = "flex";
//                         newBtn.disabled = false;
//                     }
//                 }

//                 newBtn.addEventListener("click", handleClick);
//                 buttonParent.appendChild(newBtn);
//             });

//             div.appendChild(buttonParent);
//         } else {
//             fadeAlert();
//         }
//     }
//     parent.appendChild(div);
// }

let timer; 
/**
 * handleAlert(message, type, titled, titleText, closing, closingConfig, arrange, defaultFunction, options)
 * - options: {
 *     timer: { duration: 60, onResend: async function() { ... } },
 *     input: { id: 'email-otp', type: 'text', placeholder: 'Enter OTP', required: true }
 *   }
 */
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
        if (document.activeElement && document.activeElement.tagName === "INPUT") {
            document.activeElement.blur();
        }
        
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
                            try { options.timer.onExpire(); } catch (err) { console.error(err)}
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
            buttonParent.style.flexDirection = arrange === "row" ? "row" : "column";

            if (closingConfig.length >= 3) {
                buttonParent.style.flexWrap = "wrap";
            }

            if (closingConfig.length === 0) {
                const newBtn = document.createElement("button");
                newBtn.classList.add("alert-button");
                newBtn.textContent = "Close";
                newBtn.style.width = arrange === "column" ? "100%" : "160px";
                newBtn.addEventListener("click", closeAlert);
                buttonParent.appendChild(newBtn);
            }

            closingConfig.forEach(cfg => {
                const { text: btnText, type: btnType, onClick, loading } = cfg;
                const className = btnType || "primary";

                const newBtn = document.createElement("button");
                newBtn.classList.add("alert-button", className);
                newBtn.textContent = btnText || "Close";
                newBtn.style.width = arrange === "column" ? "100%" : "160px";

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


export default handleAlert;