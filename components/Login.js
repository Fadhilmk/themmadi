"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, type: 'login' }),
        });
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('token', data.token);
            router.push('/dashboard');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </form>
    );
};

export default Login;
