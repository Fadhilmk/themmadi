import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 text-white p-4 flex justify-between">
            <div className="font-bold text-xl">My App</div>
            <div>
                <Link href="/login"className="mr-4">Login</Link>
                <Link href="/signup">Signup</Link>
            </div>
        </nav>
    );
};

export default Navbar;
