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
                        />
                        <p style={{color:'#2c8ffa', fontSize:35, fontFamily:'serif', fontWeight:700}}>MaaDiy</p>
                    </div>

                    {/* Right Section for Nav Links */}
                    <div className='flex' style={{width:'50%'}}>
                        <div className="hidden md:flex items-center space-x-10 ml-auto">
                            <Link href="/" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Home</Link>
                            <Link href="/pricing" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Pricing</Link>
                            <Link href="/#about" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>About Us</Link>
                            <Link href="/#contact" className="text-black hover:text-blue-500 no-underline" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Contact Us</Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-4 ml-auto">
                            <Link href="/login" className="text-black text-sm hover:text-blue-500 no-underline p-2 rounded-lg border-blue-400" style={{fontFamily: 'LeagueSpartan, sans-serif', borderWidth:1}}>Login</Link>
                            <Link href="/signup" className="btn-contact text-white text-sm no-underline p-2 rounded-lg border-blue-500 hover:bg-blue-500" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Get Started</Link>
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
                    <Link href="/pricing" className="text-black hover:text-blue-600 no-underline">Pricing</Link>
                    <Link href="/#about" className="text-black hover:text-blue-600 no-underline">About Us</Link>
                    <Link href="/#contact" className="text-black hover:text-blue-600 no-underline">Contact Us</Link>

                    {/* Login Button with Blue Border */}
                    <Link href="/login" className="text-black hover:text-blue-500 no-underline rounded-lg border border-blue-400 px-4 py-2">
                        Login
                    </Link>

                    {/* Get Started Button with Centered Text */}
                    <Link href="/signup" className="text-black hover:text-white no-underline pb-4 bg-blue-400 py-2 px-4 rounded-lg flex items-center justify-center">
                        Get Started
                    </Link>
                </div>

            </div>
        </nav>
        </>
    );
};

export default Navbar;
