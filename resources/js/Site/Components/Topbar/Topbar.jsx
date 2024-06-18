import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import apiClient from '../../Services/api';

function Topbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const determineLanguages = () => {
            const hostname = window.location.hostname;
            const subdomain = hostname.split('.')[0];

            const globalLanguages = [
                { name: 'English', locale: 'en' },
                { name: 'French', locale: 'fr' },
                { name: 'Spanish', locale: 'es' },
                { name: 'Italian', locale: 'it' },
                { name: 'Chinese (Simplified)', locale: 'zh-Hans' },
                { name: 'Chinese (Traditional)', locale: 'zh-Hant' },
                { name: 'Deutsch', locale: 'de' },
                { name: 'Arabic', locale: 'ar' },
                { name: 'Japanese', locale: 'ja' },
                { name: 'Korean', locale: 'ko' },
                { name: 'Russian', locale: 'ru' },
                { name: 'Malay', locale: 'ms' },
                { name: 'Vietnamese', locale: 'vi' },
                { name: 'Thai', locale: 'th' },
                { name: 'Polish', locale: 'pl' },
                { name: 'Portuguese', locale: 'pt' }
            ];

            const inSubdomainLanguages = [
                { name: 'English', locale: 'en' },
                { name: 'Hindi', locale: 'hi' },
                { name: 'Marathi', locale: 'mr' },
                { name: 'Bangali', locale: 'bn' },
                { name: 'Telegu', locale: 'te' },
                { name: 'Tamil', locale: 'ta' },
                { name: 'Kanada', locale: 'kn' },
                { name: 'Malayalam', locale: 'ml' },
                { name: 'Gujarati', locale: 'gu' },
                { name: 'Punjabi', locale: 'pa' }
            ];

            if (subdomain === 'global') {
                setLanguages(globalLanguages);
            } else if (subdomain === 'in') {
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

    const handleLanguageClose = (locale) => {
        setAnchorEl(null);
        if (locale) {
            window.location.href = `/set-locale/${locale}`;
        }
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ background: '#0D629A' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        component={Link}
                        to="/about"
                        sx={{ color: 'inherit', textDecoration: 'none', marginRight: 2 }}
                    >
                        About
                    </Typography>
                    <Typography
                        component={Link}
                        to="/downloads"
                        sx={{ color: 'inherit', textDecoration: 'none', marginRight: 2 }}
                    >
                        Downloads
                    </Typography>
                    <Typography
                        component={Link}
                        to="/gallery"
                        sx={{ color: 'inherit', textDecoration: 'none', marginRight: 2 }}
                    >
                        Gallery
                    </Typography>
                    <Typography
                        component={Link}
                        to="/careers"
                        sx={{ color: 'inherit', textDecoration: 'none', marginRight: 2 }}
                    >
                        Careers
                    </Typography>
                    <Typography
                        component={Link}
                        to="/contact"
                        sx={{ color: 'inherit', textDecoration: 'none', marginRight: 2 }}
                    >
                        Contact
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={handleLanguageClick}
                    >
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
            </Toolbar>
        </AppBar>
    );
}

export default Topbar;
