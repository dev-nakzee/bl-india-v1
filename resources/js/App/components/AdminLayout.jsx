import React, { useState, useEffect } from 'react';
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
import NotificationsIcon from '@mui/icons-material/Notifications';
import DownloadIcon from '@mui/icons-material/Download';
import PageviewIcon from '@mui/icons-material/Pageview';
import BlogIcon from '@mui/icons-material/Book';
import GalleryIcon from '@mui/icons-material/Photo';
import SettingsIcon from '@mui/icons-material/Settings';
import SocialIcon from '@mui/icons-material/Share';
import ProductsIcon from '@mui/icons-material/ShoppingCart';
import MiscellaneousIcon from '@mui/icons-material/Category';
import ProcessIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import HelpIcon from '@mui/icons-material/Help';
import CategoryIcon from '@mui/icons-material/Category';

const drawerWidth = 240;

const AdminLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [miscellaneousOpen, setMiscellaneousOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [knowledgeBaseOpen, setKnowledgeBaseOpen] = useState(false);

  const [user, setUser] = useState({ name: '', user_type: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
      localStorage.removeItem('user'); // Clear user data from local storage
      navigate('/cms/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed');
    } finally {
      setOpen(false); // Close the dialog
    }
  };

  const handleMenuToggle = (setState) => {
    setState((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Typography variant="body2" noWrap component="div">
            {user.name}
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

          {/* Services Menu */}
          <ListItem button onClick={() => handleMenuToggle(setServicesOpen)} >
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
              <ListItem button component={Link} to="/cms/services/sections" sx={{ pl: 4 }}>
                <ListItemIcon><BuildIcon /></ListItemIcon>
                <ListItemText primary="Sections" />
              </ListItem>
              <ListItem button component={Link} to="/cms/services/categories" sx={{ pl: 4 }}>
                <ListItemIcon><BuildIcon /></ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
            </List>
          </Collapse>

          {/* Products Menu */}
          <ListItem button onClick={() => handleMenuToggle(setProductsOpen)}>
            <ListItemIcon><ProductsIcon /></ListItemIcon>
            <ListItemText primary="Products" />
            {productsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={productsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/cms/products/list" sx={{ pl: 4 }}>
                <ListItemIcon><ProductsIcon /></ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>
              <ListItem button component={Link} to="/cms/products/categories" sx={{ pl: 4 }}>
                <ListItemIcon><ProductsIcon /></ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
            </List>
          </Collapse>

          {/* Notifications Menu */}
          <ListItem button onClick={() => handleMenuToggle(setNotificationsOpen)}>
            <ListItemIcon><NotificationsIcon /></ListItemIcon>
            <ListItemText primary="Notifications" />
            {notificationsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={notificationsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/cms/notifications/list" sx={{ pl: 4 }}>
                <ListItemIcon><NotificationsIcon /></ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem button component={Link} to="/cms/notifications/categories" sx={{ pl: 4 }}>
                <ListItemIcon><NotificationsIcon /></ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
            </List>
          </Collapse>

          {/* Downloads Menu */}
          <ListItem button onClick={() => handleMenuToggle(setDownloadsOpen)}>
            <ListItemIcon><DownloadIcon /></ListItemIcon>
            <ListItemText primary="Downloads" />
            {downloadsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={downloadsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/cms/downloads/list" sx={{ pl: 4 }}>
                <ListItemIcon><DownloadIcon /></ListItemIcon>
                <ListItemText primary="Downloads" />
              </ListItem>
              <ListItem button component={Link} to="/cms/downloads/categories" sx={{ pl: 4 }}>
                <ListItemIcon><DownloadIcon /></ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
            </List>
          </Collapse>

          {/* Pages Menu */}
          <ListItem button onClick={() => handleMenuToggle(setPagesOpen)}>
            <ListItemIcon><PageviewIcon /></ListItemIcon>
            <ListItemText primary="Pages" />
            {pagesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={pagesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/cms/pages" sx={{ pl: 4 }}>
                <ListItemIcon><PageviewIcon /></ListItemIcon>
                <ListItemText primary="Pages" />
              </ListItem>
              <ListItem button component={Link} to="/cms/pages/sections" sx={{ pl: 4 }}>
                <ListItemIcon><PageviewIcon /></ListItemIcon>
                <ListItemText primary="Page Sections" />
              </ListItem>
            </List>
          </Collapse>

          {/* Blogs Menu */}
          <ListItem button onClick={() => handleMenuToggle(setBlogsOpen)}>
            <ListItemIcon><BlogIcon /></ListItemIcon>
            <ListItemText primary="Blogs" />
            {blogsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={blogsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/cms/blogs" sx={{ pl: 4 }}>
                <ListItemIcon><BlogIcon /></ListItemIcon>
                <ListItemText primary="Blogs" />
              </ListItem>
              <ListItem button component={Link} to="/cms/blogs/categories" sx={{ pl: 4 }}>
                <ListItemIcon><BlogIcon /></ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
              <ListItem button component={Link} to="/cms/blogs/comments" sx={{ pl: 4 }}>
                <ListItemIcon><BlogIcon /></ListItemIcon>
                <ListItemText primary="Comments" />
              </ListItem>
            </List>
          </Collapse>

          {/* Gallery Menu */}
          <ListItem button onClick={() => handleMenuToggle(setGalleryOpen)}>
            <ListItemIcon><GalleryIcon /></ListItemIcon>
            <ListItemText primary="Gallery" />
            {galleryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={galleryOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/cms/gallery/list" sx={{ pl: 4 }}>
                <ListItemIcon><GalleryIcon /></ListItemIcon>
                <ListItemText primary="Gallery" />
              </ListItem>
            </List>
          </Collapse>

          {/* Social Media Menu */}
          <ListItem button component={Link} to="/cms/social-media">
            <ListItemIcon><SocialIcon /></ListItemIcon>
            <ListItemText primary="Social Media" />
          </ListItem>

          {/* Social Media Menu */}
          <ListItem button component={Link} to="/cms/holidays">
            <ListItemIcon><GalleryIcon /></ListItemIcon>
            <ListItemText primary="Holiday List" />
          </ListItem>

          {/* Customer Menu */}
          <ListItem button component={Link} to="/cms/customers">
            <ListItemIcon><GroupIcon /></ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>

          {/* Customer Menu */}
          <ListItem button component={Link} to="/cms/tutorials">
            <ListItemIcon><GroupIcon /></ListItemIcon>
            <ListItemText primary="Tutorials" />
          </ListItem>

          {/* Teams Menu */}
          <ListItem button component={Link} to="/cms/teams">
            <ListItemIcon><GroupsIcon /></ListItemIcon>
            <ListItemText primary="Teams" />
          </ListItem>
          
          {/* Knowledge Base Menu */}
          <ListItem button onClick={() => handleMenuToggle(setKnowledgeBaseOpen)}>
            <ListItemIcon><HelpIcon /></ListItemIcon>
            <ListItemText primary="Knowledge Base" />
            {knowledgeBaseOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={knowledgeBaseOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/cms/knowledge-base/categories" sx={{ pl: 4 }}>
                <ListItemIcon><CategoryIcon /></ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItem>
              <ListItem button component={Link} to="/cms/knowledge-base/faqs" sx={{ pl: 4 }}>
                <ListItemIcon><HelpIcon /></ListItemIcon>
                <ListItemText primary="FAQs" />
              </ListItem>
            </List>
          </Collapse>

          {/* Miscellaneous Menu */}
          <ListItem button onClick={() => handleMenuToggle(setMiscellaneousOpen)}>
            <ListItemIcon><MiscellaneousIcon /></ListItemIcon>
            <ListItemText primary="Miscellaneous" />
            {miscellaneousOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={miscellaneousOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/cms/miscellaneous/processes" sx={{ pl: 4 }}>
                <ListItemIcon><ProcessIcon /></ListItemIcon>
                <ListItemText primary="Processes" />
              </ListItem>
              <ListItem button component={Link} to="/cms/miscellaneous/testimonials" sx={{ pl: 4 }}>
                <ListItemIcon><ProcessIcon /></ListItemIcon>
                <ListItemText primary="Testimonials" />
              </ListItem>
              <ListItem button component={Link} to="/cms/miscellaneous/stickers" sx={{ pl: 4 }}>
                <ListItemIcon><ProcessIcon /></ListItemIcon>
                <ListItemText primary="Stickers" />
              </ListItem>
              <ListItem button component={Link} to="/cms/miscellaneous/contacts" sx={{ pl: 4 }}>
                <ListItemIcon><ProcessIcon /></ListItemIcon>
                <ListItemText primary="Contacts" />
              </ListItem>
            </List>
          </Collapse>

          {/* Settings Menu */}
          <ListItem button onClick={() => handleMenuToggle(setSettingsOpen)}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
            {settingsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/cms/settings/general" sx={{ pl: 4 }}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="General Settings" />
              </ListItem>
              <ListItem button component={Link} to="/cms/settings/advanced" sx={{ pl: 4 }}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Advanced Settings" />
              </ListItem>
            </List>
          </Collapse>
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
