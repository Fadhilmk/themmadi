"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const [form, setForm] = useState({ email: '', password: '', verifyToken: '', phoneNumberId: '', accessToken: '' });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form); // Log the form data before sending it
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...form, type: 'signup' }),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.error || 'An error occurred');
                return;
            }

            router.push('/login');
        } catch (error) {
            console.error('Fetch Error:', error); // Log the fetch error
            alert('An unexpected error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Signup</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Verify Token</label>
                <input
                    type="text"
                    name="verifyToken"
                    value={form.verifyToken}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Phone Number ID</label>
                <input
                    type="text"
                    name="phoneNumberId"
                    value={form.phoneNumberId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Access Token</label>
                <input
                    type="text"
                    name="accessToken"
                    value={form.accessToken}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Signup</button>
        </form>
    );
};

export default Signup;
