import React, { useState } from "react";
import {
    Box,
    TextField,
    IconButton,
    Drawer,
    Grid,
    Typography,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Alert,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { HighlightOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import apiClient from "../../Services/api"; // Ensure this path is correct

const SearchDrawer = ({ open, onClose }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [prevLength, setPrevLength] = useState(0);

    const handleSearch = async (value) => {
        if (value.length < 3) {
            setResults([]);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await apiClient.post("/search", { query: value });
            const processedResults = processResults(response.data);
            setResults(processedResults);
        } catch (err) {
            setError("Error occurred while searching. Please try again.");
        }

        setLoading(false);
    };

    const processResults = (data) => {
        const uniqueResults = [];
        const ids = new Set();

        // Process products and their services
        data.products.forEach((product) => {
            if (!ids.has(product.id)) {
                uniqueResults.push({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    type: "product",
                });
                ids.add(product.id);
            }
            product.services.forEach((service) => {
                if (!ids.has(service.service_id)) {
                    uniqueResults.push({
                        id: service.service_id,
                        name: `${product.name} - ${service.service_name}`,
                        slug: service.service_slug,
                        category_slug: service.service_category_slug,
                        type: "service",
                    });
                    ids.add(service.service_id);
                }
            });
        });

        // Process other types of data
        ["services", "blogs", "knowledge_base"].forEach((key) => {
            data[key].forEach((item) => {
                if (!ids.has(item.id)) {
                    uniqueResults.push({
                        id: item.id,
                        name: item.name || item.question,
                        slug: item.slug,
                        type: key.slice(0, -1), // remove 's' to get singular form
                        category_slug: item.blog_category
                            ? item.blog_category.slug
                            : item.knowledge_base_category_id
                            ? item.category.slug
                            : undefined,
                    });
                    ids.add(item.id);
                }
            });
        });

        return uniqueResults;
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        // Trigger search if length is a multiple of 3 and more than the previous length
        if (
            value.length >= 3 &&
            value.length % 1 === 0 &&
            value.length > prevLength
        ) {
            handleSearch(value);
        }
        setPrevLength(value.length);
    };

    const handleButtonClick = () => {
        handleSearch(searchQuery);
    };

    const handleDrawerClose = () => {
        setSearchQuery("");
        setResults([]);
        setError("");
        setPrevLength(0);
        onClose();
    };

    const renderOption = (option) => {
        let to = "";

        if (option.type === "product") {
            to = `/products/${option.slug}`;
        } else if (option.type === "service") {
            to = `/services/${option.category_slug}/${option.slug}`;
        } else if (option.type === "blog") {
            to = `/blogs/${option.category_slug}/${option.slug}`;
        } else if (option.type === "knowledge_base") {
            to = `/knowledgebase/${option.category_slug}/${option.slug}`;
        }

        return (
            <ListItem button component={Link} to={to} key={option.id}>
                <ListItemText primary={option.name} />
            </ListItem>
        );
    };

    return (
        <Drawer
            anchor="top"
            open={open}
            onClose={handleDrawerClose}
            className="serach-drawer-container"
        >
            <Box  position="sticky"

                display={"flex"}
                justifyContent={"flex-end"}
                padding={{ md: 1 }}
            >
                <IconButton onClick={handleDrawerClose}>
                    <HighlightOff fontSize="inherit" />
                </IconButton>
            </Box>
            <Grid
                container
                spacing={2}
                padding={{ md: 1 }}
                className="search-drawer"
            >
               
                <Grid item xs={12}>
                    <Box display={"flex"} paddingInline={5} marginBlock={2}>
                        <TextField
                            variant="outlined"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleInputChange}
                            sx={{
                                backgroundColor: "white",
                                borderRadius: "5px",
                                flexGrow: 1,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {loading ? (
                                            <CircularProgress
                                                color="inherit"
                                                size={20}
                                            />
                                        ) : (
                                            <IconButton
                                                color="primary"
                                                onClick={handleButtonClick}
                                            >
                                                <SearchIcon fontSize="inherit" />
                                            </IconButton>
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box display={"flex"} paddingInline={5}>                        
                    {error && <Alert severity="error">{error}</Alert>}
                    <List className="search-result">
                        {results.map((result) => renderOption(result))}
                                           </List>
                    </Box>
                   
                </Grid>
             
               
            </Grid>
        </Drawer>
    );
};

export default SearchDrawer;
