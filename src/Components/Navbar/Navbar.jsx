import React, { useContext, useState, useEffect } from 'react';
import { MdDarkMode } from "react-icons/md";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserToken } from '../../Context/UserTokenProvider';
import { ThemeContext } from '../../Context/ThemeContext';

const Navbar = () => {
    const { token, setToken } = useContext(UserToken);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext); 
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); 

    const logUserOut = () => {
        setToken(null);
        localStorage.removeItem("UserToken");
        navigate("/login");
    };

    const toggleMenu = () => setMenuOpen(!menuOpen); 

    return (
        <nav className="dark:bg-[#171717] bg-gray-800 fixed top-0 left-0 right-0 z-10">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button onClick={toggleMenu} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {menuOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                        <div className="flex flex-shrink-0 items-center">
                            <Link to={"/"}>
                                <img className="h-10" src="https://is1-ssl.mzstatic.com/image/thumb/Purple6/v4/25/52/94/2552945a-dd8d-4077-a610-544ed822efb9/source/512x512bb.jpg" alt="Your Company" />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4 items-center">
                                {token ? (
                                    <>
                                        <NavLink to={"/"} className="rounded-md px-3 py-2 text-sm text-gray-300 font-medium">Home</NavLink>
                                        <button onClick={logUserOut} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Sign Out</button>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to={"login"} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</NavLink>
                                        <NavLink to={"register"} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</NavLink>
                                    </>
                                )}
                                <MdDarkMode
                                    onClick={toggleDarkMode}
                                    className={`size-7 cursor-pointer ${darkMode ? 'text-white' : 'text-neutral-900'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {menuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {token ? (
                            <>
                                <NavLink to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Home</NavLink>
                                <button onClick={logUserOut} className="w-full text-left rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Sign Out</button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Login</NavLink>
                                <NavLink to="/register" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
