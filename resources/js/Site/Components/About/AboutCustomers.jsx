import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import apiClient from '../../Services/api'; // Ensure this is your configured axios instance

const CustomersSection = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    boxShadow: theme.shadows[3],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const CustomerCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: theme.spacing(2),
    boxShadow: theme.shadows[3],
}));

const CustomerImage = styled(CardMedia)(({ theme }) => ({
    height: 140,
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
}));

const AboutCustomers = () => {
    const [customersData, setCustomersData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomersData = async () => {
            try {
                const response = await apiClient.get('/about-clients');
                setCustomersData(response.data);
            } catch (error) {
                console.error('Error fetching customers data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomersData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!customersData) {
        return null; // Or return a fallback UI if needed
    }

    return (
        <CustomersSection>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff', margin: 'auto', borderRadius: 20 }}>
                        {customersData.section.tag_line}
                    </Typography>
                    <Typography variant="h2" sx={{ textAlign: 'center', mt: 2, fontSize: '1.75rem', fontWeight: 500, textTransform: 'uppercase' }}>
                        {customersData.section.title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {customersData.customers.map((customer) => (
                            <Grid item xs={12} sm={6} md={4} key={customer.id}>
                                <CustomerCard>
                                    <CustomerImage
                                        image={'https://in.bl-india.com/' + customer.image_url}
                                        title={customer.image_alt}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {customer.name}
                                        </Typography>
                                    </CardContent>
                                </CustomerCard>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </CustomersSection>
    );
};

export default AboutCustomers;
