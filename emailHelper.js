// Jules: This file contains the universal client-side function for sending emails.
// It sends a request to our secure Netlify serverless function, which then handles the actual email sending.

/**
 * Sends an email by calling the secure Netlify serverless function.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} templateName - The name of the email template (e.g., 'welcome', 'verification').
 * @param {object} variables - An object containing placeholder variables for the template (e.g., { first_name: 'John' }).
 * @returns {Promise<{success: boolean, message: string}>} - An object indicating the outcome of the email sending attempt.
 */

const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:8888/.netlify/functions/send-email"
        : "/netlify/functions/send-email";

export async function sendEmail(to, templateName, variables) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, templateName, variables }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An unknown error occurred while sending the email.');
    }

    const result = await response.json();
    console.log('Email sent successfully:', result.message);
    return { success: true, message: result.message };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, message: error.message };
  }
}
