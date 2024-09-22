// import { NextResponse } from 'next/server';
// import { db } from '../../../../firebaseConfig'; // Adjust the path if necessary
// import { collection, doc, addDoc } from 'firebase/firestore';

// // Handle GET request for webhook verification
// export async function GET(req, { params }) {
//     const { userId } = params;
//     const { searchParams } = new URL(req.url);
//     const mode = searchParams.get('hub.mode');
//     const token = searchParams.get('hub.verify_token');
//     const challenge = searchParams.get('hub.challenge');

//     // Verification logic, you might have a unique token per user
//     if (mode === 'subscribe' && token === 'sample') {  // Adjust 'sample' for user-specific tokens
//         console.log(`Webhook verification for user: ${userId}`);
//         return new NextResponse(challenge);
//     } else {
//         return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//     }
// }

// // Handle POST request for webhook notifications
// export async function POST(req, { params }) {
//     const { userId } = params;

//     try {
//         const body = await req.json();
        
//         console.log(`Full webhook event for user ${userId}:`, JSON.stringify(body, null, 2));

//         // Extracting the required data
//         const entry = body.entry[0];
//         const change = entry.changes[0].value;
//         const contact = change.contacts[0];
//         const message = change.messages[0];

//         const userName = contact.profile.name;
//         const messageBody = message.text.body;
//         const userPhoneNumber = message.from;
//         const messageId = message.id;
//         const timestamp = new Date(message.timestamp * 1000); // Convert Unix timestamp to JavaScript Date

//         // Reference to the user's document
//         const userDocRef = doc(db, 'users', userId);

//         // Save the message to the 'messages' sub-collection inside the user's document
//         await addDoc(collection(userDocRef, 'messages'), {
//             userName,
//             messageBody,
//             userPhoneNumber,
//             messageId,
//             timestamp,
//             read: false,
//             received: true, // Fixed typo
//         });

//         return NextResponse.json({ message: 'EVENT_RECEIVED' });
//     } catch (error) {
//         console.error(`Error handling webhook for user ${userId}:`, error);
//         return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
//     }
// }


// import { NextResponse } from 'next/server';
// import { db } from '../../../../firebaseConfig'; // Adjust the path if necessary
// import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

// // Handle GET request for webhook verification
// export async function GET(req, { params }) {
//     const { userId } = params;
//     const { searchParams } = new URL(req.url);
//     const mode = searchParams.get('hub.mode');
//     const token = searchParams.get('hub.verify_token');
//     const challenge = searchParams.get('hub.challenge');

//     // Verification logic, you might have a unique token per user
//     if (mode === 'subscribe' && token === 'sample') {  // Adjust 'sample' for user-specific tokens
//         console.log(`Webhook verification for user: ${userId}`);
//         return new NextResponse(challenge);
//     } else {
//         return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//     }
// }

// // Handle POST request for webhook notifications
// export async function POST(req, { params }) {
//     const { userId } = params;

//     try {
//         const body = await req.json();
        
//         console.log(`Full webhook event for user ${userId}:`, JSON.stringify(body, null, 2));

//         // Extracting the required data
//         const entry = body.entry[0];
//         const change = entry.changes[0].value;
//         const contact = change.contacts[0];
//         const message = change.messages[0];

//         const userName = contact.profile.name;
//         const messageBody = message.text.body;
//         const userPhoneNumber = message.from;
//         const messageId = message.id;
//         const timestamp = new Date(message.timestamp * 1000); // Convert Unix timestamp to JavaScript Date

//         // Reference to the user's document in 'users' collection
//         const userDocRef = doc(db, 'users', userId);

//         // Reference to the specific phone number's document within 'messages' collection
//         const phoneDocRef = doc(collection(userDocRef, 'messages'), userPhoneNumber);

//         // Ensure the phone number document exists (or create it if it doesn't)
//         await setDoc(phoneDocRef, { userPhoneNumber }, { merge: true });

//         // Save the message inside the 'messages' sub-collection within the phone number document
//         await addDoc(collection(phoneDocRef, 'messages'), {
//             userName,
//             messageBody,
//             messageId,
//             timestamp,
//             read: false,
//             received: true,
//         });

//         return NextResponse.json({ message: 'EVENT_RECEIVED' });
//     } catch (error) {
//         console.error(`Error handling webhook for user ${userId}:`, error);
//         return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
//     }
// }


import { NextResponse } from 'next/server';
import { db } from '../../../../firebaseConfig';
import { doc, getDoc, collection, addDoc, setDoc } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

// Decryption function for Firebase encrypted data
const decryptData = (cipherText) => {
  const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Handle GET request for webhook verification
export async function GET(req, { params }) {
    const { userId } = params; // Extract userId from the URL
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token'); // Incoming verify token from the request
    const challenge = searchParams.get('hub.challenge'); // Challenge to respond with

    if (mode === 'subscribe') {
        try {
            // Fetch the encrypted connection data from Firebase for this userId
            const connectionDocRef = doc(db, "users", userId, "documents", "connectionData");
            const connectionDoc = await getDoc(connectionDocRef);

            if (!connectionDoc.exists()) {
                console.error(`Connection data not found for user: ${userId}`);
                return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
            }

            // Decrypt the data to retrieve the verifyToken
            const encryptedData = connectionDoc.data().data;
            const decryptedData = decryptData(encryptedData);
            const storedVerifyToken = decryptedData.verifyToken; // The token stored in Firebase

            // Check if the stored verifyToken matches the incoming token
            if (storedVerifyToken === token) {
                // Token matches, respond with the challenge
                console.log(`Webhook verification successful for user: ${userId}`);
                return new NextResponse(challenge);
            } else {z
                // Token mismatch, return forbidden
                console.error(`Webhook verification failed for user: ${userId}, token mismatch.`);
                return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
            }
        } catch (error) {
            console.error(`Error verifying webhook for user: ${userId}:`, error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        // If the mode is not 'subscribe', return forbidden
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
}

// Handle POST request for webhook notifications
export async function POST(req, { params }) {
    const { userId } = params;

    try {
        const body = await req.json();
        
        console.log(`Full webhook event for user ${userId}:`, JSON.stringify(body, null, 2));

        // Extracting the required data
        const entry = body.entry[0];
        const change = entry.changes[0].value;
        const contact = change.contacts[0];
        const message = change.messages[0];

        const userName = contact.profile.name;
        const messageBody = message.text.body;
        const userPhoneNumber = message.from;
        const messageId = message.id;
        const timestamp = new Date(message.timestamp * 1000); // Convert Unix timestamp to JavaScript Date

        // Reference to the user's document in 'users' collection
        const userDocRef = doc(db, 'users', userId);

        // Reference to the specific phone number's document within 'messages' collection
        const phoneDocRef = doc(collection(userDocRef, 'messages'), userPhoneNumber);

        // Ensure the phone number document exists (or create it if it doesn't)
        await setDoc(phoneDocRef, { userPhoneNumber }, { merge: true });

        // Save the message inside the 'messages' sub-collection within the phone number document
        await addDoc(collection(phoneDocRef, 'messages'), {
            userName,
            messageBody,
            messageId,
            timestamp,
            read: false,
            received: true,
        });

        return NextResponse.json({ message: 'EVENT_RECEIVED' });
    } catch (error) {
        console.error(`Error handling webhook for user ${userId}:`, error);
        return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
    }
}
