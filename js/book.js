alert("before");
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


const DOM = {
  dropdownHeader: document.getElementById('dropdownHeader'),
  dropdownOptions: document.getElementById('dropdownOptions'),
  questionsContainer: document.getElementById('questionsContainer'),
  chevron: document.querySelector('.chevron'),
  price: document.querySelector("#session-plan .price"),
  title: document.querySelector("#session-plan .title"),
  extra: document.querySelector("#session-plan .name .extra"),
  description: document.querySelector('#session-plan .intro'),
  formGroup: document.querySelector(".form-group#session"),
  ticket: document.querySelector(".form-section .form-container .lower h1.ticket"),
registerForm: document.querySelector(".form-container#register-form"),
};


const state = {
  selectedTopic: null,
  currentQuestion: 0,
  answers: {},
};

function setupEventListeners() {

  // Dropdown functionality
  DOM.dropdownHeader.addEventListener('click', toggleDropdown);
  document.addEventListener('click', handleDocumentClick);
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
alert("after");
  init();
});

function init() {
  setupEventListeners();
  populateDropdown();
  initDropdown(DOM.registerForm);
}