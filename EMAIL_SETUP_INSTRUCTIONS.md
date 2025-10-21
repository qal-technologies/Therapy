# Email Service and Local Development Setup Guide

This guide provides instructions for setting up the necessary email services and configuring your local development environment to support the new secure email-sending functionality.

**It is crucial to follow these steps carefully to ensure that the application can send emails and that your API keys remain secure.**

---

## Part 1: Sign Up for Email Services

We will use multiple free email services to handle different types of emails, staying within generous free-tier limits. You will need to sign up for each of the following services.

### A. Resend (for Email Verification)
1.  Go to the [Resend website](https://resend.com/).
2.  Click "Sign up" and create a free account. No credit card is required.
3.  After signing up, you will need to verify your domain. Follow their documentation to add the necessary DNS records. This is a required step before you can send emails.
4.  Once your domain is verified, navigate to the **API Keys** section in your Resend dashboard.
5.  Click "Create API Key", give it a name (e.g., "Charlotte Healing Project"), and make sure it has **Sending access**.
6.  **Important:** Copy the generated API key immediately and save it somewhere safe. You will not be able to see it again.

### B. Brevo (for Welcome & Login Alerts)
1.  Go to the [Brevo website](https://www.brevo.com/).
2.  Sign up for the "Free" plan. No credit card is required.
3.  Complete the registration process and activate your account.
4.  In your Brevo dashboard, navigate to **SMTP & API**.
5.  Follow the instructions to get your **SMTP API Key**.
6.  Copy the API key and save it.

### C. MailerSend (for Password, Waitlist, etc.)
1.  Go to the [MailerSend website](https://www.mailersend.com/).
2.  Sign up for a free account.
3.  You will need to get your account approved by verifying your domain. This process is mandatory for sending emails.
4.  Once approved, go to the **Domains** section, click on your verified domain, and find the **API tokens** area.
5.  Generate a new token, give it a name, and copy the key.

### D. SMTP2GO (Fallback Server)
1.  Go to the [SMTP2GO website](https://smtp2go.com/).
2.  Sign up for the "Free Plan".
3.  In your dashboard, navigate to the **API Keys** section.
4.  Create a new API key, give it a name, and copy it.

---

## Part 2: Configure Environment Variables on Netlify

To keep your API keys secure, we will store them as environment variables in your Netlify project.

1.  Log in to your [Netlify account](https://app.netlify.com/).
2.  Go to your site's dashboard.
3.  Navigate to **Site settings > Build & deploy > Environment**.
4.  Click "Edit variables" and add the following keys, pasting the corresponding API key you saved from each service into the value field:

| Key                         | Value                                   |
| --------------------------- | --------------------------------------- |
| `RESEND_API_KEY`            | *Your API key from Resend*              |
| `BREVO_API_KEY`             | *Your API key from Brevo*               |
| `MAILERSEND_API_KEY`        | *Your API key from MailerSend*          |
| `SMTP2GO_API_KEY`           | *Your API key from SMTP2GO*             |
| `FROM_EMAIL`                | *The "from" email address you want to use* |

**Note:** The `FROM_EMAIL` should be an address from the domain you verified with the email services (e.g., `noreply@yourdomain.com`).

---

## Part 3: Set Up Your Local Development Environment

Because the new email system uses Netlify Functions (which run on the server), the old `python3 -m http.server` command will no longer work for local testing. You must use the Netlify CLI.

### A. Install the Netlify CLI
1.  Open your terminal or command prompt.
2.  Make sure you have Node.js installed. If not, download it from [nodejs.org](https://nodejs.org/).
3.  Run the following command to install the Netlify CLI globally on your computer:
    ```bash
    npm install -g netlify-cli
    ```

### B. Run the Website Locally
1.  Open your terminal and navigate to the root directory of this project.
2.  Log in to your Netlify account by running:
    ```bash
    netlify login
    ```
    This will open a browser window for you to authorize.
3.  Link your local project to your site on Netlify by running:
    ```bash
    netlify link
    ```
4.  To start the local development server, run the following command:
    ```bash
    netlify dev
    ```
5.  This command will start a local server, usually on port `8888`. It will automatically load your Netlify environment variables and make the serverless functions accessible, so you can test the email sending functionality locally.

From now on, **always use `netlify dev`** to run the project locally.
