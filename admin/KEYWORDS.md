# Admin Panel Action Keywords

This document outlines the keywords that the admin panel's action processor recognizes in admin replies. These keywords are used to trigger specific backend actions, such as updating a payment status in Firestore and sending a notification email to the user.

## Payment Actions

- **`approved`**: Marks a payment as successful.
  - **Action:** Sets the payment `status` to `true` in Firestore.
  - **Email:** Sends the "Payment Approved" email to the user.

- **`declined` / `failed`**: Marks a payment as failed.
  - **Action:** Sets the payment `status` to `false` in Firestore. The entire admin reply is saved as the `statusMessage`.
  - **Email:** Sends the "Payment Declined" email to the user.

## General Guidelines

- Keywords are case-insensitive.
- If a reply does not contain any of the recognized keywords, no action will be taken. The reply will be treated as a simple comment and will not be saved.
- For "declined" or "failed" actions, the entire text of the admin's reply will be saved as the reason for the failure in the `statusMessage` field in Firestore. This allows for providing specific details to the user (e.g., "declined: insufficient funds").
