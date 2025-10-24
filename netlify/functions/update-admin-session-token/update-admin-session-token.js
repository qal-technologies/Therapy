// Netlify Serverless Function — Update Admin Session Token

const admin = require('firebase-admin');

// !! IMPORTANT !!
// The service account credentials need to be configured in the Netlify environment variables.
// I will add a placeholder here and will ask the user for the actual credentials.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT ?
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) :
    {
        "type": "service_account",
        "project_id": "your-project-id",
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

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { adminId, token } = JSON.parse(event.body);

        if (!adminId || !token) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing adminId or token.' }) };
        }

        const adminDocRef = db.collection('admin').doc(adminId);
        await adminDocRef.set({ sessionToken: token }, { merge: true });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Session token updated successfully.' }),
        };
    } catch (error) {
        console.error('Error updating session token:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to update session token.' }) };
    }
};
