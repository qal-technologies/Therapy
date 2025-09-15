const header = document.querySelector("header#header");

window.onload = () => {
    let user = true;

    const year = document.querySelector("footer span#year");
    const backButton = document.querySelector("div#back-button");
    const refreshButton = document.querySelector("div#refresh-button");


    const date = new Date().getFullYear();
    if (year) year.innerHTML = date;


    const actionTab = document.querySelectorAll("a.login");


    const menu = document.querySelector("header#header div#menu");


    if (user) {

        if (actionTab) {

            actionTab.forEach(tab => {

                const actionText = tab.firstElementChild;
                tab.href = "/html/main/User.html";
                actionText.innerHTML = "PROFILE";
            })
        }
    }

    let show = false;
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

        window.addEventListener('unload', () => {
            cancelAnimationFrame(animationFrame);
        });
    }

    function goBackButton() {

        // window.history.back();

        window.history.go(-1)
    }

    backButton && backButton.addEventListener("click", goBackButton);
    refreshButton && refreshButton.addEventListener("click", () => {
        const ask = confirm("Are you sure you want to reload the page?");
        const proceed = ask && confirm("All saved progress would be erased if you refresh this page");

        proceed && window.location.reload();
    })
    initTicker();
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
    cancelAnimationFrame(animationFrame);
    createTicker();
};

let timer;
function handleAlert(message, type = "blur" | "toast", titled = false, titleText = "", closing = false, closingText = [], arrange = "row", closeFunction = () => { }) {
    const parent = document.querySelector(".alert-message");
    const div = document.querySelector(".alert-message .alert-div");
    const title = document.querySelector(".alert-title");
    const text = document.querySelector(".alert-message .alert-text");
    const close = document.querySelector(".alert-message .alert-button");

    if (!parent) return;

    if (parent.classList.contains("fadeOut")) {
        parent.classList?.remove("fadeOut");
        div.classList?.remove("zoom-out");
    }

    parent.style.display = "flex";

    //for closing the alert
    function closeAlert() {
        clearTimeout(timer);

        const adding = div.classList.add("zoom-out");

        text.innerHTML = "";
        parent.classList.add("fadeOut");

        timer = adding && setTimeout(() => {
            parent.style.display = "none";
        }, 1000);
    }

    //for fading out alert:
    function fadeAlert() {
        setTimeout(() => {
            parent.classList.add("fadeOut");

            text ? text.textContent = "" : "";
            parent.style.display = "none";
        }, 4000);
    }

    // if this is toast:
    if (type == "toast") {
        parent.classList.add("shop");

        if (text) {
            text.innerHTML = message;
        }
        if (!text && message) {
            const newMessage = document.createElement("p");
            newMessage.classList.add("alert-text", "moveUp");
            newMessage.innerHTML = message;

            parent.append(newMessage)
        }

        fadeAlert();
    } else {
        // if not a toast and needs a blur background 
        //creating new div if it doesn't exist:
        if (!div) {
            parent.innerHTML = ``;

            const newDiv = document.createElement("div");
            newDiv.classList.add("alert-div", "zoom-in");
            console.log(newDiv);

            //for title:
            if (titled) {
                const newTitle = document.createElement("p");
                newTitle.classList.add("alert-title");
                newTitle.innerText = titleText.length >= 1 ? titleText : "Title";

                newDiv.insertAdjacentElement("beforebegin", newTitle);
            }

            //for message and text inputs:
            if (message) {
                const newMessage = document.createElement("p");
                newMessage.classList.add("alert-text", "moveUp");
                newMessage.innerHTML = message.length >= 1 ? message : "Message";

                newDiv.insertAdjacentElement("afterbegin", newMessage);
            }

            //for fading out alert if the closing is not specified:
            if (!closing) {
                fadeAlert();
            }

            //for checking fir close button:
            if (closing) {
                if (closingText.length > 1) {
                    const buttons = arrange == "row" ? closingText.slice(0, 1) : closingText;

                    const buttonParent = document.createElement("div");
                    buttonParent.classList.add("button-parents");
                    buttonParent.style.flexDirection = arrange == "row" ? "row" : "column";

                    buttonParent.innerHTML = buttons.map(text => {
                        const newBtn = document.createElement("button")
                        newBtn.classList.add("alert-button");

                        newBtn.innerHTML = text;
                        newBtn.addEventListener("click", closeAlert);
                    });

                    newDiv.insertAdjacentElement("afterend", buttonParent);
                } else {

                    const newBtn = document.createElement("button")
                    newBtn.classList.add("alert-button");
                    newBtn.innerHTML = closingText;
                    newBtn.addEventListener("click", closeAlert);

                    newDiv.insertAdjacentElement("afterend", newBtn);
                }
            }

            parent.appendChild(newDiv);
            console.log(newDiv);

        } else {
            // this is if the div already exists:
            // -------
            //for title:
            if (!title) {
                const newTitle = document.createElement("p")
                newTitle.classList.add("alert-title");
                newTitle.innerHTML = titleText.length >= 1 ? titleText : "Title";

                parent.insertAdjacentElement("beforebegin", newTitle);
            } else if (title) {
                title.innerHTML = titleText.length >= 1 ? titleText : "Title";
            }

            //for message and text inputs:
            if (!text && message) {
                const newMessage = document.createElement("p");
                newMessage.classList.add("alert-text", "moveUp");
                newMessage.innerHTML = message.length >= 1 ? message : "Message";

                parent.insertAdjacentElement("afterbegin", newMessage);
            } else if (text) {
                text.innerHTML = message.length >= 1 ? closingText.length : "Message";
            }

            //for fading out alert if the closing is not specified:
            if (!closing) {
                fadeAlert();
            }

            //for checking fir close button:
            if (!close && closing) {
                if (closingText.length > 1) {
                    const buttons = arrange == "row" ? closingText.slice(0, 1) : closingText;

                    const buttonParent = document.createElement("div");
                    buttonParent.classList.add("button-parents");
                    buttonParent.style.flexDirection = arrange == "row" ? "row" : "column";

                    buttonParent.innerHTML = buttons.map(text => {
                        const newBtn = document.createElement("button")
                        newBtn.classList.add("alert-button");

                        newBtn.innerHTML = text;
                        newBtn.addEventListener("click", closeAlert);
                    });


                    parent.insertAdjacentElement("afterend", buttonParent);
                } else {

                    const newBtn = document.createElement("button")
                    newBtn.classList.add("alert-button");
                    newBtn.innerHTML = closingText;
                    newBtn.addEventListener("click", closeAlert);

                    parent.insertAdjacentElement("afterend", newBtn);
                }
            } else if (closing && closingText && close) {

                if (closingText.length > 1) {
                    const buttons = arrange == "row" ? closingText.slice(0, 1) : closingText;
                    close.remove();

                    const buttonParent = document.createElement("div");
                    buttonParent.classList.add("button-parents");
                    buttonParent.style.flexDirection = arrange == "row" ? "row" : "column";

                    const allArray = buttons.map(text => {
                        const newBtn = document.createElement("button")
                        newBtn.classList.add("alert-button");

                        newBtn.innerHTML = text;
                        newBtn.addEventListener("click", closeAlert);

                        buttonParent.appendChild(newBtn);
                    });

                    console.log(buttonParent);
                    div.appendChild(buttonParent);
                } else {


                    close.innerHTML = closingText.length >= 1 ? closingText[0] : "Close";
                    close.addEventListener("click", closeAlert)

                }
            }

        }
    }


}

export default handleAlert;