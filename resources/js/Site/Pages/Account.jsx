import React, { useState } from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookIcon from '@mui/icons-material/Book';
import SchoolIcon from '@mui/icons-material/School';

const Account = () => {
  const [counts] = useState({
    comments: 10, // Dummy data
    projects: 5,  // Dummy data
    brochures: 7, // Dummy data
    tutorials: 3, // Dummy data
  });

  const cardStyles = [
    { backgroundColor: '#e3f2fd', color: '#0d47a1' }, // Light blue for Comments
    { backgroundColor: '#bbdefb', color: '#0d47a1' }, // Blue for Projects
    { backgroundColor: '#90caf9', color: '#0d47a1' }, // Lighter blue for Brochures
    { backgroundColor: '#64b5f6', color: '#0d47a1' }  // Even lighter blue for Tutorials
  ];

  const iconStyle = {
    fontSize: '5rem',
    marginRight: '1rem',
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card style={cardStyles[0]}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <CommentIcon style={iconStyle} />
              <Box>
                <Typography variant="h5">Comments</Typography>
                <Typography variant="h6">{counts.comments}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={cardStyles[1]}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <AssignmentIcon style={iconStyle} />
              <Box>
                <Typography variant="h5">Projects</Typography>
                <Typography variant="h6">{counts.projects}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={cardStyles[2]}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <BookIcon style={iconStyle} />
              <Box>
                <Typography variant="h5">Brochures</Typography>
                <Typography variant="h6">{counts.brochures}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={cardStyles[3]}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <SchoolIcon style={iconStyle} />
              <Box>
                <Typography variant="h5">Tutorials</Typography>
                <Typography variant="h6">{counts.tutorials}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
