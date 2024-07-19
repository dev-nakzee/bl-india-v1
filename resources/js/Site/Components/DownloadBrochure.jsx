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
    InputAdornment,
    Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import apiClient from "../Services/api"; // Ensure the import path is correct
import { useNavigate } from "react-router-dom";
import { countries } from "country-data";

const sources = [
    "Social Media",
    "Google",
    "Reference",
    "Newspaper",
    "Website Article",
    "Others"
];

const DownloadBrochure = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        countryCode: "+91",
        service: "",
        source: "",
        message: "",
    });
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setIsDrawerOpen(open);
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
        setFormLoading(true);
        setErrors({});
        try {
            await apiClient.post("/submit-brochure", formData);
            setShowOtpInput(true);
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ form: "Failed to submit the form. Please try again." });
            }
            console.error("Error submitting form:", error);
        } finally {
            setFormLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await apiClient.post("/verify-otp", { email: formData.email, otp: otp });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('client', JSON.stringify(response.data.client));
                navigate("/account/brochures");
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors({ otp: "Failed to verify OTP. Please check and try again." });
            } else {
                setErrors({ otp: "Failed to verify OTP. Please check and try again." });
            }
            console.error("OTP Verification Error:", error);
        }
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await apiClient.get('/services');
                setServices(response.data.services); // Assuming the response body will have a services array
                setLoading(false);
            } catch (error) {
                setErrors({ form: "Failed to load services" });
                console.error("Error fetching services:", error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (isLoggedIn) {
        return (
            <Box sx={{ textAlign: 'left', padding: 2 }}>
                <Typography variant="h6" mb={1} mt={4}>
                    Download Brochures
                </Typography>
                <Typography variant="body1" mb={1}>
                    Please fill out the form below to request a brochure for your business.
                </Typography>
                <Button variant="contained" color="primary" mb={1} onClick={() => navigate("/account/brochures")}>
                    Go to Brochures
                </Button>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ textAlign: 'left', padding: 2 }}>
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
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <IconButton onClick={toggleDrawer(false)}><CloseIcon /></IconButton>
                <Container sx={{ width: 350, padding: 4 }}>
                    <Typography variant="h6" mb={2}>Request Brochure</Typography>
                    {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
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
                                error={!!errors.name}
                                helperText={errors.name}
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
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                label="Company"
                                name="company"
                                fullWidth
                                value={formData.company}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                error={!!errors.company}
                                helperText={errors.company}
                            />
                            <TextField
                                label="Phone"
                                name="phone"
                                fullWidth
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <TextField
                                                select
                                                name="countryCode"
                                                value={formData.countryCode}
                                                onChange={handleChange}
                                                variant="standard"
                                            >
                                                {countries.all.map((country) => (
                                                    <MenuItem key={country.alpha2} value={country.countryCallingCodes[0]}>
                                                        {country.countryCallingCodes[0]} ({country.name})
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!errors.phone}
                                helperText={errors.phone}
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
                                error={!!errors.service}
                                helperText={errors.service}
                            >
                                {services.map((service) => (
                                    <MenuItem key={service.id} value={service.name}>
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
                                sx={{ mb: 2, zIndex: 1203 }}
                                error={!!errors.source}
                                helperText={errors.source}
                            >
                                {sources.map((source) => (
                                    <MenuItem key={source} value={source} sx={{ zIndex: 1203 }}>
                                        {source}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Message"
                                name="message"
                                fullWidth
                                multiline
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                error={!!errors.message}
                                helperText={errors.message}
                            />
                            {formLoading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CircularProgress />
                                </Box>
                            ) : showOtpInput ? (
                                <>
                                    <TextField
                                        label="Enter OTP"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        fullWidth
                                        required
                                        error={!!errors.otp}
                                        helperText={errors.otp}
                                    />
                                    <Button onClick={handleVerifyOtp} variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Verify OTP
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {errors.form && (
                                        <Alert severity="error" sx={{ mb: 2 }}>
                                            {errors.form}
                                        </Alert>
                                    )}
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Submit
                                    </Button>
                                </>
                            )}
                        </form>
                    )}
                </Container>
            </Drawer>
        </>
    );
};

export default DownloadBrochure;
