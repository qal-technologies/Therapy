const admin = require('firebase-admin');
const fetch = require('node-fetch');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
        databaseURL: process.env.DATABASE_URL
    });
}


const API_URL = `${process.env.SITE_URL}/.netlify/functions/send-email`;
// Helper function to send emails (reusing Brevo logic)
async function sendEmail(to, templateName, variables, language) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to, templateName, variables, language }),
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

export async function handler(event) {
    try {
        const { email, language } = JSON.parse(event.body);

        const link = await admin.auth().generatePasswordResetLink(email, {
            url: "https://guerisonendirectavecharlottecasiraghi.netlify.app/html/regs/reset-password",
            handleCodeInApp: true
        });

        await sendEmail(email, "reset", {
            name: "there",
            url: link
        }, language);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: err.message })
        };
    }
}
