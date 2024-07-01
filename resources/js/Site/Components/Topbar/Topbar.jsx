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

const socialIcons = {
  Facebook: <FacebookIcon />,
  Twitter: <TwitterIcon />,
  LinkedIn: <LinkedInIcon />,
  Pinterest: <PinterestIcon />,
  Instagram: <InstagramIcon />,
  YouTube: <YouTubeIcon />,
};

function Topbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [socialMedia, setSocialMedia] = useState([]);
  const [topMenu, setTopMenu] = useState([]);
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

    const fetchTopbarData = async () => {
      try {
        const response = await apiClient.get("/top-bar");
        setSocialMedia(response.data.socialMedia);
        setTopMenu(response.data.topMenu);
      } catch (error) {
        console.error("Error fetching topbar data:", error);
      }
    };

    fetchTopbarData();
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
              {socialMedia.map((social) => (
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
                  {topMenu.map((menuItem) => (
                    <ListItem button component={Link} to={menuItem.url} key={menuItem.url}>
                      <ListItemText primary={menuItem.title} />
                    </ListItem>
                  ))}
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
              {socialMedia.map((social) => (
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
            </Box>
            <Box
              className="box-hidden"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {topMenu.map((menuItem) => (
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
