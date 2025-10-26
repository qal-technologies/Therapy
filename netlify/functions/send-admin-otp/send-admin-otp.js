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

const API_URL = "/.netlify/functions/send-email";
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
        // const html = replacePlaceholders(template, { otpCode });

        const templateName = 'admin-otp';
        // 3. Send the email
        // const result = await fetch(from, email, subject, html);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, templateName, otpCode: otpCode }),
        });

        // 4. Return the OTP to the client to be saved in sessionStorage
        if (response.success) {
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