import React from 'react';
import { Box, Grid, Typography, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const AccountLayout = () => {
  const client = JSON.parse(localStorage.getItem('client'));
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('client');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const menuItems = [
    { text: 'Account', icon: <AccountCircleIcon />, path: '/account' },
    { text: 'Comments', icon: <CommentIcon />, path: '/account/comments' },
    { text: 'Brochures', icon: <DescriptionIcon />, path: '/account/brochures' },
    { text: 'Tutorials', icon: <VideoLibraryIcon />, path: '/account/tutorials' },
    { text: 'Projects', icon: <FolderIcon />, path: '/account/projects' },
    { text: 'Profile', icon: <PersonIcon />, path: '/account/profile' },
    { text: 'Logout', icon: <ExitToAppIcon />, action: handleLogout },
  ];

  const drawer = (
    <List>
      {menuItems.map((item, index) => (
        <React.Fragment key={item.text}>
          <ListItem button onClick={item.action ? item.action : () => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
          {index < menuItems.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ backgroundColor: '#f5f5f5', padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Welcome, {client.name}
          </Typography>
          {isSmallScreen && (
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        {isSmallScreen ? (
          <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
            {drawer}
          </Drawer>
        ) : (
          <Sidebar />
        )}
      </Grid>
      <Grid item xs={12} md={9}>
        <Box sx={{ padding: 3 }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AccountLayout;
