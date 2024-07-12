import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const client = JSON.parse(localStorage.getItem('client'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('client');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <Box sx={{ width: 500, padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Welcome, {client.name}
      </Typography>
      <List component="nav">
        <ListItem button onClick={() => navigate('/')}>
          <ListItemText primary="Account" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => navigate('/comments')}>
          <ListItemText primary="Comments" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => navigate('/brochures')}>
          <ListItemText primary="Brochures" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => navigate('/tutorials')}>
          <ListItemText primary="Tutorials" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => navigate('/projects')}>
          <ListItemText primary="Projects" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => navigate('/account')}>
          <ListItemText primary="Profile" />
        </ListItem>
        <Divider />
        <ListItem>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
