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
            const uniqueResults = filterUniqueResults(Object.values(response.data).flat());
            setResults(uniqueResults);
        } catch (err) {
            setError('Error occurred while searching. Please try again.');
        }

        setLoading(false);
    };

    const filterUniqueResults = (data) => {
        const uniqueResults = [];
        const ids = new Set();

        data.forEach((item) => {
            if (!ids.has(item.id)) {
                uniqueResults.push(item);
                ids.add(item.id);
            }
        });

        return uniqueResults;
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Trigger search if length is a multiple of 3 and more than the previous length
        if (value.length >= 3 && value.length % 2 === 0 && value.length > prevLength) {
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
            href = `/services/${option.service_category.slug}/${option.slug}`;
        } else if (option.type === 'blog') {
            href = `/blogs/${option.blog_category.slug}/${option.slug}`;
        } else if (option.type === 'knowledge_base') {
            href = `/knowledgebase/${option.category.slug}/${option.slug}`;
        }

        return (
            <ListItem button component="a" href={href} key={option.id}>
                <ListItemText primary={option.name || option.question} />
            </ListItem>
        );
    };

    return (
        <Box width={{ xs: '95%', md: '60%' }}>
            <Autocomplete
                freeSolo
                options={results}
                getOptionLabel={(option) => option.name || option.question}
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
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    )}
                                    {params.InputProps.endAdornment}
                                </InputAdornment>
                            ),
                        }}
                        sx={{ backgroundColor: '#ffffff', }}
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
