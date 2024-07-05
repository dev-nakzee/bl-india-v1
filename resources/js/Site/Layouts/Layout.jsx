import React from "react";
import Topbar from "../Components/Topbar/Topbar";
import NavigationBar from "../Components/Navbar/NavigationBar";
import Footer from "../Components/Footer/Footer";
import { Container, Fab } from "@mui/material";
import { SidebarProvider } from "../Components/Sidebar/SidebarContext";
import Sidebar from "../Components/Sidebar/Sidebar";
import ScrollToTopButton from "../Pages/ScrollToTop";
import BackButton from "../Components/BackButton";

function Layout({ children }) {
    return (
        <>
        <BackButton/>
            <Topbar />
            <NavigationBar />
            <SidebarProvider>
                <Sidebar />
            </SidebarProvider>
            <>{children}</>
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

export default Layout;
