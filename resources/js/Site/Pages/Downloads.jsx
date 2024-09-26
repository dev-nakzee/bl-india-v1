import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    ListItemIcon,
    InputAdornment,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import apiClient from "../Services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/system";
import DownloadIcon from "@mui/icons-material/Download";
import useMediaQuery from "@mui/material/useMediaQuery";
import DownloadBrochure from "../Components/DownloadBrochure";
import RequestCallBack from "../Components/RequestCallBack";
import { useLocation } from 'react-router-dom';

const Downloads = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const location = useLocation();

    const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;

    const client = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')) : null;

    useEffect(() => {
        fetchData();
    }, []);

    const Sidebar = styled(Box)(({ theme }) => ({
        width: "auto",
        height: "fit-content",
        position: "sticky",
        top: "20px",
        overflowY: "auto",
        //
        [theme.breakpoints.down("sm")]: {
            width: "100%", // Make sidebar full width on small screens
            position: "static", // Remove sticky positioning on small screens
            top: "auto", // Reset top spacing on small screens
            overflowY: "visible", // Reset overflow on small screens
            paddingRight: 0, // Reset right padding on small screens
        },
    }));

    const fetchData = async () => {
        try {
            const response = await apiClient.get("/downloads");
            setData(response.data);
            if (response.data.downloadCategories.length > 0) {
                setSelectedCategory(response.data.downloadCategories[0].id);
            }
        } catch (error) {
            toast.error("Error fetching downloads data");
            console.error("Error fetching downloads data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setPage(0);
        setSearchTerm("");
    };

    const filteredDownloads = data
        ? data.downloads.filter(
              (download) =>
                  download.download_category_id === selectedCategory &&
                  download.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

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

    if (!data) {
        return null;
    }

    return (
        <>
            <ToastContainer />
            <Helmet>
                <title>{data.page.seo_title}</title>
                <meta name="description" content={data.page.seo_description} />
                <meta name="keywords" content={data.page.seo_keywords} />
                
                <meta name="author" content="Rajesh Kumar" />
                <meta
                    name="publisher"
                    content="Brand Liaison India Pvt. Ltd."
                />
                <meta
                    name="copyright"
                    content="Brand Liaison India Pvt. Ltd."
                />
                <meta name="Classification" content="Business" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={data.seo_title} />
                <meta
                    property="og:description"
                    content={data.seo_description}
                />
                <meta property="og:url" content="https://bl-india.com" />
                <meta property="og:site_name" content="Brand Liaison India®" />
                <meta
                    property="og:image"
                    content={"https://bl-india.com" + data.image_url}
                />
                <meta name="format-detection" content="telephone=no" />
                <link rel="canonical" href={fullUrl} />
            </Helmet>
            <Box padding={{ lg: 5, md: 4, sm: 3, xs: 2 }} className="downloads">
                <Typography
                    className="page-main-heading page-heading"
                    variant="h1"
                    textAlign="center"
                    gutterBottom
                    marginBottom={5}
                >
                    {data.page.name}
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4} md={3}>
                        {isMobile ? (
                            <FormControl fullWidth>
                                <Select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        handleCategorySelect(e.target.value)
                                    }
                                    displayEmpty
                                >
                                    {data.downloadCategories.map((category) => (
                                        <MenuItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
                            <>
                                <Sidebar className="Service-section-siderbar">
                                    <Box
                                        sx={{
                                            border: "1px solid #0d629a",
                                            borderRadius: "25px",
                                            p: "20px",
                                        }}
                                    >
                                        <Typography variant="h6">
                                            Download Categories
                                        </Typography>
                                        <List>
                                            {data.downloadCategories.map(
                                                (category) => (
                                                    <ListItem
                                                        button
                                                        key={category.id}
                                                        selected={
                                                            category.id ===
                                                            selectedCategory
                                                        }
                                                        onClick={() =>
                                                            handleCategorySelect(
                                                                category.id
                                                            )
                                                        }
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                category.name
                                                            }
                                                        />
                                                    </ListItem>
                                                )
                                            )}
                                        </List>
                                    </Box>
                                    <DownloadBrochure />
                                    <RequestCallBack />
                                </Sidebar>
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                    {client ? (<Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Search downloads"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ marginBottom: 2 }}
                            />
                        </Box>): ''}
                        <Paper sx={{ width: "100%", overflow: "hidden" }}>
                        {client ? (
                            <TableContainer>
                                <Table className="product-download">
                                    <TableHead>
                                        <TableRow className="table-row">
                                            <TableCell>Name</TableCell>
                                            <TableCell>Files</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredDownloads
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((download) => (
                                                <TableRow key={download.id}>
                                                    <TableCell>
                                                        {download.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <List>
                                                            {download.files.map(
                                                                (file) => (
                                                                    <ListItem
                                                                        key={
                                                                            file.id
                                                                        }
                                                                        button
                                                                        component="a"
                                                                        href={
                                                                            file.file_url
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <ListItemIcon>
                                                                            <DownloadIcon />
                                                                        </ListItemIcon>
                                                                        <ListItemText
                                                                            primary={
                                                                                file.name
                                                                            }
                                                                        />
                                                                    </ListItem>
                                                                )
                                                            )}
                                                        </List>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>):(

<Box
sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 4
}}
>
<Typography variant="h6" gutterBottom sx={{ p:4 }}>
    You need to register or login to access the download page.
</Typography>
<Typography variant="h6" gutterBottom sx={{ p:4 }}>
    You download forms, list of required documents and guidelines for you respective certifications and approvals
</Typography>   
</Box>
                            )}
                            {client ? (
                            <TablePagination
                                className="table-pagination"
                                component="div"
                                count={filteredDownloads.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                            ): ''}
                        </Paper>
                    </Grid>
                </Grid>
                {isMobile ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBlock: 2,
                        }}
                    >
                        <DownloadBrochure />
                        <RequestCallBack />
                    </Box>
                ) : (
                    <></>
                )}
            </Box>
        </>
    );
};

export default Downloads;
