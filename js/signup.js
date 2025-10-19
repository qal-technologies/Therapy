import { signup, login, handleAuthStateChange, logout, updateUserProfile } from './auth.js';
import { createUserProfile } from './database.js';
import handleAlert, { getOS, handleRedirect, translateElementFragment } from './general.js';

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
            <input type="email" id="login-email" required autocapitalize="off" autocorrect="off" autocomplete="email" inputmode="email"/>
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
            <button id="login-button" type="submit" disabled>
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
          <input type="email" id="reg-email" required autocapitalize="off" autocorrect="off" autocomplete="email" inputmode="email"/>
          <p class="email-error password-error" id="email-error" style="display:none; margin-top:6px;"></p>
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
           <p class="password-error" id="password-error1"></p>
        </div>

        <div class="form-group">
          <label for="confirm-reg-password">Confirm Password *</label>
          <div class="password-wrapper">
            <input type="password" id="confirm-reg-password" required />
            <button type="button" class="toggle-password" data-target="confirm-reg-password">
              <i class="bi bi-eye"></i>
            </button>
          </div>
          <p class="password-error" id="password-error2"></p>
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
            <button title="Register Account" id="register-button" type="submit" disabled>
              <p class="text">REGISTER</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>`
};


export function disableAllInputs(status) {
  const all = document.querySelectorAll('input');
  all.forEach(input => input.disabled = status);
}


window.addEventListener('load', async () => {
  const DOM = {
    tabs: () => document.querySelectorAll('.tab'),
    formSection: () => document.querySelector('.form-section'),
  };

  const state = {
    currentForm: 'register',
  };

  function validateEmailValue(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email.trim());
  }

  function handlePasswordAndViews() {
    const btns = document.querySelectorAll(".toggle-password");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const inputId = btn.getAttribute("data-target");
        const input = document.getElementById(inputId);
        const icon = btn.querySelector("i");
        if (!input) return;
        if (input.type === "password") {
          input.type = "text";
          icon?.classList.remove("bi-eye");
          icon?.classList.add("bi-eye-slash");
        } else {
          input.type = "password";
          icon?.classList.remove("bi-eye-slash");
          icon?.classList.add("bi-eye");
        }
      });
    });

    const regPassword = document.getElementById("reg-password");
    const confirmPassword = document.getElementById("confirm-reg-password");
    const errorMsg = document.getElementById("password-error2");
    const errorMsg2 = document.getElementById("password-error1");

    if (regPassword && confirmPassword) {
      const validatePasswords = () => {
        const pwd = regPassword.value.trim();
        const confirm = confirmPassword.value.trim();

        if (errorMsg2.classList.contains("active") && pwd.length >= 3) {
          errorMsg2.textContent = "";
          regPassword.style.borderColor = "var(--accent)";
          errorMsg2.classList.remove("active");
        }

        regPassword.addEventListener("blur", () => {
          const pwd = regPassword.value.trim();

          if (pwd.length > 0 && pwd.length <= 5) {
            errorMsg2.textContent = "Password must be more than 5 characters long";
            regPassword.style.borderColor = "red";
            errorMsg2.classList.add("active");
          } else {
            if (errorMsg2) {
              errorMsg2.textContent = "";
              regPassword.style.borderColor = "var(--accent)";
              errorMsg2.classList.remove("active");
            }
          }
        });

        if (confirm.length > 3) {
          if (pwd !== confirm) {
            errorMsg.textContent = "Passwords do not match";
            confirmPassword.style.borderColor = "red";
            errorMsg.classList.add("active");
          } else {
            errorMsg.textContent = "";
            confirmPassword.style.borderColor = "var(--accent)";
            errorMsg.classList.remove("active");
          }
        } else {
          errorMsg.textContent = "";
          confirmPassword.style.borderColor = "var(--accent)";
          errorMsg.classList.remove("active");
        }
        updateFormState();
      };

      confirmPassword.addEventListener("input", validatePasswords);
      regPassword.addEventListener("input", validatePasswords);
    }
  }

  function setupEventListeners() {
    const tabs = DOM.tabs();
    if (tabs) {
      tabs.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
      });
    }
  }

  function handleStroll() {
    const inputs = document.querySelectorAll(".form-group input");
    if (inputs && inputs[0]) {
      inputs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      inputs[0].focus();
    }
  }

  function updateFormUI() {
    const container = DOM.formSection();
    if (!container) return;
    document.activeElement?.blur();

    container.innerHTML = state.currentForm === 'login' ? TEMPLATE.login : TEMPLATE.register;
    attachFormListeners();
    handleStroll();
    handlePasswordAndViews();
    updateFormState();
  }

  function updateFormState() {
    if (state.currentForm === 'register') {
      const requiredIds = ['reg-email', 'reg-firstname', 'reg-lastname', 'reg-country', 'reg-password', 'confirm-reg-password'];
      const allFilled = requiredIds.every(id => {
        const el = document.getElementById(id);
        return el && el.value.trim() !== '';
      });

      const regEmail = document.getElementById('reg-email');
      const emailValid = regEmail ? validateEmailValue(regEmail.value) : false;

      const regPassword = document.getElementById('reg-password');
      const confirmPassword = document.getElementById('confirm-reg-password');

      const passwordsMatch = regPassword && confirmPassword ? (regPassword.value.trim() === confirmPassword.value.trim() && regPassword.value.trim().length >= 3) : false;

      const accept = document.getElementById('accept');
      const accepted = accept ? accept.checked : false;

      const registerButton = document.getElementById('register-button');
      if (registerButton) registerButton.disabled = !(allFilled && passwordsMatch && emailValid && accepted);
    } else {
      const loginEmail = document.getElementById('login-email');
      const loginPassword = document.getElementById('login-password');
      const loginButton = document.getElementById('login-button');

      const ok = loginEmail && loginPassword && loginEmail.value.trim() !== "" && loginPassword.value.trim() !== "";
      if (loginButton) loginButton.disabled = !ok;
    }
  }

  function attachFormListeners() {
    if (state.currentForm === 'register') {
      const registerForm = document.getElementById('register-form-element');
      const registerButton = document.getElementById('register-button');
      const acceptCheckbox = document.getElementById('accept');

      if (registerForm) {
        registerForm.addEventListener('submit', handleConfirm);
      }

      if (acceptCheckbox) {
        acceptCheckbox.addEventListener('change', updateFormState);
      }

      const inputs = registerForm ? registerForm.querySelectorAll('input') : [];
      inputs.forEach(inp => {
        inp.addEventListener('input', updateFormState);
      });

      const regEmail = document.getElementById('reg-email');
      const emailError = document.getElementById('email-error');
      if (regEmail) {
        regEmail.addEventListener('blur', () => {
          const val = regEmail.value.trim();
          if (val === "") {
            emailError.textContent = "Email is required";
            emailError.style.display = 'block';
          } else if (!validateEmailValue(val)) {
            emailError.textContent = "Please enter a valid email address";
            emailError.style.display = 'block';
          } else {
            emailError.textContent = "";
            emailError.style.display = 'none';
          }
          updateFormState();
        });

        regEmail.addEventListener('input', () => {
          if (emailError && emailError.style.display === 'block') {
            const val = regEmail.value.trim();
            if (validateEmailValue(val)) {
              emailError.textContent = "";
              emailError.style.display = 'none';
            }
          }
          updateFormState();
        });
      }

      if (registerButton) {
        registerButton.addEventListener('click', (ev) => {
          if (registerButton.disabled) {
            ev.preventDefault();
            showRegisterInlineErrors();
          }
        });
      }

    } else {
      const loginForm = document.getElementById('login-form-element');
      if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(inp => inp.addEventListener('input', updateFormState));
      }
    }
  }

  function showRegisterInlineErrors() {
    const missing = [];
    const requiredIds = [
      { id: 'reg-email', label: 'Email' },
      { id: 'reg-firstname', label: 'First Name' },
      { id: 'reg-lastname', label: 'Last Name' },
      { id: 'reg-country', label: 'Country' },
      { id: 'reg-password', label: 'Password' },
      { id: 'confirm-reg-password', label: 'Confirm Password' }
    ];

    requiredIds.forEach(r => {
      const el = document.getElementById(r.id);
      if (!el || el.value.trim() === '') missing.push(r.label);
    });

    const regEmail = document.getElementById('reg-email');
    const emailError = document.getElementById('email-error');
    if (regEmail && !validateEmailValue(regEmail.value)) {
      emailError.textContent = "Please enter a valid email address";
      emailError.style.display = 'block';
      if (!missing.includes('Email')) missing.push('Email');
    }

    const regPassword = document.getElementById('reg-password');
    const confirmPassword = document.getElementById('confirm-reg-password');
    const passwordError = document.getElementById('password-error2');
    if (regPassword && confirmPassword && regPassword.value.trim() !== confirmPassword.value.trim()) {
      passwordError.textContent = "Passwords do not match";
      passwordError.classList.add('active');
      if (!missing.includes('Password')) missing.push('Password');
    }

    const accept = document.getElementById('accept');
    if (accept && !accept.checked) {
      missing.push('Accept Terms');
    }

    if (missing.length) {
      handleAlert(`<p>Please fix the following before proceeding: <br/><b>${missing.join(', ')}</b></p>`, 'blur', true, '<i class="bi bi-exclamation-circle-fill text-danger fs-2"></i> <br/> Invalid Details', true, [
        { text: "Ok", onClick: "closeAlert" }
      ]);
    }
  }

  function handleVerifyEmail(e) {
    const email = document.getElementById('reg-email')?.value;
    const emailInput = document.getElementById('reg-email');

    const verifyInput = document.getElementById('email-otp');

    const randomCodes = ["109283", "308492", "083472", "942937", "542456", "783483", "903459", "213421", "462325", "038349"];
    const otpCode = randomCodes[Math.floor(Math.random() * randomCodes.length)];
    sessionStorage.setItem("verification-otp-pp", JSON.stringify(otpCode));

    const check = () => {
      const verifyInput = document.getElementById('email-otp');
      const errorDiv = document.querySelector(".alert-message .alert-error");
      const value = verifyInput?.value.trim();
      const gottenCode = JSON.parse(sessionStorage.getItem("verification-otp-pp"));

      if (!value || value === "") {
        if (errorDiv) {
          errorDiv.innerHTML = "Input can't be empty!";
          errorDiv.style.display = "flex";
        }
        verifyInput?.focus();
        return false;
      }

       if (value.length<=5) {
        if (errorDiv) {
          errorDiv.innerHTML = "Your verification code should be up to 6. Please check your email or input a valid code.";
          errorDiv.style.display = "flex";
        }
        verifyInput?.focus();
        return false;
      }

      const match = randomCodes.find(code => code === value);

      if (value === gottenCode || match) {
        handleAlert(`<p>Your email <b>(${email})</b> has been verified successfully.</p>`, "blur", true, "<i class='bi bi-check-circle-fill text-success fs-2'></i> <br/> Email Verified", true, [{
          text: "Continue", onClick: async () => {
            try {
              handleAlert(`<p>You can't create a new account now. Upgrade your authentication plan to Essential or Professional.</p>`, "blur", true, "<i class='bi bi-x-circle-fill text-danger fs-2'></i> <br/> Error", true, [{ text: "Try Again", onClick: "closeAlert" }]);
            } catch (error) {
              disableAllInputs(false);
            }
          }, loading: true,
        }]);
        return true;
      } else {
        if (errorDiv) {
          errorDiv.innerHTML = "The code you entered is invalid or expired. Please check your email and try again.";
          errorDiv.style.display = "flex";
          verifyInput ? verifyInput.value = "" : "";
          verifyInput?.focus();
        }
        return false;
      }
    }

    const onResend = async () => {
      const newOtp = randomCodes[Math.floor(Math.random() * randomCodes.length)];
      sessionStorage.setItem("verification-otp-pp", JSON.stringify(newOtp));
      console.log(newOtp);
      verifyInput ? verifyInput.value = "" : "";
      verifyInput?.focus();
      // await sendOTPToEmail(email, newOtp);
      return true;
    };

    handleAlert(
      `<p>We've sent a code to your email: <b>${email}</b>. Please check your inbox. If you don't see it, check your spam/junk folder or search for '<b>Charlotte Casiraghi</b>'.</p>`,
      "blur",
      true,
      "Verify Email",
      true,
      [
        {
          text: "Change Email",
          onClick: () => {
            disableAllInputs(false);
            emailInput?.focus();
            return "closeAlert";
          },
          type: "secondary"
        },
        {
          text: "Verify",
          onClick: () => check(),
          loading: true
        }
      ],
      {
        timer: {
          duration: 60,
          onResend
        },
        input: {
          id: "email-otp",
          type: "tel",
          maxlength: 6,
          placeholder: "Enter your verification code",
          required: true,
          maxLength: 6,
        }
      },
      "row",
      () => { },
    );

    setTimeout(() => {
      const verifyInput = document.getElementById('email-otp');
      const errorDiv = document.querySelector(".alert-message .alert-error");
      verifyInput?.addEventListener("input", (ev) => {
        if (errorDiv && ev.target.value.trim() !== "") {
          errorDiv.innerHTML = "";
          errorDiv.style.display = "none";
        }
      });
    }, 50);
  }

  function handleConfirm(e) {
    e.preventDefault();
    disableAllInputs(true);
    updateFormState();

    const registerButton = document.getElementById('register-button');
    if (state.currentForm === 'register' && registerButton && registerButton.disabled) {
      showRegisterInlineErrors();
      return;
    }

    handleAlert("Please review your details carefully. This information will be used for bookings and payments.", "blur", true, "🔐 <br/> Details Confirmation", true, [
      {
        text: "Check Details", onClick: () => {
          disableAllInputs(false);

          const email = document.getElementById('reg-email')
          email?.focus();
          return "closeAlert";
        }, type: "secondary"
      },
      { text: "Proceed", onClick: () => handleVerifyEmail(e), loading: true }
    ]);
  }

  async function handleRegistration() {

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

    disableAllInputs(true);
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

await updateUserProfile(user, {
        displayName: firstName,
      });

      handleAlert("Registration successful! You'll be redirected shortly to continue your journey.", "blur", true, "<i class='bi bi-check-circle-fill fs-2 text-success'></i> <br/> Registration Successful", true, [{ text: "Continue", onClick: () => handleRedirect("", "backwards") }])

    } catch (error) {
      const errorMessage = error.message.split('(').pop().split(')')[0].replace('auth/', '');
      handleAlert(`Registration failed: ${errorMessage}`, "toast");

      if (errorMessage.includes("email-already-in-use")) {
        handleAlert(`The email you entered is already associated with an account. Please log in or use a different email to register.`, "blur", true, "<i class='bi bi-exclamation-triangle text-danger fs-2'></i> <br/> Registration Failed", true, [{ text: "Login", onClick: () => handleRedirect("/html/regs/Signup.html?type=login") }, {
          text: "Try Again", onClick: () => {
            document.getElementById('reg-email')?.focus();
            return "closeAlert";
          }, type: "secondary"
        }]);
      }
    } finally {
      disableAllInputs(false);
    }
  }


  async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const button = e.currentTarget?.querySelector ? e.currentTarget.querySelector('button[type="submit"]') : document.getElementById('login-button');
    const btn = button || document.getElementById('login-button');

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
    }

    disableAllInputs(true);
    try {
      await login(email, password);

      handleAlert("Welcome back! You'll be redirected shortly to continue your journey.", "blur", true, `${getOS() == "iOS" ? `<i class="bi bi-check2-circle text-success fs-2"></i>` : `<i class='bi bi-check-circle-fill text-success fs-2'></i>`} <br/> Login Successful`, true, [{ text: "Continue", onClick: () => handleRedirect("", "backwards") }]);
    } catch (error) {
      const errorMessage = error.message.split('(').pop().split(')')[0].replace('auth/', '');

      if (errorMessage.includes("network-request-failed")) {
        handleAlert("Network error. Please check your internet connection and try again.", "blur", true, `${getOS() == "iOS" ? `<i class="bi bi-cloud-slash text-danger fs-2"></i>` : `<i class='bi bi-wifi-off text-danger fs-2'></i>`} <br/> Network Error`, true, [{ text: "Try Again", onClick: "closeAlert" }]);
      } else {
        handleAlert(`The email or password you entered is incorrect. <br/> Please check your details and try again.`, "blur", true, "<i class='bi bi-exclamation-triangle text-danger fs-2'></i> <br/> Login Failed", true, [{ text: "Forgot Password", onClick: () => handleRedirect("/html/regs/Forget.html") }, {
          text: "Try Again", onClick: () => {
            document.getElementById('login-email')?.focus();
            return "closeAlert";

          }
          , type: "secondary"
        }]);
      }

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<p class="text">LOGIN</p>`;

        translateElementFragment(btn, navigator.languages[0].split("-")[0]);
      }

      console.error("The error is: ", errorMessage);
    } finally {
      disableAllInputs(false);
    }
  }

  async function handleCheck() {
    handleAuthStateChange((user) => {
      if (user) {
        handleAlert("Please log out or go back and continue your journey in healing.", "blur", true, "<i class='bi bi-exclamation-triangle text-warning fs-2'></i> <br/> You are logged in", true, [{
          text: "LOGOUT", onClick: async () => {
            try {
              await logout();
              handleAlert("Please log in again if you'd like to continue.", "blur", true, `${getOS() === "iOS" ? `<i class="bi bi-exclamation-circle text-danger fs-2"></i>` : `<i class='bi bi-exclamation-triangle text-danger fs-2'></i>`} <br/> You have been logged out.`, true, [{ text: "OK", onClick: () => handleRedirect("/html/main/Home.html") }]);
            } catch (error) {
              handleAlert(`Failed to log out, because: ${error}.`, "toast");

              setTimeout(() => {
                handleRedirect("", "backwards");
                return "closeAlert";
              }, 1500);
            }
          }, loading: true,
        }, { text: "Go Back", onClick: () => handleRedirect("", "backwards"), type: "secondary" }]);
      }
    })
  }

  async function init() {
    await handleCheck();

    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get("type");
    if (formType) {
      state.currentForm = formType.toLowerCase();
      const tabs = DOM.tabs();
      tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.form == formType) {
          tab.classList.add('active')
        };
      });
    }

    setupEventListeners();
    updateFormUI();
    updateFormState();
  }

  function handleTabClick(e) {
    const tab = e.currentTarget;
    const formToShow = tab.dataset.form;
    if (!formToShow || tab.classList.contains('active') || formToShow === state.currentForm) return;

    const activeTab = document.querySelector('.tab.active');
    if (activeTab) activeTab.classList.remove('active');
    tab.classList.add('active');
    state.currentForm = formToShow;

    console.log(formToShow);
    updateFormUI();
  }

  await init();
});
