// Netlify Serverless Function — Admin OTP Sender

require('dotenv').config();
const fetch = require("node-fetch");

// Admin OTP email template
const templates = {
    'admin-otp': `<!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>Admin Login OTP</title>
    </head>
    <body style="font-family: sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #333;">Admin Panel Access</h2>
            <p style="font-size: 16px; color: #555;">Here is your One-Time Password (OTP) to access the admin panel. This code will expire in 5 minutes.</p>
            <p style="font-size: 24px; font-weight: bold; color: #000; letter-spacing: 2px; margin: 20px 0; background-color: #f0f2f5; padding: 15px; border-radius: 5px;">{{otpCode}}</p>
            <p style="font-size: 14px; color: #777;">If you did not request this code, please ignore this email immediately.</p>
        </div>
    </body>
    </html>`
};

// Utility to inject {{placeholders}} inside email templates
function replacePlaceholders(template, variables) {
    let html = template;
    for (const [key, value] of Object.entries(variables)) {
        html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
    }
    return html;
}

// Brevo email sender (reused from send-email.js)
async function sendWithBrevo(from, to, subject, html) {
    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: { name: "Admin System", email: from },
                to: [{ email: to }],
                subject,
                htmlContent: html,
            }),
        });
        const text = await response.text();
        if (!response.ok) throw new Error(`Brevo error: ${text}`);
        return { success: true, message: "Email sent successfully via Brevo" };
    } catch (err) {
        console.error("Brevo Error:", err.message);
        return { success: false, message: err.message };
    }
}

// Main Netlify function handler
exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { email } = JSON.parse(event.body);
        const from = "qaltech.company@gmail.com";

        if (!email) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing 'email' parameter" }) };
        }

        // 1. Generate a 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // 2. Prepare the email
        const template = templates['admin-otp'];
        const html = replacePlaceholders(template, { otpCode });
        const subject = "Admin Panel Login Access";

        // 3. Send the email
        const result = await sendWithBrevo(from, email, subject, html);

        // 4. Return the OTP to the client to be saved in sessionStorage
        if (result.success) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, otp: otpCode }),
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: "Failed to send OTP email." }),
            };
        }

    } catch (err) {
        console.error("send-admin-otp function error:", err);
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
