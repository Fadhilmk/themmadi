"use client";

import { useParams } from 'next/navigation';
import Inbox from "@/components/Inbox";
import ProtectedRoute from "@/components/ProtectedRoute";

const InboxPage = () => {
    const { userId } = useParams(); // useParams to get dynamic route parameters

    if (!userId) return <p>Loading...</p>;

    return (
        <ProtectedRoute>
            <Inbox userId={userId} />
        </ProtectedRoute>
    );
};

export default InboxPage;
