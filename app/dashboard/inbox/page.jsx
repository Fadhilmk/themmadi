import Sidebar from '../../../components/Sidebar';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Inbox from '../../../components/Inbox';

const InboxPage = () => {
    return (
        <ProtectedRoute>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6">
                    <Inbox />
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default InboxPage;
