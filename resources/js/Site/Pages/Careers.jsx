import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Search, ExpandMore } from '@mui/icons-material';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (retryCount = 3) => {
    try {
      const response = await apiClient.get('https://hrm.bl-india.com/api/v1/job-list');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      if (retryCount > 0) {
        setTimeout(() => fetchJobs(retryCount - 1), 3000); // Retry after 3 seconds
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredJobs = jobs.filter(job =>
    job.designation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Failed to load data. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Careers
      </Typography>
      <TextField
        label="Search Jobs"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Grid container spacing={4}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {job.designation.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Positions: {job.positions}
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>Job Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{job.designation.description}</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>Responsibilities</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{job.designation.responsibility}</Typography>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Careers;
