import React, { useState } from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';

const Account = () => {
  const [counts] = useState({
    comments: 10, // Dummy data
    projects: 5,  // Dummy data
    brochures: 7, // Dummy data
    tutorials: 3, // Dummy data
  });

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Comments</Typography>
              <Typography variant="h6">{counts.comments}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Projects</Typography>
              <Typography variant="h6">{counts.projects}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Brochures</Typography>
              <Typography variant="h6">{counts.brochures}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
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
