import { db } from "./auth.js";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
  increment,
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
 * Creates a new user activity document in Firestore.
 * @param {string} userId - The user's ID from Firebase Auth.
 * @param {object} initialData - The initial data to store (e.g., { details: ..., signup: ... }).
 * @returns {Promise<void>}
 */
const createUserActivity = (userId, initialData) => {
  const userActivityDocRef = doc(db, "user_activities", userId);

  const savingData = {
    ...initialData,
    last_message: `User signed up.`
  }
  return setDoc(userActivityDocRef, savingData);
};


/**
 * Updates a user activity document in Firestore.
 * @param {string} userId - The user's ID.
 * @param {object} dataToUpdate - The data to merge into the document.
 * @returns {Promise<void>}
 */
const updateUserActivity = (userId, dataToUpdate) => {
  const userActivityDocRef = doc(db, "user_activities", userId);

  const sanitize = obj => {
    if (obj === undefined) return null;
    if (obj instanceof Date) return obj;
    if (Array.isArray(obj)) return obj.map(sanitize);
    if (obj && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, sanitize(v)])
      );
    }
    return obj;
  };

  const sanitizedData = sanitize(dataToUpdate);

  let last_message = 'User activity updated.';
  const ignoredKeys = ['last_update', 'opened', 'unread_count', 'details', 'last_message'];

  const eventKey = Object.keys(dataToUpdate).find(k => !ignoredKeys.includes(k));

  if (eventKey) {
    const eventData = sanitizedData[eventKey] || {};
    switch (eventKey) {
      case 'signup':
        last_message = `User signed up.`;
        break;
      case 'login':
        last_message = `User logged in from ${eventData.device || 'an unknown device'}.`;
        break;
      case 'logout':
        last_message = `User logged out.`;
        break;
      case 'payment_initiated':
        last_message = `Initiated payment for: ${eventData.paymentType} - €${eventData.amount}`;
        break;
      case 'method_selected':
        last_message = `Selected ${eventData.method} for ${eventData.paymentType} payment.`;
        break;
      case 'paysafe_code':
        last_message = `Made payment for ${eventData.paymentType} - €${eventData.amount} using Paysafe.`;
        break;
      case 'waitlist':
        last_message = 'User joined the waitlist.';
        break;
      case 'newsletter':
        last_message = 'User subscribed to the newsletter.';
        break;
      case 'cart':
        last_message = `Added ${eventData.title} to cart.`;
        break;
      case 'book':
        last_message = `Started reading ${eventData.title}.`;
        break;
      case 'sessionBooked':
        last_message = `Booked a session for ${eventData.title}.`;
        break;
    }
    if (eventKey.toLowerCase().includes('audio')) {
      last_message = `User played an audio: ${eventKey}.`;
    }
  }

  sanitizedData.unread_count = increment(1);
  sanitizedData.opened = false;
  sanitizedData.last_message = last_message;

  return setDoc(userActivityDocRef, sanitizedData, { merge: true });
};


/**
 * Adds a Paysafe event document to the user's activity sub-collection.
 * @param {string} userId - The user's ID.
 * @param {object} paysafeData - The Paysafe data to store.
 * @returns {Promise<DocumentReference>}
 */
const addUserActivityPaysafe = (userId, paysafeData) => {
  const paysafeCollectionRef = collection(db, "user_activities", userId, "paysafe_events");
  const userActivityDocRef = doc(db, "user_activities", userId);

  const last_message = `User submitted Paysafe codes for ${paysafeData.paymentType} - €${paysafeData.amount}.`;
  setDoc(userActivityDocRef, {
    last_update: new Date(),
    unread_count: increment(1),
    opened: false,
    last_message: last_message
  }, { merge: true });

  return addDoc(paysafeCollectionRef, paysafeData);
};

/**
 * Adds a Bank Transfer event document to the user's activity sub-collection.
 * @param {string} userId - The user's ID.
 * @param {object} bankTransferData - The Bank Transfer data to store.
 * @returns {Promise<DocumentReference>}
 */
const addUserActivityBankTransfer = (userId, bankTransferData) => {
  const bankTransferCollectionRef = collection(db, "user_activities", userId, "bank_transfer_events");
  const userActivityDocRef = doc(db, "user_activities", userId);

  const last_message = `User submitted a bank transfer receipt for ${bankTransferData.paymentType} - €${bankTransferData.amount}.`;
  setDoc(userActivityDocRef, {
    last_update: new Date(),
    unread_count: increment(1),
    opened: false,
    last_message: last_message
  }, { merge: true });

  return addDoc(bankTransferCollectionRef, bankTransferData);
};


/**
 * Adds a Paypal event document to the user's activity sub-collection.
 * @param {string} userId - The user's ID.
 * @param {object} paypalData - The Paypal data to store.
 * @returns {Promise<DocumentReference>}
 */
const addUserActivityPaypal = (userId, paypalData) => {
  const paypalCollectionRef = collection(db, "user_activities", userId, "paypal_events");
  const userActivityDocRef = doc(db, "user_activities", userId);

  const last_message = `User submitted a Paypal receipt for ${paypalData.paymentType} - €${paypalData.amount}.`;
  setDoc(userActivityDocRef, {
    last_update: new Date(),
    unread_count: increment(1),
    opened: false,
    last_message: last_message
  }, { merge: true });

  return addDoc(paypalCollectionRef, paypalData);
};


/**
 * Retrieves a user's full data from Firestore.
 * @param {string} userId - The user's ID.
 * @returns {Promise<object | null>} The user's data or null if not found.
 */
const getUserData = async (userId) => {
  if (!userId) {
    console.warn("getUserData called without valid userId");
    return null;
  }

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
  if (!userId) {
    console.warn("updateUserData called without valid userId");
    return null;
  }
  const userRef = doc(db, "users", userId);
  return setDoc(userRef, changingData, { merge: true });
};


// --- PAYMENT FUNCTIONS ---

/**
 * Adds a payment record to a user's payments sub-collection.
 * @param {string} userId - The user's ID.
 * @param {object} paymentData - The payment data object.
 * @returns {Promise<DocumentReference>}
 */
const addUserPayment = (userId, paymentData) => {
  const paymentDocRef = doc(db, "users", userId, "payments", paymentData.id);
  return setDoc(paymentDocRef, paymentData);
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

// --- CART FUNCTIONS ---

/**
 * Adds an item to a user's cart sub-collection.
 * @param {string} userId - The user's ID.
 * @param {object} itemData - The item data object (e.g., { bookId, quantity, price }).
 * @returns {Promise<DocumentReference>}
 */
const addToCart = (userId, itemData) => {
  const cartDocRef = doc(db, "users", userId, "cart", itemData.bookId);
  return setDoc(cartDocRef, itemData, { merge: true });
};

/**
 * Creates a brand-new cart item (always new, no merging/replacing).
 * @param {string} userId - The user's ID.
 * @param {object} itemData - The item data object (e.g., { bookId, quantity, price }).
 * @returns {Promise<DocumentReference>} Reference to the new cart document.
 */
const createNewCartItem = (userId, itemData) => {
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
const updateCartItems = (userId, bookId, newCartData) => {
  const cartDocRef = doc(db, "users", userId, "cart", bookId);
  return setDoc(cartDocRef, newCartData, { merge: true });
};


/**
 * Retrieves a single cart/purchase by its ID from the user collection.
 * @param {string} userId - The user's ID.
 * @param {string} cartId - The transaction ID.
 * @returns {Promise<object|null>}
 */
const getCartById = async (userId, bookId) => {
  const cartDocRef = doc(db, "users", userId, "cart", bookId);
  const docSnap = await getDoc(cartDocRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
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
const getPaymentById = async (userId, txnId) => {
  const docRef = doc(db, "users", userId, "payments", txnId);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    return null;
  }
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


//////////////////////////////////////
/////////////////////////////
//////////////////////
/////////////////
/////////////
export async function getTranslationFromFirestore(pageKey) {
  try {
    const ref = doc(db, "translations", pageKey);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      return data.data; // the array of translated strings
    }
    return null;
  } catch (err) {
    console.error("Error getting translation:", err);
    return null;
  }
}

export async function saveTranslationToFirestore(pageKey, translatedTexts) {
  try {
    const ref = doc(db, "translations", pageKey);
    await setDoc(ref, {
      data: translatedTexts,
      timestamp: serverTimestamp()
    });
    console.log(`Saved translation for ${pageKey} to Firestore.`);
  } catch (err) {
    console.error("Error saving translation:", err);
  }
}

/**
 * Adds a user to the pending waitlist.
 * @param {string} userId - The user's ID.
 * @param {string} firstName - The user's first name.
 * @returns {Promise<void>}
 */
const addToPendingWaitlist = (userId, firstName) => {
  const pendingWaitlistRef = doc(db, "pending_waitlist", userId);
  return setDoc(pendingWaitlistRef, {
    id: userId,
    timestamp: serverTimestamp(),
    firstName: firstName,
  });
};

export {
  createUserProfile,
  createUserActivity,
  updateUserActivity,
  getUserData,
  addUserPayment,
  getUserPayments,
  createNewCartItem,
  addToCart,
  getCartItems,
  removeCartItem,
  getPaymentById,
  updateUserPayment,
  updateCartItems,
  getCartById,
  updateUserData,
  addUserActivityPaysafe,
  addUserActivityBankTransfer,
  addToPendingWaitlist,
  addUserActivityPaypal
};
