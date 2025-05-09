
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

  register: ` <div class="form-container active" id="register-form">
          <div class="register-upper upper">
            <div class="header register-header">
              <h1>Register</h1>
              <p>Welcome! complete the form below to reserve your spot with Charlotte Casiraghi. Together you'll unlock
                inner peace,
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
                <label for="Country">Country*</label>
                <input type="text" id="Country" required />
              </div>

              <div class="form-group">
                <label for="reg-password">Password *</label>
                <input type="password" id="reg-password" required />
              </div>


                <div class="form-group">
                  <label for="adminCode">Admin Code (Optional)</label>
                  <input type="text" id="adminCode" />
                </div>
                <div id="checkout">
                  <button disabled=true>
                    <p class="text">PROCEED</p>
                    <p class="svg">>></p>
                  </button>
                </div>
                </div>
                <div class="bottom privacy">
                  <div class="privacy-policy">
                    <p class="text">By registering for this healing session, you are stating that you
                      have read and agreed to the privacy policy.</p>
                    <a href="/html/main/Privacy.html" class="view"> View privacy policy </a>
                  </div>
                </div>
            </div>
          </div>
        </div>`
}

const DOM = {
  tabs: document.querySelectorAll('.tab'),
  formSection: document.querySelector('.form-section'),
  registerForm: document.getElementById('register-form')
};

const state = {
  currentForm: 'register',
  originalRegisterFormHTML: ``,
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

function reAttach() {
  const registerForm = document.getElementById('register-form');
  Object.assign(DOM, {
    tabs: document.querySelectorAll('.tab'),
    formSection: document.querySelector('.form-section'),
    dropdownHeader: registerForm ? registerForm.querySelector('#dropdownHeader') : null,
    dropdownOptions: registerForm ? registerForm.querySelector('#dropdownOptions') : null,
    questionsContainer: registerForm ? registerForm.querySelector('#questionsContainer') : null,
    chevron: registerForm ? registerForm.querySelector('.chevron') : null,
    price: registerForm ? registerForm.querySelector("#session-plan .price") : null,
    title: registerForm ? registerForm.querySelector("#session-plan .title") : null,
    extra: registerForm ? registerForm.querySelector("#session-plan .name .extra") : null,
    description: registerForm ? registerForm.querySelector('#session-plan .intro') : null,
    formGroup: registerForm ? registerForm.querySelector(".form-group#session") : null,
    ticket: registerForm ? registerForm.querySelector(".lower h1.ticket") : null,
    registerForm: registerForm
  });
}

// Handle tab clicks
function handleTabClick(e) {
  const tab = e.currentTarget;
  const formToShow = tab.dataset.form;
  
  if (tab.classList.contains('active') || formToShow === state.currentForm) return;
  
  // Update UI
  document.querySelector('.tab.active').classList.remove('active');
  tab.classList.add('active');
  
  state.selectedTopic = null;
  state.answers = {};
  switchForm(formToShow);
}


// Switch between login and register forms
function switchForm(formType) {
  // Remove current form
  const currentForm = document.querySelector(`.form-container`);
  if (currentForm) {
    currentForm.remove();
  }

  // Insert new form
  if (formType === 'login') {
    DOM.formSection.insertAdjacentHTML('beforeend', TEMPLATE.login);
    const loginForm = document.getElementById('login-form');
    loginForm.classList.add('active');
  } else {
    DOM.formSection.insertAdjacentHTML('beforeend', TEMPLATE.register);
    const registerForm = document.getElementById('register-form');
    registerForm.classList.add('active');
    initDropdown(registerForm);
  }

  // Update state and reattach all DOM references
  state.currentForm = formType;
  reAttach();
}

function initDropdown(formElement) {
  if (!formElement) return;

  DOM.dropdownHeader = formElement.querySelector('#dropdownHeader');
  DOM.dropdownOptions = formElement.querySelector('#dropdownOptions');
  DOM.questionsContainer = formElement.querySelector('#questionsContainer');
  DOM.chevron = formElement.querySelector('.chevron');
  DOM.formGroup = formElement.querySelector(".form-group#session");
  DOM.ticket = formElement.querySelector(".lower h1.ticket");
  

  if (DOM.dropdownHeader) {
    DOM.dropdownHeader.addEventListener('click', toggleDropdown);
  }

  populateDropdown();
  if (state.selectedTopic) selectTopic(state.selectedTopic);
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
  

const button = document.querySelector('div#checkout button');
button.disabled=true;

  state.selectedTopic = topicKey;
  
  // Update UI
  if (DOM.dropdownHeader) {
    DOM.dropdownHeader.querySelector('span').textContent = topic.name;
  }

  if (DOM.formGroup) {
     DOM.formGroup.style.display = "none";
  }

  if (DOM.ticket) {
    DOM.ticket.style.display = "none";
  }

  // Update questions
  renderQuestions(topic);

  closeDropdown();
}

// Render questions for selected topic
function renderQuestions(topic) {
  DOM.questionsContainer.innerHTML = '';
  showQuestion(topic.questions[0], 0);
}

function showQuestion(question, index) {

  const questionDiv = document.createElement('div');
  questionDiv.className = `question-card ${question.type === 'input' ? 'input' : ''}`;
  questionDiv.innerHTML = `
    <p>${question.question}</p>
    <div class="answer-options">
      ${question.type === 'button' 
        ? question.options.map(opt => 
          `<button class="answer-btn" data-value="${opt}">${opt}</button>`
        ).join('') 
        : `<input type="${question.inputType}" placeholder="Your answer"/>
           <button class="next">SUBMIT</button>`}
    </div>
  `;

  // Fade in animation
  questionDiv.style.animation = 'fadeInUp 0.5s forwards';
  DOM.questionsContainer.appendChild(questionDiv);

  // Handle answers
  const handleAnswer = () => {
    questionDiv.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => questionDiv.remove(), 500);
    nextQuestion(index + 1);
  };

  questionDiv.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.classList.add('selected');
      saveAnswer(question.question, e.target.dataset.value);
      handleAnswer();
    });
  });

  if (question.type === 'input') {
    const input = questionDiv.querySelector('input');
    const next = questionDiv.querySelector('.next');
    
    next.addEventListener('click', () => {
      saveAnswer(question.question, input.value);
      handleAnswer();
    });
  }
}

function nextQuestion(index) {

const topic = state.selectedTopic;
  const questions = TOPICS_DATA[topic].questions;

  if (index < questions.length) {
    setTimeout(() => showQuestion(questions[index], index), 300);
  } else {
    showCompletion();
  }
}

function showCompletion() {

  const session = state.selectedTopic;
  const topic = TOPICS_DATA[session];

  const completionDiv = document.createElement('div');
  completionDiv.className = 'completion-screen fadeInUp';
  completionDiv.innerHTML = `
    <div class="animation-container">
      <div class="checkmark">✓</div>
      <h2>You're All Set!</h2>
<h4>Proceed to continue your healing journey with <span class="highlight"> Charlotte Casiraghi</span></h4>
      <div class="celebrate">🎉✨</div>
    </div>
  `;

  // Update session info
  updateSessionInfo(topic);

  const button = document.querySelector('div#checkout button');
button.disabled=false;

  DOM.questionsContainer.innerHTML = '';
  DOM.questionsContainer.appendChild(completionDiv);
  console.log(state.answers)
}


function saveAnswer(question, answer) {
  state.answers[question] = answer;
}

// Update session information display
function updateSessionInfo(topic) {

  if (DOM.formGroup) DOM.formGroup.style.display = "block";

  if (DOM.ticket) DOM.ticket.style.display = "block";


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
  reAttach();
  init();
});