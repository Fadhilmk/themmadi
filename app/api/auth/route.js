// 

import { db } from '../../../firebaseConfig';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const JWT_SECRET = process.env.JWT_SECRET;

export const runtime = 'edge';

export default async (req) => {
    try {
        const body = await req.json();
        console.log(body); // Log the request body to ensure it's being received correctly

        const { email, password, verifyToken, phoneNumberId, accessToken, type } = body;

        if (type === 'signup') {
            const userRef = doc(db, 'users', email);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                return new Response(JSON.stringify({ success: false, error: 'User already exists' }), { status: 400 });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await setDoc(userRef, {
                email,
                password: hashedPassword,
                verifyToken,
                phoneNumberId,
                accessToken,
            });
            return new Response(JSON.stringify({ success: true }), { status: 201 });
        } else if (type === 'login') {
            const userRef = doc(db, 'users', email);
            const docSnap = await getDoc(userRef);
            if (!docSnap.exists()) {
                return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), { status: 400 });
            }
            const user = docSnap.data();
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), { status: 400 });
            }
            const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            return new Response(JSON.stringify({ success: true, token }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), { status: 400 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ success: false, error: 'Unexpected error' }), { status: 500 });
    }
};
