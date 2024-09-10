"use client";
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { useParams } from 'next/navigation';
import withAuth from '@/components/withAuth';  // Import the HOC
export default function DashboardPage() {
    const { userId } = useParams();
    
    return (
        <div>
            <AnalyticsDashboard />
        </div>
    );
}
