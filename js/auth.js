import { sendEmail } from "../emailHelper.js";
import { db, app } from "./firebase-config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// Initialize Firebase
const auth = getAuth(app);

// --- AUTHENTICATION FUNCTIONS ---

/**
 * Signs up a new user with email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential>}
 */
const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Logs in a user with email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential>}
 */
const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Logs out the current user.
 * @returns {Promise<void>}
 */
const logout = () => {
  return signOut(auth);
};



/**
 * Sends a password reset email to the user
 * @param {string} email - The email of the user to reset password for
 * @param {object} actionCodeSettings - The action code settings for the email
 * @returns {Promise<boolean>} - true if sent successfully, false if failed
 */
async function resetPassword(email) {
  if (!email) throw new Error("Email is required for password reset.");

  try {

    const link = await sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}/html/regs/reset-password`,
      handleCodeInApp: true
    });

    return await sendEmail(email, "reset", {
      name: 'there',
      url: `${link}`,
    });
  } catch (error) {
    console.error("Password reset error:", error);
    throw error;
  }
}

/**
 * Listens for changes in the user's authentication state.
 * @param {function} callback - The function to call when the auth state changes.
 * @returns {Unsubscribe} A function to unsubscribe the listener.
 */
const handleAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Gets the current logged-in user.
 * @returns {User | null}
 */
const getCurrentUser = () => {
  return auth.currentUser;
};

const updateUserProfile = (user, profile) => {
  return updateProfile(user, profile);
};

const verifyResetCode = (code) => {
  return verifyPasswordResetCode(auth, code);
};

const confirmNewPassword = (code, newPassword) => {
  return confirmPasswordReset(auth, code, newPassword);
};

//I changed something here pasqal, check it out!
export {
  auth,
  db,
  signup,
  login,
  logout,
  handleAuthStateChange,
  getCurrentUser,
  resetPassword,
  updateUserProfile,
  verifyResetCode,
  confirmNewPassword,
};
