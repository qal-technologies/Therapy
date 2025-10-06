import { handleAuthStateChange, logout } from './auth.js';
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


//I changed something here pasqal, check it out!
async function translateText(text, targetLang, sourceLang = "auto") {
    try {
        const corsProxy = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const url = corsProxy + apiUrl;

        const res = await fetch(url, {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
            return data[0].map(sentence => sentence[0]).join("");
        } else {
            console.error("Unexpected translation response format:", data);
            return text;
        }
    } catch (error) {
        console.error("Translation error:", error);
        return text;
    }
}

function applyTranslationsToNodes(textNodes, translations) {
    textNodes.forEach((node, index) => {
        if (translations[index]) {
            node.nodeValue = translations[index];
        }
    });
}

async function translatePage(targetLang) {
    const textNodes = [];
    // TreeWalker is efficient for traversing DOM nodes
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walk.nextNode()) {
        const parent = node.parentNode;
        // Ensure we only translate visible text, not scripts or styles
        if (parent && parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE' && node.nodeValue.trim().length > 0) {
            textNodes.push(node);
        }
    }

    const originalTexts = textNodes.map(node => node.nodeValue);
    // Use a separator that is unlikely to appear in the text naturally
    const separator = "|||";
    const joinedText = originalTexts.join(separator);

    const translationResult = await translateText(joinedText, targetLang);

    if (translationResult) {
        // Split the single translated string back into an array
        const translatedTexts = translationResult.split(separator).map(t => t.trim());
        applyTranslationsToNodes(textNodes, translatedTexts);
        return translatedTexts; // Return for caching
    }

    return originalTexts; // Return original if translation fails
}

async function handleTranslateFirstLoad() {
    const pathKey = `translated_texts:${window.location.pathname}`;
    const cachedJson = sessionStorage.getItem(pathKey);
    const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];
    console.log(userLang);

    // Don't translate if the user's language is English
    if (userLang === "en") {
        document.body.style.visibility = "visible";
        return false;
    }

    // If we have cached translations, apply them directly to the DOM
    if (cachedJson) {
        console.log("Applying cached translation:", pathKey);
        const cachedTranslations = JSON.parse(cachedJson);

        const textNodes = [];
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walk.nextNode()) {
            const parent = node.parentNode;
            if (parent && parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE' && node.nodeValue.trim().length > 0) {
                textNodes.push(node);
            }
        }

        applyTranslationsToNodes(textNodes, cachedTranslations);
        document.body.style.visibility = "visible";
        return true;
    }

    // If no cache, show loader and fetch new translations
    const loadingHTML = `
          <div class="wait-loading-section" id="wait-loading-section">
            <div class="loading-spinner"></div>
          </div>`;
    document.body.insertAdjacentHTML("beforebegin", loadingHTML);

    try {
        const translatedTexts = await translatePage(userLang);
        // Cache the new translations as a JSON string
        sessionStorage.setItem(pathKey, JSON.stringify(translatedTexts));
        console.log("Saved translated texts to sessionStorage");
    } catch (err) {
        console.warn("Translation flow error:", err);
    } finally {
        // Always remove the loader and show the body
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

function setupCommonUI() {
    const alertMessage = document.querySelector(".alert-message");
    if (alertMessage) {
        alertMessage.innerHTML = "";
        alertMessage.style.display = "none";
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

    header = document.querySelector("header#header");
    menu = document.querySelector("header#header div#menu");

    const year = document.querySelector("footer span#year");
    const date = new Date().getFullYear();
    if (year) year.innerHTML = date;
}

function setupEventListeners() {
    const backButton = document.querySelector("div#back-button");
    const refreshButton = document.querySelector("div#refresh-button");

    menu && menu.addEventListener("click", toggleMenu);
    backButton && backButton.addEventListener("click", goBackButton);
    refreshButton && refreshButton.addEventListener("click", handleRefresh);
}


function toggleMenu() {
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

async function handleRefresh() {
    const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];

    let title = "Reload Page?";
    let message = "Are you sure you want to reload? All saved progress will be erased.";
    let button_reload = "Reload";
    let button_cancel = "Cancel";

    if (userLang !== 'en') {
        try {
            const separator = '|||';
            const translated = await translateText([title, message, button_reload, button_cancel].join(separator), userLang);
            const parts = translated.split(separator).map(t => t.trim());
            title = parts[0] || title;
            message = parts[1] || message;
            button_reload = parts[2] || button_reload;
            button_cancel = parts[3] || button_cancel;
        } catch (e) {
            console.warn("Could not translate alert text", e);
        }
    }

    handleAlert(message, "blur", true, title, true, [
        { text: button_cancel, onClick: "closeAlert", type: "secondary" },
        { text: button_reload, onClick: () => window.location.reload() }
    ]);
}

//I changed something here pasqal, check it out!
function initTicker() {
    const tickerItems = [
        { text: `A Transformative Journey with Charlotte Casiraghi` },
        { text: "Discover insights and tools to navigate a world on edge. Learn to become a better version of yourself." },
        { text: `A Transformative Journey with Charlotte Casiraghi` },
        { text: "Discover insights and tools to navigate a world on edge. Learn to become a better version of yourself." }
    ];

    const container = document.querySelector('section.ticker-container');
    const ticker = document.getElementById('ticker');
    if (!ticker || !container) {
        console.warn('initTicker aborted: missing #ticker or #ticker-container');
        return;
    }

    // build content
    ticker.innerHTML = '';
    tickerItems.forEach(item => {
        const span = document.createElement('span');
        span.className = `ticker-item${item.class ? ' ' + item.class : ''}`;
        span.textContent = item.text;
        ticker.appendChild(span);
    });

    // duplicate content for smooth infinite scroll
    ticker.insertAdjacentHTML('beforeend', ticker.innerHTML);

    // wait for layout to finish before measuring widths
    requestAnimationFrame(() => {
        const items = ticker.querySelectorAll('.ticker-item');
        if (!items.length) {
            console.warn('initTicker: no .ticker-item found after render');
            return;
        }

        // compute width of a single set (first half)
        const half = items.length / 2;
        let singleWidth = 0;
        for (let i = 0; i < half; i++) {
            const w = items[i].offsetWidth;
            const style = getComputedStyle(items[i]);
            const marginRight = parseFloat(style.marginRight) || 0;
            singleWidth += w + marginRight;
        }

        if (singleWidth <= 0) {
            console.warn('initTicker: computed singleWidth is 0 — check visibility/CSS');
            return;
        }

        // Set CSS variable for animation
        ticker.style.setProperty('--ticker-width', `${singleWidth}px`);
        container.classList.add('animate'); // Add class to start animation
    });

    // attach a single resize listener
    if (!window.__tickerResizeAttached) {
        window.addEventListener('resize', () => {
            // small delay to allow layout to settle
            setTimeout(initTicker, 150);
        });
        window.__tickerResizeAttached = true;
    }
}

// run this after initTicker() executed
const t = document.getElementById('ticker');
let prev = getComputedStyle(t).transform;
setInterval(() => {
    const cur = getComputedStyle(t).transform;
    if (cur !== prev) {
        console.log('ticker moving, transform changed:', cur);
        prev = cur;
    } else {
        // console.log('no change'); // too noisy
    }
}, 500);


function setupAuthUI(user) {
    const actionTab = document.querySelectorAll("a.login");
    const navDiv = document.querySelector("header#header div#nav");

    if (navDiv && user) {
        const logoutBTN = document.createElement("button");
        logoutBTN.classList.add("nav-main", "logout");
        logoutBTN.title = "Log out";
        logoutBTN.id = "logout-button";
        logoutBTN.dataset.action = "logout";
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
                actionText.dataset.key = "profile";
            } else {
                tab.href = "/html/regs/Signup.html";
                actionText.innerHTML = "REGISTER";
                actionText.dataset.key = "register";
            }
        });
    }
}


async function setupNewsletter(user) {
    const emailInput = document.querySelector("#subscribe-email");
    const emailBTN = document.querySelector(".newsletter-form button");

    if (!emailBTN || !emailInput) return;

    emailBTN.disabled = true;

    emailInput.addEventListener("input", () => {
        const value = emailInput.value.trim();
        emailBTN.disabled = value === "";
    });

    if (user) {
        const thisUser = await getUserData(user.uid);
        if (thisUser.emailSub) {
            emailInput.disabled = true;
            emailInput.placeholder = "You have already subscribed...";
            emailBTN.disabled = true;
            emailBTN.innerHTML = `<p class="text">Subscribed</p>`;
        } else {
            emailBTN.addEventListener("click", async (e) => {
                e.preventDefault();

                if (emailBTN.disabled || emailInput.value.trim() === "") return;
                emailBTN.disabled = true;
                emailBTN.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
                await updateUserData(user.uid, { emailSub: true });
                setTimeout(() => {
                    emailBTN.innerHTML = `<p class="text">Subscribed</p>`;
                    emailInput.value = "";
                    emailBTN.disabled = true;

                    handleAlert("Your subscription has been confirmed. From now on, you’ll receive thoughtful updates, healing insights, and special messages directly in your inbox. <br/> We’ll be here to gently stay connected with you each day.", "blur", true, "✉️ Companion Support", true, [{ text: "OK", onClick: "closeAlert" }]);
                }, 100);
            });
        }
    } else {
        emailBTN.addEventListener("click", (e) => {
            e.preventDefault();

            handleAlert("To subscribe to our newsletter, please log in or create an account.", "blur", true, "✉️ <br/> Login or Register", true, [{ text: "Log in", onClick: () => handleRedirect("/html/regs/Signup.html?type=login") }, { text: "Register", onClick: () => handleRedirect("/html/regs/Signup.html?type=register"), type: "secondary" }]);
        });
    }
}

//I changed something here pasqal, check it out!
function setupMutationObserver() {
    const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];
    if (userLang === "en") {
        return;
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
                        translateNode(node);
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        const textNodes = [];
                        const walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
                        let n;
                        while (n = walk.nextNode()) {
                            if (n.nodeValue.trim().length > 0) {
                                textNodes.push(n);
                            }
                        }
                        if (textNodes.length > 0) {
                            translateNode(textNodes);
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

async function translateNode(nodeOrNodes) {
    const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];
    const nodes = Array.isArray(nodeOrNodes) ? nodeOrNodes : [nodeOrNodes];

    const parentElements = new Set();
    nodes.forEach(node => {
        if (node.parentElement) {
            parentElements.add(node.parentElement);
        }
    });

    parentElements.forEach(parent => {
        const spinner = document.createElement('div');
        spinner.className = 'spinner-container';
        spinner.innerHTML = '<div class="spinner"></div>';
        parent.style.position = 'relative';
        parent.appendChild(spinner);
    });


    const originalTexts = nodes.map(node => node.nodeValue);
    const separator = "|||";
    const joinedText = originalTexts.join(separator);

    const translationPromise = translateText(joinedText, userLang);
    const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(joinedText), 5000));

    try {
        const translationResult = await Promise.race([translationPromise, timeoutPromise]);
        const translatedTexts = translationResult.split(separator).map(t => t.trim());
        nodes.forEach((node, index) => {
            if (translatedTexts[index]) {
                node.nodeValue = translatedTexts[index];
            }
        });
    } catch (e) {
        console.warn("Dynamic translation failed:", e);
    } finally {
        parentElements.forEach(parent => {
            const spinner = parent.querySelector('.spinner-container');
            if (spinner) {
                spinner.remove();
            }
        });
    }
}

async function initializeApp() {
    await handleTranslateFirstLoad();
    setupCommonUI();
    setupEventListeners();
    initTicker();
    setupMutationObserver();

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js").catch(error => {
            console.error("Service Worker registration failed:", error);
        });
    }

    handleInputFocusFix();

    await handleAuthStateChange(async user => {
        setupAuthUI(user);
        await setupNewsletter(user);
    });
}

window.onload = initializeApp;

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

function createAlertBase(type) {
    const parent = document.querySelector(".alert-message");
    if (!parent) return null;

    parent.innerHTML = "";
    clearTimeout(timer);
    if (parent.dataset.countdownId) {
        clearInterval(Number(parent.dataset.countdownId));
        delete parent.dataset.countdownId;
    }
    parent.classList.remove("fadeOut", "shop");
    parent.style.display = "flex";

    if (type === "toast") {
        parent.classList.add("shop");
        return parent;
    } else {
        const div = document.createElement("div");
        div.classList.add("alert-div", "zoom-in");
        parent.appendChild(div);
        return div;
    }
}

function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function addAlertContent(div, titled, titleText, message) {
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
}


function addAlertTimer(div, options, parent) {
    if (!options.timer || typeof options.timer.duration !== "number") return;

    let timeLeft = Math.floor(options.timer.duration);
    const timerP = document.createElement("p");
    timerP.className = "alert-timer";
    timerP.innerHTML = `You can request a new code after: <span class="alert-timer-count">${timeLeft} seconds.</span>`;

    const resendEl = document.createElement("p");
    resendEl.className = "alert-resend";
    resendEl.style.display = "none";
    resendEl.innerHTML = `<strong>Request a new OTP</strong>`;

    div.appendChild(timerP);
    div.appendChild(resendEl);

    const startCountdown = (restartDuration) => {
        if (parent.dataset.countdownId) clearInterval(Number(parent.dataset.countdownId));
        timeLeft = typeof restartDuration === 'number' ? restartDuration : Math.floor(options.timer.duration);
        timerP.querySelector(".alert-timer-count").textContent = `${timeLeft} seconds`;
        timerP.style.display = "block";
        resendEl.style.display = "none";

        const timerIntervalId = setInterval(() => {
            timeLeft--;
            timerP.querySelector(".alert-timer-count").textContent = `${timeLeft} seconds`;
            if (timeLeft <= 0) {
                clearInterval(timerIntervalId);
                timerP.style.display = "none";
                resendEl.style.display = "block";
                if (typeof options.timer.onExpire === "function") options.timer.onExpire();
            }
        }, 1000);
        parent.dataset.countdownId = timerIntervalId;
    };

    startCountdown();
    resendEl.addEventListener("click", async () => {
        if (resendEl.dataset.sending === "1" || typeof options.timer.onResend !== "function") return;
        resendEl.dataset.sending = "1";
        resendEl.innerHTML = `<strong>Sending...</strong>`;
        try {
            await options.timer.onResend();
            startCountdown(options.timer.duration);
        } catch (err) {
            const errorDiv = div.querySelector(".alert-error");
            if (errorDiv) {
                errorDiv.innerHTML = err.message || "An error occurred.";
                errorDiv.style.display = "block";
            }
        } finally {
            resendEl.dataset.sending = "0";
            resendEl.innerHTML = `<strong>Request a new OTP</strong>`;
        }
    });
}

function addAlertInput(div, options) {
    if (!options.input || !options.input.id) return;
    const inp = document.createElement("input");
    Object.assign(inp, options.input);
    inp.classList.add("alert-input");
    div.appendChild(inp);
}


function addAlertButtons(div, closing, closingConfig, closeAlert, defaultFunction, arrange, errorDiv) {
    if (!closing) return;
    const buttonParent = document.createElement("div");
    buttonParent.className = "button-parents";
    buttonParent.style.flexDirection = arrange?.toLowerCase() === "row" ? "row" : "column";
    if (closingConfig.length >= 3) buttonParent.style.flexWrap = "wrap";

    if (closingConfig.length === 0) {
        closingConfig.push({ text: "Close", onClick: "closeAlert" });
    }

    closingConfig.forEach(cfg => {
        const { text, type, onClick, loading } = cfg;
        const newBtn = document.createElement("button");
        newBtn.className = `alert-button ${type?.toLowerCase() || "primary"}`;
        newBtn.textContent = text || "Close";
        newBtn.style.width = arrange?.toLowerCase() === "column" ? "100%" : "160px";

        newBtn.addEventListener("click", async () => {
            errorDiv.style.display = "none";
            if (loading) {
                newBtn.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
                newBtn.disabled = true;
            }
            try {
                if (onClick === "closeAlert") {
                    closeAlert();
                } else if (typeof onClick === "function") {
                    const result = await onClick();
                    if (result === "closeAlert") closeAlert();
                } else {
                    defaultFunction();
                }
            } catch (err) {
                errorDiv.innerHTML = err?.message || "An error occurred";
                errorDiv.style.display = "block";
            } finally {
                if (loading) {
                    newBtn.textContent = text || "Close";
                    newBtn.disabled = false;
                }
            }
        });
        buttonParent.appendChild(newBtn);
    });
    div.appendChild(buttonParent);
}

/**
 * handleAlert(message, type, titled, titleText, closing, closingConfig, arrange, defaultFunction, options)
 * - options: {
 *     timer: { duration: 60, onResend: async function() { ... } },
 *     input: { id: 'email-otp', type: 'text', placeholder: 'Enter OTP', required: true }
 *   }
 */
//I changed something here pasqal, check it out!
async function handleAlert(
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

    const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];

    const renderAlert = (finalTitle, finalMessage, finalButtons) => {
        const base = createAlertBase(type);
        if (!base) return;

        const closeAlert = () => {
            if (base) base.classList.add("zoom-out");
            parent.classList.add("fadeOut");
            timer = setTimeout(() => {
                parent.style.display = "none";
                parent.innerHTML = "";
                defaultFunction();
            }, 1200);
        };

        if (type === "toast") {
            const newMessage = document.createElement("p");
            newMessage.className = "alert-text moveUp";
            newMessage.innerHTML = finalMessage;
            base.appendChild(newMessage);
            setTimeout(closeAlert, 4000);
            return;
        }

        document.activeElement?.blur();
        addAlertContent(base, titled, finalTitle, finalMessage);
        addAlertTimer(base, options, parent);
        addAlertInput(base, options);

        const errorDiv = document.createElement("div");
        errorDiv.className = "alert-error";
        errorDiv.style.display = "none";
        base.appendChild(errorDiv);

        addAlertButtons(base, closing, finalButtons, closeAlert, defaultFunction, arrange, errorDiv);

        if (!closing) {
            setTimeout(closeAlert, 4000);
        }
    };

    if (userLang !== "en") {
        parent.innerHTML = `<div class="alert-div zoom-in"><div class="spinner-container"><div class="spinner"></div></div></div>`;
        parent.style.display = "flex";

        const translationPromise = (async () => {
            const separator = '|||';
            const toTranslate = [
                titleText,
                message,
                ...closingConfig.map(btn => btn.text)
            ].join(separator);

            const translated = await translateText(toTranslate, userLang);

            if (translated && translated !== toTranslate) {
                const parts = translated.split(separator).map(t => t.trim());
                return {
                    title: parts[0] || titleText,
                    message: parts[1] || message,
                    buttons: closingConfig.map((btn, i) => ({
                        ...btn,
                        text: parts[i + 2] || btn.text,
                    })),
                };
            }
            // Return null on failure to trigger fallback
            return null;
        })();

        const timeoutPromise = new Promise(resolve =>
            setTimeout(() => resolve(null), 5000)
        );

        try {
            const result = await Promise.race([translationPromise, timeoutPromise]);
            if (result) {
                renderAlert(result.title, result.message, result.buttons);
            } else {
                // Fallback to English
                renderAlert(titleText, message, closingConfig);
            }
        } catch (e) {
            console.warn("Alert translation failed, falling back to English:", e);
            renderAlert(titleText, message, closingConfig);
        }
    } else {
        renderAlert(titleText, message, closingConfig);
    }
}


export default handleAlert;