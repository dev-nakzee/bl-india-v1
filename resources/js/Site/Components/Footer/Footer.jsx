import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Link,
    Grid,
    IconButton,
    CircularProgress,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { EmailOutlined, FmdGoodOutlined, PhoneOutlined } from "@mui/icons-material";
import apiClient from "../../Services/api";
import PartnerWithUsLink from "./PartnerWithUsLink";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
};
/*************** Mailing   ***************/

const handleMailClick = (email) => {
    window.location.href = `mailto:${email}`;
};

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "#0D629A",
    color: "#ffffff",
    padding: theme.spacing(4),
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
        paddingTop: theme.spacing(4),
    },
   
}));

const FooterLink = styled(Link)(({ theme }) => ({
    color: "#ffffff",
    textDecoration: "none",
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        return null;
    }

    const renderSection = (title, content) => (
        <Grid item xs={12} sm={3} key={title}>
            <Typography variant="h6" textAlign={"left"} mb={3} color={"white"}>
                {title}
            </Typography>
            <Typography variant="h6" textAlign={"left"} mb={3} color={"white"}>
            {content}
            </Typography>
          
        </Grid>
    );

    const renderAccordionSection = (title, content, defaultOpen = false) => (
        <Grid item xs={12} sm={12} key={title}>
            <Accordion defaultExpanded={defaultOpen}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                    <Typography color="white">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>{content}</AccordionDetails>
            </Accordion>
        </Grid>
    );

    const servicesContent = footerData.service.map((service) => (
        <FooterLink key={service.id} href={`/services/${service.slug}`}>
            <Typography variant="body2" className="Service-list">
                {service.name}
            </Typography>
        </FooterLink>
    ));

    const quickLinksContent = footerData.links.map((link) => (
        <FooterLink key={link.url} href={link.url}>
            <Typography variant="body2" className="Service-list">
                {link.title}
            </Typography>
        </FooterLink>
    ));

    const importantLinksContent = (
        <>
            {footerData.important.map((link) => (
                <FooterLink key={link.url} href={link.url}>
                    <Typography variant="body2" className="Service-list">
                        {link.title}
                    </Typography>
                </FooterLink>
            ))}
            <FooterLink key="partnerWithUs">
                <PartnerWithUsLink displayType="text"/>
            </FooterLink>
        </>
    );

    const contactUsContent = (
        <>
            <Box className="footer-address" sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px' ,marginBottom:1}}>
                <FmdGoodOutlined sx={{ color: "#fff" }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                        variant="body2"
                        dangerouslySetInnerHTML={{ __html: footerData.contact.address }}
                        textAlign={"left"}
                        mb={2}
                    />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <EmailOutlined sx={{ color: "#fff" }} />
                <Typography
                    variant="body2"
                    textAlign={"left"}
                    className="Service-list"
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                        handleMailClick(
                            "nfo@bl-india.com"
                        )
                    }
                >
                    {footerData.contact.email}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <PhoneAndroidIcon sx={{ color: "#fff" }} />
                    <Typography
                        variant="body2"
                        textAlign={"left"}
                        className="Service-list"
                        onClick={() =>
                            handleCall(footerData.contact.phone1)
                        } sx={{ cursor: "pointer" }}
                    >
                        {footerData.contact.phone1}
                    </Typography>
                </Box>
                &nbsp; &nbsp;
                <Typography
                    variant="body2"
                    textAlign={"left"}
                    className="Service-list"
                    onClick={() =>
                        handleCall(footerData.contact.phone2)
                    } sx={{ cursor: "pointer" }}
                >
                    {footerData.contact.phone2}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <PhoneOutlined sx={{ color: "#fff" }} />
                <Typography
                    variant="body2"
                    textAlign={"left"}
                    className="Service-list"
                    onClick={() =>
                        handleCall(footerData.contact.phone3)
                    } sx={{ cursor: "pointer" }}
                >
                    {footerData.contact.phone3}
                </Typography>
            </Box>
        </>
    );

    return (
        <>
            <FooterContainer className="Footer-section">
                <Grid container spacing={2}>
                    {isMobile ? (
                        <>
                            {renderAccordionSection("Services", servicesContent, true)}
                            {renderAccordionSection("Quick Links", quickLinksContent)}
                            {renderAccordionSection("Important Links", importantLinksContent)}
                            {renderAccordionSection("Contact Us", contactUsContent)}
                        </>
                    ) : (
                        <>
                            {renderSection("Services", servicesContent)}
                            {renderSection("Quick Links", quickLinksContent)}
                            {renderSection("Important Links", importantLinksContent)}
                            {renderSection("Contact Us", contactUsContent)}
                        </>
                    )}
                </Grid>
                <Divider sx={{ marginBlock: "25px", backgroundColor: "#fff" }} />
                <Grid container>
                    <Grid item className="footer-certificates" xs={12} sm={6}>
                        <Box className="f-certificates" sx={{ display: "flex", justifyContent: "flex-start" }}>
                            {footerData.companyCert.map((link) => (
                                <FooterLink key={link.url} href={link.url}>
                                    <img
                                        src={"https://in.bl-india.com/" + link.image_url}
                                        alt={link.image_alt}
                                        className="footer-img"
                                    />
                                </FooterLink>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item className="footer-certificates" xs={12} sm={6}>
                        <Box className="mcertificate" sx={{ display: "flex", justifyContent: "end" }}>
                            {footerData.siteCert.map((link) => (
                                <FooterLink key={link.url} href={link.url}>
                                    <img
                                        src={"https://in.bl-india.com/" + link.image_url}
                                        alt={link.image_alt}
                                        className="footer-img"
                                    />
                                </FooterLink>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{MarginTop:{xs:2,md:4,lg:4}}}>
                    © {new Date().getFullYear()} Brand Liaison. All rights reserved.
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "10px",
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
        </>
    );
};

export default Footer;
