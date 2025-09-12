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
function handleAlert(message, type = "blur" | "toast", titled = false, titleText = "", closing = false, closingText = "") {
    console.log("stage!");

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

    console.log("passed!");

    parent.style.display = "flex";
    if (type == "toast") {
        parent.classList.add("shop");

        setTimeout(() => {
            parent.classList.add("fadeOut");

            text.textContent = "";
            parent.style.display = "none";
        }, 4000);
    }

    if (titled && titleText.length >= 1) {
        if (!title) {

            const newTitle = document.createElement("p").classList.add("alert-title");

            parent.insertAdjacentElement("beforebegin", newTitle);

        }

        title.innerHTML = titleText;
    }

    if (text) {
        text.innerHTML = message;
    }

    console.log("passed!!");

    if (!close && closing) {

            const newTitle = document.createElement("p").classList.add("alert-title");

            parent.insertAdjacentElement("beforebegin", newTitle);
    }
    
    if (closing && closingText.length >= 1 && close) {
            close.addEventListener("click", () => {
                clearTimeout(timer);

                const adding = div.classList.add("zoom-out");

                text.innerHTML = "";
                parent.classList.add("fadeOut");

                timer = adding && setTimeout(() => {
                    parent.style.display = "none";
                }, 1000);
            })
        
    }

}

 export default handleAlert;