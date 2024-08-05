import Sidebar from '../../components/Sidebar';
import ProtectedRoute from '../../components/ProtectedRoute';

const DashboardPage = () => {
    return (
        <ProtectedRoute>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6">
                    <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default DashboardPage;
