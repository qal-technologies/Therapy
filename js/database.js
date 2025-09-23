import { db } from "./auth.js";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// --- USER DATA FUNCTIONS ---

/**
 * Creates a new user profile document in Firestore.
 * @param {string} userId - The user's ID from Firebase Auth.
 * @param {object} userDetails - An object containing user details (e.g., { name, email }).
 * @returns {Promise<void>}
 */

const createUserProfile = (userId, userDetails) => {
  const userDocRef = doc(db, "users", userId);
  return setDoc(userDocRef, { details: userDetails });
};

/**
 * Retrieves a user's full data from Firestore.
 * @param {string} userId - The user's ID.
 * @returns {Promise<object | null>} The user's data or null if not found.
 */
const getUserData = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such user document!");
    return null;
  }
};


/**
* Updates user's information depending on the user id:
* @param {string} userId - The user's ID.
* @param {object} changingData - The object of the data to be changed!
 * @returns {Promise<object | null>} The user's changed data or null if not found.
 */
const updateUserData = (userId, changingData) => {
  const paymentDocRef = doc(db, "users", userId);
  return setDoc(paymentDocRef, changingData, { merge: true });
};


// --- PAYMENT FUNCTIONS ---

/**
 * Adds a payment record to a user's payments sub-collection.
 * @param {string} userId - The user's ID.
 * @param {object} paymentData - The payment data object.
 * @returns {Promise<DocumentReference>}
 */
const addUserPayment = (userId, paymentData) => {
  const paymentsColRef = collection(db, "users", userId, "payments");
  return addDoc(paymentsColRef, paymentData);
};

/**
 * Retrieves all payment records for a specific user.
 * @param {string} userId - The user's ID.
 * @returns {Promise<Array>} An array of payment objects.
 */
const getUserPayments = async (userId) => {
  const paymentsColRef = collection(db, "users", userId, "payments");
  const querySnapshot = await getDocs(paymentsColRef);
  const payments = [];
  querySnapshot.forEach((doc) => {
    payments.push({ id: doc.id, ...doc.data() });
  });
  return payments;
};

// --- GLOBAL TRANSACTION FUNCTIONS ---

/**
 * Adds a transaction record to the global transactions collection.
 * @param {object} transactionData - The transaction data object.
 * @returns {Promise<DocumentReference>}
 */
const createGlobalTransaction = (transactionData) => {
  const transactionsColRef = collection(db, "transactions");
  return addDoc(transactionsColRef, transactionData);
};

// --- CART FUNCTIONS ---

/**
 * Adds an item to a user's cart sub-collection.
 * @param {string} userId - The user's ID.
 * @param {object} itemData - The item data object (e.g., { bookId, quantity, price }).
 * @returns {Promise<DocumentReference>}
 */
const addToCart = (userId, itemData) => {
  const cartColRef = collection(db, "users", userId, "cart");
  return addDoc(cartColRef, itemData);
};

/**
 * Retrieves all items from a user's cart.
 * @param {string} userId - The user's ID.
 * @returns {Promise<Array>} An array of cart item objects.
 */
const getCartItems = async (userId) => {
  const cartColRef = collection(db, "users", userId, "cart");
  const querySnapshot = await getDocs(cartColRef);
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
};

/**
*Updates the user's cart.
*@param {string} userId - The user's ID.
*@param {string} cartId - The cart ID.
* @param {object} newCartData - The new data to save.
* @returns {Promise<Array>} An array of saved cart item objects.
 */
// const updateCartItems = async (userId, newCartData) => {
//   const cartColRef = collection(db, "users", userId, "cart");
//   return setDoc(cartColRef, newCartData, { merge: true });
// }
const updateCartItems = (userId, cartId, newCartData) => {
  const cartDocRef = collection(db, "users", userId, "cart", cartId);
  return setDoc(cartDocRef, newCartData, { merge: true });
};


/**
 * Retrieves a single cart/purchase by its ID from the user collection.
 * @param {string} userId - The user's ID.
 * @param {string} cartId - The transaction ID.
 * @returns {Promise<object|null>}
 */
const getCartById = async (userId, cartId) => {
  const q = query(collection(db, "users", userId, "cart"), where("bookId", "==", cartId));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
  return null;
};

/**
 * Removes an item from a user's cart sub-collection.
 * @param {string} userId - The user's ID.
 * @param {string} itemId - The ID of the cart item to remove.
 * @returns {Promise<void>}
 */
const removeCartItem = (userId, itemId) => {
  const itemDocRef = doc(db, "users", userId, "cart", itemId);
  return deleteDoc(itemDocRef);
};

/**
 * Retrieves a single payment/transaction by its ID from the global transactions collection.
 * @param {string} txnId - The transaction ID.
 * @returns {Promise<object|null>}
 */
const getPaymentById = async (txnId) => {
  const q = query(collection(db, "transactions"), where("id", "==", txnId));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
  return null;
};

/**
 * Updates a payment record in a user's payments sub-collection.
 * @param {string} userId - The user's ID.
 * @param {string} paymentId - The document ID of the payment to update.
 * @param {object} paymentData - The data to update.
 * @returns {Promise<void>}
 */
const updateUserPayment = (userId, paymentId, paymentData) => {
  const paymentDocRef = doc(db, "users", userId, "payments", paymentId);
  return setDoc(paymentDocRef, paymentData, { merge: true });
};

/**
 * Updates a transaction record in the global transactions collection.
 * @param {string} transactionId - The document ID of the transaction to update.
 * @param {object} transactionData - The data to update.
 * @returns {Promise<void>}
 */
const updateGlobalTransaction = (transactionId, transactionData) => {
  const transactionDocRef = doc(db, "transactions", transactionId);
  return setDoc(transactionDocRef, transactionData, { merge: true });
};

export {
  createUserProfile,
  getUserData,
  addUserPayment,
  getUserPayments,
  createGlobalTransaction,
  addToCart,
  getCartItems,
  removeCartItem,
  getPaymentById,
  updateUserPayment,
  updateCartItems,
  getCartById,
  updateUserData,
  updateGlobalTransaction,
};
