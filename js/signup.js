import { signup, login } from './auth.js';
import { createUserProfile } from './database.js';
import handleAlert from './general.js';

const TEMPLATE = {
  login: `
   <div class="form-container" id="login-form">
        <div class="header">
          <h1>Login</h1>
          <p>You've already taken the first step. Log in to continue healing...</p>
        </div>
        <form class="bottom">
          <div class="form-group">
            <label for="login-email">Email *</label>
            <input type="email" id="login-email" required />
          </div>
          <div class="form-group">
            <label for="login-password">Password *</label>
            <input type="password" id="login-password" required />
          </div>
          <div class="form-group forgot">
            <p class="forgot-password">Forgot Password?</p>
          </div>
          <div id="checkout">
            <button id="login-button">
              <p class="text">LOGIN</p>
            </button>
          </div>
        </form>
      </div>
  `,
  register: `
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

            <form class="bottom">
              <div class="form-group">
                <label for="reg-email">Email *</label>
                <input type="email" id="reg-email" required />
              </div>

              <div class="form-group">
                <label for="reg-firstname">First Name *</label>
                <input type="text" id="reg-firstname" required />
              </div>

              <div class="form-group">
                <label for="reg-lastname">Last Name *</label>
                <input type="text" id="reg-lastname" required />
              </div>

              <div class="form-group">
                <label for="reg-country">Country*</label>
                <input type="text" id="reg-country" required />
              </div>

              <div class="form-group">
                <label for="reg-password">Password *</label>
                <input type="password" id="reg-password" required />
              </div>

              <div class="form-group">
                <label for="confirm-reg-password">Confirm Password *</label>
                <input type="password" id="confirm-reg-password" required />
              </div>


              <div class="bottom privacy">
                <div class="privacy-policy">
                  <input type="checkbox" name="accept" id="accept" checked>
                  <p class="text">
                    I agree to the <a href="/html/main/Privacy.html" class="view">Terms of Service</a> and <a
                      href="/html/main/Privacy.html" class="view">Privacy Policy</a>
                  </p>
                </div>
                <div id="checkout">
                  <button title="Register Account" disabled>
                    <p class="text">REGISTER</p>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>`
};

const DOM = {
  tabs: document.querySelectorAll('.tab'),
  formSection: document.querySelector('.form-section'),
  registerForm: document.getElementById('register-form')
};

const state = {
  currentForm: 'register',
};

function setupEventListeners() {
  DOM.tabs.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });
}

function handleTabClick(e) {
  const tab = e.currentTarget;
  const formToShow = tab.dataset.form;

  if (tab.classList.contains('active') || formToShow === state.currentForm) return;

  document.querySelector('.tab.active').classList.remove('active');
  tab.classList.add('active');
  state.currentForm = formToShow;
  updateFormUI();
}

function updateFormUI() {
  DOM.formSection.innerHTML = state.currentForm === 'login' ? TEMPLATE.login : TEMPLATE.register;
  attachFormListeners();
}


function attachFormListeners() {
  if (state.currentForm === 'register') {
    const registerButton = document.getElementById('register-button');
    const acceptCheckbox = document.getElementById('accept');
    acceptCheckbox.addEventListener('change', () => {
      registerButton.disabled = !acceptCheckbox.checked;
    });
    registerButton.addEventListener('click', handleRegistration);
  } else {
    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', handleLogin);
  }
}


async function handleRegistration(e) {
  e.preventDefault();
  const firstName = document.getElementById('reg-firstname').value;
  const lastName = document.getElementById('reg-lastname').value;
  const email = document.getElementById('reg-email').value;
  const country = document.getElementById('reg-country').value;
  const password = document.getElementById('reg-password').value;
  const confirmPassword = document.getElementById('confirm-reg-password').value;

  if (password !== confirmPassword) {
    handleAlert("Passwords do not match.", "toast");
    return;
  }

  const button = e.currentTarget;
  button.disabled = true;
  button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;

  try {
    const userCredential = await signup(email, password);
    const user = userCredential.user;
    const waitlist = false;

    await createUserProfile(user.uid, {
      firstName,
      lastName,
      email,
      country,
      waitlist
    });

    handleAlert("Registration successful! Redirecting...", "toast");
    setTimeout(() => {
      window.location.href = "/html/main/User.html";
    }, 1500);

  } catch (error) {
    const errorMessage = error.message.split('(').pop().split(')')[0].replace('auth/', '');
    handleAlert(`Registration failed: ${errorMessage}`, "toast");
    button.disabled = false;
    button.innerHTML = `<p class="text">REGISTER</p>`;
  }
}


async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const button = e.currentTarget;
  button.disabled = true;
  button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;

  try {
    await login(email, password);
    handleAlert("Login successful! Redirecting...", "toast");
    setTimeout(() => {
      window.location.href = "/html/main/User.html";
    }, 1500);
  } catch (error) {
    const errorMessage = error.message.split('(').pop().split(')')[0].replace('auth/', '');
    handleAlert(`Login failed: ${errorMessage}`, "toast");
    button.disabled = false;
    button.innerHTML = `<p class="text">LOGIN</p>`;
  }
}

function init() {
  setupEventListeners();
  updateFormUI();
}

window.addEventListener('DOMContentLoaded', init);
