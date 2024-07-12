import React, { useState } from 'react';
import { Typography, Grid, Card, CardContent, Icon } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Define custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#f5f5f5', // Flat background color for the cards
    color: '#333', // Text color
  },
  icon: {
    fontSize: '3rem', // Large icon size
    marginBottom: theme.spacing(1),
  },
}));

const Account = () => {
  const classes = useStyles();
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
          <Card className={classes.card}>
            <CardContent>
              <Icon className={classes.icon}>comment</Icon>
              <Typography variant="h5">Comments</Typography>
              <Typography variant="h6">{counts.comments}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className={classes.card}>
            <CardContent>
              <Icon className={classes.icon}>assignment</Icon>
              <Typography variant="h5">Projects</Typography>
              <Typography variant="h6">{counts.projects}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className={classes.card}>
            <CardContent>
              <Icon className={classes.icon}>book</Icon>
              <Typography variant="h5">Brochures</Typography>
              <Typography variant="h6">{counts.brochures}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className={classes.card}>
            <CardContent>
              <Icon className={classes.icon}>school</Icon>
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
