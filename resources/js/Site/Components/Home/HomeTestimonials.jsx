import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import Slider from "react-slick";
import apiClient from "../../Services/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";

const TestimonialSection = styled(Box)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(4),
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        padding: theme.spacing(2),
    },
}));

const TestimonialContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const TestimonialImage = styled("img")(({ theme }) => ({
    width: "100%",
    maxWidth: "500px",
    borderRadius: "10px",
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(1),
    },
}));

const Arrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "#0D629A",
                borderRadius: "50%",
            }}
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
                const response = await apiClient.get("/home-testimonial");
                setTestimonialsData(response.data);
            } catch (error) {
                console.error("Error fetching testimonials data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonialsData();
    }, []);

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

    if (!testimonialsData) {
        return null;
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 6500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6500,
        nextArrow: <Arrow className="slick-arrow slick-next" />,
        prevArrow: <Arrow className="slick-arrow slick-prev" />,
    };

    const section = testimonialsData.section[0];

    return (
        <TestimonialSection className="Testimonial-section">
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={12}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            textAlign: "center",
                            fontWeight: 500,
                            background: "#0D629A",
                            maxWidth: 280,
                            color: "#ffffff",
                            margin: "auto",
                            borderRadius: 20,
                        }}
                    >
                        {section.tag_line}
                    </Typography>
                    <Typography variant="h3" sx={{ mt: 2 }}>
                        {section.title}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={5}>
                    <TestimonialContent>
                        {section.image_url && (
                            <TestimonialImage
                                src={
                                    "https://bl-india.com/" +
                                    section.image_url
                                }
                                alt={section.image_alt}
                            />
                        )}
                    </TestimonialContent>
                </Grid>
                <Grid item xs={12} md={7} className="testimonial-quto">
                    <div className="testimonial">
                        <div className="rating">★★★★☆</div>
                        <blockquote className="quote"> </blockquote>
                        <Slider {...settings}>
                            {testimonialsData.testimonials &&
                                testimonialsData.testimonials.map(
                                    (testimonial) => (
                                        <TestimonialCard
                                            key={testimonial.id}
                                            padding={{ sm: 1, md: 2 }}
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    textAlign: "left",
                                                    marginBottom: 3,
                                                }}
                                            >
                                                {testimonial.text}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: "left",
                                                    marginBottom: 3,
                                                }}
                                            >
                                                {testimonial.name}
                                            </Typography>
                                        </TestimonialCard>
                                    )
                                )}
                        </Slider>
                    </div>
                </Grid>
            </Grid>
        </TestimonialSection>
    );
};

export default HomeTestimonials;
