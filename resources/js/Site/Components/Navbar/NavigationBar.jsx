// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Box,
//   Typography,
//   ClickAwayListener,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SearchIcon from "@mui/icons-material/Search";
// import logo from "../../Assets/logo.svg"; // Replace with your logo path
// import ServicesIcon from "../../Assets/services.svg"; // Replace with your first SVG icon path
// import NotificationIcon from "../../Assets/notifications.svg"; // Replace with your second SVG icon path
// import Sidebar from "../Sidebar/TopsideBar";
// import { useSidebar } from "../Sidebar/SidebarContext";

// const NavigationBar = () => {
//   // searchBar
//   const [TopbarOpen, setTopbarOpen] = useState(false);
//   // const { toggleSidebar } = useSidebar();
//   const handleSidebarOpen = () => {
//     setTopbarOpen(true);
//   };

//   const handleSidebarClose = () => {
//     setTopbarOpen(false);
//   };

//   // searchBar

//   return (
//     <AppBar
//       position="sticky"
//       sx={{ background: "white", color: "#0D629A", py: 1, zIndex: 1300 }}
//       className="box-hidden"
//     >
//       <Toolbar>
//         <Box sx={{ display: "flex", alignItems: "center", width:'20%' }}>
//           <Link to="/">
//             <img src={logo} alt="Brand Logo" style={{ height: "70px" }} />
//           </Link>
//         </Box>
//         <Box sx={{ display: "flex", alignItems: "center",width:'80%',justifyContent:'flex-end' }}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               flexDirection: "column",
//               marginRight: 2,
//             }}
//           >
//             <IconButton
//               component={Link}
//               to="/services"
//               color="inherit"
//               sx={{ display: "flex", alignItems: "center" }}
//             >
//               <img
//                 src={ServicesIcon}
//                 alt="Approval Services"
//                 style={{ height: 50, marginRight: 15 }}
//               />
//               <Box sx={{ textAlign: "left" }}>
//                 <Typography variant="h6">Approval Services</Typography>
//                 <Typography variant="subtitle2" display="block">
//                   provided by BL-India
//                 </Typography>
//               </Box>
//             </IconButton>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               flexDirection: "column",
//               marginRight: 2,
//             }}
//           >
//             <IconButton
//               component={Link}
//               to="/notifications"
//               color="inherit"
//               sx={{ display: "flex", alignItems: "center" }}
//             >
//               <img
//                 src={NotificationIcon}
//                 alt="Govt. Notifications"
//                 style={{ height: 50, marginRight: 15 }}
//               />
//               <Box sx={{ textAlign: "left" }}>
//                 <Typography variant="h6">Notifications</Typography>
//                 <Typography variant="subtitle2" display="block">
//                   Government Notifications
//                 </Typography>
//               </Box>
//             </IconButton>
//           </Box>
//           <IconButton
//             // component={Link} to="/profile"
//             color="inherit"
//             // onClick={toggleSidebar}
//           >
//             <AccountCircleIcon fontSize="large" />
//           </IconButton>

//           <IconButton onClick={handleSidebarOpen}>
//             <SearchIcon fontSize="large" color="primary" />
//           </IconButton>
//           <Sidebar
//             open={TopbarOpen}
//             onClose={handleSidebarClose}
//             className="sidebar-close"
//           />
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavigationBar;


import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../Assets/logo.svg"; // Replace with your logo path
import ServicesIcon from "../../Assets/services.svg"; // Replace with your first SVG icon path
import NotificationIcon from "../../Assets/notifications.svg"; // Replace with your second SVG icon path

const NavigationBar = () => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const drawer = (
    <Drawer anchor="top" open={isSearchOpen} onClose={handleSearchClose}>
      <List>
        <ListItem button>
          <ListItemText primary="Search" />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <AppBar className="Navigation-bar" position="sticky" sx={{ background: "white", color: "#0D629A", py: 1, zIndex: 1300 }}>
      <Toolbar>
        

        {!isMobile ? (
          <>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Link to="/">
            <img src={logo} alt="Brand Logo" style={{ height: "70px" }} />
          </Link>
        </Box>
    
          
          <Box sx={{ display: "flex", alignItems: "center" }}>
          
            <IconButton component={Link} to="/services" color="inherit">
              <img src={ServicesIcon} alt="Services" className="navbar-icon" />
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="h6">Approval Services</Typography>
                <Typography variant="subtitle2" display="block">
                  provided by BL-India
                </Typography>
              </Box>
            </IconButton>
            <IconButton component={Link} to="/notifications" color="inherit">
              <img src={NotificationIcon} alt="Notifications" className="navbar-icon"/>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="h6">Notifications</Typography>
                <Typography variant="subtitle2" display="block">
                  Government Notifications
                </Typography>
              </Box>
            </IconButton>
            <IconButton component={Link} to="/login" color="inherit">
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <IconButton color="inherit" onClick={handleSearchOpen}>
              <SearchIcon fontSize="large" color="primary" />
            </IconButton>
          </Box>
          </>
        ) : (
          <>
          
          <Grid container spacing={4} margin={1}>
           <Stack direction={'row'} sx={{ display: "flex",justifyContent:'space-between',width:'100%'}}>
           <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Link to="/">
            <img src={logo} alt="Brand Logo" style={{ height: "35px" }} />
          </Link>
        </Box>
          <Box sx={{ display: "flex", alignItems: "center" ,justifyContent:'space-between'}}>
            <IconButton color="inherit" onClick={handleSearchOpen}>
              <SearchIcon fontSize="large" color="primary" />
            </IconButton>
            <IconButton component={Link} to="/login" color="inherit">
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Box>
         </Stack>
       
         <Stack direction={'row'} sx={{ display: "flex",justifyContent:'space-between',width:'100%'}}>         
          
          <IconButton component={Link} to="/services" color="inherit">
            <img src={ServicesIcon} alt="Services"  className="navbar-icon" />
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="h6">Approval Services</Typography>
              <Typography variant="subtitle2" display="block">
                provided by BL-India
              </Typography>
            </Box>
          </IconButton>
          <IconButton component={Link} to="/notifications" color="inherit">
            <img src={NotificationIcon} alt="Notifications" className="navbar-icon" />
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="h6">Notifications</Typography>
              <Typography variant="subtitle2" display="block">
                Government Notifications
              </Typography>
            </Box>
            </IconButton>
        
            </Stack>  
           </Grid> 
               </>
        )}
      </Toolbar>
      {drawer}
    </AppBar>
  );
};

export default NavigationBar;
