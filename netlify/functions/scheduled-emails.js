// This Netlify function is scheduled to run once a day.
// It checks for users who need to receive a waitlist or newsletter email and sends it to them.

require('dotenv').config();
const admin = require('firebase-admin');
const fetch = require('node-fetch');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
    });
}

const db = admin.firestore();

// Function to send an email using Brevo
async function sendEmail(to, templateName, variables) {
    const from = "qaltech.company@gmail.com";
    const subjects = {
        waitlist_follow_up: "Thank you for joining the waitlist!",
        newsletter: `Your ${new Date().toLocaleString('default', { month: 'long' })} Healing Insights`,
    };

    const subject = subjects[templateName] || "Update from Healing with Charlotte Casiraghi";

    // Add the full HTML templates here
    const templates = {
        'waitlist_follow_up': `<!DOCTYPE html>...`,
        'newsletter': `<!DOCTYPE html>...`
    };

    const html = templates[templateName] || `This is a placeholder for the ${templateName} email template.`;

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
                htmlContent: html.replace('{{first_name}}', variables.first_name).replace('{{unsubscribe_link}}', `https://your-site.netlify.app/.netlify/functions/unsubscribe?email=${to}`),
                replyTo: { email: "healingwithcharlottecasiraghi@gmail.com", name: "Support Team" },
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

exports.handler = async (event) => {
    try {
        // Handle waitlist emails
        const waitlistSnapshot = await db.collection('waitlist').get();
        waitlistSnapshot.forEach(async (doc) => {
            const user = doc.data();
            const joinedAt = user.joinedAt.toDate();
            const now = new Date();
            const hoursSinceJoined = (now - joinedAt) / (1000 * 60 * 60);

            if (hoursSinceJoined >= 24 && !user.followUpSent) {
                await sendEmail(user.email, 'waitlist_follow_up', { first_name: 'there' });
                await db.collection('waitlist').doc(doc.id).update({ followUpSent: true });
            }
        });

        // Handle newsletter emails
        const newsletterSnapshot = await db.collection('newsletter').get();
        newsletterSnapshot.forEach(async (doc) => {
            const user = doc.data();
            const subscribedAt = user.subscribedAt.toDate();
            const now = new Date();
            const isFirstOfMonth = now.getDate() === 1;

            // Send newsletter on the first day of the month
            if (isFirstOfMonth) {
                // Check if a newsletter has been sent this month
                if (!user.lastNewsletterSent || user.lastNewsletterSent.toDate().getMonth() !== now.getMonth()) {
                    await sendEmail(user.email, 'newsletter', { first_name: 'there' });
                    await db.collection('newsletter').doc(doc.id).update({ lastNewsletterSent: admin.firestore.FieldValue.serverTimestamp() });
                }
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Scheduled emails processed successfully.' }),
        };
    } catch (error) {
        console.error('Error processing scheduled emails:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to process scheduled emails.' }),
        };
    }
};
