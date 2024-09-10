// import DashboardLayout from '@/components/DashboardLayout';

// export default function DashboardLayoutWrapper({ children }) {
//     return <DashboardLayout>{children}</DashboardLayout>;
// }

"use client"
import DashboardLayout from '@/components/DashboardLayout';
import withAuth from '@/components/withAuth';  // Import the HOC

function DashboardLayoutWrapper({ children }) {
    return <DashboardLayout>{children}</DashboardLayout>;
}

export default withAuth(DashboardLayoutWrapper);  // Wrap the layout with HOC