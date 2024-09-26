import React, { useState, useEffect } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import ServicesIcon from "../../Assets/services.svg"; // Replace with your first SVG icon path
import NotificationIcon from "../../Assets/notifications.svg"; // Replace with your second SVG icon path
import LanguageIcon from "@mui/icons-material/Language";
import apiClient from "../../Services/api";
import RegisterLoginDrawer from "../RegisterLoginDrawer"; // Make sure this is the correct path
import SearchDrawer from '../Search/SearchDrawer'; // Ensure this path is correct
import PartnerWithUsLink from "../Footer/PartnerWithUsLink";

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
  const [isSearchOpen, setSearchOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

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
                <img src="https://in.bl-india.com/storage/site_settings/logo.webp" alt="Brand Liaison" style={{ height: "60px" }} />
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton component={Link} to="/services" color="inherit">
                <img src={ServicesIcon} alt="Services" className="navbar-icon" />
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="h6">Services</Typography>
                  <Typography variant="subtitle2" display="block">
                  Product Certifications
                  </Typography>
                </Box>
              </IconButton>
              <IconButton component={Link} to="/notifications" color="inherit">
                <img src={NotificationIcon} alt="Notifications" className="navbar-icon"/>
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="h6">Notifications</Typography>
                  <Typography variant="subtitle2" display="block">
                   Policy Updates
                  </Typography>
                </Box>
              </IconButton>
              <RegisterLoginDrawer />
              <IconButton color="inherit" aria-label="Search" onClick={handleSearchOpen}>
                <SearchIcon fontSize="large" color="primary" />
              </IconButton>
            </Box>
          </>
        ) : (
          <>
            <Grid container spacing={{xs:0,md:4}} margin={{xs:0,md:1}}>
              <Stack direction={'row'} sx={{ display: "flex", justifyContent:'space-between', alignItems: "center", width:'100%' }}>
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                  <Link to="/">
                    <img src="https://in.bl-india.com/storage/site_settings/logo.webp" alt="Brand Liaison" style={{ height: "35px" }} />
                  </Link>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" ,justifyContent:'space-between'}}>
                  <IconButton color="inherit" onClick={handleSearchOpen}>
                    <SearchIcon fontSize="medium" color="primary" />
                  </IconButton>
                  <RegisterLoginDrawer />
                  <PartnerWithUsLink displayType="icon" fontSize="medium" color="primary"/>
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
                      
                      </List>              
                    </Box>
                  </Drawer>
                </Box>
              </Stack>
            </Grid>
          </>
        )}
      </Toolbar>
      <SearchDrawer open={isSearchOpen} onClose={handleSearchClose} />
    </AppBar>
  );
};

export default NavigationBar;
