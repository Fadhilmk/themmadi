import { db } from '../../firebaseConfig';
import axios from 'axios';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { userId, to, content } = req.body;

            const userDoc = await db.collection('users').doc(userId).get();
            if (!userDoc.exists) {
                return res.status(400).json({ success: false, error: 'User not found' });
            }
            const user = userDoc.data();

            try {
                const response = await axios.post(`https://graph.facebook.com/v20.0/${user.phoneNumberId}/messages`, {
                    messaging_product: 'whatsapp',
                    to,
                    text: { body: content },
                }, {
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                    },
                });

                const message = {
                    userId: user.email,
                    to,
                    content,
                    status: 'sent',
                };
                await db.collection('messages').add(message);
                res.status(200).json({ success: true, data: response.data });
            } catch (error) {
                res.status(500).json({ success: false, error: 'Failed to send message' });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
