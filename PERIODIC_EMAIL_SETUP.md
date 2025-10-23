# Periodic Email System Documentation

This document provides an overview of the periodic email system, how to monitor it, and how to make future changes.

## How it Works

The periodic email system is built on Netlify's scheduled functions and Firebase's Firestore database. It's designed to send two types of emails:

1.  **Waitlist Follow-up:** Sent 24 hours after a user joins the waitlist.
2.  **Monthly Newsletter:** Sent on the first day of each month to all newsletter subscribers.

### Firestore Collections

*   **`waitlist`:** Stores the email addresses and sign-up timestamps of users who join the waitlist.
*   **`newsletter`:** Stores the email addresses and subscription timestamps of users who subscribe to the newsletter.

### Netlify Functions

*   **`scheduled-emails.js`:** This function runs once a day. It checks the `waitlist` and `newsletter` collections in Firestore and sends emails to users who are due to receive them.
*   **`unsubscribe.js`:** This function handles unsubscribe requests. It's called when a user clicks the unsubscribe link in the newsletter email, and it removes them from the `newsletter` collection.
*   **`send-email.js`:** This is the universal email sender function that's used by the client-side JavaScript to send transactional emails.

## Monitoring the System

You can monitor the periodic email system by checking the Netlify Function logs. To do this, go to your Netlify dashboard, navigate to the "Functions" tab, and select the `scheduled-emails` function. Here, you'll see a log of all the function's invocations, including any errors that may have occurred.

You can also monitor the Firestore collections directly to see who is on the waitlist and who is subscribed to the newsletter.

## Making Future Changes

### Modifying Email Templates

The email templates are embedded directly in the `send-email.js` and `scheduled-emails.js` Netlify Functions. To modify a template, you'll need to edit the HTML in the `templates` object in the corresponding file.

### Changing the Email Schedule

The email schedule is defined in the `netlify.toml` file. The `scheduled-emails` function is currently set to run once a day (`@daily`). You can change this to any valid cron expression. For more information on cron expressions, see the [Netlify documentation](https://docs.netlify.com/functions/scheduled-functions/).

### Environment Variables

The periodic email system uses the following environment variables:

*   `BREVO_API_KEY`: Your Brevo API key.
*   `FIREBASE_PROJECT_ID`: Your Firebase project ID.
*   `FIREBASE_CLIENT_EMAIL`: Your Firebase client email.
*   `FIREBASE_PRIVATE_KEY`: Your Firebase private key.

These variables are stored in your Netlify project settings. To change them, go to your Netlify dashboard, navigate to the "Site settings" tab, and select "Build & deploy" -> "Environment".
