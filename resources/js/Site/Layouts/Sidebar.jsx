// import React from 'react';
// import { Box, List, ListItem, ListItemText, ListItemIcon, Divider, useMediaQuery } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import CommentIcon from '@mui/icons-material/Comment';
// import DescriptionIcon from '@mui/icons-material/Description';
// import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
// import FolderIcon from '@mui/icons-material/Folder';
// import PersonIcon from '@mui/icons-material/Person';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { useTheme } from '@mui/material/styles';
// import apiClient from '../Services/api'; // Ensure this is your configured axios instance

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const handleLogout = async () => {
//     try {
//       await apiClient.post('/client/logout');
//       localStorage.removeItem('client');
//       localStorage.removeItem('token');
//       navigate('/');
//       window.location.reload();
//     } catch (error) {
//       console.error('Failed to logout:', error);
//     }
//   };

//   const menuItems = [
//     { text: 'Account', icon: <AccountCircleIcon />, path: '/account' },
//     { text: 'Comments', icon: <CommentIcon />, path: '/account/comments' },
//     { text: 'Brochures', icon: <DescriptionIcon />, path: '/account/brochures' },
//     { text: 'Tutorials', icon: <VideoLibraryIcon />, path: '/account/tutorials' },
//     { text: 'Projects', icon: <FolderIcon />, path: '/account/projects' },
//     { text: 'Profile', icon: <PersonIcon />, path: '/account/profile' },
//     { text: 'Logout', icon: <ExitToAppIcon />, action: handleLogout },
//   ];

//   return (
//     <Box sx={{ minHeight: isSmallScreen ? 'auto' : '50vh', width: isSmallScreen ? 'auto' : 250, padding: 2 }}>
//       <List component="nav">
//         {menuItems.map((item, index) => (
//           <React.Fragment key={item.text}>
//             <ListItem button onClick={item.action ? item.action : () => navigate(item.path)}>
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               {!isSmallScreen && <ListItemText primary={item.text} />}
//             </ListItem>
//             {index < menuItems.length - 1 && <Divider />}
//           </React.Fragment>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Divider, useMediaQuery, Drawer, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import { ArrowCircleRight, ArrowForwardIos } from '@mui/icons-material';

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await apiClient.post('/client/logout');
      localStorage.removeItem('client');
      localStorage.removeItem('token');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
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

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box sx={{ minHeight: 'auto', width: 250, padding: 2 }}>
      <List component="nav">
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
    </Box>
  );

  return (
    <>
      {isSmallScreen && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer(true)}
          sx={{ mr: 2 ,ml: 2,color: '#3078c0' }}
      
        >
          <ArrowCircleRight />
        </IconButton>
      )}
      <Drawer
      className='drawer-container'
        anchor="left"
        open={isSmallScreen && drawerOpen}
        onClose={toggleDrawer(false)}
       
      >
        {drawerContent}
      </Drawer>
      {!isSmallScreen && drawerContent}
    </>
  );
};

export default Sidebar;
