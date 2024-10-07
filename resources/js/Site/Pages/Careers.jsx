import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Drawer,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedJobDescription, setSelectedJobDescription] = useState(null);
  const [SelectedJobResponsibility, setSelectedJobResponsibility] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: null,
    jobOpeningId: '',
    status: 'Applied',
  });

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const pageResponse = await apiClient.get('/careers');
      setPageData(pageResponse.data);
      await fetchJobs();
    } catch (error) {
      console.error('Error fetching page data:', error);
      setError(true);
      setLoading(false);
    }
  };

  const fetchJobs = async (retryCount = 3) => {
    try {
      const response = await apiClient.get('https://hrm.bl-india.com/api/hrm/job-list');
      const jobList = Array.isArray(response.data) ? response.data : [];
      setJobs(jobList);
      console.log('Fetched jobs:', jobList); // Log the job data to verify
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
    setIsModalOpen(false);
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
      status: 'Applied',
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
    data.append('cover_letter', formData.coverLetter || '');
    data.append('job_opening_id', formData.jobOpeningId);
    data.append('status', formData.status);

    try {
      await apiClient.post('https://hrm.bl-india.com/api/hrm/apply', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleCloseDrawer();
      toast.success('Application submitted successfully');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Error submitting application');
    }
  };

  const handleOpenModal = (description, designation, jobId) => {
    setSelectedJobDescription(description);
    setSelectedJobResponsibility(designation);
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobDescription(null);
    setSelectedJobResponsibility(null);
    setSelectedJobId(null);
  };

  // Safeguard the filter method by checking if `jobs` is an array.
  const filteredJobs = Array.isArray(jobs)
    ? jobs.filter((job) =>
        job?.designation?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  let maxWidth = 'lg';
  if (isMd) maxWidth = 'md';
  if (isSm) maxWidth = 'sm';

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
    <>
      <Helmet>
        <title>{pageData.seo_title}</title>
        <meta name="description" content={pageData.seo_description} />
      </Helmet>
      <Box padding={{ lg: 5, md: 4, sm: 3, xs: 2 }}>
        <ToastContainer />
        <Typography variant="h1" textAlign="center" gutterBottom>
          {pageData.title || 'Careers'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {pageData.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Job Opening
          </Typography>
          <TextField
            label="Search Jobs"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: '30%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Grid container spacing={4} marginTop={2}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{job.designation.name}</Typography>
                  <Typography variant="body2">Positions: {job.no_of_openings}</Typography>
                  <Typography variant="body2">Status: {job.status}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenModal(job.designation.description, job.designation.name, job._id)}
                  >
                    View Job Description
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth={maxWidth} fullWidth>
          <DialogTitle>{SelectedJobResponsibility}</DialogTitle>
          <DialogContent>
            <Typography component="div" dangerouslySetInnerHTML={{ __html: selectedJobDescription }} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => handleApplyNowClick(selectedJobId)} color="primary">
              Apply Now
            </Button>
            <Button onClick={handleCloseModal} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
          <IconButton onClick={handleCloseDrawer}>
            <Close />
          </IconButton>
          <Box sx={{ width: 400, padding: 2 }}>
            <Typography variant="h5">Application Form</Typography>
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
              <Button variant="outlined" component="span" fullWidth sx={{ mt: 2 }} startIcon={<CloudUploadIcon />}>
                Upload Resume
              </Button>
              {formData.resume && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {formData.resume.name}
                </Typography>
              )}
            </label>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
              Submit Application
            </Button>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Careers;
