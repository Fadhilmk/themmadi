"use client";
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Template from './Template';
import bulkMessageQueue from '../queues/bulkMessageQueue';

const BulkMessage = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [status, setStatus] = useState('');

    const handleSendMessages = async () => {
        if (!selectedTemplate) {
            setStatus('Please select a template');
            return;
        }

        setStatus('Sending messages...');

        const importedNumbersSnapshot = await getDocs(collection(db, 'importedNumbers'));
        const importedNumbers = importedNumbersSnapshot.docs.map(doc => doc.data().number);

        for (const number of importedNumbers) {
            await bulkMessageQueue.add({
                template: selectedTemplate,
                number,
            });
        }

        setStatus('Messages are being sent!');
    };

    return (
        <div>
            <Template onTemplateSelect={setSelectedTemplate} />
            <button onClick={handleSendMessages}>Send Bulk Messages</button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default BulkMessage;
