import Bull from 'bull';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import axios from 'axios';

const bulkMessageQueue = new Bull('bulkMessageQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

const PHONE_NUMBER_ID = '405411442646087';
const ACCESS_TOKEN = 'EAAYbZBkW0wTYBOxdVupkFxF9TStSVmsZASkmdkZBHsE3Y34FyAj6AV30sO8tKIWOi8z5K6F5p3LFacFiIDlCLPrlUrCKhEBQgZA2GmspPZBvgtZABre2n5KIwGQ1oORQHKDA3Pe2Yw4TnoBYlrxRrPPZB43EFlZCsU45QZCK1J5lqfPLUWiZBNZCE7sb4AEELOVYwlvLJ4HX1g5zORUCbY0jccG3SR5jmoogyWRuC33FcHRL81b';

// Process the queue
bulkMessageQueue.process(async (job, done) => {
  const { template, number } = job.data;
  
  try {
    await axios.post(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
      messaging_product: "whatsapp",
      to: number,
      type: "text",
      text: { body: template.content },
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    done();
  } catch (error) {
    done(new Error('Failed to send message'));
  }
});

export default bulkMessageQueue;
