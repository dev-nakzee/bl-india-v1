// import React, { useState, useEffect } from "react";
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     IconButton,
//     Box,
//     Menu,
//     MenuItem,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import LanguageIcon from "@mui/icons-material/Language";
// import apiClient from "../../Services/api";

// function Topbar() {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [languages, setLanguages] = useState([]);

//     useEffect(() => {
//         const determineLanguages = () => {
//             const hostname = window.location.hostname;
//             const subdomain = hostname.split(".")[0];

//             const globalLanguages = [
//                 { name: "English", locale: "en" },
//                 { name: "French", locale: "fr" },
//                 { name: "Spanish", locale: "es" },
//                 { name: "Italian", locale: "it" },
//                 { name: "Chinese (Simplified)", locale: "zh-Hans" },
//                 { name: "Chinese (Traditional)", locale: "zh-Hant" },
//                 { name: "Deutsch", locale: "de" },
//                 { name: "Arabic", locale: "ar" },
//                 { name: "Japanese", locale: "ja" },
//                 { name: "Korean", locale: "ko" },
//                 { name: "Russian", locale: "ru" },
//                 { name: "Malay", locale: "ms" },
//                 { name: "Vietnamese", locale: "vi" },
//                 { name: "Thai", locale: "th" },
//                 { name: "Polish", locale: "pl" },
//                 { name: "Portuguese", locale: "pt" },
//             ];

//             const inSubdomainLanguages = [
//                 { name: "English", locale: "en" },
//                 { name: "Hindi", locale: "hi" },
//                 { name: "Marathi", locale: "mr" },
//                 { name: "Bangali", locale: "bn" },
//                 { name: "Telegu", locale: "te" },
//                 { name: "Tamil", locale: "ta" },
//                 { name: "Kanada", locale: "kn" },
//                 { name: "Malayalam", locale: "ml" },
//                 { name: "Gujarati", locale: "gu" },
//                 { name: "Punjabi", locale: "pa" },
//             ];

//             if (subdomain === "global") {
//                 setLanguages(globalLanguages);
//             } else if (subdomain === "in") {
//                 setLanguages(inSubdomainLanguages);
//             } else {
//                 setLanguages(globalLanguages); // default to global if subdomain is neither 'global' nor 'in'
//             }
//         };

//         determineLanguages();
//     }, []);

//     const handleLanguageClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleLanguageClose = async (locale) => {
//         setAnchorEl(null);
//         if (locale) {
//             try {
//                 await apiClient.get(`/set-locale/${locale}`);
//                 localStorage.setItem("selectedLanguage", locale);
//                 // window.location.reload();
//             } catch (error) {
//                 console.error("Error setting locale:", error);
//             }
//         }
//     };

//     return (
//         <AppBar position="static" className="Topbar-section">
//             <Toolbar sx={{ background: "#0D629A" }}>
//                 <Box
//                     sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
//                 >
//                     <IconButton
//                         component="a"
//                         href="https://www.facebook.com"
//                         target="_blank"
//                         color="inherit"
//                     >
//                         <FacebookIcon />
//                     </IconButton>
//                     <IconButton
//                         component="a"
//                         href="https://www.twitter.com"
//                         target="_blank"
//                         color="inherit"
//                     >
//                         <TwitterIcon />
//                     </IconButton>
//                     <IconButton
//                         component="a"
//                         href="https://www.linkedin.com"
//                         target="_blank"
//                         color="inherit"
//                     >
//                         <LinkedInIcon />
//                     </IconButton>
//                     <IconButton
//                         component="a"
//                         href="https://www.pinterest.com"
//                         target="_blank"
//                         color="inherit"
//                     >
//                         <PinterestIcon />
//                     </IconButton>
//                     <IconButton
//                         component="a"
//                         href="https://www.instagram.com"
//                         target="_blank"
//                         color="inherit"
//                     >
//                         <InstagramIcon />
//                     </IconButton>
//                     <IconButton
//                         component="a"
//                         href="https://www.youtube.com"
//                         target="_blank"
//                         color="inherit"
//                     >
//                         <YouTubeIcon />
//                     </IconButton>
//                 </Box>
//                 <Box
//                     className="box-hidden"
//                     sx={{ display: "flex", alignItems: "center" }}
//                 >
//                     <Typography
//                         variant="bodytext"
//                         component={Link}
//                         to="/about"
//                         sx={{
//                             color: "inherit",
//                             textDecoration: "none",
//                             marginRight: 2,
//                         }}
//                     >
//                         About
//                     </Typography>
//                     <Typography
//                         variant="bodytext"
//                         component={Link}
//                         to="/downloads"
//                         sx={{
//                             color: "inherit",
//                             textDecoration: "none",
//                             marginRight: 2,
//                         }}
//                     >
//                         Downloads
//                     </Typography>
//                     <Typography
//                         variant="bodytext"
//                         component={Link}
//                         to="/blogs"
//                         sx={{
//                             color: "inherit",
//                             textDecoration: "none",
//                             marginRight: 2,
//                         }}
//                     >
//                         Blogs
//                     </Typography>
//                     <Typography
//                         variant="bodytext"
//                         component={Link}
//                         to="/gallery"
//                         sx={{
//                             color: "inherit",
//                             textDecoration: "none",
//                             marginRight: 2,
//                         }}
//                     >
//                         Gallery
//                     </Typography>
//                     <Typography
//                         variant="bodytext"
//                         component={Link}
//                         to="/careers"
//                         sx={{
//                             color: "inherit",
//                             textDecoration: "none",
//                             marginRight: 2,
//                         }}
//                     >
//                         Careers
//                     </Typography>
//                     <Typography
//                         variant="bodytext"
//                         component={Link}
//                         to="/contact"
//                         sx={{
//                             color: "inherit",
//                             textDecoration: "none",
//                             marginRight: 2,
//                         }}
//                     >
//                         Contact
//                     </Typography>
//                     <IconButton color="inherit" onClick={handleLanguageClick}>
//                         <LanguageIcon />
//                     </IconButton>
//                     <Menu
//                         anchorEl={anchorEl}
//                         open={Boolean(anchorEl)}
//                         onClose={() => handleLanguageClose(null)}
//                     >
//                         {languages.map((language) => (
//                             <MenuItem
//                                 key={language.locale}
//                                 onClick={() =>
//                                     handleLanguageClose(language.locale)
//                                 }
//                             >
//                                 {language.name}
//                             </MenuItem>
//                         ))}
//                     </Menu>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// }

// export default Topbar;


import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import apiClient from "../../Services/api";

function Topbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    const determineLanguages = () => {
      const hostname = window.location.hostname;
      const subdomain = hostname.split(".")[0];

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

      if (subdomain === "global") {
        setLanguages(globalLanguages);
      } else if (subdomain === "in") {
        setLanguages(inSubdomainLanguages);
      } else {
        setLanguages(globalLanguages); // default to global if subdomain is neither 'global' nor 'in'
      }
    };

    determineLanguages();
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
        // window.location.reload();
      } catch (error) {
        console.error("Error setting locale:", error);
      }
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position={isMobile ? "sticky" : "static"} className="Topbar-section">
      <Toolbar sx={{ background: "#0D629A" }}>
        {isMobile ? (
          <>
            <Box
              sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-start" }}
            >
              <IconButton
                component="a"
                href="https://www.facebook.com"
                target="_blank"
                color="inherit"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.twitter.com"
                target="_blank"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com"
                target="_blank"
                color="inherit"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.pinterest.com"
                target="_blank"
                color="inherit"
              >
                <PinterestIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com"
                target="_blank"
                color="inherit"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.youtube.com"
                target="_blank"
                color="inherit"
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
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
                  <ListItem button component={Link} to="/about">
                    <ListItemText primary="About" />
                  </ListItem>
                  <ListItem button component={Link} to="/downloads">
                    <ListItemText primary="Downloads" />
                  </ListItem>
                  <ListItem button component={Link} to="/blogs">
                    <ListItemText primary="Blogs" />
                  </ListItem>
                  <ListItem button component={Link} to="/gallery">
                    <ListItemText primary="Gallery" />
                  </ListItem>
                  <ListItem button component={Link} to="/careers">
                    <ListItemText primary="Careers" />
                  </ListItem>
                  <ListItem button component={Link} to="/contact">
                    <ListItemText primary="Contact" />
                  </ListItem>
                  <ListItem button onClick={handleLanguageClick}>
                    <ListItemText primary="Language" />
                    <LanguageIcon />
                  </ListItem>
                </List>
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
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <IconButton
                component="a"
                href="https://www.facebook.com"
                target="_blank"
                color="inherit"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.twitter.com"
                target="_blank"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com"
                target="_blank"
                color="inherit"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.pinterest.com"
                target="_blank"
                color="inherit"
              >
                <PinterestIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com"
                target="_blank"
                color="inherit"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.youtube.com"
                target="_blank"
                color="inherit"
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
            <Box
              className="box-hidden"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                variant="bodytext"
                component={Link}
                to="/about"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: 2,
                }}
              >
                About
              </Typography>
              <Typography
                variant="bodytext"
                component={Link}
                to="/downloads"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: 2,
                }}
              >
                Downloads
              </Typography>
              <Typography
                variant="bodytext"
                component={Link}
                to="/blogs"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: 2,
                }}
              >
                Blogs
              </Typography>
              <Typography
                variant="bodytext"
                component={Link}
                to="/gallery"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: 2,
                }}
              >
                Gallery
              </Typography>
              <Typography
                variant="bodytext"
                component={Link}
                to="/careers"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: 2,
                }}
              >
                Careers
              </Typography>
              <Typography
                variant="bodytext"
                component={Link}
                to="/contact"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  marginRight: 2,
                }}
              >
                Contact
              </Typography>
              <IconButton color="inherit" onClick={handleLanguageClick}>
                <LanguageIcon />
              </IconButton>
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
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
