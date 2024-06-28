import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Container,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
} from "@mui/material";
import { Helmet } from "react-helmet";
import apiClient from "../Services/api";
import { toast, ToastContainer } from "react-toastify";
import parse from 'html-react-parser';
import "react-toastify/dist/ReactToastify.css";
import {
    EmailOutlined,
    FmdGoodOutlined,
    PhoneOutlined,
} from "@mui/icons-material";

const Contact = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        phone: "",
        organization: "",
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await apiClient.get("/contact");
            setData(response.data);
        } catch (error) {
            toast.error("Error fetching contact data");
            console.error("Error fetching contact data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post("/contact-form", formData);
            toast.success("Message sent successfully");
            setFormData({
                name: "",
                email: "",
                message: "",
                phone: "",
                organization: "",
            });
        } catch (error) {
            toast.error("Error sending message");
            console.error("Error sending message:", error);
        }
    };

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

    if (!data) {
        return null;
    }

    return (
        <>
            <ToastContainer />
            <Helmet>
                <title>{data.page.seo_title}</title>
                <meta name="description" content={data.page.seo_description} />
                <meta name="keywords" content={data.page.seo_keywords} />
            </Helmet>
            <Box sx={{ padding: 4 }}>
                <Typography
                    className="page-heading"
                    variant="h4"
                    textAlign="center"
                    gutterBottom
                    marginBottom={5}
                >
                    Contact Us
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Get in Touch
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                {data.contact.name}
                            </Typography>

                            <List>
                                <ListItem sx={{ paddingLeft: 0 }}>
                                    <FmdGoodOutlined
                                        className="contact-icon"
                                        color="secondary"
                                    />
                                    <ListItemText
                                        primary="Address"
                                        secondary={parse(data.contact.address)}
                                    />
                                </ListItem>
                                <ListItem sx={{ paddingLeft: 0 }}>
                                    <Box
                                        sx={{
                                            paddingRight: 2,
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <EmailOutlined
                                            className="contact-icon"
                                            color="secondary"
                                        />
                                        <ListItemText
                                            primary="Email"
                                            secondary={data.contact.email}
                                        />
                                    </Box>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: 0 }}>
                                    <PhoneOutlined
                                        className="contact-icon"
                                        color="secondary"
                                    />
                                    <ListItemText
                                        primary="Mobile No"
                                        secondary={data.contact.phone1}
                                    />
                                    <ListItemText
                                        primary="Mobile No"
                                        secondary={data.contact.phone2}
                                    />
                                </ListItem>

                                <ListItem sx={{ paddingLeft: 0 }}>
                                    <PhoneOutlined
                                        className="contact-icon"
                                        color="secondary"
                                    />
                                    <ListItemText
                                        primary="Office No"
                                        secondary={data.contact.phone3}
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ marginTop: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Feel Free to message
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    label="Organization"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    required
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Send Message
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: 4 }}>
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.772255150437!2d77.28261647620775!3d28.63658707566256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfca9ee9d65df%3A0x993a638ba380a2a8!2sBrand%20Liaison%20India%20Private%20Limited!5e0!3m2!1sen!2sin!4v1719484146902!5m2!1sen!2sin"
                    style={{ border: 0, width: "100%", height: "410px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </Box>
        </>
    );
};

export default Contact;
