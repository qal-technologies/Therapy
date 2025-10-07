//1. fixing the order of payment transactions so the newer one stays at the top, older ones belowfunction ---------->>>>>>>> DONE

//2. Adding time details to the payment tab. ------------------>>>>>>>>>>>>> DONE

//3. Make the site loading robust.

//4. create and implement the forgot password page, with it actually changing the user's password. --------------->>>>>>> DONE

//5. build in an email server for sending emails on newsletter subscription and other necessary things.

//6. create a general function that handles and make sure one audio plays at a time on each page, changes the icon too depending on the play state.  ------------------>>>>>>>>>>>> DONE

/*7. Translate the pages of the website:
Language of priority is:
1. French   
2. Italian   
3. Spanish   
4. German   
5. English

Just parts and sections of it.
1. Home page
2. Book description
3. Session Booking Questions
4. The book itself (most important)
5. eBook description
6. Each session's description
7. All zoomed out notification
8. Testimonials
9. Every button label
10. All descriptions
11. Everything related to Paysafecard
12. Everything related to Payment methods
13. Payment summary descriptions
14. Credit card wording, especially when declined or when asked to choose another payment method. 
*/



const TRANSLATED_CACHE_NAME = "charlotte-translated-v1900";

function sessionKeyForPath() {
    return `translated:${window.location.pathname}`;
}

async function saveTranslatedToSessionAndSW() {
    try {
        const key = sessionKeyForPath();
        sessionStorage.setItem(key, document.body.innerHTML);

        if ('caches' in window) {
            try {
                const fullHtml = '<!doctype html>\n' + document.documentElement.outerHTML;
                const cache = await caches.open(TRANSLATED_CACHE_NAME);
                await cache.put(window.location.href, new Response(fullHtml, {
                    headers: { "Content-Type": "text/html" }
                }));
                console.log("Saved translated page to SW cache");
            } catch (swErr) {
                console.warn("Failed saving translated page to SW cache:", swErr);
            }
        }
    } catch (err) {
        console.warn("Failed to save translated page:", err);
    }
}

function pageIsTranslated() {
    const htmlEl = document.documentElement;
    return htmlEl.classList.contains("translated") ||
        htmlEl.classList.contains("translated-ltr") ||
        htmlEl.classList.contains("translated-rtl");
}

async function handleTranslateFirstLoad() {
    const key = sessionKeyForPath();
    const cached = sessionStorage.getItem(key);

    if (cached) {
        document.body.innerHTML = cached;
        const loader = document.getElementById("wait-loading-section") || document.querySelector(".wait-loading-section");

        if (loader) loader.remove();

        document.body.style.visibility = "visible";

        console.log("Loaded translated content from sessionStorage");
        return true;
    }


    return new Promise((resolve) => {
        const loadingHTML = `
          <div class="wait-loading-section" id="wait-loading-section">
            <div class="loading-spinner"></div>
          </div>`;
        document.body.insertAdjacentHTML("beforebegin", loadingHTML);

        // if (pageIsTranslated()) {
        //     saveTranslatedToSessionAndSW().finally(() => {
        //         cleanup();
        //         resolve(true);
        //     });
        //     return;
        // }

        if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
            const meta = document.createElement("meta");
            meta.name = "google";
            meta.content = "notranslate";
            document.head.appendChild(meta);
        }

        function loadGoogleTranslate() {
            if (document.querySelector('script[src*="translate.google.com/translate_a/element.js"]')) return;

            const gtScript = document.createElement("script");
            gtScript.src = "https://translate.google.com/translate_a/element.js?cb=initTranslate";
            gtScript.async = true;
            document.head.appendChild(gtScript);

            gtScript.onload = () => {
                console.log("startedd....")
            }
            gtScript.onerror = () => {
                console.warn("Failed to load Google Translate script");
                cleanup();
                resolve(false);
            };
        }

        let done = false;
        const TRANSLATION_MAX_WAIT_MS = 80000;

        const fallbackTimeout = setTimeout(() => {
            if (!done) {
                console.warn("Translation timeout, proceeding without translation.");
                cleanup();
                resolve(false);
            }
        }, TRANSLATION_MAX_WAIT_MS);


        window.initTranslate = function () {
            try {
                new google.translate.TranslateElement({
                    pageLanguage: "en",
                    includedLanguages: "fr,es,de,it",
                    autoDisplay: false
                }, "google_translate_element");

            } catch (err) {
                console.error("Google Translate init failed:", err);
                cleanup();
                resolve(false);
            }

            const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];
            console.log(userLang);
            if (userLang === "en") {
                clearTimeout(fallbackTimeout);
                cleanup();
                resolve(false);
                return;
            }

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
                            await saveTranslatedToSessionAndSW();
                            cleanup();
                            resolve(true);
                        } else {
                            cleanup();
                            resolve(false);
                        }
                    }).catch((err) => {
                        console.warn("waitForTranslationFinish failed:", err);
                        cleanup();
                        resolve(false);
                    });
                }
            }, 150);

            setTimeout(() => {
                clearInterval(selectTryInterval);
            }, 9000);
        };

        function waitForTranslation() {
            return new Promise((res, rej) => {
                const htmlEl = document.documentElement;
                const timeout = setTimeout(() => {
                    observer.disconnect();
                    rej("translation detection timeout");
                }, 8000);

                const observer = new MutationObserver(() => {
                    if (htmlEl.classList.contains("translated") ||
                        htmlEl.classList.contains("translated-ltr") ||
                        htmlEl.classList.contains("translated-rtl")) {
                        clearTimeout(timeout);
                        observer.disconnect();

                        setTimeout(() => res(), 1000);
                    }
                });

                observer.observe(htmlEl, { attributes: true, attributeFilter: ["class"] });
            });
        }

        function cleanup() {
            clearTimeout(fallbackTimeout);
            const loader = document.getElementById("wait-loading-section") || document.querySelector(".wait-loading-section");

            if (loader) loader.remove();
            console.log("removing loading....")
            document.body.style.visibility = "visible";
            console.log("cleaned....")
        }

        loadGoogleTranslate();
    });
}

async function translateNode(nodeOrNodes) {
    const userLang = (navigator.language || navigator.userLanguage || "en").split("-")[0];
    const nodes = Array.isArray(nodeOrNodes) ? nodeOrNodes : [nodeOrNodes];

    const separator = "|||";
    const originalTexts = nodes.map(n => n.nodeValue);
    const joinedText = originalTexts.join(separator);

    // Step 1: Find target parents (prefer a tagged ancestor)
    const parents = new Set();

    nodes.forEach(node => {
        let targetParent = node.parentElement;

        // Walk upward until we find an ancestor with data-translate-wrapper
        let ancestor = node.parentElement;
        while (ancestor) {
            if (ancestor.dataset.translateWrapper !== undefined) {
                targetParent = ancestor;
                break;
            }
            ancestor = ancestor.parentElement;
        }

        if (targetParent) parents.add(targetParent);
    });

    // Step 2: visually hide + add spinner to selected parents
    parents.forEach(parent => {
        parent.dataset.originalColor = parent.style.color;
        parent.style.color = "transparent";
        parent.style.backgroundColor = "transparent";

        const spinner = document.createElement("div");
        spinner.classList.add("spinner-container", "waiting-spinner");
        spinner.innerHTML = `<div class="spinner"></div>`;
        parent.style.position = "relative";
        parent.appendChild(spinner);
    });

    // Step 3: race translation vs timeout fallback
    const translationPromise = translateText(joinedText, userLang);
    const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(joinedText), 5000));

    try {
        const translationResult = await Promise.race([translationPromise, timeoutPromise]);
        const translatedTexts = translationResult.split(separator).map(t => t);
        nodes.forEach((node, index) => {
            node.nodeValue = translatedTexts[index] || originalTexts[index];
        });
    } catch (e) {
        console.warn("Dynamic translation failed:", e);
        nodes.forEach((n, i) => (n.nodeValue = originalTexts[i]));
    } finally {
        parents.forEach(parent => {
            parent.style.color = parent.dataset.originalColor || "";
            parent.style.backgroundColor = "";
            const spinner = parent.querySelector(".spinner-container.waiting-spinner");
            if (spinner) spinner.remove();
        });
    }
}

