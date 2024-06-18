import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    Typography,
    ClickAwayListener,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../Assets/logo.svg"; // Replace with your logo path
import ServicesIcon from "../../Assets/services.svg"; // Replace with your first SVG icon path
import NotificationIcon from "../../Assets/notifications.svg"; // Replace with your second SVG icon path
import Sidebar from "../Sidebar/Sidebar";
import zIndex from "@mui/material/styles/zIndex";

const NavigationBar = () => {
    // searchBar
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarOpen = () => {
        setSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    // searchBar

    return (
        <AppBar
            position="sticky"
            sx={{ background: "white", color: "#0D629A", py: 1, zIndex: 1300 }}
        >
            <Toolbar>
                <Box
                    sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                >
                    <img
                        src={logo}
                        alt="Brand Logo"
                        style={{ height: 75, marginRight: 20 }}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            marginRight: 2,
                        }}
                    >
                        <IconButton
                            component={Link}
                            to="/services"
                            color="inherit"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <img
                                src={ServicesIcon}
                                alt="Approval Services"
                                style={{ height: 50, marginRight: 15 }}
                            />
                            <Box sx={{ textAlign: "left" }}>
                                <Typography variant="iconMenu">
                                    Approval Services
                                </Typography>
                                <Typography variant="subtitle2" display="block">
                                    provided by BL-India
                                </Typography>
                            </Box>
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            marginRight: 2,
                        }}
                    >
                        <IconButton
                            component={Link}
                            to="/notifications"
                            color="inherit"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <img
                                src={NotificationIcon}
                                alt="Govt. Notifications"
                                style={{ height: 50, marginRight: 15 }}
                            />
                            <Box sx={{ textAlign: "left" }}>
                                <Typography variant="iconMenu">
                                    Notifications
                                </Typography>
                                <Typography variant="subtitle2" display="block">
                                    Government Notifications
                                </Typography>
                            </Box>
                        </IconButton>
                    </Box>
                    <IconButton component={Link} to="/profile" color="inherit">
                        <AccountCircleIcon fontSize="large" />
                    </IconButton>

                    {/* <IconButton
                    //  component={Link} to="/search"
                      color="inherit" onClick={handleSidebarOpen}>
                        <SearchIcon fontSize="large" />
                        <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
                    </IconButton> */}
                     {/* <IconButton onClick={handleSidebarOpen}>
                                <SearchIcon fontSize="large" />
                            <Sidebar
                                open={sidebarOpen}
                                onClose={handleSidebarClose}
                            />
                            </IconButton> */}
        <IconButton onClick={handleSidebarOpen}>
          <SearchIcon fontSize="large" color="primary" />
        </IconButton>
        <Sidebar open={sidebarOpen} onClose={handleSidebarClose} className="sidebar-close"
        />
                   
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
