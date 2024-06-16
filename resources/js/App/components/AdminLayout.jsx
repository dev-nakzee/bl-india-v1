import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Collapse,
} from '@mui/material';
import { logout } from '../services/api';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BuildIcon from '@mui/icons-material/Build';

const drawerWidth = 240;

const AdminLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Assuming logout function clears the session on the server
      localStorage.removeItem('authToken'); // Clear local storage or cookie
      navigate('/cms/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed');
    } finally {
      setOpen(false); // Close the dialog
    }
  };

  const handleServicesClick = () => {
    setServicesOpen(!servicesOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/cms/profile')}>
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit" onClick={handleClickOpen}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/cms/dashboard">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleServicesClick}>
            <ListItemIcon><SettingsApplicationsIcon /></ListItemIcon>
            <ListItemText primary="Services" />
            {servicesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={servicesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/cms/services/list" sx={{ pl: 4 }}>
                <ListItemIcon><BuildIcon /></ListItemIcon>
                <ListItemText primary="Services" />
              </ListItem>
              <ListItem button component={Link} to="/cms/services/categories" sx={{ pl: 4 }}>
                <ListItemIcon><BuildIcon /></ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button component={Link} to="/cms/profile">
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminLayout;
