import Sidebar from '../../../components/Sidebar';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Upload from '../../../components/Upload';

const ImportPage = () => {
    return (
        <ProtectedRoute>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6">
                    <Upload />
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default ImportPage;
