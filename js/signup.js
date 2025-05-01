// signup.js
const topicsData = {
    "virtual": {
        name: "VIRTUAL SESSION",
        price: "800",
        description: "Let's make your screen disappear",
        questions: [
            "Do you feel most emotionally open in the morning, afternoon, or evening?",
            "Would you like Charlotte to begin with a calming 90-second grounding exercise just for you?",
            "Are there any life themes you feel emotionally 'stuck' in right now that you'd like to gently explore?"
        ]
    },
    "inPerson": {
        name: "IN-PERSON SESSION (EUROPE/MONACO)",
        price: "1600",
        description: "Let's prepare your sanctuary",
        questions: [
            "Do you have any dietary preferences or allergies we should consider while preparing your welcome refreshment?",
            "Would prefer Charlotte to gently guide the session, or would you like space to speak freely from the start?",
            "Is there a personal object (journal, photo, or keepsake) you'd like to bring into the session as part of your healing space?"
        ]
    },
    "community": {
        name: "SPONSORED SUPPORT SESSION",
        price: "550",
        description: "Your story matters, Let's begin ",
        questions: [
            "Would you feel safer starting the session in silence, or would you prefer Charlotte to welcome you with a gentle question?",
            "Is there one thing you've been carrying alone that you wish someone would simply hear - without trying to fix?",
            "Would it help if we checked in with you a few days after the session to support your reflection?"
        ]
    },
    "inner": {
        name: "INNER CIRCLE EXPERIENCE",
        description: "A sanctuary made just for your soul",
        price: "6,850",
        questions: [
            "If you could name this season of your life in one word, what would it be - and why?",
            "Would you like your healing plan to focus on emotional wounds, spiritual clarity, or self-love and transformation?",
            "What would it mean to you if Charlotte's letter spoke directly to your soul's current journey?"
        ]
    }
};

window.addEventListener('DOMContentLoaded', () => {
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


    const dropdownHeader = document.getElementById('dropdownHeader');
    const dropdownOptions = document.querySelector('#dropdownOptions');
    const questionsContainer = document.getElementById('questionsContainer');
    const chevron = document.querySelector('.chevron');
    const price = document.querySelector("#session-plan .price");
    const title = document.querySelector("#session-plan .title");
    const formGroup = document.querySelector(".form-group#session");
const ticket = document.querySelector(".form-container#register-form .lower h1.ticket");

    function populateDropdown() {
        dropdownOptions.innerHTML = '';

        for (const [key, topic] of Object.entries(topicsData)) {
            const option = document.createElement('div');
            option.className = 'option';
            option.textContent = topic.name;
            option.dataset.value = key;

            option.addEventListener('click', () => {
                selectTopic(key);
                closeDropdown();
            });

            dropdownOptions.appendChild(option);
        }
    }

    function selectTopic(topicKey) {
        const topic = topicsData[topicKey];
        formGroup.style.display = "block";
ticket.style.display = "block";
        dropdownHeader.querySelector('span').textContent = topic.name;

        // Clear previous questions
        questionsContainer.innerHTML = '';
        questionsContainer.innerHTML = `<p class="description">${topic.description}</p>`

        // Add new questions with animation
        topic.questions.forEach((question, index) => {
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            questionCard.textContent = question;
            questionCard.style.animationDelay = `${index * 0.1}s`;

            questionsContainer.appendChild(questionCard);
        });

        title.textContent = topic.name;
        price.innerHTML = `&euro; ${topic.price}.00`;
    }

    function toggleDropdown() {
        dropdownOptions.classList.toggle('open');
        chevron.classList.toggle('open');
    }

    function closeDropdown() {
        dropdownOptions.classList.remove('open');
        chevron.classList.remove('open');
    }

    dropdownHeader.addEventListener('click', toggleDropdown);

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownHeader.contains(e.target) && !dropdownOptions.contains(e.target)) {
            closeDropdown();
        }
    });

    populateDropdown();
}
);
