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


import React, { useState,useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
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
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../Assets/logo.svg"; // Replace with your logo path
import ServicesIcon from "../../Assets/services.svg"; // Replace with your first SVG icon path
import NotificationIcon from "../../Assets/notifications.svg"; // Replace with your second SVG icon path
import LanguageIcon from "@mui/icons-material/Language";
import apiClient from "../../Services/api";
import Topbar from "../Topbar/Topbar";



const globalLanguages = [
  { name: "English", locale: "en" },
  { name: "French", locale: "fr" },
  { name: "Spanish", locale: "es" },
  { name: "Italian", locale: "it" },
  { name: "Chinese (Simplified)", locale: "zh-Hans" },
  { name: "Chinese (Traditional)", locale: "zh-Hant" },
  { name: "Deutsch", locale: "de" },
  { name: "Arabic", locale: "ar" },
  { name: "Japanese", locale: "ja" },
  { name: "Korean", locale: "ko" },
  { name: "Russian", locale: "ru" },
  { name: "Malay", locale: "ms" },
  { name: "Vietnamese", locale: "vi" },
  { name: "Thai", locale: "th" },
  { name: "Polish", locale: "pl" },
  { name: "Portuguese", locale: "pt" },
];

const inSubdomainLanguages = [
  { name: "English", locale: "en" },
  { name: "Hindi", locale: "hi" },
  { name: "Marathi", locale: "mr" },
  { name: "Bangali", locale: "bn" },
  { name: "Telegu", locale: "te" },
  { name: "Tamil", locale: "ta" },
  { name: "Kanada", locale: "kn" },
  { name: "Malayalam", locale: "ml" },
  { name: "Gujarati", locale: "gu" },
  { name: "Punjabi", locale: "pa" },
];

const NavigationBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [languages, setLanguages] = useState(globalLanguages);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [socialMedia, setSocialMedia] = useState([]);
  const [topMenu, setTopMenu] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const determineLanguages = () => {
      const hostname = window.location.hostname;
      const subdomain = hostname.split(".")[0];

      if (subdomain === "global") {
        setLanguages(globalLanguages);
      } else if (subdomain === "in") {
        setLanguages(inSubdomainLanguages);
      } else {
        setLanguages(globalLanguages); // default to global if subdomain is neither 'global' nor 'in'
      }
    };

    const fetchTopbarData = async () => {
      try {
        const response = await apiClient.get("/top-bar");
        setSocialMedia(response.data.socialMedia);
        setTopMenu(response.data.topMenu);
      } catch (error) {
        console.error("Error fetching topbar data:", error);
      }
    };

    const fetchLocale = async () => {
      const storedLocale = localStorage.getItem("selectedLanguage") || "en";
      setSelectedLanguage(storedLocale);
      try {
        await apiClient.get(`/set-locale/${storedLocale}`);
      } catch (error) {
        console.error("Error setting locale:", error);
      }
    };

    determineLanguages();
    fetchTopbarData();
    fetchLocale();
  }, []);

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = async (locale) => {
    setAnchorEl(null);
    if (locale) {
      try {
        await apiClient.get(`/set-locale/${locale}`);
        localStorage.setItem("selectedLanguage", locale);
        setSelectedLanguage(locale);
      } catch (error) {
        console.error("Error setting locale:", error);
      }
    }
  };
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
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

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
          
          <Grid container spacing={{xs:0,md:4}} margin={{xs:0,md:1}}>
           <Stack direction={'row'} sx={{ display: "flex",justifyContent:'space-between',alignItems: "center" ,width:'100%'}}>
           <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Link to="/">
            <img src={logo} alt="Brand Logo" style={{ height: "35px" }} />
          </Link>
        </Box>
          <Box sx={{ display: "flex", alignItems: "center" ,justifyContent:'space-between'}}>
            <IconButton color="inherit" onClick={handleSearchOpen}>
              <SearchIcon fontSize="medium" color="primary" />
            </IconButton>
            <IconButton component={Link} to="/login" color="inherit">
              <AccountCircleIcon fontSize="medium" />
            </IconButton>
         
          <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon fontSize="medium" sx={{marginLeft:'10px'}}/>
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {topMenu && topMenu.map((menuItem) => (
                    <ListItem button component={Link} to={menuItem.url} key={menuItem.url}>
                      <ListItemText primary={menuItem.title} />
                    </ListItem>
                  ))}
                  <ListItem button onClick={handleLanguageClick}>
                    <ListItemText primary={`Language: ${selectedLanguage.toUpperCase()}`} />
                    <LanguageIcon />
                  </ListItem>
                
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => handleLanguageClose(null)}
                >
                  {languages.map((language) => (
                    <MenuItem
                      key={language.locale}
                      onClick={() => handleLanguageClose(language.locale)}
                    >
                      {language.name}
                    </MenuItem>
                  ))}
                </Menu>
            
                <ListItem component={Link} to="/services" color="inherit">
                    <ListItemText primary="Approval Services" />
                     </ListItem>
                     <ListItem  component={Link} to="/notifications" color="inherit">
                    <ListItemText primary="Notifications" />
                     </ListItem>
                </List>              
              </Box>
            </Drawer>
            </Box>
         </Stack>
       
         {/* <Stack direction={'row'} sx={{ display: "flex",justifyContent:'space-between',width:'100%'}}>         
          
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
        
            </Stack>   */}
        
           </Grid> 
               </>
        )}
      </Toolbar>
      {drawer}
    </AppBar>
  );
};

export default NavigationBar;
