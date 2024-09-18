"use client"
import UserAccount from '../../../../components/UserAccount';
import { useParams } from 'next/navigation';

const Account = () => {
    // Retrieve the userId from the URL parameters
    const { userId } = useParams();

    return (
        <div>
            {/* Pass the userId to the UserAccount component */}
            <UserAccount userId={userId} />
        </div>
    );
};

export default Account;
