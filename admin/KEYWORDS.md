# Admin Panel Action Keywords & Setup Guide

This document outlines the keywords that the admin panel's action processor recognizes in admin replies. It also provides a guide on how to set up the necessary Firebase credentials for the backend to function correctly.

## 1. How to Use Action Keywords

To process a payment or other user action, you must reply to the specific message bubble in the chat view. You can do this by either swiping the message to the left or clicking the reply icon that appears when you hover over a message. Once a message is selected, type one of the following keyword commands in the input box and press the send button.

### Payment Actions

-   **`approved`**: Marks a payment as successful.
    -   **Example:** `approved`
    -   **Action:** Sets the payment `status` to `true` in Firestore.
    -   **Email:** Sends the "Payment Approved" email to the user.

-   **`declined` / `failed`**: Marks a payment as failed. You **must** provide a reason after the keyword.
    -   **Example:** `declined: The payment was flagged by our system.`
    -   **Example:** `failed - insufficient funds`
    -   **Action:** Sets the payment `status` to `false` in Firestore. The entire admin reply (including the keyword and the reason) is saved as the `statusMessage`.
    -   **Email:** Sends the "Payment Declined" email to the user.

### General Guidelines

-   Keywords are case-insensitive.
-   If a reply does not contain any of the recognized keywords, no action will be taken. The reply will be stored as a simple comment for your records.
-   You **must** reply to a message to send a command. The send button will be disabled until a message is selected for reply.

---

## 2. Firebase Service Account Setup

For the admin panel's backend functions to securely communicate with your Firebase project, they need a "Service Account Key." This is a special credential that grants server-side administrative access.

### How to Get Your Service Account Key

1.  **Go to your Firebase Project:** Open the [Firebase Console](https://console.firebase.google.com/) and select your project.
2.  **Navigate to Project Settings:** Click the gear icon next to "Project Overview" in the top-left, and select "Project settings."
3.  **Go to the Service Accounts Tab:** In the Project Settings page, click on the "Service accounts" tab.
4.  **Generate a New Private Key:** Click the "Generate new private key" button. A confirmation dialog will appear.
5.  **Confirm and Download:** Click "Generate key" in the dialog. A JSON file containing your service account key will be downloaded to your computer.

### How to Add the Key to Netlify

The content of this JSON file must be stored as a single environment variable in your Netlify project.

1.  **Copy the JSON Content:** Open the downloaded JSON file in a text editor and copy its entire content.
2.  **Go to Netlify Site Settings:** In your Netlify dashboard, navigate to the site you are deploying.
3.  **Go to Environment Variables:** Go to "Site settings" > "Build & deploy" > "Environment."
4.  **Create a New Variable:**
    *   Click "Edit variables."
    *   For the **Key**, enter exactly: `FIREBASE_SERVICE_ACCOUNT`
    *   For the **Value**, paste the entire JSON content you copied from the file.
5.  **Save:** Click "Save."

Netlify will now securely inject this key into the backend functions when they run, allowing them to access Firestore.

---

## 3. Service Account vs. Client-Side SDK (For Backend Functions)

You asked about the difference between using the Service Account (the method described above) and using the client-side Firebase configuration files directly in the Netlify functions. Here’s the breakdown:

-   **Service Account (`firebase-admin` SDK):**
    -   **What it is:** A special, privileged account designed for server-to-server communication.
    -   **Security:** **Highly secure.** It operates outside of Firestore's security rules, granting it full administrative access. This is ideal for an admin panel because you want the admin to be able to read/write any user's data, regardless of security rules that might restrict a normal user's access.
    -   **Usage:** This is the **recommended and correct** way to build backend services that interact with Firebase.

-   **Client-Side SDK (in a Netlify Function):**
    -   **What it is:** Using the same Firebase configuration and authentication methods that you use in the frontend browser code, but on the backend.
    -   **Security:** **Highly insecure and strongly discouraged.** When you use the client-side SDK, it is still subject to your Firestore security rules. To make an admin panel work this way, you would have to create very loose or insecure rules (e.g., "allow anyone to read/write all user data"). This would expose all your users' data to potential abuse if someone discovered your Firebase project credentials.
    -   **Usage:** This should **only** be used as a last resort for debugging and should never be used in a production environment for administrative tasks.

**Conclusion:** We are proceeding with the Service Account method as it is the industry-standard, secure way to build this feature. The fallback of using client-side SDK files in the backend is not a viable or secure long-term solution.
