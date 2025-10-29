const admin = require('firebase-admin');
const { HttpsError } = require('firebase-functions/v1/https');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
        databaseURL: process.env.DATABASE_URL
    });
}

const db = admin.firestore();
const API_URL = "/.netlify/functions/send-email";

// Helper function to send emails (reusing Brevo logic)
async function sendEmail(to, templateName, variables) {
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
        if (reply.startsWith('approved')) {
            paymentStatus = true;
            statusMessage = 'Approved';
        } else if (reply.startsWith('declined') || reply.startsWith('failed') || reply.startsWith('not approved')) {
            paymentStatus = false;
            if (reply.includes('used')) {
                statusMessage = `used - ${replyText}`;
            } if (reply.includes('incomplete')) {
                statusMessage = `incomplete - ${replyText}`;
            } if (reply.includes('incorrect')) {
                statusMessage = `incorrect - ${replyText}`;
            }
        } else {
            // If no keyword is found, we could either do nothing or handle it as a simple comment.
            // For now, we'll assume no action is taken without a keyword.
            return { statusCode: 200, body: JSON.stringify({ message: 'No action keyword found.' }) };
        }

        // Update Firestore::::
        const userActivityPaymentRef = db.collection('user_activities').doc(userId).collection('payments').doc(paymentId);

        const userActivityPaysafetRef = db.collection('user_activities').doc(userId).collection('paysafe_events').doc(paymentId);

        const globalTransactionRef = db.collection('transactions').doc(paymentId);

        await db.runTransaction(async (transaction) => {
            transaction.update(userActivityPaymentRef, { status: paymentStatus, statusMessage: statusMessage, statusName: paymentStatus ? 'Completed' : 'Failed' });

            transaction.update(userActivityPaysafetRef, { status: paymentStatus });

            transaction.update(globalTransactionRef, { status: paymentStatus, statusMessage: statusMessage, statusName: paymentStatus ? 'Completed' : 'Failed' });
        });

        const adminReplyRef = db.collection('user_activities').doc(userId).collection('admin_replies').doc();
        await adminReplyRef.set({
            replyTo: paymentId,
            text: replyText,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            paymentId: paymentId,
        });

        const userActivityRef = db.collection('user_activities').doc(userId);
        await userActivityRef.update({
            unread_count: admin.firestore.FieldValue.increment(1),
            last_update: admin.firestore.FieldValue.serverTimestamp(),
            opened: false
        });

        // Trigger email notification to the user
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();
        const userEmail = userData.details.email;
        const firstName = userData.details.firstName;

        const templateName = paymentStatus ? 'payment-approved' : 'payment-declined';

        const paymentDoc = await globalTransactionRef.get();
        const paymentData = paymentDoc.data();

        const { paymentType, price, method, id } = paymentData;

        await sendEmail(email, templateName, {
            first_name: firstName,
            purchase_type: paymentType,
            transaction_id: id,
            amount: price, 
            payment_method:method,
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
