// 'use client'
// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleMenu = () => {
//       setIsOpen(!isOpen);
//     };

//     return (
//         <>
//         {/* Non-Sticky Navbar */}
//         <nav className="sticky top-0 z-10 py-4 bg-white border-b-1 shadow-lg">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex h-20" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
//                     {/* Left Section for Logo */}
//                     <div className="flex items-center">
//                         <Image
//                             src="/nav_logo.jpeg"
//                             alt="Logo"
//                             width={90}
//                             height={90}
//                             className="object-contain"
//                             priority
//                         />
//                         <p style={{color:'#2c8ffa', fontSize:35, fontFamily:'serif', fontWeight:700}}>MaaDiy</p>
//                     </div>

//                     {/* Right Section for Nav Links */}
//                     <div className='flex' style={{width:'50%'}}>
//                         <div className="hidden md:flex items-center space-x-10 ml-auto">
//                             <Link href="/" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Home</Link>
//                             <Link href="/pricing" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Pricing</Link>
//                             <Link href="/#about" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>About Us</Link>
//                             <Link href="/#features" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Features</Link>
//                         </div>
//                         <div className="hidden md:flex items-center space-x-4 ml-auto">
//                             <Link href="/login" className="text-black text-sm hover:text-blue-500 no-underline p-2 rounded-lg border-blue-400" style={{fontFamily: 'LeagueSpartan, sans-serif', borderWidth:1}}>Login</Link>
//                             <Link href="/signup" className="btn-contact text-white text-sm no-underline p-2 rounded-lg border-blue-500 hover:bg-blue-500" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Get Started</Link>
//                         </div>
//                     </div>

//                     {/* Mobile Menu Button */}
//                     <div className="md:hidden">
//                         <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
//                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
//                             </svg>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 <div className={`md:hidden flex flex-col text-center space-y-8 transition-all duration-1000 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
//                     <Link href="/" className="text-black hover:text-blue-600 no-underline pt-4">Home</Link>
//                     <Link href="/pricing" className="text-black hover:text-blue-600 no-underline">Pricing</Link>
//                     <Link href="/#about" className="text-black hover:text-blue-600 no-underline">About Us</Link>
//                     <Link href="/#features" className="text-black hover:text-blue-600 no-underline">Features</Link>

//                     {/* Login Button with Blue Border */}
//                     <Link href="/login" className="text-black hover:text-blue-500 no-underline rounded-lg border border-blue-400 px-4 py-2">
//                         Login
//                     </Link>

//                     {/* Get Started Button with Centered Text */}
//                     <Link href="/signup" className="text-black hover:text-white no-underline pb-4 bg-blue-400 py-2 px-4 rounded-lg flex items-center justify-center">
//                         Get Started
//                     </Link>
//                 </div>

//             </div>
//         </nav>
//         </>
//     );
// };

// export default Navbar;


// 'use client';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import Cookies from 'js-cookie';  // Import js-cookie
// import { useRouter } from 'next/navigation';
// import { auth } from '@/firebaseConfig';

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state
//     const router = useRouter();

//     // Toggle the mobile menu
//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     // Check if token and userId exist in cookies
//     useEffect(() => {
//         const checkAuth = () => {
//             const token = Cookies.get('token');
//             const userId = Cookies.get('userId');

//             // If both token and userId exist, the user is logged in
//             setIsLoggedIn(!!token && !!userId);
//         };

//         checkAuth();

//         // Optional: You can re-run this check on certain events like window focus
//         window.addEventListener('focus', checkAuth);
//         return () => window.removeEventListener('focus', checkAuth);
//     }, []);  // Empty dependency array to run only once when the component mounts

//     // Handle logout functionality
//     const handleLogout = async () => {
//         try {
//             // Sign out the user from Firebase
//             await auth.signOut();
          
//             // Remove cookies
//             Cookies.remove("token");
//             Cookies.remove("userId");
          
//             // Set login state to false
//             setIsLoggedIn(false);

//             // Optional: Refresh the page or redirect to force recheck of the auth state
//             router.push('/');
//             window.location.reload();  // Refresh the page to clear state globally
//         } catch (error) {
//             console.error("Error logging out:", error);
//         }
//     };

//     return (
//         <>
//         {/* Navbar */}
//         <nav className="sticky top-0 z-10 py-4 bg-white border-b-1 shadow-lg">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex h-20" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
//                     {/* Left Section for Logo */}
//                     <div className="flex items-center">
//                         <Image
//                             src="/nav_logo.jpeg"
//                             alt="Logo"
//                             width={90}
//                             height={90}
//                             className="object-contain"
//                             priority
//                         />
//                         <p style={{color:'#2c8ffa', fontSize:35, fontFamily:'serif', fontWeight:700}}>MaaDiy</p>
//                     </div>

//                     {/* Right Section for Nav Links */}
//                     <div className='flex' style={{width:'50%'}}>
//                         <div className="hidden md:flex items-center space-x-10 ml-auto">
//                             <Link href="/" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Home</Link>
//                             <Link href="/pricing" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Pricing</Link>
//                             <Link href="/#about" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>About Us</Link>
//                             <Link href="/#features" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Features</Link>
//                         </div>
//                         <div className="hidden md:flex items-center space-x-4 ml-auto">
//                             {/* Conditionally Render Login/Logout Button */}
//                             {isLoggedIn ? (
//                                 <button onClick={handleLogout} className="text-black text-sm hover:text-blue-500 no-underline p-2 rounded-lg border-blue-400" style={{fontFamily: 'LeagueSpartan, sans-serif', borderWidth:1}}>Logout</button>
//                             ) : (
//                                 <Link href="/login" className="text-black text-sm hover:text-blue-500 no-underline p-2 rounded-lg border-blue-400" style={{fontFamily: 'LeagueSpartan, sans-serif', borderWidth:1}}>Login</Link>
//                             )}
                            
//                             {/* Conditionally Render Get Started/Dashboard Button */}
//                             <Link href={isLoggedIn ? "/dashboard" : "/signup"} className="btn-contact text-white text-sm no-underline p-2 rounded-lg border-blue-500 hover:bg-blue-500" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
//                                 {isLoggedIn ? "Dashboard" : "Get Started"}
//                             </Link>
//                         </div>
//                     </div>

//                     {/* Mobile Menu Button */}
//                     <div className="md:hidden">
//                         <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
//                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
//                             </svg>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 <div className={`md:hidden flex flex-col text-center space-y-8 transition-all duration-1000 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
//                     <Link href="/" className="text-black hover:text-blue-600 no-underline pt-4">Home</Link>
//                     <Link href="/pricing" className="text-black hover:text-blue-600 no-underline">Pricing</Link>
//                     <Link href="/#about" className="text-black hover:text-blue-600 no-underline">About Us</Link>
//                     <Link href="/#features" className="text-black hover:text-blue-600 no-underline">Features</Link>

//                     {/* Conditionally Render Mobile Login/Logout Button */}
//                     {isLoggedIn ? (
//                         <button onClick={handleLogout} className="text-black hover:text-blue-500 no-underline rounded-lg border border-blue-400 px-4 py-2">
//                             Logout
//                         </button>
//                     ) : (
//                         <Link href="/login" className="text-black hover:text-blue-500 no-underline rounded-lg border border-blue-400 px-4 py-2">
//                             Login
//                         </Link>
//                     )}

//                     {/* Conditionally Render Mobile Get Started/Dashboard Button */}
//                     <Link href={isLoggedIn ? "/dashboard" : "/signup"} className="text-black hover:text-white no-underline pb-4 bg-blue-400 py-2 px-4 rounded-lg flex items-center justify-center">
//                         {isLoggedIn ? "Dashboard" : "Get Started"}
//                     </Link>
//                 </div>

//             </div>
//         </nav>
//         </>
//     );
// };

// export default Navbar;

// 'use client';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import Cookies from 'js-cookie';  // Import js-cookie
// import { useRouter } from 'next/navigation';
// import { auth } from '@/firebaseConfig';

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state
//     const [userId, setUserId] = useState('');  // Track userId state
//     const router = useRouter();

//     // Toggle the mobile menu
//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     // Check if token and userId exist in cookies
//     useEffect(() => {
//         const checkAuth = () => {
//             const token = Cookies.get('token');
//             const userId = Cookies.get('userId');

//             // If both token and userId exist, the user is logged in
//             if (token && userId) {
//                 setIsLoggedIn(true);
//                 setUserId(userId);  // Save userId for redirection to dashboard
//             } else {
//                 setIsLoggedIn(false);
//                 setUserId('');  // Clear userId if not logged in
//             }
//         };

//         checkAuth();

//         // Optional: You can re-run this check on certain events like window focus
//         window.addEventListener('focus', checkAuth);
//         return () => window.removeEventListener('focus', checkAuth);
//     }, []);  // Empty dependency array to run only once when the component mounts

//     // Handle logout functionality
//     const handleLogout = async () => {
//         try {
//             // Sign out the user from Firebase
//             await auth.signOut();
          
//             // Remove cookies
//             Cookies.remove("token");
//             Cookies.remove("userId");
          
//             // Set login state to false and clear userId
//             setIsLoggedIn(false);
//             setUserId('');

//             // Optional: Refresh the page or redirect to force recheck of the auth state
//             router.push('/');
//             window.location.reload();  // Refresh the page to clear state globally
//         } catch (error) {
//             console.error("Error logging out:", error);
//         }
//     };

//     // Handle redirect to dashboard with userId
//     const redirectToDashboard = () => {
//         if (userId) {
//             router.push(`/dashboard/${userId}`);
//         }
//     };

//     return (
//         <>
//         {/* Navbar */}
//         <nav className="sticky top-0 z-10 py-4 bg-white border-b-1 shadow-lg">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex h-20" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
//                     {/* Left Section for Logo */}
//                     <div className="flex items-center">
//                         <Image
//                             src="/nav_logo.jpeg"
//                             alt="Logo"
//                             width={90}
//                             height={90}
//                             className="object-contain"
//                             priority
//                         />
//                         <p style={{color:'#2c8ffa', fontSize:35, fontFamily:'serif', fontWeight:700}}>MaaDiy</p>
//                     </div>

//                     {/* Right Section for Nav Links */}
//                     <div className='flex' style={{width:'50%'}}>
//                         <div className="hidden md:flex items-center space-x-10 ml-auto">
//                             <Link href="/" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Home</Link>
//                             <Link href="/pricing" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Pricing</Link>
//                             <Link href="/#about" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>About Us</Link>
//                             <Link href="/#features" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Features</Link>
//                         </div>
//                         <div className="hidden md:flex items-center space-x-4 ml-auto">
//                             {/* Conditionally Render Login/Logout Button */}
//                             {isLoggedIn ? (
//                                 <button onClick={handleLogout} className="text-black text-sm hover:text-blue-500 no-underline p-2 rounded-lg border-blue-400" style={{fontFamily: 'LeagueSpartan, sans-serif', borderWidth:1}}>Logout</button>
//                             ) : (
//                                 <Link href="/login" className="text-black text-sm hover:text-blue-500 no-underline p-2 rounded-lg border-blue-400" style={{fontFamily: 'LeagueSpartan, sans-serif', borderWidth:1}}>Login</Link>
//                             )}
                            
//                             {/* Conditionally Render Get Started/Dashboard Button */}
//                             {isLoggedIn ? (
//                                 <button onClick={redirectToDashboard} className="btn-contact text-white text-sm no-underline p-2 rounded-lg border-blue-500 hover:bg-blue-500" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
//                                     Dashboard
//                                 </button>
//                             ) : (
//                                 <Link href="/signup" className="btn-contact text-white text-sm no-underline p-2 rounded-lg border-blue-500 hover:bg-blue-500" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
//                                     Get Started
//                                 </Link>
//                             )}
//                         </div>
//                     </div>

//                     {/* Mobile Menu Button */}
//                     <div className="md:hidden">
//                         <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
//                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
//                             </svg>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 <div className={`md:hidden flex flex-col text-center space-y-8 transition-all duration-1000 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
//                     <Link href="/" className="text-black hover:text-blue-600 no-underline pt-4">Home</Link>
//                     <Link href="/pricing" className="text-black hover:text-blue-600 no-underline">Pricing</Link>
//                     <Link href="/#about" className="text-black hover:text-blue-600 no-underline">About Us</Link>
//                     <Link href="/#features" className="text-black hover:text-blue-600 no-underline">Features</Link>

//                     {/* Conditionally Render Mobile Login/Logout Button */}
//                     {isLoggedIn ? (
//                         <button onClick={handleLogout} className="text-black hover:text-blue-500 no-underline rounded-lg border border-blue-400 px-4 py-2">
//                             Logout
//                         </button>
//                     ) : (
//                         <Link href="/login" className="text-black hover:text-blue-500 no-underline rounded-lg border border-blue-400 px-4 py-2">
//                             Login
//                         </Link>
//                     )}

//                     {/* Conditionally Render Mobile Get Started/Dashboard Button */}
//                     {isLoggedIn ? (
//                         <button onClick={redirectToDashboard} className="text-black hover:text-white no-underline pb-4 bg-blue-400 py-2 px-4 rounded-lg flex items-center justify-center">
//                             Dashboard
//                         </button>
//                     ) : (
//                         <Link href="/signup" className="text-black hover:text-white no-underline pb-4 bg-blue-400 py-2 px-4 rounded-lg flex items-center justify-center">
//                             Get Started
//                         </Link>
//                     )}
//                 </div>

//             </div>
//         </nav>
//         </>
//     );
// };

// export default Navbar;


'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';  // Import js-cookie
import { useRouter } from 'next/navigation';
import { auth } from '@/firebaseConfig';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state
    const [userId, setUserId] = useState('');  // Track userId state
    const router = useRouter();

    // Toggle the mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Check if token and userId exist in cookies
    useEffect(() => {
        const checkAuth = () => {
            const token = Cookies.get('token');
            const userId = Cookies.get('userId');

            if (token && userId) {
                setIsLoggedIn(true);
                setUserId(userId);
            } else {
                setIsLoggedIn(false);
                setUserId('');
            }
        };

        checkAuth();

        // Re-run this check on certain events like window focus
        window.addEventListener('focus', checkAuth);
        return () => window.removeEventListener('focus', checkAuth);
    }, []);

    // Handle logout functionality
    const handleLogout = async () => {
        try {
            await auth.signOut();
            Cookies.remove("token");
            Cookies.remove("userId");

            setIsLoggedIn(false);
            setUserId('');

            router.push('/');
            window.location.reload();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Handle redirect to dashboard with userId
    const redirectToDashboard = () => {
        if (userId) {
            router.push(`/dashboard/${userId}`);
        }
    };

    return (
        <>
        {/* Navbar */}
        <nav className="sticky top-0 z-10 py-4 bg-white border-b-1 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Left Section for Logo */}
                    <div className="flex items-center">
                        <Image
                            src="/nav_logo.jpeg"
                            alt="Logo"
                            width={90}
                            height={90}
                            className="object-contain"
                            priority
                        />
                        <p style={{color:'#2c8ffa', fontSize:35, fontFamily:'serif', fontWeight:700}}>MaaDiy</p>
                    </div>

                    {/* Right Section for Nav Links */}
                    <div className='flex' style={{width:'50%'}}>
                        <div className="hidden md:flex items-center space-x-10 ml-auto">
                            <Link href="/" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Home</Link>
                            <Link href="/pricing" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Pricing</Link>
                            <Link href="/#about" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>About Us</Link>
                            <Link href="/#features" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Features</Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-4 ml-auto">
                            {/* Conditionally Render Login/Logout Button */}
                            {isLoggedIn ? (
                                <button onClick={handleLogout} className="bg-blue-500 text-white text-sm no-underline py-2 px-4 rounded-lg hover:bg-blue-600" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
                                    Logout
                                </button>
                            ) : (
                                <Link href="/login" className="bg-blue-500 text-white text-sm no-underline py-2 px-4 rounded-lg hover:bg-blue-600" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
                                    Login
                                </Link>
                            )}
                            
                            {/* Conditionally Render Get Started/Dashboard Button */}
                            {isLoggedIn ? (
                                <button onClick={redirectToDashboard} className="bg-green-500 text-white text-sm no-underline py-2 px-4 rounded-lg hover:bg-blue-500" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
                                    Dashboard
                                </button>
                            ) : (
                                <Link href="/signup" className="bg-green-500 text-white text-sm no-underline py-2 px-4 rounded-lg hover:bg-blue-500" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden flex flex-col text-center space-y-4 transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <Link href="/" className="text-black hover:text-blue-600 no-underline pt-4">Home</Link>
                    <Link href="/pricing" className="text-black hover:text-blue-600 no-underline">Pricing</Link>
                    <Link href="/#about" className="text-black hover:text-blue-600 no-underline">About Us</Link>
                    <Link href="/#features" className="text-black hover:text-blue-600 no-underline">Features</Link>

                    {/* Conditionally Render Mobile Login/Logout Button */}
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="bg-blue-500 text-white hover:bg-blue-600 no-underline rounded-lg px-4 py-2">
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" className="bg-blue-500 text-white hover:bg-blue-600 no-underline rounded-lg px-4 py-2">
                            Login
                        </Link>
                    )}

                    {/* Conditionally Render Mobile Get Started/Dashboard Button */}
                    {isLoggedIn ? (
                        <button onClick={redirectToDashboard} className="bg-green-500 text-white hover:bg-blue-500 no-underline py-2 px-4 rounded-lg flex items-center justify-center">
                            Dashboard
                        </button>
                    ) : (
                        <Link href="/signup" className="bg-green-500 text-white hover:bg-blue-500 no-underline py-2 px-4 rounded-lg flex items-center justify-center">
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </nav>
        </>
    );
};

export default Navbar;
