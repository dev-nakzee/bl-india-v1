import React from 'react';
import { Box, Typography, Link, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#0D629A',
  color: '#ffffff',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1),
  color: '#ffffff',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SocialMediaIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  '& > *': {
    margin: theme.spacing(1),
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">About Us</Typography>
          <Typography variant="body2">
            We are a leading compliance consultancy firm providing end-to-end solutions for all your regulatory needs. Our expertise ensures your business stays compliant with the latest standards and regulations.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Quick Links</Typography>
          <Box>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/services">Services</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Follow Us</Typography>
          <SocialMediaIcons>
            <IconButton component="a" href="https://www.facebook.com" target="_blank" color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton component="a" href="https://www.twitter.com" target="_blank" color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton component="a" href="https://www.linkedin.com" target="_blank" color="inherit">
              <LinkedInIcon />
            </IconButton>
            <IconButton component="a" href="https://www.instagram.com" target="_blank" color="inherit">
              <InstagramIcon />
            </IconButton>
            <IconButton component="a" href="https://www.youtube.com" target="_blank" color="inherit">
              <YouTubeIcon />
            </IconButton>
          </SocialMediaIcons>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ mt: 4 }}>
        © {new Date().getFullYear()} Brand Liaison. All rights reserved.
      </Typography>
    </FooterContainer>
  );
};

export default Footer;