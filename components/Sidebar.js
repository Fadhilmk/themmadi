"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <div className="p-4">
                <h2 className="text-xl font-bold">Dashboard</h2>
            </div>
            <nav className="flex-1 p-4">
                <ul>
                    <li className="mb-4">
                        <Link href="/dashboard/inbox">
                            Inbox
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link href="/dashboard/templates">
                            Templates
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link href="/dashboard/import">
                            Import Numbers
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="p-4">
                <button onClick={handleLogout} className="bg-red-500 w-full p-2 rounded">Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
