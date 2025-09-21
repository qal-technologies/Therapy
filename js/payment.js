import handleAlert from './general.js';
import { handleAuthStateChange, getCurrentUser } from './auth.js';
import {
    getPaymentById,
    addUserPayment,
    createGlobalTransaction,
    updateUserPayment,
    updateGlobalTransaction
} from './database.js';

// --- STATE MANAGEMENT ---
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
        paymentStatus: null,
        statusMessage: "",
        initialContent: "",
        details: "",
        country: "",
        paymentType: "Session",
    };
}

// --- DOM CACHING ---
function cacheDOMElements() {
    return {
        makePaymentBtn: document.getElementById("make-payment-btn"),
        paymentMethodOptions: document.querySelectorAll("#payment-method-section label.option-item"),
        currencyCode: document.querySelector("span.choosen-currency-code"),
        paymentDisplay: document.querySelector("section#display.parent"),
        paymentDetailsDiv: document.querySelector(".payment-summary-container#payment-details"),
    };
}

// --- EVENT LISTENERS ---
function setupEventListeners(state, elements) {
    elements.paymentMethodOptions.forEach((option) => {
        option.addEventListener("click", () => handlePaymentMethodClick(option, state, elements));
    });

    document.getElementById("proceed-button")?.addEventListener("click", (e) => handleProceedClick(e, state, elements));
    elements.makePaymentBtn?.addEventListener("click", (e) => handleMakePaymentClick(e, state, elements));
}

// --- UI & FLOW LOGIC ---

function handlePaymentMethodClick(option, state, elements) {
    const method = option.querySelector(".option-label").textContent;
    state.methodSelected = true;
    state.selectedMethod = method.toString().replace(" ", "");
    updateSelectionStyles(option, elements.paymentMethodOptions);
    checkPaymentMethodSelection(state, elements);
}

async function handleProceedClick(e, state, elements) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div> Processing...`;

    await convertCurrency(state);

    document.getElementById("payment-details")?.classList.remove("active");
    document.getElementById("payment-method-section")?.classList.add("active");
    button.disabled = false;
    button.innerHTML = "Proceed to Payment";
}

function handleMakePaymentClick(e, state, elements) {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div> Processing...`;

    setTimeout(async () => {
        document.getElementById("payment-method-section")?.classList.remove("active");
        if (state.currencyCode === "EUR") {
            state.toPay = (parseFloat(state.amount) + parseFloat(state.charge)).toFixed(2);
        }

        const method = state.selectedMethod.toLowerCase();
        if (method.includes("credit") && !method.includes("safe")) {
            handleCreditCard(state, elements);
        } else if (method.includes("safe")) {
            await handlePaySafe(state, elements);
        }
        button.disabled = false; // Re-enable after a short delay
    }, 1500);
}

function checkPaymentMethodSelection(state, elements) {
    if (state.methodSelected) {
        elements.makePaymentBtn.disabled = false;
    }
}

// --- (Other UI functions like handleCreditCard, createSafe1, etc. would be here) ---
// For brevity, I will omit the large HTML template strings, but they are assumed to be here.
function createSafe1() { return `<div>Paysafe Step 1</div>`; }
function createSafe2() { return `<div>Paysafe Step 2</div>`; }
function createSafe3() { return `<div>Paysafe Step 3</div>`; }
function handleCreditCard() { console.log("handleCreditCard called"); }
function updateSelectionStyles(selectedOption, allOptions) {
    allOptions.forEach((opt) => opt.classList.remove("selected"));
    selectedOption.classList.add("selected");
}
function backToMethod(state, elements) {
    elements.paymentDisplay.innerHTML = state.initialContent;
    document.getElementById("payment-details")?.classList.remove("active");
    document.getElementById("payment-method-section")?.classList.add("active");
}

// ==================== PAYMENT POLLING & RESULTS (Firestore) ====================
const delay = ms => new Promise(res => setTimeout(res, ms));

async function pollForPaymentStatus(txnId) {
    let payment = await getPaymentById(txnId);
    while (!payment || payment.status === null) {
        await delay(2500); // Poll every 2.5 seconds
        payment = await getPaymentById(txnId);
    }
    return payment;
}

async function savePaymentData(state) {
    const { userId, txn } = state;
    if (!txn || !userId) {
        console.warn("Missing transaction ID or User ID. Skipping save.");
        return;
    }

    const paymentData = {
        id: txn,
        paymentType: state.paymentType,
        title: state.details.title || "N/A",
        price: state.amount,
        currency: state.currencyCode,
        status: state.paymentStatus,
        statusName: state.paymentStatus === true ? "Completed" : (state.paymentStatus === false ? "Failed" : "Pending"),
        statusMessage: state.statusMessage || "",
        date: new Date(),
        userId: userId,
    };

    try {
        const existingPayment = await getPaymentById(txn);
        if (existingPayment) {
            await updateGlobalTransaction(existingPayment.docId, paymentData);
            await updateUserPayment(userId, existingPayment.docId, paymentData);
        } else {
            const globalDocRef = await createGlobalTransaction(paymentData);
            await addUserPayment(userId, globalDocRef.id, paymentData);
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

    const isSuccess = finalPayment.status === true;
    const resultTitle = isSuccess ? 'Payment Successful' : 'Payment Failed';
    const resultMessage = isSuccess ? 'Your payment is complete.' : 'Your payment failed. Please try again.';

    elements.paymentDisplay.innerHTML = `
        <div class="payment-section paysafe-section active" id="paysafe-outcome">
            <div class="outcome-section">
                <i class="${isSuccess ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'}"></i>
                <h1>${resultTitle}</h1>
                <p>${resultMessage}</p>
            </div>
            <div class="proceed-div">
                ${isSuccess ? `<a href="/html/main/User.html" class="continue-btn success">Continue</a>` : `<button class="continue-btn try-again">Try Again</button>`}
            </div>
        </div>`;

    triggerVibration();

    document.querySelector(".continue-btn.success")?.addEventListener("click", () => {
        window.location.href = "/html/main/User.html";
    });
    document.querySelector(".continue-btn.try-again")?.addEventListener("click", () => {
        backToMethod(state, elements);
    });
}

async function handlePaySafe(state, elements) {
    // This is a simplified flow for demonstration
    elements.paymentDisplay.innerHTML = `<div>Processing Paysafe...</div>`;
    await savePaymentData(state); // Initial save
    const finalPayment = await pollForPaymentStatus(state.txn);
    await showResultScreen(state, elements, finalPayment);
}

// ==================== INITIALIZATION ====================
async function initializePaymentFlow(state, elements) {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentType = urlParams.get("type");
    const paymentDetails = urlParams.get("details");

    if (!paymentType || !paymentDetails) {
        handleAlert("No Payment Details provided.", "toast");
        window.location.replace("/html/main/Session.html");
        return;
    }

    try {
        const details = JSON.parse(decodeURIComponent(paymentDetails));
        state.details = details;
        state.paymentType = paymentType;
        state.txn = details.transactionId || `TXN-${Date.now()}`;
        state.amount = details.price;

        const existingPayment = await getPaymentById(state.txn);
        if (existingPayment) {
            handleAlert("This payment is already being processed. Checking status...", "toast");
            const finalPayment = await pollForPaymentStatus(state.txn);
            await showResultScreen(state, elements, finalPayment);
            return;
        }

        elements.paymentDisplay.innerHTML = `
            <div class="payment-summary-container payment-section active" id="payment-details">
              <h2>Payment Summary</h2>
              <div id="payment-amount" class="amount">€${state.amount}</div>
              <div id="transaction-id" class="txn-id">${state.txn}</div>
              <button id="proceed-button" class="continue-btn">Proceed to Payment</button>
            </div>
            <div class="payment-section" id="payment-method-section" style="display:none;">
                <h2>Select Method</h2>
                <label class="option-item"><span class="option-label">Credit Card</span></label>
                <label class="option-item"><span class="option-label">Paysafe</span></label>
                <button id="make-payment-btn" class="continue-btn" disabled>Continue</button>
            </div>`;

        // Re-cache and re-attach listeners for the newly created elements
        const newElements = cacheDOMElements();
        setupEventListeners(state, newElements);

    } catch (error) {
        console.error("Error initializing payment flow:", error);
        handleAlert("There was an error setting up your payment.", "toast");
        window.location.replace("/html/main/Home.html");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    handleAuthStateChange(async (user) => {
        if (user) {
            const state = initializeState();
            state.userId = user.uid;
            const elements = cacheDOMElements();
            state.initialContent = elements.paymentDisplay.innerHTML;
            await initializePaymentFlow(state, elements);
        } else {
            handleAlert("You must be logged in to make a payment.", "toast");
            setTimeout(() => window.location.replace("/html/regs/Signup.html"), 1500);
        }
    });
});

async function convertCurrency(state) {
    // Dummy conversion
    state.toPay = state.amount;
    return true;
}
