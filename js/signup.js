// Constants
const TOPICS_DATA = {
  virtual: {
    name: "VIRTUAL SESSION",
    price: "800",
    description: "Let's make your screen disappear",
    info: "You don't need to travel to be heard. This session brings you and me face-to-face-virtually, but intimately. I will be with you, fully present, to listen, reflect, and help you begin to heal.",
    questions: [
      "Do you feel most emotionally open in the morning, afternoon, or evening?",
      "Would you like Charlotte to begin with a calming 90-second grounding exercise just for you?",
      "Are there any life themes you feel emotionally 'stuck' in right now that you'd like to gently explore?"
    ]
  },
  inPerson: {
    name: "IN-PERSON SESSION",
    extra: "(EUROPE/MONACO)",
    price: "1600",
    description: "Let's prepare your sanctuary",
    info: "There are things that only silence and physical presence can heal. Sit with me, in person, in a space that holds truth, tenderness, and transformation.",
    questions: [
      "Do you have any dietary preferences or allergies we should consider while preparing your welcome refreshment?",
      "Would prefer Charlotte to gently guide the session, or would you like space to speak freely from the start?",
      "Is there a personal object (journal, photo, or keepsake) you'd like to bring into the session as part of your healing space?"
    ]
  },
  community: {
    name: "SPONSORED SUPPORT SESSION",
    price: "550",
    description: "Your story matters, Let's begin ",
    info: "Healing should not be a luxury. Full session, full attention, at a reduced rate for those in need. Your story matters just as much.",
    questions: [
      "Would you feel safer starting the session in silence, or would you prefer Charlotte to welcome you with a gentle question?",
      "Is there one thing you've been carrying alone that you wish someone would simply hear - without trying to fix?",
      "Would it help if we checked in with you a few days after the session to support your reflection?"
    ]
  },
  inner: {
    name: "INNER CIRCLE EXPERIENCE",
    description: "A sanctuary made just for your soul",
    info: "For those who seek not just a session, but a sanctuary.",
    price: "6,850",
    questions: [
      "If you could name this season of your life in one word, what would it be - and why?",
      "Would you like your healing plan to focus on emotional wounds, spiritual clarity, or self-love and transformation?",
      "What would it mean to you if Charlotte's letter spoke directly to your soul's current journey?"
    ]
  }
};

// DOM Elements
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

// State Management
const state = {
  currentForm: 'register',
  selectedTopic: null
};

// Initialize the application
function init() {
  setupEventListeners();
  populateDropdown();
}

// Set up all event listeners
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
  const currentForm = document.querySelector(`.form-container#${state.currentForm}-form`);
  if (currentForm) {
    currentForm.remove();
  }
  
  // Add new form
  if (formType === 'login') {
    DOM.formSection.insertAdjacentHTML('beforeend', `
      <div class="form-container" id="login-form">
        <div class="header">
          <h1>Login</h1>
          <p>You've already taken the first step. Log in to continue healing, evolving, and becoming the version of yourself you were meant to be.</p>
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
        </div>
      </div>
    `);
  } else {
    // Recreate the register form with all its content
    DOM.formSection.insertAdjacentHTML('beforeend', `
      <div class="form-container active" id="register-form">
        ${DOM.registerForm.innerHTML}
      </div>
    `);
    
    // Reinitialize dropdown functionality for the new form
    const newRegisterForm = document.getElementById('register-form');
    if (newRegisterForm) {
      // Reassign DOM elements that might have been lost
      DOM.dropdownHeader = newRegisterForm.querySelector('#dropdownHeader');
      DOM.dropdownOptions = newRegisterForm.querySelector('#dropdownOptions');
      DOM.questionsContainer = newRegisterForm.querySelector('#questionsContainer');
      DOM.chevron = newRegisterForm.querySelector('.chevron');
      DOM.formGroup = newRegisterForm.querySelector(".form-group#session");
      DOM.ticket = newRegisterForm.querySelector(".lower h1.ticket");
      
      // Reattach event listeners
      DOM.dropdownHeader.addEventListener('click', toggleDropdown);
      
      // Repopulate dropdown if needed
      populateDropdown();
      
      // Reselect topic if one was selected
      if (state.selectedTopic) {
        selectTopic(state.selectedTopic);
      }
    }
  }
  
  state.currentForm = formType;
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
  if (!DOM.questionsContainer) return;
  
  DOM.questionsContainer.innerHTML = `<p class="description">${topic.description}</p>`;
  
  topic.questions.forEach((question, index) => {
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card';
    questionCard.textContent = question;
    questionCard.style.animationDelay = `${index * 0.1}s`;
    DOM.questionsContainer.appendChild(questionCard);
  });
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

// Toggle dropdown visibility
function toggleDropdown() {
  if (!DOM.dropdownOptions || !DOM.chevron) return;
  
  DOM.dropdownOptions.classList.toggle('open');
  DOM.chevron.classList.toggle('open');
}

// Close dropdown
function closeDropdown() {
  if (!DOM.dropdownOptions || !DOM.chevron) return;
  
  DOM.dropdownOptions.classList.remove('open');
  DOM.chevron.classList.remove('open');
}

// Handle clicks outside dropdown
function handleDocumentClick(e) {
  if (!DOM.dropdownHeader || !DOM.dropdownOptions) return;
  
  if (!DOM.dropdownHeader.contains(e.target) {
    closeDropdown();
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);