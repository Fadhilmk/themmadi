"use client";
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { useParams } from 'next/navigation';
import withAuth from '@/components/withAuth';  // Import the HOC
function DashboardPage() {
    const { userId } = useParams();
    
    return (
        <div>
            <AnalyticsDashboard />
        </div>
    );
}

export default withAuth(DashboardPage);  // Wrap the page with HOC
