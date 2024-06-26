import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Pagination,
    Link as MuiLink,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams, useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Helmet } from "react-helmet";
import apiClient from "../Services/api"; // Ensure this is your configured axios instance

const Notifications = () => {
    const { categorySlug } = useParams();
    const [pageData, setPageData] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 6;
    const navigate = useNavigate();

    const Sidebar = styled(Box)(({ theme }) => ({
        width: "auto",
        height: "fit-content",
        position: "sticky",
        top: "20px",
        overflowY: "auto",
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            width: "100%", // Make sidebar full width on small screens
            position: "static", // Remove sticky positioning on small screens
            top: "auto", // Reset top spacing on small screens
            overflowY: "visible", // Reset overflow on small screens
            paddingRight: 0, // Reset right padding on small screens
        },
    }));

    useEffect(() => {
        const fetchNotificationData = async () => {
            try {
                const response = await apiClient.get("/notifications");
                const data = response.data;
                setPageData(data.page[0]);
                setNotifications(data.notifications);
                setCategories(data.categories);

                const category = data.categories.find(
                    (cat) => cat.slug === categorySlug
                );
                setSelectedCategory(category ? category.id : "all");
            } catch (error) {
                console.error("Error fetching notification data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotificationData();
    }, [categorySlug]);

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

    if (!pageData) {
        return null; // Or return a fallback UI if needed
    }

    const handleCategoryClick = (categoryId, slug) => {
        setSelectedCategory(categoryId);
        navigate(`/notifications/${slug}`);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredNotifications =
        selectedCategory === "all"
            ? notifications
            : notifications.filter(
                  (notification) =>
                      notification.notification_category_id === selectedCategory
              );

    const paginatedNotifications = filteredNotifications.slice(
        (currentPage - 1) * notificationsPerPage,
        currentPage * notificationsPerPage
    );

    return (
        <>
            <Helmet>
                <title>{pageData.seo_title}</title>
                <meta name="description" content={pageData.seo_description} />
                <meta name="keywords" content={pageData.seo_keywords} />
            </Helmet>
            <Box  className="notification" sx={{ padding: 4 }}>
              <Box sx={{display: 'flex' ,alignItems: 'center',justifyContent: 'center'}} marginBottom={4}>
              <Typography
                    variant="h4"
                    className="page-heading"
                    gutterBottom
                    textAlign={"center"}
                >
                    {pageData.name}
                </Typography>
              </Box>
               
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <Sidebar className="Service-section-siderbar">
                            <Typography variant="h6" gutterBottom>
                                Categories
                            </Typography>
                            <List>
                                <ListItem
                                    button
                                    selected={selectedCategory === "all"}
                                    onClick={() =>
                                        handleCategoryClick("all", "")
                                    }
                                >
                                    <ListItemText primary="All Notifications" />
                                </ListItem>
                                {categories.map((category) => (
                                    <ListItem
                                        key={category.id}
                                        button
                                        selected={
                                            category.id === selectedCategory
                                        }
                                        onClick={() =>
                                            handleCategoryClick(
                                                category.id,
                                                category.slug
                                            )
                                        }
                                    >
                                        <ListItemText primary={category.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Sidebar>
                    </Grid>
                    <Grid item xs={12} md={9} marginBottom={3}>
                        {paginatedNotifications.map((notification) => (
                            <Accordion
                                key={notification.id}
                                sx={{ marginBottom: 2 }}
                            >
                                <AccordionSummary
                                    className="Accordian-summary"
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${notification.id}-content`}
                                    id={`panel${notification.id}-header`}
                                >
                                    <Typography className="Accordian-data">
                                        {notification.name}
                                    </Typography>
                                    <Typography
                                        className="Accordian-data1"
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {notification.date}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails className="notification-list">
                                    <List  >
                                        {notification.products.length > 0 ? (
                                            notification.products.map(
                                                (product) => (
                                                    <ListItem  key={product.id}>
                                                        <MuiLink
                                                            href={`/products/${product.slug}`}
                                                            target="_blank"
                                                        >
                                                            {product.name}
                                                        </MuiLink>
                                                    </ListItem>
                                                )
                                            )
                                        ) : (
                                            <Typography variant="body1">
                                                No products available.
                                            </Typography>
                                        )}
                                    </List>
                                    <MuiLink
                                        component={Link}
                                        to={`/notifications/${notification.category.slug}/${notification.slug}`}
                                        sx={{ mt: 2 }}
                                    >
                                        View Notification Details
                                    </MuiLink>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                mt: 4,
                            }}
                        >
                            <Pagination
                                count={Math.ceil(
                                    filteredNotifications.length /
                                        notificationsPerPage
                                )}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Notifications;
