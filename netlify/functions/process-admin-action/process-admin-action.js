// Netlify Serverless Function — Process Admin Action

const admin = require('firebase-admin');

// !! IMPORTANT !!
// The service account credentials need to be configured in the Netlify environment variables.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT ?
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) :
    {
        "type": "service_account",
        "project_id": "therapy-b0747",
        "private_key_id": "your-private-key-id",
        "private_key": "your-private-key",
        "client_email": "your-client-email",
        "client_id": "your-client-id",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "your-client-x509-cert-url"
    };

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();
const API_URL = "/.netlify/functions/send-email";

// Helper function to send emails (reusing Brevo logic)
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

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { userId, paymentId, replyText } = JSON.parse(event.body);

        if (!userId || !paymentId || !replyText) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing parameters.' }) };
        }

        const reply = replyText.toLowerCase();
        let paymentStatus = null;
        let statusMessage = '';

        // Keyword parsing logic
        if (reply.includes('approved')) {
            paymentStatus = true;
            statusMessage = 'Approved';
        } else if (reply.includes('declined') || reply.includes('failed')) {
            paymentStatus = false;
            statusMessage = `Declined: ${replyText}`;
        } else {
            // If no keyword is found, we could either do nothing or handle it as a simple comment.
            // For now, we'll assume no action is taken without a keyword.
            return { statusCode: 200, body: JSON.stringify({ message: 'No action keyword found.' }) };
        }

        // Update Firestore::::
        const userActivityPaymentRef = db.collection('user_activities').doc(userId).collection('payments').doc(paymentId);
        const globalTransactionRef = db.collection('transactions').doc(paymentId);

        await db.runTransaction(async (transaction) => {
            transaction.update(userActivityPaymentRef, { status: paymentStatus, statusMessage: statusMessage, statusName: paymentStatus ? 'Completed' : 'Failed' });
            transaction.update(globalTransactionRef, { status: paymentStatus, statusMessage: statusMessage, statusName: paymentStatus ? 'Completed' : 'Failed' });
        });

        const adminReplyRef = db.collection('user_activities').doc(userId).collection('admin_replies').doc();
        await adminReplyRef.set({
            replyTo: paymentId,
            text: replyText,
            timestamp: new Date(),
        });

        const userActivityRef = db.collection('user_activities').doc(userId);
        await userActivityRef.update({
            unread_count: admin.firestore.FieldValue.increment(1),
            last_update: admin.firestore.FieldValue.serverTimestamp(), // Also update the timestamp to bring it to the top
            opened: false // Mark as unread
        });
        
        // Trigger email notification to the user
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();
        const userEmail = userData.details.email;
        const firstName = userData.details.firstName;

        const templateName = paymentStatus ? 'payment-approved' : 'payment-declined';
        await sendEmail(userEmail, templateName, {
            first_name: firstName,
            status_message: statusMessage,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Payment status updated successfully.' }),
        };
    } catch (error) {
        console.error('Error processing admin action:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to process admin action.' }) };
    }
};
