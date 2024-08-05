import { db } from '../../../firebaseConfig';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET); // Ensure JWT_SECRET is in Uint8Array format

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
            // Create a JWT token
            const token = await new SignJWT({ email: user.email })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('1h')
                .sign(JWT_SECRET);

            return new Response(JSON.stringify({ success: true, token }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, error: 'Invalid request' }), { status: 400 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ success: false, error: 'Unexpected error' }), { status: 500 });
    }
};

export const runtime = 'edge'; // Updated configuration
