import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Link,
    Grid,
    IconButton,
    CircularProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../../Assets/logo.svg";
import apiClient from "../../Services/api";

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "#0D629A",
    color: "#ffffff",
    padding: theme.spacing(4),
    textAlign: "center",
}));

const FooterLink = styled(Link)(({ theme }) => ({
    // margin: theme.spacing(1),
    color: "#ffffff",
    textDecoration: "none",
    // '&:hover': {
    //   textDecoration: 'underline',
    // },
}));

const SocialMediaIcons = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    "& > *": {
        margin: theme.spacing(1),
    },
}));

const Footer = () => {
    const [footerData, setFooterData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await apiClient.get("/footer");
                setFooterData(response.data);
            } catch (error) {
                console.error("Error fetching footer data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFooterData();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!footerData) {
        return null; // Or return a fallback UI if needed
    }

    return (
        <FooterContainer className="Footer-section">
            <Grid container spacing={4}>
                <Grid item xs={12} sm={3}>
                    <Typography
                        variant="h6"
                        textAlign={"left"}
                        mb={3}
                        color={"white"}
                    >
                        Services
                    </Typography>
                    {footerData.service.map((service) => (
                        <FooterLink
                            key={service.id}
                            href={`/services/${service.slug}`}
                        >
                            <Typography
                                variant="body2"
                                className="Service-list"
                            >
                                {service.name}
                            </Typography>
                        </FooterLink>
                    ))}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography
                        variant="h6"
                        textAlign={"left"}
                        mb={3}
                        color={"white"}
                    >
                        Quick Links
                    </Typography>
                    <Box>
                        {footerData.links.map((link) => (
                            <FooterLink key={link.url} href={link.url}>
                                <Typography
                                    variant="body2"
                                    className="Service-list"
                                >
                                    {link.title}
                                </Typography>
                            </FooterLink>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography
                        variant="h6"
                        textAlign={"left"}
                        mb={3}
                        color={"white"}
                    >
                        Important Links
                    </Typography>
                    <Box>
                        {footerData.important.map((link) => (
                            <FooterLink key={link.url} href={link.url}>
                                <Typography
                                    variant="body2"
                                    className="Service-list"
                                >
                                    {link.title}
                                </Typography>
                            </FooterLink>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography
                        variant="h6"
                        textAlign={"left"}
                        mb={3}
                        color={"white"}
                    >
                        Contact Us
                    </Typography>
                    <Typography
                        variant="body2"
                        textAlign={"left"}
                        className="Service-list"
                        sx={{ color: "#ffffff" }}
                    >
                        {footerData.contact.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        dangerouslySetInnerHTML={{
                            __html: footerData.contact.address,
                        }}
                        textAlign={"left"}
                        mb={2}
                    />
                    <Typography
                        variant="body2"
                        textAlign={"left"}
                        className="Service-list"
                    >
                        {footerData.contact.email}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="body2"
                            textAlign={"left"}
                            className="Service-list"
                        >
                            {footerData.contact.phone1}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="body2"
                            textAlign={"left"}
                            className="Service-list"
                        >
                            {footerData.contact.phone2}
                        </Typography>
                    </Box>
                    <Typography
                        variant="body2"
                        textAlign={"left"}
                        className="Service-list"
                    >
                        {footerData.contact.phone3}
                    </Typography>
                </Grid>
            </Grid>
            <Divider sx={{ marginBlock: "25px", backgroundColor: "#fff" }} />

            <Grid container fluid>
                <Grid item className="footer-certificates" xs={12} sm={6}>
                    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                        {footerData.companyCert.map((link) => (
                            <FooterLink key={link.url} href={link.url}>
                                <img
                                    src={
                                        "https://in.bl-india.com/" +
                                       link.image_url
                                    }
                                    alt={link.image_alt}
                                    className="footer-img"
                                />
                            </FooterLink>
                        ))}
                       
                    </Box>
                </Grid>
                <Grid item className="footer-certificates" xs={12} sm={6}>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <img
                            src={
                                "https://in.bl-india.com/" +
                                footerData.siteCert[0].image_url
                            }
                            alt={footerData.siteCert[0].image_alt}
                            className="footer-img"
                        />
                    </Box>
                </Grid>
            </Grid>
            <Typography variant="body2" sx={{ mt: 4 }}>
                © {new Date().getFullYear()} Brand Liaison. All rights reserved.
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "10px",
                    }}
                >
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
                                <IconButton
                                    key={social.id}
                                    component="a"
                                    href={social.url}
                                    target="_blank"
                                    color="inherit"
                                >
                                    {icons[social.icon]}
                                </IconButton>
                            );
                        })}
                    </SocialMediaIcons>
                </Box>
            </Typography>
        </FooterContainer>
    );
};

export default Footer;
