import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Drawer,
    IconButton,
    MenuItem,
    Grid,
    Alert,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import { styled } from "@mui/system";
import { countries } from "country-data";
import apiClient from "../Services/api";

const ScheduleCall = styled(Box)(({ theme }) => ({
    textAlign: "left",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: "5%",
    paddingBottom: "5%",
    backgroundColor: "#C3E7FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "stretch",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
}));

const ScheduleCallDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        countryCode: "+91",
        email: "",
        schedule: "",
    });
    const [otp, setOtp] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setShowOtpField(false);
        setLoading(false);
        setErrors({});
        setSuccessMessage("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    // This function gets the next available weekday if the selected date falls on a weekend
    const getNextAvailableDay = (date) => {
        let newDate = new Date(date);
        while (newDate.getDay() === 6 || newDate.getDay() === 0) { // Saturday (6) or Sunday (0)
            newDate.setDate(newDate.getDate() + 1); // Skip to next day
        }
        return newDate;
    };

    // Enforce the time to be within the 10:00 AM to 6:00 PM range
    const enforceTimeLimits = (dateTime) => {
        const date = new Date(dateTime);
        const hours = date.getHours();

        if (hours < 10) {
            date.setHours(10, 0); // Set to 10:00 AM
        } else if (hours >= 18) {
            date.setHours(18, 0); // Set to 6:00 PM
        }
        return date;
    };

    const handleDateTimeChange = (e) => {
        let selectedDateTime = new Date(e.target.value);

        // Disable weekends (Saturday and Sunday)
        selectedDateTime = getNextAvailableDay(selectedDateTime);

        // Enforce time restrictions between 10:00 AM and 6:00 PM
        selectedDateTime = enforceTimeLimits(selectedDateTime);

        // Update formData with the corrected date and time
        setFormData({ ...formData, schedule: selectedDateTime.toISOString().slice(0, 16) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccessMessage("");

        try {
            await apiClient.post("/schedule", formData);
            setShowOtpField(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general: "Failed to schedule call. Please try again.",
                });
            }
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccessMessage("");
        try {
            await apiClient.post("/schedule-verify-otp", {
                email: formData.email,
                otp,
            });
            setSuccessMessage("Call scheduled successfully");
            setFormData({
                name: "",
                phone: "",
                countryCode: "+91",
                email: "",
                schedule: "",
            });
            setOtp("");
            setShowOtpField(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message === "Invalid OTP or OTP expired."
            ) {
                setFormData({
                    name: "",
                    phone: "",
                    countryCode: "+91",
                    email: "",
                    schedule: "",
                });
                setOtp("");
                setShowOtpField(false);
                setErrors({ general: "Invalid OTP or OTP expired." });
            } else if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general: "Failed to verify OTP. Please try again.",
                });
            }
        }
    };

    return (
        <>
            <ScheduleCall className="schedule-section">
                <Box
                    className="schedule-section-call-details"
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "60px",
                        }}
                    >
                        <PermPhoneMsgIcon
                            sx={{ color: "#ffffff", fontSize: 100 }}
                        />
                        <Typography variant="h3" sx={{ fontWeight: 500 }}>
                            +91-8130615678
                            <br />
                            +91-9250056788
                        </Typography>
                    </Box>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 400,
                            pl: 7,
                            borderLeft: "5px solid #0D629A",
                        }}
                    >
                        REQUEST A SCHEDULE
                        <br />
                        FOR FREE CONSULTATION
                    </Typography>
                </Box>
                <Box className="mobile-schedule">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDrawerOpen}
                    >
                        Connect with us
                    </Button>
                </Box>
            </ScheduleCall>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
                sx={{ zIndex: 2000 }}
            >
                <Box sx={{ width: 350, p: 3, position: "relative" }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton onClick={handleDrawerClose} sx={{ mb: 2 }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                        Schedule a Call
                    </Typography>

                    {errors.general && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errors.general}
                        </Alert>
                    )}
                    {successMessage && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {successMessage}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={showOtpField ? handleVerifyOtp : handleSubmit}
                    >
                        {!showOtpField && !loading && (
                            <>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                    error={!!errors.name}
                                    helperText={errors.name && errors.name[0]}
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                    error={!!errors.email}
                                    helperText={errors.email && errors.email[0]}
                                />
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={4}>
                                        <TextField
                                            select
                                            label="Code"
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                            fullWidth
                                            error={!!errors.country_code}
                                            helperText={
                                                errors.country_code &&
                                                errors.country_code[0]
                                            }
                                            SelectProps={{
                                                MenuProps: {
                                                    sx: {
                                                        zIndex: 2100,
                                                    },
                                                },
                                            }}
                                        >
                                            {countries.all.map((country) => (
                                                <MenuItem
                                                    key={country.alpha2}
                                                    value={
                                                        country
                                                            .countryCallingCodes[0]
                                                    }
                                                >
                                                    {
                                                        country
                                                            .countryCallingCodes[0]
                                                    }{" "}
                                                    ({country.name})
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            label="Phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                            error={!!errors.phone}
                                            helperText={
                                                errors.phone && errors.phone[0]
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    label="Schedule (Date and Time)"
                                    name="schedule"
                                    type="datetime-local"
                                    value={formData.schedule}
                                    onChange={handleDateTimeChange} // Use the custom handler
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{ mt: 2, mb: 2 }}
                                    error={!!errors.scheduled_at}
                                    helperText={
                                        errors.scheduled_at &&
                                        errors.scheduled_at[0]
                                    }
                                    InputProps={{
                                        inputProps: {
                                            min: new Date().toISOString().slice(0, 16), // Set minimum to current date and time
                                            step: 1800, // 30 minutes in seconds
                                        },
                                    }}
                                />
                            </>
                        )}
                        {showOtpField && (
                            <TextField
                                label="OTP"
                                name="otp"
                                value={otp}
                                onChange={handleOtpChange}
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                                error={!!errors.otp}
                                helperText={errors.otp && errors.otp[0]}
                            />
                        )}
                        {loading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                {showOtpField ? "Verify OTP" : "Schedule Call"}
                            </Button>
                        )}
                    </Box>
                    <Typography variant="h5" sx={{ mt: 4 }}>
                        Call or WhatsApp now:
                        <br />
                        <br />
                        +91-8130615678
                        <br />
                        +91-9250056788
                    </Typography>
                </Box>
            </Drawer>
        </>
    );
};

export default ScheduleCallDrawer;
