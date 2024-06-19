import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import apiClient from '../../Services/api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TestimonialSection = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    boxShadow: theme.shadows[3],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const TestimonialContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const TestimonialImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    boxShadow: theme.shadows[1],
    background: 'transparent',
}));

const Arrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: '#0D629A', borderRadius: '50%' }}
            onClick={onClick}
        />
    );
};

const HomeTestimonials = () => {
    const [testimonialsData, setTestimonialsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonialsData = async () => {
            try {
                const response = await apiClient.get('/home-testimonial');
                setTestimonialsData(response.data);
            } catch (error) {
                console.error('Error fetching testimonials data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonialsData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!testimonialsData) {
        return null; // Or return a fallback UI if needed
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
    };

    const section = testimonialsData.section[0];

    return (
        <TestimonialSection>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, background: '#0D629A', color: '#ffffff', padding: '5px 20px', borderRadius: 20, margin: 'auto' }}>
                        {section.tag_line}
                    </Typography>
                    <Typography variant="h2" sx={{ mt: 2, fontWeight: 400 }}>
                        {section.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TestimonialContent>
                        {section.image_url && (
                            <TestimonialImage src={'https://in.bl-india.com/' + section.image_url} alt={section.image_alt} />
                        )}
                    </TestimonialContent>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Slider {...settings}>
                        {testimonialsData.testimonials && testimonialsData.testimonials.map(testimonial => (
                            <TestimonialCard key={testimonial.id}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {testimonial.name}
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    {testimonial.text}
                                </Typography>
                            </TestimonialCard>
                        ))}
                    </Slider>
                </Grid>
            </Grid>
        </TestimonialSection>
    );
};

export default HomeTestimonials;
