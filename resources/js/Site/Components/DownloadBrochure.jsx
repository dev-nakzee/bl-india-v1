import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    Drawer,
    TextField,
    Typography,
    IconButton,
    MenuItem,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import apiClient from "../Services/api"; // Ensure this is your configured axios instance
import useMediaQuery from "@mui/material/useMediaQuery";

const sources = [
    "Social Media",
    "Google",
    "Reference",
    "Newspaper",
    "Website Article",
    "Others",
];

const DownloadBrochure = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        source: "",
    });
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await apiClient.get("/services");
                setServices(response.data.services);
                setLoading(false);
            } catch (error) {
                setStatusMessage("Failed to load services.");
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setIsDrawerOpen(open);
        if (!open) {
            setShowOtpInput(false); // Reset OTP input on close
            setStatusMessage(""); // Clear messages on close
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage("Sending OTP...");
        try {
            const response = await apiClient.post("/request-otp", formData);
            setStatusMessage("OTP has been sent to your email.");
            setShowOtpInput(true);
        } catch (error) {
            setStatusMessage("Failed to send OTP.");
        }
    };

    const verifyOtp = async () => {
        setStatusMessage("Verifying OTP...");
        try {
            const response = await apiClient.post("/verify-otp", {
                email: formData.email,
                otp: otp,
            });
            setStatusMessage("OTP verified successfully.");
            setIsDrawerOpen(false);
        } catch (error) {
            setStatusMessage("Failed to verify OTP.");
        }
    };

    return (
        <>
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <IconButton onClick={toggleDrawer(false)} sx={{ justifyContent: 'flex-end' }}>
                    <CloseIcon />
                </IconButton>
                <Container sx={{ width: 350, padding: 4 }}>
                    <Typography variant="h6" mb={2}>Request Brochure</Typography>
                    {loading ? (
                        <CircularProgress />
                    ) : showOtpInput ? (
                        <Box component="form" onSubmit={verifyOtp}>
                            <TextField
                                label="OTP"
                                type="text"
                                fullWidth
                                required
                                value={otp}
                                onChange={handleOtpChange}
                                sx={{ mb: 2 }}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Verify OTP
                            </Button>
                        </Box>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                name="name"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Email"
                                type="email"
                                name="email"
                                fullWidth
                                required
                                value={formData.email}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Company"
                                name="company"
                                fullWidth
                                value={formData.company}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Phone"
                                name="phone"
                                fullWidth
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                select
                                label="Service"
                                name="service"
                                fullWidth
                                required
                                value={formData.service}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            >
                                {services.map((service) => (
                                    <MenuItem
                                        key={service.id}
                                        value={service.name}
                                    >
                                        {service.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Source"
                                name="source"
                                fullWidth
                                required
                                value={formData.source}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            >
                                {sources.map((source) => (
                                    <MenuItem key={source} value={source}>
                                        {source}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit Request
                            </Button>
                        </form>
                    )}
                    {statusMessage && (
                        <Typography color="error" variant="body2" mt={2}>
                            {statusMessage}
                        </Typography>
                    )}
                </Container>
            </Drawer>
            {isMobile ? (
                <Button onClick={toggleDrawer(true)} variant="contained" color="primary" mb={1}>
                    Request Brochure
                </Button>
            ) : (
                <Box sx={{ textAlign: "left", padding: 2 }}>
                    <Typography variant="h6" mb={1} mt={4}>
                        Download Brochures
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        Please fill out the form below to request a brochure for your business.
                    </Typography>
                    <Button onClick={toggleDrawer(true)} variant="contained" color="primary" mb={1}>
                        Request Brochure
                    </Button>
                </Box>
            )}
        </>
    );
};

export default DownloadBrochure;
