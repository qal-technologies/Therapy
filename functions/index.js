import fetch from "node-fetch";
import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Send an email via Brevo template
export const sendEmail = onCall(async (request) => {
    const { to, name, templateId, params } = request.data;

    if (!to || !templateId) throw new Error("Missing 'to' or 'templateId'");

    const BREVO_API_KEY = process.env.BREVO_API_KEY || process.env.brevo_key || request.context.env.brevo_key;

    try {
        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                accept: "application/json",
                "api-key": BREVO_API_KEY,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                sender: { name: "Healing with Charlotte Casiraghi", email: "qaltech.company@gmail.com" },
                to: [{ email: to, name }],
                templateId,
                params,
            }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error sending email");
        logger.info(`Email sent to ${to} using template ${templateId}`);
        return { success: true, data };
    } catch (err) {
        logger.error("Error sending email:", err);
        return { success: false, error: err.message };
    }
});
