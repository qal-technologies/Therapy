const TOPICS_DATA = {
  virtual: {
    name: "VIRTUAL SESSION",
    price: "800",
    description: "Let's make your screen disappear",
    info: "You don't need to travel to be heard. This session brings you and me face-to-face-virtually, but intimately. I will be with you, fully present, to listen, reflect, and help you begin to heal.",
    questions: [
      {
        question: "Do you feel most emotionally open in the morning, afternoon, or evening?",
        type: "input",
      },
      {
        question: "Would you like Charlotte to begin with a calming 90-second grounding exercise just for you?",
        type: "button",
        options: ["YES", "NO"]
      },
      {
        question: "Are there any life themes you feel emotionally 'stuck' in right now that you'd like to gently explore?",
        type: "input",
      }
    ]
  },
  inPerson: {
    name: "IN-PERSON SESSION",
    extra: "(EUROPE/MONACO)",
    price: "1600",
    description: "Let's prepare your sanctuary",
    info: "There are things that only silence and physical presence can heal. Sit with me, in person, in a space that holds truth, tenderness, and transformation.",
    questions: [
      {
        question: "Do you have any dietary preferences or allergies we should consider while preparing your welcome refreshment?",
        type: "input"
      },
      {
        question: "Would prefer Charlotte to gently guide the session, or would you like space to speak freely from the start?",
        type: "button",
        options: ["YES", "NO"]
      },
      {
        question: "Is there a personal object (journal, photo, or keepsake) you'd like to bring into the session as part of your healing space?",
        type: "input",
      }
    ]
  },
  community: {
    name: "SPONSORED SUPPORT SESSION",
    price: "550",
    description: "Your story matters, Let's begin ",
    info: "Healing should not be a luxury. Full session, full attention, at a reduced rate for those in need. Your story matters just as much.",
    questions: [
      {
        question: "Would you feel safer starting the session in silence, or would you prefer Charlotte to welcome you with a gentle question?",
        type: "input"
      },
      {
        question: "Is there one thing you've been carrying alone that you wish someone would simply hear - without trying to fix?",
        type: "input",
      },
      {
        question: "Would it help if we checked in with you a few days after the session to support your reflection?",
        type: "button",
        options: ["YES", "NO"]
      }
    ]
  },
  inner: {
    name: "INNER CIRCLE EXPERIENCE",
    description: "A sanctuary made just for your soul",
    info: "For those who seek not just a session, but a sanctuary.",
    price: "6,850",
    questions: [
      {
        question: "If you could name this season of your life in one word, what would it be - and why?",
        type: "input"
      },
      {
        question: "Would you like your healing plan to focus on emotional wounds, spiritual clarity, or self-love and transformation?",
        type: "input",
      },
      {
        question:
          "What would it mean to you if Charlotte's letter spoke directly to your soul's current journey?",
        type: "input",
      }
    ]
  }
};

const TEMPLATE = {
  login: `
   <div class="form-container" id="login-form">
        <div class="header">
          <h1>Login</h1>
          <p>You've already taken the first step. Log in to continue healing...</p>
        </div>
        <div class="bottom">
          <div class="form-group">
            <label for="login-email">Email *</label>
            <input type="email" id="login-email" required />
          </div>
          <div class="form-group">
            <label for="login-password">Password *</label>
            <input type="password" id="login-password" required />
          </div>

          <div id="checkout">
      <button>
        <p class="text">LOGIN</p>
        <p class="svg">>></p>
      </button>
    </div>
        </div>
      </div>
  `,

  register: `
  <div class="form-container" id="register-form">
          <div class="register-upper upper">
            <div class="header register-header">
              <h1>Register</h1>
              <p>Welcome! complete the form below to reserve your spot with Charlotte Casiraghi. Together you'll unlock inner peace,
                dissolve old patterns, and step into a more empowered radiant you.</p>
            </div>

            <div class="bottom">
              <div class="form-group">
                <label for="reg-email">Email *</label>
                <input type="email" id="reg-email" required />
              </div>

              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input type="text" id="firstName" required />
              </div>

              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input type="text" id="lastName" required />
              </div>

              <div class="form-group">
                <label for="reg-password">Password *</label>
                <input type="password" id="reg-password" required />
              </div>

              <div class="form-group dropdown-container" id="dropdown-container">
                <div class="dropdown-header" id="dropdownHeader">
                  <span>Select a Session Type</span>
                  <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <div class="dropdown-options" id="dropdownOptions"></div>
                <div class="questions-container" id="questionsContainer"></div>
              </div>
            </div>

            <div class="lower">
              <div class="header">
                <h1 class="ticket fadeIn">Ticket Information</h1>
              </div>

              <div class="bottom">
                <div class="form-group" id="session">
                  <label for="session-plan" class="moveUpNfadeIn">Event Ticket</label>
                  <div id="session-plan" class="moveUpNfadeIn">
                    <div class="upper">
                      <div class="image">
                        <img src="/src/images/logo.jpg" alt="" srcset="">
                      </div>
                      <div class="name">
                        <p class="title">Virtual Session</p>
                        <p class="extra"></p>
                      </div>
                    </div>
                    <div class="lower">
                      <p class="intro"></p>
                      <p class="price">&euro; 800.00<span class="highlight">EUR</span></p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="adminCode">Admin Code (Optional)</label>
                  <input type="text" id="adminCode" />
                </div>
<div id="checkout">
      <button>
        <p class="text">PROCEED</p>
        <p class="svg">>></p>
      </button>
    </div>
              </div>
            </div>
          </div>
        </div>
    `
}

const DOM = {
  tabs: document.querySelectorAll('.tab'),
  formSection: document.querySelector('.form-section'),
  dropdownHeader: document.getElementById('dropdownHeader'),
  dropdownOptions: document.getElementById('dropdownOptions'),
  questionsContainer: document.getElementById('questionsContainer'),
  chevron: document.querySelector('.chevron'),
  price: document.querySelector("#session-plan .price"),
  title: document.querySelector("#session-plan .title"),
  extra: document.querySelector("#session-plan .name .extra"),
  description: document.querySelector('#session-plan .intro'),
  formGroup: document.querySelector(".form-group#session"),
  ticket: document.querySelector(".form-container#register-form .lower h1.ticket"),
  registerForm: document.getElementById('register-form')
};

const state = {
  currentForm: 'register',
  selectedTopic: null,
  originalRegisterFormHTML: ``,
  currentQuestion: 0,
  answers: {},
};

function init() {
  if (DOM.registerForm) {
    state.originalRegisterFormHTML = DOM.registerForm.outerHTML;
  }
  
  setupEventListeners();
  populateDropdown();

  initDropdown(DOM.registerForm);
}

function setupEventListeners() {
  // Tab switching
  DOM.tabs.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });

  // Dropdown functionality
  DOM.dropdownHeader.addEventListener('click', toggleDropdown);
  document.addEventListener('click', handleDocumentClick);
}

// Handle tab clicks
function handleTabClick(e) {
  const tab = e.currentTarget;
  const formToShow = tab.dataset.form;
  
  if (tab.classList.contains('active') || formToShow === state.currentForm) return;
  
  // Update UI
  document.querySelector('.tab.active').classList.remove('active');
  tab.classList.add('active');
  
  // Switch forms
  switchForm(formToShow);
}

// Switch between login and register forms
function switchForm(formType) {
  // Remove current form
  const currentForm = document.querySelector(`.form-container`);
  if (currentForm) {
    currentForm.remove();
  }

  if (formType === 'login') {
    DOM.formSection.insertAdjacentHTML('beforeend', TEMPLATE.login);
    const currentForm = document.querySelector(`.form-container`);
    currentForm.classList.add('active');

    console.log('login-show');
  } else {
    DOM.formSection.insertAdjacentHTML('beforeend', TEMPLATE.register);

    const currentForm = document.querySelector(`.form-container`);
    currentForm.classList.add('active');

    console.log('register-show');
    const newForm = DOM.formSection.lastElementChild;
    initDropdown(newForm);
  }
  
  state.currentForm = formType;
}

function initDropdown(formElement) {
  DOM.dropdownHeader = formElement.querySelector('#dropdownHeader');
  DOM.dropdownOptions = formElement.querySelector('#dropdownOptions');
  DOM.questionsContainer = formElement.querySelector('#questionsContainer');
  DOM.chevron = formElement.querySelector('.chevron');
  DOM.formGroup = formElement.querySelector(".form-group#session");
  DOM.ticket = formElement.querySelector(".lower h1.ticket");
  
  // Reattach event listeners
  if (DOM.dropdownHeader) {
    DOM.dropdownHeader.addEventListener('click', toggleDropdown);
  }
  
  // Repopulate dropdown
  populateDropdown();
  
  // Reselect topic if one was selected
  if (state.selectedTopic) {
    selectTopic(state.selectedTopic);
  }
}

// Populate the session type dropdown
function populateDropdown() {
  if (!DOM.dropdownOptions) return;
  
  DOM.dropdownOptions.innerHTML = '';
  
  Object.entries(TOPICS_DATA).forEach(([key, topic]) => {
    const option = document.createElement('div');
    option.className = 'option';
    option.textContent = topic.name;
    option.dataset.value = key;
    option.addEventListener('click', () => selectTopic(key));
    DOM.dropdownOptions.appendChild(option);
  });
}

// Select a topic from the dropdown
function selectTopic(topicKey) {
  const topic = TOPICS_DATA[topicKey];
  if (!topic) return;
  
  state.selectedTopic = topicKey;
  
  // Update UI
  if (DOM.dropdownHeader) {
    DOM.dropdownHeader.querySelector('span').textContent = topic.name;
  }
  
  if (DOM.formGroup) {
    DOM.formGroup.style.display = "block";
  }
  
  if (DOM.ticket) {
    DOM.ticket.style.display = "block";
  }
  
  // Update questions
  renderQuestions(topic);
  
  // Update session info
  updateSessionInfo(topic);
  
  closeDropdown();
}

// Render questions for selected topic
function renderQuestions(topic) {
  DOM.questionsContainer.innerHTML = '';
  showQuestion(topic.questions[0], 0);
}

function showQuestion(question, index) {
  const questionDiv = document.createElement('div');
  questionDiv.className = `question-card fadeInUp`;
  questionDiv.innerHTML = `
    <p>${question.question}</p>
    <div class="answer-options">
      ${question.type === 'button' ?
      question.options.map(opt =>
        `<button class="answer-btn" data-value="${opt}">${opt}</button>`
      ).join('') :
      `<input type="${question.inputType}" placeholder="Your answer"/> <button class="next">SUBMIT</button>`
    }
    </div>
  `;

  questionDiv.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.classList.add('selected');
      saveAnswer(question.question, e.target.dataset.value);
      nextQuestion(index + 1);

      e.target.disabled = true;
    });
  });

  if (question.type === 'input') {
    const input = questionDiv.querySelector('input');
    const next = questionDiv.querySelector('.next');

    next.addEventListener('click', (e) => {
      saveAnswer(question.question, input.value);
      nextQuestion(index + 1);

      input.disabled = true;
      e.target.disabled = true;
    });
  }

  DOM.questionsContainer.appendChild(questionDiv);
}

function nextQuestion(index) {
  const topic = state.selectedTopic;
  const currentTopic = TOPICS_DATA[topic];

  if (index < currentTopic.questions.length) {
    setTimeout(() => {
      showQuestion(currentTopic.questions[index], index);
    }, 500);
  }
}

function saveAnswer(question, answer) {
  state.answers[question] = answer;
}

// Update session information display
function updateSessionInfo(topic) {
  if (DOM.title) DOM.title.textContent = topic.name;
  if (DOM.extra) {
    DOM.extra.textContent = topic.extra || '';
    DOM.extra.style.display = topic.extra ? "block" : "none";
  }
  if (DOM.description) DOM.description.textContent = topic.info;
  if (DOM.price) DOM.price.innerHTML = `&euro; ${topic.price}.00 <span class="highlight">EUR</span>`;
}

function closeDropdown() {
  if (DOM.dropdownOptions && DOM.chevron) {
    DOM.dropdownOptions.classList.remove('open');
    DOM.chevron.classList.remove('open');
  }
}

// Update the handleDocumentClick function:
function handleDocumentClick(e) {
  if (!DOM.dropdownHeader || !DOM.dropdownOptions) return;
  
  const isDropdownClick = DOM.dropdownHeader.contains(e.target) ||
    DOM.dropdownOptions.contains(e.target);
  
  if (!isDropdownClick) {
    closeDropdown();
  }
}

function toggleDropdown(e) {
  e.stopPropagation();
  if (!DOM.dropdownOptions || !DOM.chevron) return;

  const isOpen = DOM.dropdownOptions.classList.contains('open');

  // Toggle the dropdown state
  if (isOpen) {
    closeDropdown();
  } else {
    DOM.dropdownOptions.classList.add('open');
    DOM.chevron.classList.add('open');
  }
}



window.addEventListener('DOMContentLoaded', () => {
  Object.assign(DOM, {
    tabs: document.querySelectorAll('.tab'),
    formSection: document.querySelector('.form-section'),
    dropdownHeader: document.getElementById('dropdownHeader'),
    dropdownOptions: document.getElementById('dropdownOptions'),
    questionsContainer: document.getElementById('questionsContainer'),
    chevron: document.querySelector('.chevron'),
    price: document.querySelector("#session-plan .price"),
    title: document.querySelector("#session-plan .title"),
    extra: document.querySelector("#session-plan .name .extra"),
    description: document.querySelector('#session-plan .intro'),
    formGroup: document.querySelector(".form-group#session"),
    ticket: document.querySelector(".form-container#register-form .lower h1.ticket"),
    registerForm: document.getElementById('register-form')
  });
  init();
});