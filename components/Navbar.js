'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    return (
        <>
        {/* Non-Sticky Navbar */}
        <nav className="sticky top-0 z-10 py-2 bg-white border-b-1 shadow-lg">
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
                        />
                        <div>
                            <p style={{color:'#2c8ffa', fontSize:35, fontFamily:'serif', fontWeight:700}}>MaaDiy</p>
                        </div>
                    </div>

                    {/* Right Section for Nav Links */}
                    <div className='flex' style={{width:'50%'}}>
                        <div className="hidden md:flex items-center space-x-10 ml-auto">
                            <Link href="/" className="text-black hover:text-blue-500 no-underline">Home</Link>
                            <Link href="/products" className="text-black hover:text-blue-500 no-underline">Pricing</Link>
                            <Link href="/#about" className="text-black hover:text-blue-500 no-underline">About Us</Link>
                            <Link href="/#contact" className="text-black hover:text-blue-500 no-underline">Contact Us</Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-4 ml-auto">
                            <Link href="/login" className="text-black text-sm hover:text-blue-500 no-underline">Login</Link>
                            <Link href="/signup" className="text-white text-sm no-underline p-1 px-2 rounded-lg border-blue-500 hover:bg-blue-500" style={{backgroundColor:'#2c8ffa'}}>Signup</Link>
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
                <div className={`md:hidden flex flex-col text-center space-y-8 transition-all duration-1000 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <Link href="/" className="text-black hover:text-blue-600 no-underline pt-4">Home</Link>
                    <Link href="/products" className="text-black hover:text-blue-600 no-underline">Products</Link>
                    <Link href="/#about" className="text-black hover:text-blue-600 no-underline">About Us</Link>
                    <Link href="/#contact" className="text-black hover:text-blue-600 no-underline">Contact Us</Link>
                    <Link href="/login" className="text-black hover:text-blue-500 no-underline">Login</Link>
                    <Link href="/signup" className="text-black hover:text-blue-500 no-underline pb-4">Signup</Link>
                </div>
            </div>
        </nav>
        </>
    );
};

export default Navbar;
