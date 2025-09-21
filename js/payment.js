import handleAlert from './general.js';
import { handleAuthStateChange, getCurrentUser } from './auth.js';
import {
    getPaymentById,
    addUserPayment,
    createGlobalTransaction,
    updateUserPayment,
    updateGlobalTransaction,
} from './database.js';

// --- (All other functions like formatDateTime, createCreditCardSections, etc. are assumed to be here) ---

// ==================== STATE MANAGEMENT ====================
function initializeState() {
    return {
        userId: null,
        methodSelected: false,
        selectedCurrency: "",
        currencyCode: "EUR",
        selectedMethod: "",
        converted: "",
        amount: 0,
        txn: "",
        charge: 0.00,
        toPay: 0,
        creditCardIndex: 1,
        creditCardSections: null,
        creditCardError: false,
        creditCardTrials: 0,
        safeIndex: 0,
        paySafeSections: null,
        codes: [],
        pending: false,
        pendingIndex: "",
        paymentStatus: null,
        statusMessage: "",
        initialContent: "",
        details: "",
        country: "",
        paymentType: "Session",
    };
}

// ==================== PAYMENT POLLING & RESULTS (Now using Firestore) ====================
const delay = ms => new Promise(res => setTimeout(res, ms));

async function pollForPaymentStatus(txnId) {
    while (true) {
        const payment = await getPaymentById(txnId);
        if (payment && payment.status !== null) {
            return payment;
        }
        await delay(2000);
    }
}

async function savePaymentData(state) {
    const userId = state.userId;
    if (!state.txn || !userId) {
        console.warn("Missing transaction ID or User ID. Skipping save.");
        return;
    }

    const paymentData = {
        id: state.txn,
        paymentType: state.paymentType,
        title: state.details.title || "N/A",
        price: state.amount,
        currency: state.currencyCode,
        converted: state.toPay,
        method: state.selectedMethod,
        status: state.paymentStatus,
        statusName: state.paymentStatus === true ? "Completed" : (state.paymentStatus === false ? "Failed" : "Pending"),
        statusMessage: state.statusMessage || "",
        description: state.details.description || "",
        date: new Date(),
        userId: userId,
    };

    try {
        const existingPayment = await getPaymentById(state.txn);
        if (existingPayment) {
            await updateUserPayment(userId, existingPayment.docId, paymentData); // Assumes docId is available
            await updateGlobalTransaction(existingPayment.docId, paymentData);
        } else {
            const docRef = await addUserPayment(userId, paymentData);
            paymentData.docId = docRef.id; // Save the document ID
            await createGlobalTransaction(paymentData);
        }
    } catch (error) {
        console.error("Error saving payment data:", error);
        handleAlert("Could not save payment data.", "toast");
    }
}

function triggerVibration() {
    if (navigator.vibrate) {
        navigator.vibrate(800);
    }
}

async function showResultScreen(state, elements, finalPayment) {
    state.paymentStatus = finalPayment.status;
    state.statusMessage = finalPayment.statusMessage;

    await savePaymentData(state);

    const { status, statusMessage } = finalPayment;
    const isSuccess = status === true;
    const resultTitle = isSuccess ? 'Payment Successful' : 'Payment Failed';
    // ... render logic ...
    elements.paymentDisplay.innerHTML = `<div>${resultTitle}</div>`; // Simplified for brevity
    triggerVibration();
    // ... event listeners for continue/try again ...
}


// ==================== INITIALIZATION ====================
async function initializePaymentFlow(e, state, elements) {
    document.getElementById("payment-details").classList.add("active");
    const urlParams = new URLSearchParams(window.location.search);
    const paymentType = urlParams.get("type");
    const paymentDetails = urlParams.get("details");

    if (!paymentType || !paymentDetails) {
        handleAlert("No Payment Details Gotten, Please Book a Session!", "toast");
        window.location.replace("/html/main/Session.html");
        return;
    }

    try {
        const details = JSON.parse(decodeURIComponent(paymentDetails));
        state.details = details;
        state.paymentType = paymentType.charAt(0).toUpperCase() + paymentType.slice(1);
        state.txn = details.transactionId || details.id;

        const existingPayment = await getPaymentById(state.txn);

        if (existingPayment) {
            handleAlert(`Checking status for payment ID: ${state.txn}...`, "toast");
            const finalPayment = await pollForPaymentStatus(state.txn);
            await showResultScreen(state, elements, finalPayment);
            return;
        }

        let amount;
        if (paymentType === "book") {
            const price = parseFloat(details.price);
            const quantity = parseFloat(details.quantity);
            amount = (price * quantity).toFixed(2);
        } else {
            amount = parseFloat(details.price).toFixed(2);
        }
        state.amount = amount;
        state.details.price = amount;

        await savePaymentData(state); // Initial save with status: null

        addDetails(state.details, elements);
        const userCountryData = await getUserCountryInfo();
        state.currencyCode = userCountryData?.currencyCode || "EUR";
        state.selectedCurrency = userCountryData?.country || "Euro";
        state.country = userCountryData?.country || "France";

    } catch (error) {
        console.error("Error initializing payment flow:", error);
        window.location.replace("/html/main/Session.html");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    handleAuthStateChange(async (user) => {
        if (user) {
            const state = initializeState();
            state.userId = user.uid;
            const elements = cacheDOMElements();
            setupEventListeners(state, elements);
            state.initialContent = elements.paymentDisplay.innerHTML;
            await initializePaymentFlow(null, state, elements);
        } else {
            handleAlert("You must be logged in to make a payment.", "toast");
            setTimeout(() => {
                window.location.replace("/html/regs/Signup.html");
            }, 1500);
        }
    });
});

// Dummy functions for completeness, assuming they exist elsewhere
function addDetails(details, elements) { console.log("addDetails called"); }
function getUserCountryInfo() { return { currencyCode: 'USD', country: 'USA' }; }
function setupEventListeners(state, elements) { console.log("setupEventListeners called"); }
function cacheDOMElements() { return { paymentDisplay: document.getElementById('display') }; }
// ... and so on for all other missing functions
