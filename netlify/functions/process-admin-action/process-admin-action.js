const admin = require('firebase-admin');
const fetch = require('node-fetch');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
        databaseURL: process.env.DATABASE_URL
    });
}

const db = admin.firestore();
const API_URL = `/.netlify/functions/send-email`;

// Helper function to send emails (reusing Brevo logic)
async function sendEmail(to, templateName, variables) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

        const reply = replyText.toLowerCase().trim();
        let paymentStatus = null;
        let statusMessage = '';
        let savedReply = replyText.split(' - ')[1] || replyText;

        // Keyword parsing logic
        if (reply.includes('approved')) {
            paymentStatus = true;
            statusMessage = 'Approved';
        } else if (reply.includes('declined') || reply.includes('failed') || reply.includes('not approved')) {
            paymentStatus = false;
            if (reply.includes('used')) {
                statusMessage = `${savedReply}`;
            } else if (reply.includes('incomplete')) {
                statusMessage = `${savedReply}`;
            } else if (reply.includes('incorrect')) {
                statusMessage = `${savedReply}`;
            } else {
                statusMessage = `${reply}`;
            }
        } else {
            return { statusCode: 200, body: JSON.stringify({ message: 'No action keyword found.' }) };
        }

        // Update Firestore::::
        const userActivityRef = db.collection('user_activities').doc(userId);
        const userActivityPaysafeRef = userActivityRef.collection('paysafe_events').doc(paymentId);
        const userPaymentRef = db.collection('users').doc(userId).collection('payments').doc(paymentId);
        const userRef = db.collection('users').doc(userId);

        const [paysafeDoc, paymentDoc, userActivities, userDoc] = await Promise.all([
            userActivityPaysafeRef.get(),
            userPaymentRef.get(),
            userActivityRef.get(),
            userRef.get(),
        ]);

        const userData = userDoc.exists ? userDoc.data() : null;
        if (!userData || !userData.details) {
            return { statusCode: 404, body: JSON.stringify({ error: 'User data missing.' }) };
        }
        if (!paymentDoc.exists) {
            return { statusCode: 404, body: JSON.stringify({ error: 'Payment data not found.' }) };
        }

        const { email: userEmail, firstName } = userData.details;

        const paymentData = paymentDoc.data();
        const { paymentType, price, method, id } = paymentData;


        const batch = db.batch();

        if (paysafeDoc.exists) {
            batch.update(userActivityPaysafeRef, {
                status: paymentStatus,
                statusMessage
            });
        }

        if (paymentDoc.exists) {
            batch.update(userPaymentRef, {
                status: paymentStatus,
                statusMessage
            });
        }

        if (userDoc.exists) {
            if (paymentStatus === true && paymentType == 'book') {
                batch.update(userRef, {
                    bookPaid: true
                });
            }
        }

        if (userActivities.exists) {
            const adminReplyRef = userActivityRef.collection('admin_replies').doc();
            batch.set(adminReplyRef, {
                text: replyText,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                paymentId
            });

            const paymentStatusText = paymentStatus ? 'Approved' : 'Declined';
            batch.update(userActivityRef, {
                unread_count: admin.firestore.FieldValue.increment(1),
                last_update: admin.firestore.FieldValue.serverTimestamp(),
                opened: false,
                last_message: `The payment ${price ? `of €${price}` : ''} has been ${paymentStatusText}.`
            });
        }


        await batch.commit();

        // Trigger email notification to the user

        const templateName = paymentStatus ? 'payment-approved' : 'payment-declined';
        await sendEmail(userEmail, templateName, {
            first_name: firstName,
            purchase_type: paymentType,
            transaction_id: id,
            amount: price,
            payment_method: method
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
