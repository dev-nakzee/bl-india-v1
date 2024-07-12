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

  const cardStyle = {
    backgroundColor: '#f5f5f5',
    color: '#333',
    textAlign: 'center',
  };

  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '0.5rem',
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card style={cardStyle}>
            <CardContent>
              <Box sx={iconStyle}>
                <CommentIcon style={iconStyle} />
              </Box>
              <Typography variant="h5">Comments</Typography>
              <Typography variant="h6">{counts.comments}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={cardStyle}>
            <CardContent>
              <Box sx={iconStyle}>
                <AssignmentIcon style={iconStyle} />
              </Box>
              <Typography variant="h5">Projects</Typography>
              <Typography variant="h6">{counts.projects}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={cardStyle}>
            <CardContent>
              <Box sx={iconStyle}>
                <BookIcon style={iconStyle} />
              </Box>
              <Typography variant="h5">Brochures</Typography>
              <Typography variant="h6">{counts.brochures}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={cardStyle}>
            <CardContent>
              <Box sx={iconStyle}>
                <SchoolIcon style={iconStyle} />
              </Box>
              <Typography variant="h5">Tutorials</Typography>
              <Typography variant="h6">{counts.tutorials}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
