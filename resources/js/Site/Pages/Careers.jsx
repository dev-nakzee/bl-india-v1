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
  AccordionDetails,
  Drawer,
  IconButton
} from '@mui/material';
import { Search, ExpandMore, Close } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: null,
    jobOpeningId: '',
    status: 'Applied'
  });

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

  const handleApplyNowClick = (jobId) => {
    setFormData({ ...formData, jobOpeningId: jobId });
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: null,
      jobOpeningId: '',
      status: 'Applied'
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('resume', formData.resume);
    data.append('cover_letter', formData.coverLetter || ''); // If cover_letter is not selected, send an empty string
    data.append('job_opening_id', formData.jobOpeningId);
    data.append('status', formData.status);

    try {
      await apiClient.post('https://hrm.bl-india.com/api/v1/apply', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      handleCloseDrawer();
      toast.success('Application submitted successfully');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Error submitting application');
    }
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
      <ToastContainer />
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
                <Typography variant="body2" color="textSecondary">
                  Postings: {job.postings}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {job.status}
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
                <Button size="small" color="primary" onClick={() => handleApplyNowClick(job.id)}>
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 400, padding: 4 }}>
          <IconButton onClick={handleCloseDrawer} sx={{ mb: 2 }}>
            <Close />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            Application Form
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="resume-upload"
            type="file"
            name="resume"
            onChange={handleFileChange}
          />
          <label htmlFor="resume-upload">
            <Button variant="contained" component="span" fullWidth sx={{ mt: 2 }}>
              Upload Resume
            </Button>
            {formData.resume && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {formData.resume.name}
              </Typography>
            )}
          </label>
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="cover-letter-upload"
            type="file"
            name="coverLetter"
            onChange={handleFileChange}
          />
          <label htmlFor="cover-letter-upload">
            <Button variant="contained" component="span" fullWidth sx={{ mt: 2 }}>
              Upload Cover Letter (Optional)
            </Button>
            {formData.coverLetter && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {formData.coverLetter.name}
              </Typography>
            )}
          </label>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
            Submit Application
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Careers;