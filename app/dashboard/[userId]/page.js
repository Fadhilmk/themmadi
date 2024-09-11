"use client";
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { useParams } from 'next/navigation';

export default function DashboardPage() {
    const { userId } = useParams();
    
    return (
        <div>
            <AnalyticsDashboard />
        </div>
    );
}
