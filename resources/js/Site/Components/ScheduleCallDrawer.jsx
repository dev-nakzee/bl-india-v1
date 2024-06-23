import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Drawer,
    IconButton,
    Grid,
    InputAdornment,
    MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import { styled } from "@mui/system";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../Services/api";

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
    { code: "+64", country: "New Zealand" },
    { code: "+32", country: "Belgium" },
    { code: "+353", country: "Ireland" },
    { code: "+48", country: "Poland" },
    { code: "+386", country: "Slovenia" },
    { code: "+357", country: "Cyprus" },
    { code: "+358", country: "Finland" },
    { code: "+961", country: "Lebanon" },
    { code: "+359", country: "Bulgaria" },
    { code: "+385", country: "Croatia" },
    { code: "+380", country: "Ukraine" },
];

const ScheduleCall = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingTop: '5%',
    paddingBottom: '5%',
    backgroundColor: '#C3E7FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column', // Change flex direction to column on small screens
      alignItems: 'stretch', // Stretch items vertically on small screens
      paddingTop: theme.spacing(3), // Adjust top padding for small screens
      paddingBottom: theme.spacing(3), // Adjust bottom padding for small screens
    },
  }));

const ScheduleCallDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        countryCode: "+1",
        schedule: "",
    });

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post("/schedule-call", formData);
            toast.success("Call scheduled successfully");
            setFormData({
                name: "",
                phone: "",
                countryCode: "+1",
                schedule: "",
            });
            handleDrawerClose();
        } catch (error) {
            toast.error("Failed to schedule call");
        }
    };

    return (
        <>
            <ScheduleCall className='schedule-section'>
                <Box  className="schedule-section-call-details"
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
                            marginRight:'60px'
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDrawerOpen}
                >
                    Connect with us
                </Button>
            </ScheduleCall>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
                sx={{ zIndex: 1301 }}
            >
                <Box sx={{ width: 350, p: 3 }}>
                    <IconButton onClick={handleDrawerClose} sx={{ mb: 2 }}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                        Schedule a Call
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
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
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TextField
                                            select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                            sx={{ width: "100px", mr: 1 }}
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
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Schedule (Date and Time)"
                            name="schedule"
                            type="datetime-local"
                            value={formData.schedule}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Schedule Call
                        </Button>
                    </Box>
                </Box>
            </Drawer>
            <ToastContainer />
        </>
    );
};

export default ScheduleCallDrawer;
