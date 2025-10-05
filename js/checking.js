
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
