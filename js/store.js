let timer;
function handleAlert(
    message,
    type = "blur",                
    titled = false,               
    titleText = "",               
    closing = false,              
    closingConfig = [],           
    arrange = "row",              
    defaultFunction = () => {}    
) {
    const parent = document.querySelector(".alert-message");
    if (!parent) return;

    // clear old state
    let div = parent.querySelector(".alert-message .alert-div");
    let title = parent.querySelector(".alert-message .alert-title");
    let text = parent.querySelector(".alert-message .alert-text");

    if (parent.classList.contains("fadeOut")) {
        parent.classList.remove("fadeOut");
        div && div.classList.remove("zoom-out");
    }

    parent.style.display = "flex";

    // internal close handler
    function closeAlert() {
        clearTimeout(timer);
        div && div.classList.add("zoom-out");
        if (text) text.textContent = "";
        parent.classList.add("fadeOut");

        timer = setTimeout(() => {
            parent.style.display = "none";
            defaultFunction(); // run fallback on close
        }, 1000);
    }

    // automatic fade if no buttons
    function fadeAlert() {
        setTimeout(() => {
            parent.classList.add("fadeOut");
            if (text) text.textContent = "";
            parent.style.display = "none";
        }, 4000);
    }

    // handle toast (auto fade, no blur background)
    if (type === "toast") {
        parent.classList.add("shop");

        if (text) {
            text.textContent = message;
        } else if (message) {
            const newMessage = document.createElement("p");
            newMessage.classList.add("alert-text", "moveUp");
            newMessage.textContent = message;
            parent.appendChild(newMessage);
        }

        fadeAlert();
        return;
    }

    // handle blur alerts
    if (!div) {
        div = document.createElement("div");
        div.classList.add("alert-div", "zoom-in");

        // Title
        if (titled) {
            const newTitle = document.createElement("p");
            newTitle.classList.add("alert-title");
            newTitle.textContent = titleText || "Title";
            div.appendChild(newTitle);
        }

        // Message
        if (message) {
            const newMessage = document.createElement("p");
            newMessage.classList.add("alert-text", "moveUp");
            newMessage.textContent = message;
            div.appendChild(newMessage);
        }

        // Buttons
        if (closing) {
            const buttonParent = document.createElement("div");
            buttonParent.classList.add("button-parents");
            buttonParent.style.flexDirection = arrange === "row" ? "row" : "column";

            if (closingConfig.length >= 1) {
                // default close button if config is empty
                const newBtn = document.createElement("button");
                newBtn.classList.add("alert-button");
                newBtn.textContent = closingConfig.length === 0 ? "Close" : closingConfig.toString();
                
                newBtn.addEventListener("click", closeAlert);
                buttonParent.appendChild(newBtn);
            }

            closingConfig.forEach(cfg => {
                const { text: btnText, onClick } = cfg;
                const newBtn = document.createElement("button");
                newBtn.classList.add("alert-button");
                newBtn.textContent = btnText || "Close";

                if (onClick === "closeAlert") {
                    newBtn.addEventListener("click", closeAlert);
                } else if (typeof onClick === "function") {
                    newBtn.addEventListener("click", onClick);
                } else {
                    newBtn.addEventListener("click", defaultFunction);
                }

                buttonParent.appendChild(newBtn);
            });

            div.appendChild(buttonParent);
        } else {
            fadeAlert();
        }

        parent.appendChild(div);
    } else {
        // update existing alert
        if (titled) {
            if (!title) {
                title = document.createElement("p");
                title.classList.add("alert-title");
                div.insertBefore(title, div.firstChild);
            }
            title.textContent = titleText || "Title";
        }

        if (!text) {
            text = document.createElement("p");
            text.classList.add("alert-text", "moveUp");
            text.textContent = message || "Message";
            div.appendChild(text);
        } else {
            text.textContent = message || "Message";
        }

        if (closing) {
            // remove old buttons if any
            const oldButtons = div.querySelectorAll(".alert-button, .button-parents");
            oldButtons.forEach(btn => btn.remove());

            const buttonParent = document.createElement("div");
            buttonParent.classList.add("button-parents");
            buttonParent.style.flexDirection = arrange === "row" ? "row" : "column";

            if (closingConfig.length === 0) {
                const newBtn = document.createElement("button");
                newBtn.classList.add("alert-button");
                newBtn.textContent = "Close";
                newBtn.addEventListener("click", closeAlert);
                buttonParent.appendChild(newBtn);
            }
            
            closingConfig.forEach(cfg => {
                const { text: btnText, onClick } = cfg;
                const newBtn = document.createElement("button");
                newBtn.classList.add("alert-button");
                newBtn.textContent = btnText || "Close";

                if (onClick === "closeAlert") {
                    newBtn.addEventListener("click", closeAlert);
                } else if (typeof onClick === "function") {
                    newBtn.addEventListener("click", onClick);
                } else {
                    newBtn.addEventListener("click", defaultFunction);
                }

                buttonParent.appendChild(newBtn);
            });

            div.appendChild(buttonParent);
        } else {
            fadeAlert();
        }
    }
}
