import React from 'react';
import Navbar from './Header/Navbar';
import Menu from './Menu/Menu';
import Footer from './Footer/Footer';

const DashboardLayout = ({ children }) =>{
    return(
        <div>
        <Navbar />
        <Menu />
        <div>
            <div className="content-wrapper bg-white">
                {children}
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default DashboardLayout;