import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Topbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Brand Name
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Topbar;
