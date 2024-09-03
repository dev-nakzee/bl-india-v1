import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Modal,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import Masonry from "react-masonry-css";
import apiClient from "../Services/api"; // Ensure this is your configured axios instance
import CloseIcon from "@mui/icons-material/Close";
import { Helmet } from "react-helmet";
import { useLocation } from 'react-router-dom';

const Gallery = () => {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState("");
    const [selectedImageDescription, setSelectedImageDescription] =
        useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;


    useEffect(() => {
        fetchGalleries();
    }, []);

    const fetchGalleries = async () => {
        try {
            const response = await apiClient.get("/galleries");
            setGalleries(response.data);
        } catch (error) {
            console.error("Error fetching galleries:", error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (imageUrl, imageName, imageDescription) => {
        setSelectedImage(imageUrl);
        setSelectedImageName(imageName);
        setSelectedImageDescription(imageDescription);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setSelectedImageName("");
        setSelectedImageDescription("");
        setModalOpen(false);
    };
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));


    const breakpointColumns = {
        default: 3,
        992: 2,
        768: 1, // 2 columns for screens smaller than 768px
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

    return (
        <>
            <Helmet>
                <title>A Visual Journey of Brand Liaison's Success | Our Gallery</title>
                <meta name="description" content='We Invite You to Browse Our Image Gallery and Learn More About Our Team. You can See Our Team in Action and Know More About Our Work As Well.' />
                <meta name="keywords" content='image gallery of brand liaison, brand liaison team image gallery' />
                
                <meta name="author" content="Rajesh Kumar" />
                <meta name="publisher" content="Brand Liaison India Pvt. Ltd." />
                <meta name="copyright" content="Brand Liaison India Pvt. Ltd." />
                <meta name="Classification" content="Business" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content='A Visual Journey of Brand Liaison`s Success | Our Gallery' />
                <meta property="og:description" content='We Invite You to Browse Our Image Gallery and Learn More About Our Team. You can See Our Team in Action and Know More About Our Work As Well.' />
                <meta property="og:url" content="https://bl-india.com" />
                <meta property="og:site_name" content="Brand Liaison India®" />
                <meta property="og:image" content='' />
                <meta name="format-detection" content="telephone=no" />
                <link rel="canonical" href={fullUrl} />
            </Helmet>
            <Box padding={{lg:5,md:4,sm:3,xs:2}}>
            <Typography
                  className="page-main-heading page-heading"
                    variant="h1"
                textAlign="center"
                gutterBottom
                marginBottom={{ xs: 2, md: 3, lg: 5 }}
            >
                Gallery
            </Typography>
            <Masonry
                breakpointCols={breakpointColumns}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {galleries.map((gallery) => (
                    <Box
                        key={gallery.id}
                        sx={{ cursor: "pointer", marginBottom: 2 }}
                        onClick={() =>
                            openModal(
                                "https://in.bl-india.com/" + gallery.image_url,
                                gallery.title,
                                gallery.description
                            )
                        }
                    >
                        <img
                            src={"https://in.bl-india.com/" + gallery.image_url}
                            alt={gallery.image_alt}
                            style={{
                                width: "100%",
                                display: "block",
                                borderRadius: "8px",
                            }}
                        />
                        <Typography
                            variant="heading"
                            align="center"
                            sx={{ marginTop: 1 }}
                        >
                            {gallery.title}
                        </Typography>
                    </Box>
                ))}
            </Masonry>

            {/* Modal for displaying the selected image */}
            <Modal
                open={modalOpen}
                onClose={closeModal}
                aria-labelledby="image-modal-title"
                aria-describedby="image-modal-description"
            >
                <Box
                    className="mobile-gallery"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        // width:'95%',
                        maxWidth: "90vw",
                        maxHeight: "90vh",
                        overflow: "auto",
                        textAlign: "center",
                        borderRadius: "8px",
                    }}
                >
                    {selectedImage && (
                        <>
                            <img
                                src={selectedImage}
                                alt={selectedImageName}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    borderRadius: "8px",
                                }}
                            />
                            <Typography variant="h6" sx={{ my: 2 }}>
                                {selectedImageName}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {selectedImageDescription}
                            </Typography>
                            <IconButton
                                aria-label="close"
                                onClick={closeModal}
                                sx={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    color: "inherit",
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
        </>
      
    );
};

export default Gallery;
