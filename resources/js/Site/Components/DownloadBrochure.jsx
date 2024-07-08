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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HighlightOffOutlined } from "@mui/icons-material";

const services = ["Service 1", "Service 2", "Service 3", "Service 4"];

const sources = ["Source 1", "Source 2", "Source 3", "Source 4"];

const DownloadBrochure = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        source: "",
        message: "",
    });

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
            // await apiClient.post('/download-brochure', formData);
            toast.success("Brochure request submitted successfully");
            setFormData({
                name: "",
                company: "",
                email: "",
                phone: "",
                service: "",
                source: "",
                message: "",
            });
            setIsDrawerOpen(false);
        } catch (error) {
            toast.error("Error submitting brochure request");
            console.error("Error submitting brochure request:", error);
        }
    };

    return (
        <>
            <ToastContainer />
            <Divider sx={{ mt: 6, mb: 4}}/>
            <Box sx={{ textAlign: "left", padding: 2 }}>
                <Typography variant="h6" mb={1}>
                    Download Our Brochure
                </Typography>
                <Typography variant="body1" mb={1}>
                    Fill out the form to download our brochure and learn more
                    about our services.
                </Typography>
                <Button sx={{textTransform:'inherit'}}
                    variant="contained"
                    color="primary"
                    onClick={toggleDrawer(true)}
                >
                    Download Brochure
                </Button>
            </Box>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                        onClick={toggleDrawer(false)}>
                        <HighlightOffOutlined color="primary" />
                    </IconButton>
                </Box>
                <Box
                    sx={{ width: 350, padding: 4 }}
                    role="presentation"
                    // onKeyDown={toggleDrawer(false)}
                >
                    <Typography variant="h5" gutterBottom>
                        Request Brochure
                    </Typography>
                    <Typography variant="" gutterBottom>Enter the user detail her</Typography>
                    <Divider
                        color="primary"
                        component="div"
                        role="presentation"
                        aria-hidden="true"
                    />
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
                            label="Company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
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
                            select
                            label="Service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        >
                            {services.map((service) => (
                                <MenuItem key={service} value={service}>
                                    {service}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Source"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        >
                            {sources.map((source) => (
                                <MenuItem key={source} value={source}>
                                    {source}
                                </MenuItem>
                            ))}
                        </TextField>
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

export default DownloadBrochure;
