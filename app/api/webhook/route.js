import { NextResponse } from 'next/server';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// Handle GET request for webhook verification
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === 'sample') {
        return new NextResponse(challenge);
    } else {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
}

// Handle POST request for webhook notifications
export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Incoming webhook:', JSON.stringify(body));

        const entry = body.entry[0];
        const changes = entry.changes[0].value;
        const contact = changes.contacts[0];
        const message = changes.messages[0];

        const userName = contact.profile.name;
        const messageBody = message.text.body;
        const userPhoneNumber = message.from;
        const messageId = message.id;
        const timestamp = new Date(message.timestamp * 1000); // Convert Unix timestamp to JavaScript Date

        // Save the message to Firebase
        await addDoc(collection(db, 'messages'), {
            userName,
            messageBody,
            userPhoneNumber,
            messageId,
            timestamp,
            read: false,
        });

        return NextResponse.json({ message: 'EVENT_RECEIVED' });
    } catch (error) {
        console.error('Error handling webhook:', error);
        return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
    }
}
