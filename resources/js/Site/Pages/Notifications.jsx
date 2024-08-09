import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemText,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    InputAdornment,
    Link as MuiLink,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    useMediaQuery,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useParams, useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Helmet } from "react-helmet";
import apiClient from "../Services/api"; // Ensure this is your configured axios instance
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from "../Components/BackButton";
import DownloadBrochure from "../Components/DownloadBrochure";
import RequestCallBack from "../Components/RequestCallBack";

const Notifications = () => {
    const { categorySlug } = useParams();
    const [pageData, setPageData] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const notificationsPerPage = 15;
    const navigate = useNavigate();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const Sidebar = styled(Box)(({ theme }) => ({
        width: "auto",
        height: "fit-content",
        position: "sticky",
        top: "20px",
        overflowY: "auto",
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredNotifications = notifications.filter((notification) => {
        return (
            (selectedCategory === "all" ||
                notification.notification_category_id === selectedCategory) &&
            (notification.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notification.date.includes(searchTerm))
        );
    });

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
            <Box className="notification" padding={{lg:5,md:4,sm:3,xs:2}}>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    marginBottom={4}
                >
                    <Typography
                          className="page-main-heading page-heading"
                    variant="h1"
                        gutterBottom
                        textAlign={"center"}
                    >
                        {pageData.name}
                    </Typography>
                   

                </Box>
               
                <Grid container spacing={{xs:1,md:4}}>
                    <Grid item xs={12} md={3}>
                        {isMobile ? (
                            <FormControl fullWidth variant="outlined" sx={{ marginBottom:1 }}>
                                <InputLabel>Notification Categories</InputLabel>
                                <Select
                                    value={selectedCategory}
                                    onChange={(event) => {
                                        const categoryId = event.target.value;
                                        const category = categories.find((cat) => cat.id === categoryId);
                                        handleCategoryClick(categoryId, category?.slug || '');
                                    }}
                                    label="Categories"
                                >
                                    <MenuItem value="all">All Notifications</MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            <Sidebar className="Service-section-siderbar">
                                <Box sx={{ border: "1px solid #0d629a", borderRadius: "25px", p: "20px"}}>

                                <Typography variant="h6" gutterBottom>
                                    Notification Categories
                                </Typography>
                                <List>
                                    <ListItem
                                        button
                                        selected={selectedCategory === "all"}
                                        onClick={() => handleCategoryClick("all", "")}
                                    >
                                        <ListItemText primary="All Notifications" />
                                    </ListItem>
                                    {categories.map((category) => (
                                        <ListItem
                                            key={category.id}
                                            button
                                            selected={category.id === selectedCategory}
                                            onClick={() => handleCategoryClick(category.id, category.slug)}
                                        >
                                            <ListItemText primary={category.name} />
                                        </ListItem>
                                    ))}
                                </List>
                                </Box>
                                <DownloadBrochure />
                                <RequestCallBack />
                            </Sidebar>
                        )}

                    </Grid>
                    <Grid item xs={12} md={9}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ marginBottom: 3 }}
                        />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedNotifications.map((notification) => (
                                        <TableRow key={notification.id}>
                                            <TableCell>{notification.name}</TableCell>
                                            <TableCell>{notification.date}</TableCell>
                                            <TableCell>
                                                <MuiLink
                                                    component={Link}
                                                    to={`/notifications/${notification.category.slug}/${notification.slug}`}
                                                >
                                                    View Notification Details
                                                </MuiLink>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {isMobile ? (
            <Box sx={{marginBlock:2,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <DownloadBrochure />
            <RequestCallBack />
          </Box>

        ):(
          <></>
        )
    }
      <BackButton />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                mt: 4,
                            }}
                        >
                           
                            <Pagination
                                count={Math.ceil(
                                    filteredNotifications.length / notificationsPerPage
                                )}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <ToastContainer />
        </>
    );
};

export default Notifications;
