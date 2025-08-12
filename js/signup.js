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
       <button disabled>
        <p class="text">LOGIN</p>
      </button>
    </div>
        </div>
      </div>
  `,

  register: `<!-- Register Form -->
          <div class="form-container active" id="register-form">
            <div class="register-upper upper">
              <div class="header register-header">
                <h1>Register</h1>
 <p>
                  Welcome! complete the form below to begin
                </p>
             <p>
                  Discover insights and tools to navigate a world on edge. Learn to become a better version of yourself
                </p>

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
                    <label for="confirm-reg-password">Confirm Password *</label>
                    <input type="password" id="confirm-reg-password" required />
                  </div>


                  <!-- <div class="form-group">
                                                                                                                                                                                      <label for="adminCode">Admin Code (Optional)</label>
                                                                                                                                                                                      <input type="text" id="adminCode" />
                  </div> -->


      <div class="bottom privacy">
        <div class="privacy-policy">
        <input type="radio" name="accept" id="accept">
          <p class="text">
            I agree to the <a href="/html/main/Privacy.html" class="view">Terms of Service</a> and <a href="/html/main/Privacy.html"
              class="view">Privacy Policy</a>
          </p>
        </div>
        <div id="checkout">
          <button disabled>
            <p class="text">PROCEED</p>
          </button>
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
}

function setupEventListeners() {
  // Tab switching
  DOM.tabs.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });

}

function reAttach() {
  const registerForm = document.getElementById('register-form');
  Object.assign(DOM, {
    tabs: document.querySelectorAll('.tab'),
    formSection: document.querySelector('.form-section'),
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
    
  }

  // Update state and reattach all DOM references
  state.currentForm = formType;
  reAttach();
}


window.addEventListener('DOMContentLoaded', () => {
  const acceptRadio = document.getElementById('accept');
  const registerButton = document.querySelector('#checkout button');


  reAttach();
  init();

  registerButton.disabled = true;

  acceptRadio.addEventListener('change', () => {
    registerButton.disabled = !acceptRadio.checked;
  });
});