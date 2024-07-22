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
    CircularProgress,
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../Services/api"; // Ensure the import path is correct

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
        service: "",
        source: "",
    });
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Implement actual API submission logic here
            toast.success("Brochure request submitted successfully");
            setIsDrawerOpen(false);
        } catch (error) {
            toast.error("Error submitting brochure request");
            console.error("Error submitting brochure request:", error);
        }
    };

    React.useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await apiClient.get('/services');
                setServices(response.data.services); // Assuming the response body will have a services array
                setLoading(false);
            } catch (error) {
                toast.error("Failed to load services");
                console.error("Error fetching services:", error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <>
            
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <IconButton onClick={toggleDrawer(false)}><CloseIcon /></IconButton>
                <Container sx={{ width: 350, padding: 4 }}>
                    <Typography variant="h6" mb={2}>Request Brochure</Typography>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                name="name"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={handleChange}
                                sx={{mb: 2 }}
                            />
                            <TextField
                                label="Email"
                                type="email"
                                name="email"
                                fullWidth
                                required
                                value={formData.email}
                                onChange={handleChange}
                                sx={{mb: 2 }}
                            />
                            <TextField
                                label="Company"
                                name="company"
                                fullWidth
                                value={formData.company}
                                onChange={handleChange}
                                sx={{mb: 2 }}
                            />
                            <TextField
                                label="Phone"
                                name="phone"
                                fullWidth
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                sx={{mb: 2 }}
                            />
                            <TextField
                                select
                                label="Service"
                                name="service"
                                fullWidth
                                required
                                value={formData.service}
                                onChange={handleChange}
                                sx={{mb: 2 }}
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
                                sx={{mb: 2, zIndex: 1203}}
                            >
                                {sources.map((source) => (
                                    <MenuItem key={source} value={source} sx={{zIndex: 1203}}>
                                        {source}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </form>
                    )}
                </Container>
            </Drawer>
            {isMobile ? (
          <>
            <Button onClick={toggleDrawer(true)} variant="contained" color="primary" mb={1}>
                    Request Brochure
                </Button>
          </>

        ):(
          <>
          <ToastContainer />
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
          </>
        )
}
        </>
    );
};

export default DownloadBrochure;
