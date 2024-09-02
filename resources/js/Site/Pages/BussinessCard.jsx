// Bussiness Card.js
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Tabs,
    Tab,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Alert,
    MenuItem,
    InputAdornment,
    IconButton,
    Divider,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import WhatsAppIcon from "@mui/icons-material/WhatsApp"; // Import WhatsApp Icon from MUI Icons

import { Helmet } from "react-helmet";
import apiClient from "../Services/api";
import { countries } from "country-data";
import { Link } from "react-router-dom";

import parse from "html-react-parser";
import {
    ArrowOutwardOutlined,
    CollectionsOutlined,
    EmailOutlined,
    FmdGoodOutlined,
    InfoOutlined,
    MiscellaneousServicesOutlined,
    PaymentsOutlined,
    PeopleOutlineOutlined,
    PhoneOutlined,
} from "@mui/icons-material";

const BussinessCard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        phone: "",
        country_code: "+91",
        organization: "",
    });
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [mobileNumber, setMobileNumber] = useState("");

    const handleShare = () => {
        if (mobileNumber.trim() === "") {
            alert("Please enter a valid mobile number");
            return;
        }

        // Generate the WhatsApp URL
        const url = `https://wa.me/${country_code.replace(
            "+",
            ""
        )}${mobileNumber}?text=Check%20this%20out:%20https://in.bl-india.com/`;

        // Open WhatsApp
        window.open(url, "_blank");
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await apiClient.get("/contact");
            setData(response.data);
        } catch (error) {
            setFormError("Error fetching contact data");
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
    // State for Tabs
    const [selectedTab, setSelectedTab] = useState(0);

    // Descriptions for each tab
    const tabDescriptions = [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "Description for Tab 3",
        "Description for Tab 4",
        "Description for Tab 5",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        setFormSuccess("");
        try {
            await apiClient.post("/contact-form", formData);
            setFormSuccess("Message sent successfully");
            setFormData({
                name: "",
                email: "",
                message: "",
                phone: "",
                country_code: "+91",
                organization: "",
            });
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                const errorMessage = Object.values(error.response.data.errors)
                    .flat()
                    .join(", ");
                setFormError(errorMessage);
            } else {
                setFormError("Error sending message");
            }
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

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Helmet>
                <title>{data.page.seo_title}</title>
                <meta name="description" content={data.page.seo_description} />
                <meta name="keywords" content={data.page.seo_keywords} />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Rajesh Kumar" />
                <meta
                    name="publisher"
                    content="Brand Liaison India Pvt. Ltd."
                />
                <meta
                    name="copyright"
                    content="Brand Liaison India Pvt. Ltd."
                />
                <meta name="Classification" content="Business" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:description"
                    content={data.page.seo_description}
                />
                <meta property="og:url" content="https://bl-india.com" />
                <meta property="og:site_name" content="Brand Liaison India®" />
                <meta
                    property="og:image"
                    content={"https://bl-india.com" + data.page.image_url}
                />
                <meta name="format-detection" content="telephone=no" />
                <link rel="canonical" href="https://bl-india.com/" />
            </Helmet>
            <Box padding={{ lg: 0, md: 0, sm: 0, xs: 2 }}>
                <Grid container spacing={{ xs: 1, md: 4 }}>
                    <Grid item xs={12} md={3}>
                        <Box
                            className="enquiry-left"
                            sx={{
                                padding: 3,
                                backgroundColor: "#0D629A",
                                height: "100%",
                                color: "#fff",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexGrow: 1,
                                }}
                            ></Box>

                            <Typography
                                variant="h5"
                                textAlign="left"
                                gutterBottom
                                marginTop={2}
                                marginBottom={1}
                                color={"white"}
                            >
                                Contact Us
                            </Typography>

                            <List>
                                <ListItem sx={{ paddingLeft: 0 }}>
                                    <FmdGoodOutlined
                                        className="contact-icon"
                                        color="white"
                                    />
                                    <ListItemText
                                        primary="Address"
                                        secondary={parse(
                                            "  " +
                                                "   " +
                                                data.contact.name +
                                                data.contact.address
                                        )}
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
                                            color="white"
                                        />
                                        <ListItemText
                                            primary="Email"
                                            secondary={data.contact.email}
                                            color="white"
                                        />
                                    </Box>
                                </ListItem>
                                <ListItem sx={{ paddingLeft: 0 }}>
                                    <PhoneOutlined
                                        className="contact-icon"
                                        color="white"
                                    />
                                    <ListItemText
                                        primary="Mobile No"
                                        secondary={
                                            data.contact.phone1 +
                                            " , " +
                                            data.contact.phone2
                                        }
                                        color="white"
                                    />
                                </ListItem>
                            </List>
                            <Box sx={{ marginTop: 2, color: "white" }}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flexStart"
                                    gap={2}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: "white",
                                            borderColor: "white",
                                        }}
                                    >
                                        Share on WhatsApp
                                    </Typography>
                                    <Box display="flex" gap={1}>
                                        <TextField
                                            label="Phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: "white",
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: "white",
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: "white",
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "white",
                                                    },
                                                },
                                                "& .MuiInputLabel-root": {
                                                    color: "white",
                                                },
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <TextField
                                                            select
                                                            name="country_code"
                                                            variant="standard"
                                                            value={
                                                                formData.country_code
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            sx={{
                                                                width: "auto",
                                                                minWidth:
                                                                    "80px",
                                                            }}
                                                        >
                                                            {countries.all.map(
                                                                (country) => (
                                                                    <MenuItem
                                                                        key={
                                                                            country.alpha2
                                                                        }
                                                                        value={
                                                                            country
                                                                                .countryCallingCodes[0]
                                                                        }
                                                                    >
                                                                        {
                                                                            country
                                                                                .countryCallingCodes[0]
                                                                        }{" "}
                                                                        (
                                                                        {
                                                                            country.name
                                                                        }
                                                                        )
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </TextField>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleShare}
                                    >
                                        Share on WhatsApp
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box sx={{ marginTop: 2, padding: 2 }}>
                            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                                <Typography variant="h4" gutterBottom>
                                    Product Certification Services
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    (BIS/WPS/EPR/BEE/TEC)
                                </Typography>
                            </Box>
                            <Box sx={{ marginTop: 2 }}>
                                {/* Tabs Section */}
                                <Tabs
                                    value={selectedTab}
                                    onChange={handleTabChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    aria-label="Services Details"
                                    selectionFollowsFocus
                                >
                                    <Tab iconPosition="start"
                                        icon={<InfoOutlined />}
                                        label="About Company"
                                    />
                                    <Tab iconPosition="start"
                                        icon={<MiscellaneousServicesOutlined />}
                                        label="Services"
                                    />
                                    <Tab iconPosition="start"
                                        icon={<PeopleOutlineOutlined />}
                                        label="Clients"
                                    />
                                    <Tab iconPosition="start"
                                        icon={<CollectionsOutlined />}
                                        label="Gallery"
                                    />
                                    <Tab iconPosition="start"
                                        icon={<PaymentsOutlined />}
                                        label="Payment Info"
                                    />
                                </Tabs>

                                {/* Tab Description */}
                                <Box sx={{ padding: 1}}>
                                    <Typography variant="p" >
                                        {tabDescriptions[selectedTab]}
                                    </Typography>
                                </Box>

                            </Box>
                            <Box sx={{marginBottom:3}}> <Divider /></Box>
                      
                            <Box sx={{ marginTop: 2 }}>
                                {formError && (
                                    <Alert severity="error">{formError}</Alert>
                                )}
                                {formSuccess && (
                                    <Alert severity="success">
                                        {formSuccess}
                                    </Alert>
                                )}
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ marginTop: 1 }}
                                >
                                    Please Share your Query
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={{ xs: 1 }}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
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
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                                required
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <TextField
                                                                select
                                                                name="country_code"
                                                                variant="standard"
                                                                value={
                                                                    formData.country_code
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                sx={{
                                                                    width: "auto",
                                                                    minWidth:
                                                                        "80px",
                                                                }}
                                                            >
                                                                {countries.all.map(
                                                                    (
                                                                        country
                                                                    ) => (
                                                                        <MenuItem
                                                                            key={
                                                                                country.alpha2
                                                                            }
                                                                            value={
                                                                                country
                                                                                    .countryCallingCodes[0]
                                                                            }
                                                                        >
                                                                            {
                                                                                country
                                                                                    .countryCallingCodes[0]
                                                                            }{" "}
                                                                            (
                                                                            {
                                                                                country.name
                                                                            }
                                                                            )
                                                                        </MenuItem>
                                                                    )
                                                                )}
                                                            </TextField>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Organization"
                                                name="organization"
                                                value={formData.organization}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                type="file"
                                                variant="outlined"
                                                margin="normal"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton component="label">
                                                                <AttachFileIcon />
                                                                {/* This input will not be displayed but triggers the file selection */}
                                                                <input
                                                                    type="file"
                                                                    hidden
                                                                />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="normal"
                                                multiline
                                                rows={4}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                sx={{ marginRight: 3 }}
                                            >
                                                Send Message
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outlined"
                                                color="primary"
                                            >
                                                Bussiness Card{" "}
                                                <ArrowOutwardOutlined />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default BussinessCard;
