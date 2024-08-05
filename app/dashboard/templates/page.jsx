import Sidebar from '../../../components/Sidebar';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Template from '../../../components/Template';

const TemplatesPage = () => {
    return (
        <ProtectedRoute>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6">
                    <Template />
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default TemplatesPage;
