// Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useSidebar } from './SidebarContext';

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <Drawer open={sidebarOpen} onClose={toggleSidebar}>
      <List>
        {/* Sidebar content */}
        <ListItem button key="Home">
          <ListItemText primary="Home" />
        </ListItem>
        {/* Add more ListItems for other components */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
