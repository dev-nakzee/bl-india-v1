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
import SharePage from "../SharePage";

const socialIcons = {
  Facebook: <FacebookIcon />,
  Twitter: <TwitterIcon />,
  LinkedIn: <LinkedInIcon />,
  Pinterest: <PinterestIcon />,
  Instagram: <InstagramIcon />,
  YouTube: <YouTubeIcon />,
};

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

function Topbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [languages, setLanguages] = useState(globalLanguages);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [socialMedia, setSocialMedia] = useState([]);
  const [topMenu, setTopMenu] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

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
        window.location.reload(); // Refresh the page
      } catch (error) {
        console.error("Error setting locale:", error);
      }
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position={isMobile ? "sticky" : "static"} >
      <Toolbar sx={{ background: "#0D629A" }} className="Topbar-section">
        {isMobile ? (
          <>
            <Box
              sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-start" }}
            >
              {socialMedia && socialMedia.map((social) => (
                <IconButton
                  key={social.id}
                  component="a"
                  href={social.url}
                  target="_blank"
                  color="inherit"
                >
                  {socialIcons[social.icon]}
                </IconButton>
              ))}
              <SharePage color="whitebg"/>
            </Box>
           
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              {socialMedia && socialMedia.map((social) => (
                <IconButton
                  key={social.id}
                  component="a"
                  href={social.url}
                  target="_blank"
                  color="inherit"
                >
                  {socialIcons[social.icon]}
                </IconButton>
              
              ))}
                <SharePage color="whitebg"/>
            </Box>
            <Box
              className="box-hidden"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {topMenu && topMenu.map((menuItem) => (
                <Typography
                  key={menuItem.url}
                  variant="bodytext"
                  component={Link}
                  to={menuItem.url}
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                    marginRight: 2,
                  }}
                >
                  {menuItem.title}
                </Typography>
              ))}
              <IconButton color="inherit" onClick={handleLanguageClick}>
                <LanguageIcon />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  {selectedLanguage.toUpperCase()}
                </Typography>
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
