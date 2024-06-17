import React from 'react';
import Topbar from '../Components/Topbar/Topbar';
import NavigationBar from '../Components/Navbar/NavigationBar';
// import Footer from './Footer';
import { Container } from '@mui/material';

function Layout({ children }) {
    return (
        <>
            <Topbar />
            <NavigationBar />
            <>
                {children}
            </>
            {/* <Footer /> */}
        </>
    );
}

export default Layout;
