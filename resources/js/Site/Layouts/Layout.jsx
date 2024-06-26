import React from "react";
import Topbar from "../Components/Topbar/Topbar";
import NavigationBar from "../Components/Navbar/NavigationBar";
import Footer from '../Components/Footer/Footer';
import { Container, Fab } from "@mui/material";
import { SidebarProvider } from "../Components/Sidebar/SidebarContext";
import Sidebar from "../Components/Sidebar/Sidebar";


function Layout({ children }) {
    return (
        <>

            <Topbar />
            <NavigationBar />
            <SidebarProvider>
                <Sidebar />
            </SidebarProvider>
            <>{children}</>
                        <Footer />
        </>
    );
}

export default Layout;
