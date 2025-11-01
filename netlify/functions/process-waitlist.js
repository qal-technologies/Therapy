// Jules: This scheduled function processes the pending waitlist every hour.
const fetch = require('node-fetch');
const admin = require('firebase-admin');

// Server-side email sending helper
async function sendEmail(email, templateName, variables, language) {
    const SEND_EMAIL_FUNCTION_URL = `${process.env.SITE_URL}/.netlify/functions/send-email`;
    try {
        const response = await fetch(SEND_EMAIL_FUNCTION_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to, templateName, variables, language }),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to send email: ${response.status} ${errorBody}`);
        }
        return { success: true };
    } catch (error) {
        console.error('Error in sendEmail helper:', error);
        return { success: false, message: error.message };
    }
}


// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const db = admin.firestore();

exports.handler = async function (event, context) {
    console.log("Running process-waitlist scheduled function...");
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));

    try {
        const pendingUsersRef = db.collection('pending_waitlist');
        const snapshot = await pendingUsersRef.where('timestamp', '<=', admin.firestore.Timestamp.fromDate(twentyFourHoursAgo)).get();

        if (snapshot.empty) {
            console.log("No pending users to process.");
            return {
                statusCode: 200,
                body: "No pending users to process."
            };
        }

        const processingPromises = snapshot.docs.map(async (doc) => {
            const waitlistId = doc.data().id;
            const userData = db.collection('users').doc(waitlistId);
            const userDoc = await userData.get();
            const { email, firstName, language } = userDoc.data();

            try {
                // 1. Send the waitlist confirmation email
                await sendEmail(email, 'waitlist-spot', { firstName }, language || 'en');

                // 2. Update the main user_activities document
                const userActivityRef = db.collection('user_activities').doc(waitlistId);

                const userRef = db.collection("users").doc(waitlistId);
                await userRef.set({
                    spot: true,
                }, { merge: true });

                await userActivityRef.set({
                    waitlist: {
                        status: true,
                        timestamp: admin.firestore.FieldValue.serverTimestamp()
                    },
                    last_update: admin.firestore.FieldValue.serverTimestamp(),
                    last_message: "User spot for the waitlist is available.",
                    unread_count: admin.firestore.FieldValue.increment(1)
                }, { merge: true });

                // 3. Delete from the pending_waitlist
                await doc.ref.delete();
                console.log(`Successfully processed waitlist for user ${waitlistId}`);

            } catch (error) {
                console.error(`Failed to process waitlist for user ${waitlistId}:`, error);
                // Decide on an error handling strategy, e.g., leave them in the queue for the next run
            }
        });

        await Promise.all(processingPromises);

        console.log(`Processed ${snapshot.docs.length} users from the pending waitlist.`);
        return {
            statusCode: 200,
            body: `Successfully processed ${snapshot.docs.length} users.`
        };

    } catch (error) {
        console.error("Error processing pending waitlist:", error);
        return {
            statusCode: 500,
            body: "Error processing pending waitlist."
        };
    }
};
