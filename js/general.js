window.onload = () => {
    let user = false;

    const actionTab = document.querySelector("a.login");
    const header = document.querySelector("header#header");
    const menu = document.querySelector("header#header div#menu");

    const actionText = actionTab.firstElementChild;

    if (user) {
        actionTab.href = "/html//main/User.html";
        actionText.innerHTML = "PROFILE";
    }

    let show = false;
    menu.addEventListener("click", () => {
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
}