import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    CircularProgress,
    ListItem,
    ListItemText,
    Alert,
    Autocomplete,
    InputAdornment,
    IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import apiClient from '../../Services/api'; // Ensure this path is correct

const SearchField = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [prevLength, setPrevLength] = useState(0);

    const handleSearch = async (value) => {
        if (value.length < 3) {
            setResults([]);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await apiClient.post('/search', { query: value });
            const processedResults = processResults(response.data);
            setResults(processedResults);
        } catch (err) {
            setError('Error occurred while searching. Please try again.');
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
                    type: 'product',
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
                        type: 'service',
                    });
                    ids.add(service.service_id);
                }
            });
        });
    
        // Process other types of data
        ['services', 'blogs', 'knowledge_base'].forEach((key) => {
            data[key].forEach((item) => {
                if (!ids.has(item.id)) {
                    uniqueResults.push({
                        id: item.id,
                        name: item.name || item.question,
                        slug: item.slug,
                        type: key.slice(0, -1), // remove 's' to get singular form
                        category_slug: item.blog_category ? item.blog_category.slug : item.knowledge_base_category_id ? item.category.slug : undefined,
                    });
                    ids.add(item.id);
                }
            });
        });
    
        // Process 'standards' containing linked product and service data
        data.standards.forEach((standard) => {
            const { product, service } = standard;
    
            if (product && !ids.has(product.id)) {
                uniqueResults.push({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    category_slugs: product.category_slugs.join(", "), // Assuming multiple categories can be flattened to a string
                    type: 'product',
                });
                ids.add(product.id);
            }
    
            if (service && !ids.has(service.id)) {
                uniqueResults.push({
                    id: service.id,
                    name: service.name,
                    slug: service.slug,
                    category_slug: service.category_slug,
                    type: 'service',
                });
                ids.add(service.id);
            }
        });
    
        return uniqueResults;
    };
    

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Trigger search if length is a multiple of 3 and more than the previous length
        if (value.length >= 3 && value.length % 1 === 0 && value.length > prevLength) {
            handleSearch(value);
        }
        setPrevLength(value.length);
    };

    const handleButtonClick = () => {
        handleSearch(query);
    };

    const renderOption = (option) => {
        let href = '';

        if (option.type === 'product') {
            href = `/products/${option.slug}`;
        } else if (option.type === 'service') {
            href = `/services/${option.category_slug}/${option.slug}`;
        } else if (option.type === 'blog') {
            href = `/blogs/${option.category_slug}/${option.slug}`;
        } else if (option.type === 'knowledge_base') {
            href = `/knowledgebase/${option.category_slug}/${option.slug}`;
        }

        return (
            <ListItem button component="a" href={href} key={option.id}>
                <ListItemText primary={option.name} />
            </ListItem>
        );
    };

    return (
        <Box width={{ xs: '95%', md: '60%' }}>
            <Autocomplete
                freeSolo
                options={results}
                getOptionLabel={(option) => option.name}
                filterOptions={(x) => x} // Disable built-in filtering
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search services and products"
                        value={query}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <InputAdornment position="end">
                                    {loading ? <CircularProgress color="inherit" size={20} /> : (
                                        <IconButton
                                            onClick={handleButtonClick}
                                            edge="end"
                                            sx={{marginRight:1}}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    )}
                                    {params.InputProps.endAdornment}
                                </InputAdornment>
                            ),
                        }}
                        sx={{ backgroundColor: '#ffffff'}}
                    />
                )}
                renderOption={(props, option) => <li {...props}>{renderOption(option)}</li>}
                noOptionsText="No results found"
            />
            {error && (
                <Alert severity="error" variant="outlined" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default SearchField;
