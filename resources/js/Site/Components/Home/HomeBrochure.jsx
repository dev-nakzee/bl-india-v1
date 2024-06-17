import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Button, Grid, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../../Services/api';

const BrochureSection = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mx: 6,
}));

const BrochureContent = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(2),
}));

const BrochureImage = styled('img')(({ theme }) => ({
    width: '90%',
}));

const HomeBrochure = () => {
    const [brochureData, setBrochureData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        countryCode: '',
        services: '',
        source: '',
        message: ''
    });

    const countryCodes = [
        { code: '+1', country: 'USA' },
        { code: '+91', country: 'India' },
        // Add more country codes as needed
    ];

    const sources = [
        { value: 'social media', label: 'Social Media' },
        { value: 'google', label: 'Google' },
        { value: 'reference', label: 'Reference' },
        { value: 'newspaper', label: 'Newspaper' },
        { value: 'website article', label: 'Website Article' },
        { value: 'others', label: 'Others' }
    ];

    useEffect(() => {
        const fetchBrochureData = async () => {
            try {
                const response = await apiClient.get('/home-brochure');
                setBrochureData(response.data.section[0]);
            } catch (error) {
                console.error('Error fetching brochure data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrochureData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/brochure-request', formData);
            alert('Brochure download link has been sent to your email.');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!brochureData) {
        return null; // Or return a fallback UI if needed
    }

    return (
        <BrochureSection>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <BrochureContent>
                        <Typography variant="h2" sx={{ mt: 2, fontWeight: 400 }}>
                            {brochureData.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            {brochureData.tag_line}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="name"
                                label="Name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="company"
                                label="Company"
                                value={formData.company}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="phone"
                                label="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <TextField
                                            select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleChange}
                                            margin="none"
                                            variant="standard"
                                            sx={{ mr: 1, minWidth: 60 }}
                                        >
                                            {countryCodes.map((option) => (
                                                <MenuItem key={option.code} value={option.code}>
                                                    {option.code}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )
                                }}
                            />
                            <TextField
                                name="services"
                                label="Services"
                                value={formData.services}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                select
                                name="source"
                                label="How did you hear about us?"
                                value={formData.source}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            >
                                {sources.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                name="message"
                                label="Message"
                                value={formData.message}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                            />
                            <Button variant="contained" color="primary" type="submit">
                                Download Brochure
                            </Button>
                        </form>
                    </BrochureContent>
                </Grid>
                <Grid item xs={12} md={6}>
                    <BrochureImage src={'https://in.bl-india.com/' + brochureData.image_url} alt={brochureData.image_alt} />
                </Grid>
            </Grid>
        </BrochureSection>
    );
};

export default HomeBrochure;
