import { db } from '../../../firebaseConfig';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            // Verify webhook
            const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
            const mode = req.query['hub.mode'];
            const token = req.query['hub.verify_token'];
            const challenge = req.query['hub.challenge'];

            if (mode && token) {
                if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                    res.status(200).send(challenge);
                } else {
                    res.status(403).send('Forbidden');
                }
            }
            break;
        case 'POST':
            // Handle incoming messages
            const { entry } = req.body;
            for (const entryItem of entry) {
                for (const change of entryItem.changes) {
                    const messageData = change.value.messages[0];
                    const { from, id, text, timestamp } = messageData;

                    const userQuery = await db.collection('users').where('phoneNumberId', '==', change.value.metadata.phone_number_id).get();
                    userQuery.forEach(async (userDoc) => {
                        const user = userDoc.data();
                        const message = {
                            userId: user.email,
                            to: user.phoneNumberId,
                            from,
                            content: text.body,
                            messageId: id,
                            status: 'received',
                            timestamp: new Date(parseInt(timestamp) * 1000),
                        };
                        await db.collection('messages').add(message);
                    });
                }
            }
            res.status(200).send('EVENT_RECEIVED');
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
