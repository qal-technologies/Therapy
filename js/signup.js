// signup.js
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const forms = {
        register: document.getElementById('register-form'),
        login: document.getElementById('login-form')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const formToShow = tab.dataset.form;
            if (tab.classList.contains('active')) return;

            // Switch active tab
            document.querySelector('.tab.active').classList.remove('active');
            tab.classList.add('active');

            // Fade out current form
            const currentActiveForm = document.querySelector('.form-container:not(.fadeOut)');
            currentActiveForm.classList.add('fadeOut');

            // Fade in new form
            setTimeout(() => {
                forms[formToShow].classList.remove('fadeOut');
            }, 300);
        });
    });
    //     tabs.forEach(tab => {
    //         tab.addEventListener('click', () => {
    //             const formToShow = tab.dataset.form;
    //             if (tab.classList.contains('active')) return;

    //             // Switch active tab
    //             document.querySelector('.tab.active').classList.remove('active');
    //             tab.classList.add('active');

    //             // Fade out current form
    //             const currentActiveForm = document.querySelector('.form-container:not(.fadeOut)');
    //             currentActiveForm.classList.add('fadeOut');

    //             // Fade in new form
    //             setTimeout(() => {
    //                 forms[formToShow].classList.remove('fadeOut');
    //             }, 300);
    //         });
    //     });
    // });
}
);
