import { signup, login, handleAuthStateChange } from './auth.js';
import { createUserProfile } from './database.js';
import handleAlert, { handleRedirect } from './general.js';

const TEMPLATE = {
  login: `
   <div class="form-container rightIntro active" id="login-form">
        <div class="header">
          <h1>Login</h1>
          <p>You've already taken the first step. Log in to continue healing...</p>
        </div>

        <form class="bottom" id="login-form-element">
          <div class="form-group">
            <label for="login-email">Email *</label>
            <input type="email" id="login-email" required />
          </div>
          <div class="form-group">
            <label for="login-password">Password *</label>
            <div class="password-wrapper">
              <input type="password" id="login-password" required />
              <button type="button" class="toggle-password" data-target="login-password">
                <i class="bi bi-eye"></i>
              </button>
            </div>
          </div>
          <div class="form-group forgot">
            <a class="forgot-password" href="/html/regs/Forget.html">Forgot Password?</a>
          </div>
          <div id="checkout">
            <button id="login-button" disabled>
              <p class="text">LOGIN</p>
            </button>
          </div>
        </form>
      </div>
  `,
  register: `
  <div class="form-container leftIntro active" id="register-form">
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

            <form class="bottom" id="register-form-element">
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
          <div class="password-wrapper">
            <input type="password" id="reg-password" required />
            <button type="button" class="toggle-password" data-target="reg-password">
              <i class="bi bi-eye"></i>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="confirm-reg-password">Confirm Password *</label>
          <div class="password-wrapper">
            <input type="password" id="confirm-reg-password" required />
            <button type="button" class="toggle-password" data-target="confirm-reg-password">
              <i class="bi bi-eye"></i>
            </button>
          </div>
          <p class="password-error" id="password-error"></p>
        </div>

        <div class="bottom privacy">
          <div class="privacy-policy">
            <input type="checkbox" name="accept" id="accept" checked>
            <p class="text">
              I agree to the <a href="/html/main/Privacy.html" class="view">Terms of Service</a> and
              <a href="/html/main/Privacy.html" class="view">Privacy Policy</a>
            </p>
          </div>
          <div id="checkout">
            <button title="Register Account" id="register-button" disabled>
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
  registerForm: document.getElementById('register-form'),
};

const state = {
  currentForm: 'register',
};

function handlePasswordAndViews() {
  const regPassword = document.getElementById("reg-password");
  const confirmPassword = document.getElementById("confirm-reg-password");
  const errorMsg = document.getElementById("password-error");
  const registerButton = document.getElementById("register-button");

  if (document.querySelectorAll(".toggle-password")) {
    const btns = document.querySelectorAll(".toggle-password");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const inputId = btn.getAttribute("data-target");
        const input = document.getElementById(inputId);
        const icon = btn.querySelector("i");

        if (input.type === "password") {
          input.type = "text";
          icon.classList.remove("bi-eye");
          icon.classList.add("bi-eye-slash");
        } else {
          input.type = "password";
          icon.classList.remove("bi-eye-slash");
          icon.classList.add("bi-eye");
        }
      });
    });
  }

  if (regPassword && confirmPassword) {
    confirmPassword.addEventListener("input", () => {
      const pwd = regPassword.value.trim();
      const confirm = confirmPassword.value.trim();
      if (confirm.length >= 3) {
        if (pwd !== confirm) {
          errorMsg.textContent = "Passwords do not match";
          confirmPassword.style.borderColor = "red";
          errorMsg.classList.add("active");
          registerButton.disabled = true;
        } else {
          errorMsg.textContent = "";
          confirmPassword.style.borderColor = "var(--accent)";
          errorMsg.classList.remove("active");
          registerButton.disabled = false;
        }
      } else {
        errorMsg.textContent = "";
        confirmPassword.style.borderColor = "var(--accent)";
        errorMsg.classList.remove("active");
        registerButton.disabled = true;
      }
    });

    regPassword.addEventListener("input", () => {
      if (confirmPassword.value.length >= 3) {
        confirmPassword.dispatchEvent(new Event("input"));
      }
    });
  }
}

function handleInputs() {
  const inputs = document.querySelectorAll(".form-group input");
  const proceedButton = document.querySelector("div#checkout button");
  const regPassword = document.getElementById("reg-password");
  const confirmPassword = document.getElementById("confirm-reg-password");

  if (!inputs || !proceedButton) return;

  const check = Array.from(inputs).every(input => input.value.trim() !== "");
  const match = regPassword && confirmPassword ? regPassword.value.trim() == confirmPassword.value.trim() : check;
  proceedButton.disabled = !check || !match;

  inputs.forEach(input => {
    input.addEventListener("input", handleInputs)
  });
}

function setupEventListeners() {
  DOM.tabs.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });
  handleInputs();
}

function handleTabClick(e) {
  const tab = e.currentTarget;
  const formToShow = tab.dataset.form;

  if (tab.classList.contains('active') || formToShow === state.currentForm) return;

  document.querySelector('.tab.active').classList.remove('active');
  tab.classList.add('active');
  state.currentForm = formToShow;

  updateFormUI();
  handleInputs();
}

function updateFormUI() {
  DOM.formSection.innerHTML = state.currentForm === 'login' ? TEMPLATE.login : TEMPLATE.register;
  attachFormListeners();
  handlePasswordAndViews();
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

    handleAlert("Registration successful! You'll be redirected shortly to continue your journey.", "blur", true, "<i class='bi bi-check-circle-fill fs-2'></i> <br/> Registration Successful", true, [{ text: "Continue", onClick: () => handleRedirect("", "backwards") }])

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
    handleAlert("Welcome back! You'll be redirected shortly to continue your journey.", "blur", true, "<i class='bi bi-check-circle-fill text-success fs-2'></i> <br/> Login Successful", true, [{ text: "Continue", onClick: () => handleRedirect("", "backwards") }]);
  } catch (error) {
    const errorMessage = error.message.split('(').pop().split(')')[0].replace('auth/', '');
    handleAlert(`The email or password you entered is incorrect. <br/> Please check your details and try again.`, "blur", true, "<i class='bi bi-exclamation-triangle text-danger fs-2'></i> <br/> Login Failed", true, [{ text: "Forgot Password", onClick: () => handleRedirect("/html/regs/Forget.html") }, { text: "Try Again", onClick: "closeAlert" }]);
    button.disabled = false;
    button.innerHTML = `<p class="text">LOGIN</p>`;
    console.error("The error is: ", errorMessage);
  }
}

async function handleCheck() {
  handleAuthStateChange((user) => {
    if (user) {
      handleAlert("You are already logged in!", "blur", false, "", true, [{ text: "OK", onClick: () => handleRedirect("", "backwards") }]);
    }
  })
}

async function init() {
  await handleCheck();

  const urlParams = new URLSearchParams(window.location.search);
  const formType = urlParams.get("type");
  if (formType) {
    state.currentForm = formType.toLowerCase();
    const tabs = document.querySelectorAll(".tabs .tab");
    tabs.forEach(tab => {
      tab.classList.remove("active");
      if (tab.dataset.form == formType) {
        tab.classList.add("active")
      };
    });
  }

  setupEventListeners();
  updateFormUI();
  handleInputs();
}

window.addEventListener('DOMContentLoaded', init);
