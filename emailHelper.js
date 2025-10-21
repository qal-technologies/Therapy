// Jules: This file contains the universal client-side function for sending emails.
// It sends a request to our secure Netlify serverless function, which then handles the actual email sending.

import { sendWithBrevo } from "./brevoMail.js";

/**
 * Sends an email by calling the secure Netlify serverless function.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} templateName - The name of the email template (e.g., 'welcome', 'verification').
 * @param {object} variables - An object containing placeholder variables for the template (e.g., { first_name: 'John' }).
 * @returns {Promise<{success: boolean, message: string}>} - An object indicating the outcome of the email sending attempt.
 */

export async function sendEmail(to, templateName, variables) {
  try {
    const response = await sendWithBrevo(to, templateName, variables);

    console.log('Email sent successfully:', response.message);
    return { success: true, message: response.message };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, message: error.message };
  }
}
