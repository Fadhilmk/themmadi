import { NextResponse } from 'next/server';
import { db } from '../../../../firebase'; // Adjust the path if necessary
import { collection, doc, addDoc } from 'firebase/firestore';

// Handle GET request for webhook verification
export async function GET(req, { params }) {
    const { userId } = params;
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    // Verification logic, you might have a unique token per user
    if (mode === 'subscribe' && token === 'sample') {  // Adjust 'sample' for user-specific tokens
        console.log(`Webhook verification for user: ${userId}`);
        return new NextResponse(challenge);
    } else {
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

        // Reference to the user's document
        const userDocRef = doc(db, 'users', userId);

        // Save the message to the 'messages' sub-collection inside the user's document
        await addDoc(collection(userDocRef, 'messages'), {
            userName,
            messageBody,
            userPhoneNumber,
            messageId,
            timestamp,
            read: false,
            received: true, // Fixed typo
        });

        return NextResponse.json({ message: 'EVENT_RECEIVED' });
    } catch (error) {
        console.error(`Error handling webhook for user ${userId}:`, error);
        return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
    }
}
