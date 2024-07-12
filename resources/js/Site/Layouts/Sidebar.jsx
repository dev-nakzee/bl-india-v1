import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('client');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <Box sx={{ width: 250, padding: 2 }}>
      <List component="nav">
        <ListItem button onClick={() => navigate('/account')}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => navigate('/account/comments')}>
          <ListItemIcon>
            <CommentIcon />
          </ListItemIcon>
          <ListItemText primary="Comments" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => navigate('/account/brochures')}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Brochures" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => navigate('/account/tutorials')}>
          <ListItemIcon>
            <VideoLibraryIcon />
          </ListItemIcon>
          <ListItemText primary="Tutorials" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => navigate('/account/projects')}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => navigate('/account/profile')}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <Divider />
        <ListItem>
          <Button variant="contained" color="secondary" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Logout
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
