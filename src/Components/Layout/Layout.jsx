import React from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <>
            <Navbar />
            <section className="relative main-height flex items-center justify-center">
                <Outlet />
            </section>
            <Footer />
        </>
    )
}

export default Layout;
