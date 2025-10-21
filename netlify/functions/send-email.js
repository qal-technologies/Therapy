// ✅ Netlify Serverless Function — Universal Email Sender
// Handles sending emails through Brevo, Resend, or other APIs safely.

require('dotenv').config();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

// Utility to inject {{placeholders}} inside email templates
function replacePlaceholders(template, variables) {
    let html = template;
    for (const [key, value] of Object.entries(variables)) {
        html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
    }
    return html;
}

// ✅ Brevo email sender
async function sendWithBrevo(from, to, subject, html) {
    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: { name: "Healing with Charlotte Casiraghi", email: from },
                to: [{ email: to }],
                subject,
                htmlContent: html,
                replyTo: { email: "healingwithcharlottecasiraghi@gmail.com", name: "Support Team" },
            }),
        });

        const text = await response.text(); // safer than response.json()
        if (!response.ok) throw new Error(`Brevo error: ${text}`);
        return { success: true, message: "Email sent successfully via Brevo" };
    } catch (err) {
        console.error("Brevo Error:", err.message);
        return { success: false, message: err.message };
    }
}

// ✅ Main Netlify function
exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { to, templateName, variables } = JSON.parse(event.body);
        const from = "qaltech.company@gmail.com";

        if (!to || !templateName) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing parameters" }) };
        }

        // ✅ Correct path to templates directory
        const templatePath = path.join(process.cwd(), "templates", `${templateName}.html`);
        if (!fs.existsSync(templatePath)) {
            return { statusCode: 404, body: JSON.stringify({ error: `Template '${templateName}.html' not found.` }) };
        }

        const template = fs.readFileSync(templatePath, "utf8");
        const html = replacePlaceholders(template, variables || {});

        const subjects = {
            verification: "Confirm your email to begin your healing journey",
            welcome: "Welcome to Healing with Charlotte Casiraghi",
            "login-alert": "New login to your account",
            "password-changed": "Your password has been updated",
            waitlist: "You’ve been added to the waitlist",
            newsletter: "Welcome to Charlotte’s circle of healing insights",
        };

        const subject = subjects[templateName] || "Update from Healing with Charlotte Casiraghi";

        // ✅ Send with Brevo
        const result = await sendWithBrevo(from, to, subject, html);

        return {
            statusCode: result.success ? 200 : 500,
            body: JSON.stringify({ success: result.success, message: result.message }),
        };
    } catch (err) {
        console.error("Send-email function error:", err);
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
