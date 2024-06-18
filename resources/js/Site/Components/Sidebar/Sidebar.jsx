// Sidebar.js
import React from 'react';
import { Drawer, IconButton, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../../Assets/logo.svg"; // Replace with your logo path


const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer anchor="top" open={open} onClose={onClose}
    sx={{  zIndex: 1301 }}
    ><Box>
    <img
        src={logo}
        alt="Brand Logo"
        style={{ height: 35, marginRight: 20 }}
    />
    <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>
</Box>
 <Box sx={{ display: 'flex', alignItems: 'center', mt:1, width: '50%',margin:"auto" ,minHeight:'100px'}}>
                    <TextField                       
                        sx={{ backgroundColor: 'white', borderRadius: '5px', flexGrow: 1 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton color="primary">
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
    
      
    </Drawer>
  );
};

export default Sidebar;

