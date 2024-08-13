import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Button,
    Grid,
    TextField,
    MenuItem,
    InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import apiClient from "../../Services/api"; // Ensure this is your configured axios instance
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { countries } from "country-data";

const BrochureSection = styled(Box)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing(4),
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginX: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        padding: theme.spacing(2),
    },
}));

const BrochureContent = styled(Box)(({ theme }) => ({
    textAlign: "left",
    padding: theme.spacing(2),
}));

const BrochureImage = styled("img")(({ theme }) => ({
    width: "100%",
    maxWidth: "100%",
}));

const HomeBrochure = () => {
    const [brochureData, setBrochureData] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
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
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrochureData = async () => {
            try {
                const response = await apiClient.get("/home-brochure");
                setBrochureData(response.data.section[0]);
                setServices(response.data.services);
            } catch (error) {
                console.error("Error fetching brochure data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrochureData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Filter out non-numeric characters from phone input
        if (name === "phone") {
            const filteredValue = value.replace(/\D/g, ''); // Remove non-digit characters
            setFormData({ ...formData, [name]: filteredValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        try {
            const response = await apiClient.post("/submit-brochure", formData);
            toast.success(
                "OTP has been sent to your email. Please verify to proceed."
            );
            setShowOtpInput(true);
        } catch (error) {
            toast.error("Failed to submit the form. Please try again.");
            console.error("Error submitting form:", error);
        } finally {
            setFormLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await apiClient.post("/verify-otp", {
                email: formData.email,
                otp: otp,
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "client",
                    JSON.stringify(response.data.client)
                );
                toast.success("OTP verified successfully!");
                navigate("/account/brochures");
            }
        } catch (error) {
            toast.error("Failed to verify OTP. Please check and try again.");
            console.error("OTP Verification Error:", error);
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

    if (!brochureData) {
        return null; // Or a fallback UI
    }

    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <BrochureSection className="Brochure-section">
            <ToastContainer />
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <BrochureContent className="Brochure-section-data">
                        <Typography variant="h3" sx={{ mt: 2 }}>
                            {brochureData.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            {brochureData.tag_line}
                        </Typography>
                        {isMobile ? (
                            <>
                                <Grid item xs={12} md={6}>
                                    <BrochureImage
                                        src={
                                            "https://in.bl-india.com/" +
                                            brochureData.image_url
                                        }
                                        alt={brochureData.image_alt}
                                    />
                                </Grid>
                            </>
                        ) : (
                            <></>
                        )}
                        {isLoggedIn ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => navigate("/account/brochures")}
                                sx={{ mt: 2 }}
                            >
                                Go to Brochures
                            </Button>
                        ) : (
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{ mt: 3 }}
                            >
                                {formLoading ? (
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
                                ) : showOtpInput ? (
                                    <>
                                        <TextField
                                            label="Enter OTP"
                                            value={otp}
                                            onChange={handleOtpChange}
                                            fullWidth
                                            required
                                        />
                                        <Button
                                            onClick={handleVerifyOtp}
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 2 }}
                                        >
                                            Verify OTP
                                        </Button>
                                    </>
                                ) : (
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                fullWidth
                                                required
                                                sx={{ mb: 2 }}
                                            />
                                            <TextField
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                fullWidth
                                                sx={{ mb: 2 }}
                                            />
                                            <TextField
                                                label="Phone"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                fullWidth
                                                required
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <TextField
                                                                select
                                                                name="countryCode"
                                                                value={
                                                                    formData.countryCode
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                variant="standard"
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
                                                select
                                                label="Service"
                                                name="service"
                                                value={formData.service}
                                                onChange={handleInputChange}
                                                fullWidth
                                                required
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
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                select
                                                label="Referral Source"
                                                name="source"
                                                value={formData.source}
                                                onChange={handleInputChange}
                                                fullWidth
                                                required
                                            >
                                                <MenuItem value="social media">
                                                    Social Media
                                                </MenuItem>
                                                <MenuItem value="google">
                                                    Google
                                                </MenuItem>
                                                <MenuItem value="reference">
                                                    Reference
                                                </MenuItem>
                                                <MenuItem value="newspaper">
                                                    Newspaper
                                                </MenuItem>
                                                <MenuItem value="website article">
                                                    Website Article
                                                </MenuItem>
                                                <MenuItem value="others">
                                                    Others
                                                </MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                fullWidth
                                                multiline
                                                rows={3}
                                            />
                                        </Grid>
                                        <Grid item xs={12} textAlign={{xs:'center' ,sm:'center',md:'left'}}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                sx={{ mt: 2 }}
                                            >
                                                Submit Request
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>
                        )}
                    </BrochureContent>
                </Grid>
                {isMobile ? (
                    <></>
                ) : (
                    <>
                        <Grid item xs={12} md={6}>
                            <BrochureImage
                                src={
                                    "https://in.bl-india.com/" +
                                    brochureData.image_url
                                }
                                alt={brochureData.image_alt}
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </BrochureSection>
    );
};

export default HomeBrochure;
