import { handleAuthStateChange, logout } from './auth.js';
import { getUserData, updateUserActivity, updateUserData } from './database.js';
import { sendEmail } from '../emailHelper.js';

let show = false;
let header;
let menu;

const TRANSLATION_SESSION_KEY_PREFIX = "translated:";
const TRANSLATE_REINIT_DELAY = 400;

let lastTranslatedPath = null;

function sessionKeyForPath() {
    return TRANSLATION_SESSION_KEY_PREFIX + window.location.pathname;
}

function pageIsTranslated() {
    const htmlEl = document.documentElement;
    return htmlEl.classList.contains("translated") ||
        htmlEl.classList.contains("translated-ltr") ||
        htmlEl.classList.contains("translated-rtl");
}

function saveTranslationsToSession() {
    const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];
    if (userLang === "en") {
        return; // Don't save for English users
    }

    const pathKey = `translated_texts:${window.location.pathname}`;
    const translations = {};
    const elements = document.querySelectorAll('[data-translation-id]');

    elements.forEach(element => {
        const id = element.getAttribute('data-translation-id');
        const textNodes = Array.from(element.childNodes).filter(node =>
            node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0
        );

        if (textNodes.length > 0) {
            translations[id] = textNodes.map(node => node.nodeValue).join('|||');
        }
    });

    sessionStorage.setItem(pathKey, JSON.stringify(translations));
    console.log("Saved translations to session storage.");
}


/**
 * Load Google Translate script and attempt to auto-select userLang.
 * Returns once GT widget is in DOM (or after a short timeout).
 */
export function loadGoogleTranslateAndApply(userLang) {
    function cleanup() {
        const loader = document.getElementById("wait-loading-section") || document.querySelector(".wait-loading-section");

        if (loader) loader.remove();
        document.body.style.visibility = "visible";
    }

    if (userLang == "en") cleanup();
    if (userLang !== "en") {
        return new Promise((resolve) => {
            if (!document.getElementById("google_translate_element")) {
                const div = document.createElement("div");
                div.id = "google_translate_element";
                div.style.display = "none";
                document.body.appendChild(div);
            }

            // initializer that the GT script will call (cb)
            function initializer() {
                try {
                    // initialize widget (invisible container expected in page)
                    // Note: we don't rely on element ID; GT creates iframe etc.
                    new google.translate.TranslateElement({
                        pageLanguage: "en",
                        includedLanguages: "fr,es,de,it,pt",
                        autoDisplay: false
                    }, "google_translate_element");
                    lastTranslatedPath = window.location.pathname;
                    sessionStorage.setItem(sessionKeyForPath(), "translated");

                    sessionStorage.setItem("last_lang", userLang);
                    sessionStorage.setItem("last_translated_path", window.location.pathname);
                } catch (err) {
                    // iOS() ? alert("INITIAZER ERROR: ", err) : "";
                    // non-fatal
                    cleanup();
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
                            } catch (e) {
                                // iOS() ? alert("TRY COMBO ERROR: ", e) : "";
                            }
                        }
                        resolve();
                    }
                }, 120);

                // fallback resolve after a short delay (we'll still let GT run)
                setTimeout(() => {
                    try { clearInterval(tryCombo); } catch (e) {
                        // iOS() ? alert("TIMOUT ERROR, ", e) : ""
                    }
                    resolve();
                }, 1500);
            }

            // attach initializer as expected callback name
            window.googleTranslateElementInit = initializer;
            window.initTranslate = initializer; // support multiple cb names

            if (window.google && google.translate && typeof google.translate.TranslateElement === "function") {
                initializer();
            }

            // Append script if not already present
            if (!document.querySelector('script[src*="translate.google.com/translate_a/element.js"]')) {
                const gtScript = document.createElement("script");
                gtScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
                gtScript.async = true;
                gtScript.defer = true;

                gtScript.onerror = () => {
                    console.warn("Google Translate script failed to load.");
                    // iOS() ? alert("Google Translate script failed to load.") : "";
                    resolve();
                };
                document.head.appendChild(gtScript);

                window.googleTranslateElementInit = () => {
                    new google.translate.TranslateElement({
                        includedLanguages: "fr,es,de,it,pt",
                    }, 'google_translate_element');
                    lastTranslatedPath = window.location.pathname;
                    sessionStorage.setItem("last_lang", userLang);
                    sessionStorage.setItem("last_translated_path", window.location.pathname);

                    sessionStorage.setItem(sessionKeyForPath(), "translated");
                };

                document.documentElement.lang = userLang;

            } else {
                // already present -> call initializer if possible
                setTimeout(() => { initializer(); }, 0);
            }
        });
    }
}

/**
 * Reapply translation after navigation (forward/back)
 */
function reapplyTranslationIfNeeded() {
    const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];
    const currentPath = window.location.pathname;
    lastTranslatedPath = sessionStorage.getItem("last_translated_pathg");
    if (currentPath !== lastTranslatedPath) {
        setTimeout(() => {
            if (!document.querySelector(".goog-te-combo")) {
                loadGoogleTranslateAndApply(userLang);
            } else {
                const select = document.querySelector(".goog-te-combo");
                if (select && select.value !== userLang) {
                    select.value = userLang;
                    select.dispatchEvent(new Event("change"));
                }
            }
        }, TRANSLATE_REINIT_DELAY);
    }
}

export function getOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const platform = navigator.platform;


    if (/iPad|iPhone|iPod|iOS/.test(userAgent) && !window.MSStream) return "iOS";
    if (platform === 'MacIntel' && navigator.maxTouchPoints > 1) return 'iOS';

    if (/android/i.test(userAgent)) return "Android";


    if (/windows phone/i.test(userAgent)) return "Android";
    if (/win/i.test(platform)) return "PC";
    if (/mac/i.test(platform)) return "PC";

    if (/linux/i.test(platform) && !/android/i.test(userAgent)) return "PC";

    if (/Windows|mac|windows|mac|imac|iMac/.test(userAgent)) return "PC";

    return "unknown";
}

function iOS() {
    return (getOS() === "iOS");
}

function addPadding() {
    const body = document.body;
    const bodyDiv = document.querySelector("div#body");

    if (iOS()) {
        if (
            !window.location.pathname.toLowerCase().includes("view") && !window.location.pathname.toLowerCase().includes("payment")) {
            if (bodyDiv) {
                const lastElement = bodyDiv.lastElementChild;
                if (lastElement.classList.contains("container")) {
                    body.style.paddingBottom = "150px";
                } else {
                    lastElement.style.paddingBottom = "150px";
                }
            } else {
                const lastElement = body.lastElementChild;
                lastElement.style.paddingBottom = "150px";
            }
        }
    }
}

export async function handleTranslateFirstLoad() {
    const os = getOS();

    const pathKey = `translated_texts:${window.location.pathname}`;
    const cachedJson = window.location.pathname.includes(JSON.parse(sessionStorage.getItem(pathKey)));
    let userLang;

    if (os === 'iOS' && navigator.languages && navigator.languages.length > 0) {
        userLang = navigator.languages[0].split("-")[0];
    } else {
        userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];
    }

    // iOS() ? alert(`USER LANGUAGE: ${userLang}`) : console.log(userLang);


    //  Don't translate if the user's language is English
    if (userLang === "en" || !navigator.onLine) {
        document.body.style.visibility = "visible";
        if (document.cookie || cookieStore) {
            document.cookie = "";
        }
        return;
    }

    if (iOS()) {
        try {
            setGoogleTransCookie('en', userLang);
        } catch (e) {
            // alert(`error in cookie: ${e}`)
        }
    }



    try {
        loadGoogleTranslateAndApply(userLang);
    } catch (e) {
        // alert(e);
    }



    // If we have cached translations, apply them directly to the DOM
    if (cachedJson) {
        document.body.style.visibility = "visible";
        return true;
    } else {
        return new Promise((resolve) => {

            function cleanup() {
                clearTimeout(fallbackTimeout);
                const loader = document.getElementById("wait-loading-section") || document.querySelector(".wait-loading-section");

                if (loader) loader.remove();
                document.body.style.visibility = "visible";
            }

            let done = false;
            const TRANSLATION_MAX_WAIT_MS = 4000;

            const fallbackTimeout = setTimeout(() => {
                if (!done) {
                    console.warn("Translation timeout, proceeding without translation.");
                    // iOS() ? alert("Translation timeout, proceeding without translation.") : "";
                    cleanup();
                    resolve(false);
                }
            }, TRANSLATION_MAX_WAIT_MS);

            const loadingHTML = `
          <div class="wait-loading-section" id="wait-loading-section">
            <div class="loading-spinner"></div>
          </div>`;
            document.body.insertAdjacentHTML("beforebegin", loadingHTML);

            function waitForTranslation() {
                return new Promise((res, rej) => {
                    const htmlEl = document.documentElement;
                    const timeout = setTimeout(() => {
                        observer.disconnect();
                        rej("translation detection timeout");
                    }, 5000);

                    const observer = new MutationObserver(() => {
                        if (htmlEl.classList.contains("translated") ||
                            htmlEl.classList.contains("translated-ltr") ||
                            htmlEl.classList.contains("translated-rtl")) {
                            clearTimeout(timeout);
                            observer.disconnect();

                            // iOS() ? alert("HTML class Tag added") : "";

                            setTimeout(() => res(), 600);
                        }
                    });

                    observer.observe(htmlEl, { attributes: true, attributeFilter: ["class"] });
                });
            }

            const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];

            if (userLang === "en") {
                clearTimeout(fallbackTimeout);
                cleanup();
                resolve(false);
                return;
            }

            setTimeout(() => {
                cleanup();
            }, 2000);



            const selectTryInterval = setInterval(() => {
                const select = document.querySelector(".goog-te-combo");
                if (select) {
                    clearInterval(selectTryInterval);
                    select.value = userLang;
                    select.dispatchEvent(new Event("change"));

                    waitForTranslation().then(async () => {
                        done = true;
                        clearTimeout(fallbackTimeout);
                        if (pageIsTranslated()) {
                            cleanup();
                            resolve(true);
                        } else {
                            cleanup();
                            resolve(false);
                        }
                    }).catch((err) => {
                        console.warn("waitForTranslationFinish failed:", err);
                        // iOS() ? alert("waitForTranslationFinish failed:", err) : "";
                        cleanup();
                        resolve(false);
                    });
                }
            }, 150);

            setTimeout(() => {
                clearInterval(selectTryInterval);
            }, 9000);
        });
    }

}

function setGoogleTransCookie(source, target) {
    try {
        const cookieValue = `/${source}/${target}`;
        // regular and domain-prefixed attempt (some domains need leading dot)
        document.cookie = `googtrans=${encodeURIComponent(cookieValue)};path=/;`;
        document.cookie = `googtrans=${encodeURIComponent(cookieValue)};path=/;domain=${location.hostname};`;
        document.cookie = `googtrans=${encodeURIComponent(cookieValue)};path=/;domain=.${location.hostname};`;
    } catch (e) {
        console.warn("Failed to set googtrans cookie:", e);
        iOS() ? ("Failed to set googtrans cookie:") : "";
    }
}

export async function translateElementFragment(el, lang) {
    if (!window.google || !window.google.translate) {
        console.warn("Google Translate not ready");
        iOS() ? ("Google Translate not ready") : "";
        return;
    }
    // document.body.style.display = "none";

    // Create a hidden sandbox container for translation
    const sandbox = document.createElement("div");
    sandbox.id = "sandbox_translate";
    sandbox.style.cssText = "position:absolute;left:-9999px;top:-9999px;visibility:hidden;";
    document.body.appendChild(sandbox);

    // Clone the target element into sandbox
    const clone = el.cloneNode(true);
    sandbox.appendChild(clone);

    // Force translate that sandbox content
    const select = document.querySelector(".goog-te-combo");
    if (!select) {
        console.warn("No translate combo found");
        // iOS() ? alert("No translate combo found") : "";
        return;
    }

    // select.value = lang;
    select.dispatchEvent(new Event("change"));

    // Copy the translated innerHTML back to the real element
    el.innerHTML = clone.innerHTML;
    // setTimeout(() => {
    //     document.body.style.display = "block";
    // }, 100);
    // Clean up sandbox
    sandbox.remove();
}

function handleInputFocusFix() {
    const ios = iOS();

    if (!ios) {
        const inputs = document.querySelectorAll("input, textarea, select");
        if (inputs) {

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
        return;
    }

    const inputs = document.querySelectorAll("input, textarea");
    let lastScrollY = window.scrollY;

    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            lastScrollY = window.scrollY;
        });

        input.addEventListener("blur", () => {
            setTimeout(() => {
                window.scrollTo({
                    top: lastScrollY,
                    behavior: 'smooth'
                });
            }, 200);
        });
    });
}

function setupCommonUI() {
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
    menu.style.transform = "translateZ(0)";
    void menu.offsetHeight;

    show = !show;
}

function setupEventListeners() {
    const backButton = document.querySelector("div#back-button");
    const refreshButton = document.querySelector("div#refresh-button");

    const menu = document.querySelector("header#header div#menu");

    if (menu) {
        const os = getOS();
        if (os === 'iOS') {
            menu.addEventListener("touchstart", (e) => {
                e.preventDefault();
                toggleMenu();
            }, { passive: false });
        } else {
            menu.addEventListener("click", toggleMenu);
        }
    }
    backButton && backButton.addEventListener("click", goBackButton);
    refreshButton && refreshButton.addEventListener("click", handleRefresh);
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

function handleRefresh() {
    const title = "Reload Page?";
    const message = "Are you sure you want to reload? All saved progress will be erased.";
    const button_reload = "Reload";
    const button_cancel = "Cancel";

    handleAlert(message, "blur", true, title, true, [
        { text: button_cancel, onClick: "closeAlert", type: "secondary" },
        { text: button_reload, onClick: () => window.location.reload() }
    ]);
}

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
                const device = getOS() === "iOS" ? "iPhone" : getOS();

                await updateUserActivity(user.uid, {
                    logout: {
                        timestamp: new Date(),
                        device: device,
                    },
                    last_update: new Date(),
                    opened: false,
                });

                await logout();

                handleAlert("Please log in again if you'd like to continue.", "blur", true, `${iOS() ? `<i class="bi bi-exclamation-circle text-danger fs-2"></i>` : `<i class='bi bi-exclamation-triangle text-danger fs-2'></i>`} <br/> You have been logged out.`, true, [{ text: "OK", onClick: () => window.location.replace('/html/main/Home.html') }]);


            } catch (error) {
                handleAlert(`Failed to log out, because: ${error}.`, "toast");
            }
        });
        navDiv.appendChild(logoutBTN);
    }

    if (actionTab) {
        actionTab.forEach(tab => {
            const actionText = tab.firstElementChild;
            const userProfile = window.location.pathname.toLowerCase().includes("user");
            if (user) {
                if (userProfile) {
                    tab.remove();
                } else {
                    tab.href = "/html/main/User.html";
                    actionText.innerHTML = "PROFILE";
                    actionText.dataset.key = "profile";
                }
            } else {
                tab.href = "/html/regs/Signup.html";
                actionText.innerHTML = "REGISTER";
                actionText.dataset.key = "register";
            }
        });
    }
}

async function setupNewsletter(user) {
    const emailInput = document.querySelector("input#subscribe-email");
    const emailBTN = document.querySelector(".newsletter-form button");

    if (!emailBTN || !emailInput) return;

    emailBTN.disabled = true;
    emailBTN.offsetHeight;

    await new Promise(res => setTimeout(res, 200));

    const thisUser = user ? await getUserData(user.uid) : { emailSub: false };


    function validateEmailValue(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email.trim());
    }

    emailInput.addEventListener("input", () => {
        const value = emailInput.value.trim();
        if (thisUser && thisUser.emailSub) {
            emailBTN.disabled = true;
        } else {
            emailBTN.disabled = value === "";
        }
    });

    if (user) {
        if (thisUser.emailSub) {
            emailInput.disabled = true;
            emailInput.placeholder = "You have already subscribed...";
            emailInput.style.cursor = "not-allowed";
            emailBTN.disabled = true;
            emailBTN.innerHTML = `<p class="text">Subscribed</p>`;
            return;
        } else {
            emailBTN.addEventListener("click", async (e) => {
                e.preventDefault();

                if (emailBTN.disabled || emailInput.value.trim() === "") return;

                const value = emailInput.value.trim();
                if (!validateEmailValue(value)) {
                    handleAlert("Invalid email address, please check the email you entered and try again.", "blur", true, "<i class='bi bi-exclamation-circle text-danger fs-2'></i> <br/> Invalid Email", true, [{ text: "OK", onClick: "closeAlert" }]);
                    throw new Error("Please enter a valid email address.");
                }

                emailBTN.disabled = true;
                emailBTN.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
                await updateUserData(user.uid, { emailSub: true });

                await updateUserActivity(user.uid, {
                    newsletter: {
                        timestamp: new Date(),
                    },
                    last_update: new Date(),
                    opened: false,
                });

                await sendEmail(user.email, 'newsletter', { first_name: thisUser.details.firstName || 'there' });

                setTimeout(() => {
                    emailBTN.innerHTML = `<p class="text">Subscribed</p>`;
                    emailBTN.disabled = true;
                    emailInput.value = "";
                    emailInput.disabled = true;
                    emailInput.placeholder = "You have already subscribed...";

                    handleAlert("Your subscription has been confirmed. From now on, you’ll receive thoughtful updates, healing insights, and special messages directly in your inbox. <br/> We’ll be here to gently stay connected with you each day.", "blur", true, "✉️ Companion Support", true, [{ text: "OK", onClick: "closeAlert" }]);
                }, 100);
            });
        }
        emailBTN.offsetHeight;
    } else {
        emailBTN.addEventListener("click", (e) => {
            e.preventDefault();
            const value = emailInput.value.trim();

            if (!validateEmailValue(value)) {
                handleAlert("Invalid email address, please check the email you entered and try again.", "blur", true, "<i class='bi bi-exclamation-circle text-danger fs-2'></i> <br/> Invalid Email", true, [{ text: "OK", onClick: "closeAlert" }]);
                throw new Error("Please enter a valid email address.");
            }
            handleAlert("To subscribe to our newsletter, please log in or create an account.", "blur", true, "✉️ <br/> Login or Register", true, [{ text: "Log in", onClick: () => handleRedirect("/html/regs/Signup.html?type=login") }, { text: "Register", onClick: () => handleRedirect("/html/regs/Signup.html?type=register"), type: "secondary" }]);
        });
        emailBTN.offsetHeight;
    }
}

async function initializeApp() {
    await handleAuthStateChange(async user => {
        setupAuthUI(user);
        await setupNewsletter(user);
    });

    await handleTranslateFirstLoad();
    addPadding();
    setupCommonUI();
    setupEventListeners();

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js").catch(error => {
            console.error("Service Worker registration failed:", error);
        });
    }

    handleInputFocusFix();
}

window.onload = initializeApp;
window.addEventListener("beforeunload", saveTranslationsToSession);
window.addEventListener("popstate", () => {
    const userLang = sessionStorage.getItem("last_lang");

    if (userLang && userLang !== "en") {
        try {
            loadGoogleTranslateAndApply(userLang);
            setGoogleTransCookie('en', userLang);
        } catch (error) {
            console.log(error);
        }
    }
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        const userLang = sessionStorage.getItem("last_lang");
        if (userLang && userLang !== "en") {
            loadGoogleTranslateAndApply(userLang);
            setGoogleTransCookie('en', userLang);

            if (getOS() !== "PC") {
                location.reload();
            }
        }
    }
});

(function patchHistoryMethods() {
    const pushState = history.pushState;
    history.pushState = function (...args) {
        pushState.apply(this, args);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
    };

    const replaceState = history.replaceState;
    history.replaceState = function (...args) {
        replaceState.apply(this, args);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
    };

    window.addEventListener('locationchange', (event) => {
        reapplyTranslationIfNeeded();
    });
})();

const observer = new MutationObserver(() => {
    if (!document.querySelector(".goog-te-combo")) {
        const userLang = sessionStorage.getItem("last_lang") || (navigator.language || "en").split("-")[0];
        if (userLang !== "en") {
            reapplyTranslationIfNeeded();
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

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
        if (!lastNav || !lastNav.previous || !previous || previous.includes("login") || previous.includes("signup") || previous.includes('forget') || previous.includes('reset')) {
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


let __alertTimer = null;

function ensureAlertParent() {
    let parent = document.querySelector(".alert-message");
    if (!parent) {
        parent = document.createElement("div");
        parent.classList.add("alert-message");

        // keep it in DOM but hidden by default
        parent.style.display = "none";
        parent.setAttribute("aria-hidden", "true");
        document.body.insertAdjacentElement("afterbegin", parent);
    }
    return parent;
}

function safeClearCountdown(parent) {
    if (parent?.dataset?.countdownId) {
        clearInterval(Number(parent.dataset.countdownId));
        delete parent.dataset.countdownId;
    }
}


function createAlertBase(type) {
    const parent = ensureAlertParent();
    if (!parent) return null;
    parent.dataset.translateWrapper = true;

    // Stop any pending hide timers
    clearTimeout(__alertTimer);
    safeClearCountdown(parent);

    // Hide politely (avoid immediate innerHTML flush to prevent Safari layer freeze)
    parent.style.opacity = "0";
    parent.style.pointerEvents = "none";
    parent.classList.remove("fadeOut", "shop");

    parent.innerHTML = "";
    parent.style.display = "flex";

    // Force repaint so Safari sees the cleanup
    void parent.offsetHeight;

    parent.style.opacity = "1";
    parent.style.pointerEvents = "";

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
    timerP.dataset.translateWrapper = true;
    timerP.className = "alert-timer";
    timerP.innerHTML = `You can request a new code after: <span class="alert-timer-count">${timeLeft} seconds.</span>`;

    const resendEl = document.createElement("p");
    resendEl.className = "alert-resend";
    resendEl.style.display = "none";
    resendEl.innerHTML = `<strong style="cursor:pointer; color: var(--link, #007bff);">Request a new OTP</strong>`;


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
            const input = document.querySelector(".alert-message input");
            timerP.querySelector(".alert-timer-count").textContent = `${timeLeft} seconds`;
            if (timeLeft <= 0) {
                clearInterval(timerIntervalId);
                timerP.style.display = "none";
                resendEl.style.display = "block";
                if (input) {
                    input.disabled = true;
                    input.value = "";
                    const errorDiv = div.querySelector(".alert-error");
                    errorDiv.innerHTML = "";
                    errorDiv.style.display = "none";
                }

                if (typeof options.timer.onExpire === "function") options.timer.onExpire();
            }
        }, 1000);
        parent.dataset.countdownId = timerIntervalId;
    };

    startCountdown();

    const onResend = async (e) => {
        e?.preventDefault();

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
            const input = document.querySelector(".alert-message input");
            resendEl.dataset.sending = "0";
            resendEl.innerHTML = `<strong style="cursor:pointer; color: var(--link, #007bff);">Request a new OTP</strong>`;
            if (input) {
                input.disabled = false;
                input.focus();
            }
        }
    }

    resendEl.addEventListener("touchstart", () => { }, { passive: true });
    resendEl.addEventListener("click", onResend);
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

        newBtn.addEventListener("touchstart", () => { }, { passive: true });

        newBtn.addEventListener("click", async (e) => {
            e?.preventDefault();

            errorDiv.style.display = "none";
            if (loading) {
                newBtn.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
                newBtn.disabled = true;
                const delay = Math.floor(Math.random() * 1000) + 1000;
                await new Promise(res => setTimeout(res, delay));
            }

            try {
                if (onClick === "closeAlert") {
                    closeAlert();
                } else if (typeof onClick === "function") {
                    const result = await onClick();
                    if (result === "closeAlert") {
                        closeAlert();
                    }
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
                void document.body.offsetWidth;
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
    const parent = ensureAlertParent();
    safeVibrate(80);

    const renderAlert = (finalTitle, finalMessage, finalButtons) => {
        const base = createAlertBase(type);
        if (!base) return;

        const closeAlert = () => {
            const parent = document.querySelector(".alert-message");
            if (!parent) return;

            // Clear any timers associated with this alert
            clearTimeout(__alertTimer);
            safeClearCountdown(parent);


            if (base) base.classList.add("zoom-out");
            parent?.classList.add("fadeOut");
            safeVibrate(10);

            // Force repaint to ensure iOS touch layer rebuild
            void parent.offsetHeight;

            __alertTimer = setTimeout(() => {
                requestAnimationFrame(() => {
                    parent.style.display = "none";
                    parent.innerHTML = "";
                    parent.setAttribute("aria-hidden", "true");

                    document.body.style.overflow = "";

                    //iOS fix: 
                    parent.style.transform = "translateZ(0)";
                    document.body.offsetHeight;

                    defaultFunction();
                });
            }, 550);
        };



        if (type === "toast") {
            const newMessage = document.createElement("p");
            newMessage.className = "alert-text moveUp";
            newMessage.innerHTML = finalMessage;
            base.appendChild(newMessage);


            parent.style.display = "flex";
            parent.setAttribute("aria-hidden", "false");

            setTimeout(closeAlert, 4000);
            return;
        }

        document.activeElement?.blur();
        document.body.style.overflow = "hidden";


        addAlertContent(base, titled, finalTitle, finalMessage);
        addAlertTimer(base, options, parent);
        addAlertInput(base, options);

        const errorDiv = document.createElement("div");
        errorDiv.className = "alert-error";
        errorDiv.style.display = "none";
        base.appendChild(errorDiv);

        addAlertButtons(base, closing, finalButtons, closeAlert, defaultFunction, arrange, errorDiv);

        // show parent
        parent.style.display = "flex";
        parent.setAttribute("aria-hidden", "false");

        // small repaint tick to address Safari layering problems
        void parent.offsetHeight;


        if (!closing) {
            setTimeout(closeAlert, 4000);
        }
    };

    renderAlert(titleText, message, closingConfig);

    // global iOS touchstart recovery hook (idempotent)
    if (!window.__alert_touch_wakeup__) {
        document.addEventListener("touchstart", () => { }, { passive: true });
        window.__alert_touch_wakeup__ = true;
    }

    if (!window.__alert_touch_recovery__) {
        document.addEventListener("touchend", () => {
            const alertParent = document.querySelector(".alert-message");
            if (alertParent && alertParent.style.display === "flex") {
                alertParent.style.transform = "translateZ(0)";
            }
        }, { passive: true });
        window.__alert_touch_recovery__ = true;
    }
}

/* safe vibrate wrapper */
function safeVibrate(durationOrPattern) {
    try {
        if (navigator && typeof navigator.vibrate === "function") {
            navigator.vibrate(durationOrPattern);
        }
    } catch (e) {
        console.log(e);
    }
}


/**
 * Converts a language code into its full display name.
 * @param {string} langCode - The language code (e.g., "en-US", "fr").
 * @returns {string} The full language name (e.g., "English", "French").
 */
export function getDisplayLanguage() {
    try {
        const langCode = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
        // Use Intl.DisplayNames to get the human-readable language name.
        const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
        const codeOnly = langCode.split('-')[0];
        return languageNames.of(codeOnly);
    } catch (error) {
        console.warn('Could not determine full language name:', error);
        const lang = (navigator.language || 'en').split('-')[0];
        const langMap = {
            'en': 'English',
            'fr': 'French',
            'es': 'Spanish',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese'
        };
        return langMap[lang] || 'English';
    }
}

export default handleAlert;