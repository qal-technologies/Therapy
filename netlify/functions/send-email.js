// Jules: This is the secure Netlify serverless function that acts as a central hub for sending all emails.
// It reads API keys from environment variables and routes email requests to the appropriate provider.

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Helper function to replace placeholders in the email templates
const replacePlaceholders = (template, variables) => {
  let populatedTemplate = template;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    populatedTemplate = populatedTemplate.replace(regex, value);
  }
  return populatedTemplate;
};

// --- Email Provider Functions ---

const sendWithResend = async (from, to, subject, html) => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`Resend API Error: ${errorBody.message}`);
    }
    return { success: true, message: 'Email sent successfully via Resend.' };
  } catch (error) {
    console.error('Resend Error:', error);
    return { success: false, message: error.message };
  }
};

const sendWithBrevo = async (from, to, subject, html) => {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: from },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });
    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`Brevo API Error: ${errorBody.message}`);
    }
    return { success: true, message: 'Email sent successfully via Brevo.' };
  } catch (error) {
    console.error('Brevo Error:', error);
    return { success: false, message: error.message };
  }
};

const sendWithMailerSend = async (from, to, subject, html) => {
    try {
        const response = await fetch('https://api.mailersend.com/v1/email', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: { email: from },
                to: [{ email: to }],
                subject,
                html,
            }),
        });
        if (!response.ok) {
            const errorBody = await response.text(); // MailerSend can return non-JSON errors
            throw new Error(`MailerSend API Error: ${response.statusText} - ${errorBody}`);
        }
        return { success: true, message: 'Email sent successfully via MailerSend.' };
    } catch (error) {
        console.error('MailerSend Error:', error);
        return { success: false, message: error.message };
    }
};

const sendWithSmtp2go = async (from, to, subject, html) => {
    try {
        const response = await fetch('https://api.smtp2go.com/v3/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: process.env.SMTP2GO_API_KEY,
                to: [to],
                sender: from,
                subject,
                html_body: html,
            }),
        });
        const result = await response.json();
        if (result.data.succeeded === 0) {
            throw new Error(`SMTP2GO API Error: ${result.data.failures[0]?.error || 'Unknown error'}`);
        }
        return { success: true, message: 'Email sent successfully via SMTP2GO.' };
    } catch (error) {
        console.error('SMTP2GO Error:', error);
        return { success: false, message: error.message };
    }
};


exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { to, templateName, variables } = JSON.parse(event.body);
    // const from = process.env.FROM_EMAIL || 'noreply@yourdomain.com';
    const from = "qaltech.company@gmail.com";

    if (!to || !templateName || !variables) {
      return { statusCode: 400, body: 'Missing required parameters: to, templateName, variables' };
    }

    // 1. Read and populate the email template
    const templatePath = path.resolve(__dirname, `../../templates/${templateName}.html`);
    if (!fs.existsSync(templatePath)) {
      return { statusCode: 404, body: `Template '${templateName}.html' not found.` };
    }
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const html = replacePlaceholders(templateContent, variables);

    // 2. Define subjects and select the email provider based on the template
    let result;
    const subjects = {
        verification: 'Confirm your email to begin your healing journey',
        welcome: 'Welcome to Healing with Charlotte Casiraghi',
        'login-alert': 'New login to your Healing with Charlotte Casiraghi account',
        'password-changed': 'Your Healing with Charlotte Casiraghi password has been updated',
        waitlist: 'You’ve been added to the waitlist',
        newsletter: 'Welcome to Charlotte’s circle of healing insights'
    };
    const subject = subjects[templateName] || 'An update from Healing with Charlotte Casiraghi';

    // if (templateName === 'verification') {
    //   result = await sendWithResend(from, to, subject, html);
    // } else if (templateName === 'welcome' || templateName === 'login-alert') {
      result = await sendWithBrevo(from, to, subject, html);
    // } else if (templateName === 'password-changed' || templateName === 'waitlist' || templateName === 'newsletter') {
    //     result = await sendWithMailerSend(from, to, subject, html);
    // } else {
    //   // Fallback for any other template
    //   result = await sendWithSmtp2go(from, to, subject, html);
    // }

    if (result.success) {
      return { statusCode: 200, body: JSON.stringify({ message: result.message }) };
    } else {
      return { statusCode: 500, body: JSON.stringify({ error: result.message }) };
    }

  } catch (error) {
    console.error('Error in send-email function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An internal server error occurred.' }),
    };
  }
};
