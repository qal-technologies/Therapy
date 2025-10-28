const admin = require('firebase-admin');
const fetch = require("node-fetch");

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { adminId, token } = JSON.parse(event.body);

        if (!adminId || !token) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing adminId or token' }) };
        }

        const adminDocRef = db.collection('admins').doc(adminId);
        const doc = await adminDocRef.get();

        if (!doc.exists) {
            return { statusCode: 401, body: JSON.stringify({ error: 'Admin not found' }) };
        }

        const { sessionToken } = doc.data();

        if (sessionToken !== token) {
            return { statusCode: 401, body: JSON.stringify({ error: 'Invalid session token' }) };
        }

        return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Session verified' }) };
    } catch (error) {
        console.error('Error verifying admin session:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
    }
};
