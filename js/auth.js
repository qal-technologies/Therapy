import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
 * @returns {Promise<boolean>} - true if sent successfully, false if failed
 */
async function resetPassword(email) {
  if (!email) throw new Error("Email is required for password reset.");

  try {
    await sendPasswordResetEmail(auth, email);
    return true;
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
};
