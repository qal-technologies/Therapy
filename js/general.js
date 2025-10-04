import { getCurrentUser, handleAuthStateChange, logout } from './auth.js';
import { getUserData, updateUserData } from './database.js';

let show = false;
let header;
let menu;

const TRANSLATION_SESSION_KEY_PREFIX = "translated:";

function sessionKeyForPath() {
    return TRANSLATION_SESSION_KEY_PREFIX + window.location.pathname;
}

function pageIsTranslatedByClass() {
    const htmlEl = document.documentElement;
    return htmlEl.classList.contains("translated") ||
        htmlEl.classList.contains("translated-ltr") ||
        htmlEl.classList.contains("translated-rtl");
}

// function restoreTranslatedBody(cachedHtml) {
//     try {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(cachedHtml, "text/html");
//         const srcScripts = [];
//         const inlineScripts = [];
//         const newBodyChildren = [];

//         // collect children in order
//         doc.body.childNodes.forEach(node => {
//             if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === "script") {
//                 const src = node.getAttribute('src');
//                 if (src) srcScripts.push(node);
//                 else inlineScripts.push(node);
//             } else {
//                 newBodyChildren.push(node);
//             }
//         });

//         // Clear body then append non-script nodes
//         document.body.innerHTML = "";
//         newBodyChildren.forEach(node => {
//             document.body.appendChild(node.cloneNode(true));
//         });

//         // Append external scripts if not already present
//         srcScripts.forEach(node => {
//             const src = node.getAttribute('src');
//             if (!src) return;
//             // resolve absolute src to compare
//             let absSrc;
//             try { absSrc = new URL(src, document.baseURI).href; } catch (e) { absSrc = src; }

//             // if a script with same src already exists, skip
//             const exists = Array.from(document.scripts).some(s => {
//                 try { return s.src && new URL(s.src).href === absSrc; } catch (e) { return s.src === absSrc; }
//             });
//             if (exists) return;

//             const script = document.createElement('script');
//             // preserve type (module/classic)
//             if (node.type) script.type = node.type;
//             if (node.defer) script.defer = true;
//             if (node.async) script.async = Boolean(node.async);
//             script.src = absSrc;
//             // append and let browser load/execute
//             document.body.appendChild(script);
//         });

//         // Append inline scripts (execute them)
//         inlineScripts.forEach(node => {
//             // compare by textContent to avoid duplicates (best-effort)
//             const text = (node.textContent || "").trim();
//             const alreadyInline = Array.from(document.scripts).some(s => !s.src && (s.textContent || "").trim() === text);
//             if (alreadyInline) return;

//             const script = document.createElement('script');
//             if (node.type) script.type = node.type;
//             script.textContent = node.textContent;
//             document.body.appendChild(script);
//         });

//         console.log("restoreTranslatedBody: restored DOM and executed scripts");
//     } catch (err) {
//         console.warn("restoreTranslatedBody failed:", err);
//         // fallback: raw assign (least preferred)
//         try { document.body.innerHTML = cachedHtml; } catch (e) { /* ignore */ }
//     }
// }

function restoreTranslatedBody(cachedHtml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(cachedHtml, "text/html");
    document.body.innerHTML = "";

    [...doc.body.children].forEach(node => {
        if (node.tagName.toLowerCase() === "script") {
            const newScript = document.createElement("script");
            if (node.src) {
                newScript.src = node.src;
                newScript.async = true;
                newScript.type = node.type || "module";
            } else {
                newScript.textContent = node.textContent;
            } document.body.appendChild(newScript);
        } else { document.body.appendChild(node.cloneNode(true)); }
    });
}


/** Trigger translate via the GT combobox (best-effort) */
function forceReapplyTranslation(lang) {
    if (!lang || lang === "en") return;
    const select = document.querySelector(".goog-te-combo");
    if (select) {
        try {
            select.value = lang;
            select.dispatchEvent(new Event("change"));
            // also try to click "translate" button if UI present (best-effort)
            const el = document.querySelector(".goog-te-menu-frame");
            // no-op if not found
        } catch (e) {
            console.warn("forceReapplyTranslation error:", e);
        }
    }
}

/**
 * Load Google Translate script and attempt to auto-select userLang.
 * Returns once GT widget is in DOM (or after a short timeout).
 */
function loadGoogleTranslateAndApply(userLang) {
    return new Promise((resolve) => {
        // if already loaded
        if (window.google && window.google.translate) {
            // attempt to set combo quickly
            setTimeout(() => {
                try { forceReapplyTranslation(userLang); } catch (e) {/*noop*/ }
                resolve();
            }, 0);
            return;
        }

        // initializer that the GT script will call (cb)
        function initializer() {
            try {
                // initialize widget (invisible container expected in page)
                // Note: we don't rely on element ID; GT creates iframe etc.
                new google.translate.TranslateElement({
                    pageLanguage: "en",
                    autoDisplay: false
                }, "google_translate_element");
            } catch (err) {
                // non-fatal
            }
            // try to set the combo as soon as it exists
            const tryCombo = setInterval(() => {
                const select = document.querySelector(".goog-te-combo");
                if (select) {
                    clearInterval(tryCombo);
                    if (userLang && userLang !== "en") {
                        try {
                            select.value = userLang;
                            select.dispatchEvent(new Event("change"));
                        } catch (e) { /* ignore */ }
                    }
                    resolve();
                }
            }, 120);

            // fallback resolve after a short delay (we'll still let GT run)
            setTimeout(() => {
                try { clearInterval(tryCombo); } catch (e) { }
                resolve();
            }, 1500);
        }

        // attach initializer as expected callback name
        window.googleTranslateElementInit = initializer;
        window.initTranslate = initializer; // support multiple cb names

        // Append script if not already present
        if (!document.querySelector('script[src*="translate.google.com/translate_a/element.js"]')) {
            const gtScript = document.createElement("script");
            gtScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            gtScript.async = true;
            gtScript.onerror = () => {
                console.warn("Google Translate script failed to load.");
                resolve();
            };
            document.head.appendChild(gtScript);
        } else {
            // already present -> call initializer if possible
            setTimeout(() => { initializer(); }, 0);
        }
    });
}

/**
 * Wait until page mutations quiet down (idle detection).
 * Returns true if stabilized before timeout, false otherwise.
 */
function waitForFullTranslationFinish(timeout = 8000, idle = 800) {
    return new Promise((resolve) => {
        let lastChange = Date.now();
        let resolved = false;

        const observer = new MutationObserver(() => {
            lastChange = Date.now();
        });

        try {
            observer.observe(document.body, { childList: true, subtree: true, characterData: true });
        } catch (e) {
            // if observe fails, resolve false
            resolve(false);
            return;
        }

        const interval = setInterval(() => {
            if (resolved) return;
            const now = Date.now();
            if (now - lastChange >= idle) cleanup(true);
            if (now - lastChange >= timeout) cleanup(false);
        }, 200);

        function cleanup(success) {
            if (resolved) return;
            resolved = true;
            try { observer.disconnect(); } catch (e) { }
            try { clearInterval(interval); } catch (e) { }
            resolve(success);
        }
    });
}

function setupContinuousTranslationAndIncrementalSave(userLang) {
    const pathKey = sessionKeyForPath();

    window.addEventListener("beforeunload", () => {
        if (userLang === "en") return;

        const full = '<!doctype html>\n' + document.documentElement.outerHTML;
        sessionStorage.setItem(pathKey, full);
    })
}


async function handleTranslateFirstLoad() {
    const pathKey = sessionKeyForPath();
    const cached = sessionStorage.getItem(pathKey);
    const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];

    // If browser language is English, nothing to do
    if (userLang === "en") {
        document.body.style.visibility = "visible";
        return false;
    }

    // If we have cached translated snapshot -> restore it quickly (don't block GT)
    if (cached) {
        console.log("Restoring cached translation:", pathKey);
        // cached may be full document outerHTML; prefer using parsed body's children
        restoreTranslatedBody(cached);
        document.body.style.visibility = "visible";

        const loaderEl = document.getElementById("wait-loading-section");
        if (loaderEl) loaderEl.remove();
        document.body.style.visibility = "visible";

        // ensure GT script is present and begin re-applying translations for uncovered text
        await loadGoogleTranslateAndApply(userLang);
        try { forceReapplyTranslation(userLang); } catch (e) { }

        // start continuous observer + incremental save (keeps translating on scroll)
        setupContinuousTranslationAndIncrementalSave(userLang);
        return true;
    }


    // Load GT and attempt initial translation
    try {
        const loadingHTML = `
          <div class="wait-loading-section" id="wait-loading-section">
            <div class="loading-spinner"></div>
          </div>`;
        document.body.insertAdjacentHTML("beforebegin", loadingHTML);

        await loadGoogleTranslateAndApply(userLang);

        // Wait for initial translation stabilization
        const stabilized = await waitForFullTranslationFinish(10000, 800);
        if (stabilized || pageIsTranslatedByClass()) {
            // Save the initial translated snapshot
            try {
                const full = '<!doctype html>\n' + document.documentElement.outerHTML;
                sessionStorage.setItem(pathKey, full);
                console.log("Saved initial translated snapshot to sessionStorage");
            } catch (e) {
                console.warn("Could not save initial translation:", e);
            }
        } else {
            console.warn("Initial translation didn't stabilize within timeout (page will still translate on scroll).");
        }

        // Always set up continuous observer so further untranslated parts are translated and saved incrementally
        setupContinuousTranslationAndIncrementalSave(userLang);
    } catch (err) {
        console.warn("Translation flow error:", err);
    } finally {
        const loaderEl = document.getElementById("wait-loading-section");
        if (loaderEl) loaderEl.remove();
        document.body.style.visibility = "visible";
    }

    return true;
}


function handleInputFocusFix() {
    const inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            setTimeout(() => {
                input.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
                window.scrollBy(0, -60);
            }, 300);
        });
    });
}

window.onload = async () => {
    await handleTranslateFirstLoad();

    const alertMessage = document.querySelector(".alert-message");
    alertMessage.innerHTML = "";
    alertMessage.style.display = "none";

    if (!document.querySelector("link[rel='preload'][as='font']")) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "font";
        link.href = "/src/fonts/Poppins-Medium.ttf";
        link.type = "font/ttf";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
    }


    header = document.querySelector("header#header");
    menu = document.querySelector("header#header div#menu");

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

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js").catch(error => {
            console.error("Service Worker registration failed:", error);
        });
    }

    handleInputFocusFix();

    await handleAuthStateChange(async user => {
        const actionTab = document.querySelectorAll("a.login");
        const navDiv = document.querySelector("header#header div#nav");

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
                    handleAlert("To subscribe to our newsletter, please log in or create an account.", "blur", true, "✉️ <br/> Login or Register", true, [{ text: "Log in", onClick: () => handleRedirect("/html/regs/Signup.html?type=login") }, { text: "Register", onClick: () => handleRedirect("/html/regs/Signup.html?type=register"), type: "secondary" }]);
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

        show = false;
    }
};

// window.addEventListener("beforeunload", () => {
//     try {
//         if (pageIsTranslated()) {
//             const key = sessionKeyForPath();
//             sessionStorage.setItem(key, document.body.innerHTML);
//         }
//     } catch (e) {
//         console.error("Couldn't save because of: ", e);
//      }
// });

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


export default handleAlert;