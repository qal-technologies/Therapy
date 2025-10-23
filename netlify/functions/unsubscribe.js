// This Netlify function handles unsubscribe requests.
// It takes an email address as a parameter and removes the corresponding user from the newsletter collection in Firestore.

require('dotenv').config();
const admin = require('firebase-admin');

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

exports.handler = async (event) => {
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { email } = event.queryStringParameters;

    if (!email) {
        return {
            statusCode: 400,
            body: 'Missing email parameter.',
        };
    }

    try {
        const snapshot = await db.collection('newsletter').where('email', '==', email).get();
        if (snapshot.empty) {
            return {
                statusCode: 404,
                body: 'Email not found in the newsletter list.',
            };
        }

        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        return {
            statusCode: 200,
            body: 'You have been successfully unsubscribed from the newsletter.',
        };
    } catch (error) {
        console.error('Error unsubscribing user:', error);
        return {
            statusCode: 500,
            body: 'An error occurred while unsubscribing. Please try again later.',
        };
    }
};
