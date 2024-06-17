import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Slide,
  Dialog,
  TextField,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import logo from '../../Assets/logo.svg'; // Replace with your logo path

const Search = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ services: [], products: [] });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search`, {
        params: { query },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <SearchIcon fontSize="large" />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={(props) => <Slide direction="down" {...props} />}
      >
        <AppBar sx={{ position: 'relative', background: 'white', color: '#0D629A' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <img src={logo} alt="Brand Logo" style={{ height: 50, marginRight: 20 }} />
            </Box>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Search
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: 3,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search..."
            fullWidth
            sx={{ maxWidth: 600, mb: 2 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSearch}>
            Search
          </Button>
          <Box sx={{ mt: 4, width: '100%', maxWidth: 600 }}>
            <Typography variant="h6">Services</Typography>
            {results.services.map((service) => (
              <Box key={service.id} sx={{ my: 2, p: 2, border: '1px solid #ccc' }}>
                <Typography variant="body1">{service.name}</Typography>
                <Typography variant="body2">{service.description}</Typography>
              </Box>
            ))}
            <Typography variant="h6">Products</Typography>
            {results.products.map((product) => (
              <Box key={product.id} sx={{ my: 2, p: 2, border: '1px solid #ccc' }}>
                <Typography variant="body1">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Search;
