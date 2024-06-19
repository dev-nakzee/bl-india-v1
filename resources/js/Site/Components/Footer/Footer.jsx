import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, Grid, IconButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import apiClient from '../../Services/api';

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
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await apiClient.get('/footer');
        setFooterData(response.data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!footerData) {
    return null; // Or return a fallback UI if needed
  }

  return (
    <FooterContainer>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Services</Typography>
          {footerData.service.map((service) => (
            <FooterLink key={service.id} href={`/${service.slug}`}>
              {service.name}
            </FooterLink>
          ))}
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Quick Links</Typography>
          <Box>
            {footerData.links.map((link) => (
              <FooterLink key={link.url} href={link.url}>
                {link.title}
              </FooterLink>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Important Links</Typography>
          <Box>
            {footerData.important.map((link) => (
              <FooterLink key={link.url} href={link.url}>
                {link.title}
              </FooterLink>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography variant="body2">{footerData.contact.name}</Typography>
          <Typography variant="body2">{footerData.contact.email}</Typography>
          <Typography variant="body2">{footerData.contact.phone1}</Typography>
          <Typography variant="body2">{footerData.contact.phone2}</Typography>
          <Typography variant="body2">{footerData.contact.phone3}</Typography>
          <Typography variant="body2" dangerouslySetInnerHTML={{ __html: footerData.contact.address }} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6">Follow Us</Typography>
          <SocialMediaIcons>
            {footerData.socialMedia.map((social) => {
              const icons = {
                Facebook: <FacebookIcon />,
                Twitter: <TwitterIcon />,
                LinkedIn: <LinkedInIcon />,
                Instagram: <InstagramIcon />,
                Pinterest: <PinterestIcon />,
                YouTube: <YouTubeIcon />,
              };
              return (
                <IconButton key={social.id} component="a" href={social.url} target="_blank" color="inherit">
                  {icons[social.icon]}
                </IconButton>
              );
            })}
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
