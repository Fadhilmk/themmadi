"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState  } from 'react';
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return children;
};

export default ProtectedRoute;