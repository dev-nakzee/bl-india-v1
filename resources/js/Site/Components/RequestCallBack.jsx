import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Drawer,
    TextField,
    Typography,
    IconButton,
    MenuItem,
    Divider,
    Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "Australia" },
    { code: "+81", country: "Japan" },
    { code: "+49", country: "Germany" },
    { code: "+86", country: "China" },
    { code: "+33", country: "France" },
    { code: "+39", country: "Italy" },
    { code: "+7", country: "Russia" },
    { code: "+55", country: "Brazil" },
    { code: "+27", country: "South Africa" },
    { code: "+34", country: "Spain" },
    { code: "+82", country: "South Korea" },
    { code: "+971", country: "UAE" },
    { code: "+52", country: "Mexico" },
    { code: "+62", country: "Indonesia" },
    { code: "+60", country: "Malaysia" },
    { code: "+65", country: "Singapore" },
    { code: "+66", country: "Thailand" },
    { code: "+64", country: "New Zealand" },
    { code: "+31", country: "Netherlands" },
    { code: "+46", country: "Sweden" },
    { code: "+41", country: "Switzerland" },
    { code: "+48", country: "Poland" },
    { code: "+45", country: "Denmark" },
    { code: "+47", country: "Norway" },
    { code: "+92", country: "Pakistan" },
    { code: "+63", country: "Philippines" },
    { code: "+20", country: "Egypt" },
    { code: "+98", country: "Iran" },
    { code: "+90", country: "Turkey" },
    { code: "+58", country: "Venezuela" },
    { code: "+56", country: "Chile" },
    { code: "+51", country: "Peru" },
    { code: "+57", country: "Colombia" },
    { code: "+54", country: "Argentina" },
    { code: "+964", country: "Iraq" },
    { code: "+880", country: "Bangladesh" },
    { code: "+94", country: "Sri Lanka" },
    { code: "+32", country: "Belgium" },
    { code: "+353", country: "Ireland" },
    { code: "+386", country: "Slovenia" },
    { code: "+357", country: "Cyprus" },
    { code: "+358", country: "Finland" },
    { code: "+961", country: "Lebanon" },
    { code: "+359", country: "Bulgaria" },
    { code: "+385", country: "Croatia" },
    { code: "+380", country: "Ukraine" },
];

const schedules = [
    "Morning (9am - 12pm)",
    "Afternoon (12pm - 3pm)",
    "Evening (3pm - 6pm)",
    "Anytime",
];

const RequestCallBack = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        countryCode: "+1",
        schedule: "",
    });
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setIsDrawerOpen(open);
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
            // Send form data to the server (adjust the endpoint and data format as needed)
            // await apiClient.post('/request-callback', formData);
            toast.success("Callback request submitted successfully");
            setFormData({
                name: "",
                phone: "",
                countryCode: "+1",
                schedule: "",
            });
            setIsDrawerOpen(false);
        } catch (error) {
            toast.error("Error submitting callback request");
            console.error("Error submitting callback request:", error);
        }
    };

    return (
        <>
            {isMobile ? (
                <>
                    {" "}
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: "inherit" }}
                        onClick={toggleDrawer(true)}
                    >
                        Request Callback
                    </Button>
                </>
            ) : (
                <>
                    <ToastContainer />
                    <Divider sx={{ mt: 6, mb: 4 }} />
                    <Box sx={{ textAlign: "left", padding: 2 }}>
                        <Typography variant="h6" mb={1}>
                            Request a Callback
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            Fill out the form for the call back and learn more
                            about our services.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: "inherit" }}
                            onClick={toggleDrawer(true)}
                        >
                            Request Callback
                        </Button>
                    </Box>
                </>
            )}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 350, padding: 4 }}
                    role="presentation"
                    onKeyDown={toggleDrawer(false)}
                >
                    <IconButton onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h5" gutterBottom>
                        Request a Callback
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
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <TextField
                                    select
                                    label="Code"
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    fullWidth
                                    SelectProps={{
                                        MenuProps: {
                                            sx: { zIndex: 2000 },
                                        },
                                    }}
                                >
                                    {countryCodes.map((code) => (
                                        <MenuItem
                                            key={code.code}
                                            value={code.code}
                                        >
                                            {code.code} ({code.country})
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            select
                            label="Preferred Schedule"
                            name="schedule"
                            value={formData.schedule}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        >
                            {schedules.map((schedule) => (
                                <MenuItem key={schedule} value={schedule}>
                                    {schedule}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Drawer>
        </>
    );
};

export default RequestCallBack;
