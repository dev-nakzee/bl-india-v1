import React from 'react';
import Topbar from '../Components/Topbar/Topbar';
// import NavigationBar from './NavigationBar';
// import Footer from './Footer';
import { Container } from '@mui/material';

function Layout({ children }) {
    return (
        <div>
            <Topbar />
            {/* <NavigationBar /> */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {children}
            </Container>
            {/* <Footer /> */}
        </div>
    );
}

export default Layout;
