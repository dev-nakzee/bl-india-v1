
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
  DialogActions
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

  const [selectedJobId, setSelectedJobId] = useState(null); // Track selected job ID
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
    status: 'Applied'
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
    setIsModalOpen(false); // Close the modal when the drawer opens
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
      await apiClient.post('https://hrm.bl-india.com/api/hrm/apply', data, {
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

  const handleOpenModal = (description, designation, jobId, responsibility) => {
    setSelectedJobDescription(description);
    setSelectedJobResponsibility(designation);
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobDescription(null);
    setSelectedJobResponsibility(null)
    setSelectedJobId(null);
  };

  const filteredJobs = jobs.filter(job =>
    job.designation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  let maxWidth = 'lg';

  if (isMd) {
    maxWidth = 'md';
  }

  if (isSm) {
    maxWidth = 'sm';
  }

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
        <meta name="keywords" content={pageData.seo_keywords} />

        <meta name="author" content="Rajesh Kumar" />
        <meta name="publisher" content="Brand Liaison India Pvt. Ltd." />
        <meta name="copyright" content="Brand Liaison India Pvt. Ltd." />
        <meta name="Classification" content="Business" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageData.seo_title} />
        <meta property="og:description" content={pageData.seo_description} />
        <meta property="og:url" content="https://bl-india.com" />
        <meta property="og:site_name" content="Brand Liaison India®" />
        <meta property="og:image" content="https://ik.imagekit.io/iouishbjd/BL-Site/logo-700x175.jpg?updatedAt=1722162753208" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href={fullUrl} />
      </Helmet>
      <Box padding={{ lg: 5, md: 4, sm: 3, xs: 2 }}>
        <ToastContainer />
        <Typography className="page-main-heading page-heading" variant="h1" textAlign="center" gutterBottom
          marginBottom={{ xs: 1, md: 3, lg: 5 }}>
          {pageData.title || 'Career'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {pageData.description}
        </Typography>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}> 
        <Typography variant="h4" gutterBottom>
         Job Openings
        </Typography>
        <TextField
          label="Search Jobs"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{width:'30%'}}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        </Box>
        <Grid container spacing={4} marginTop={{ xs: 1, md: 2 }}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {job.designation.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlock: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      <b>Positions:</b> {job.no_of_openings}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <b>Status:</b> {job.status}
                    </Typography>
                  </Box>
                  <Box marginTop={2}>
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenModal(job.designation.description, job.designation.name, job.id)}
                    >
                      View Job Description
                    </Button>

                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Job Description Modal */}
        <Dialog  className="Dialog-careers" open={isModalOpen} onClose={handleCloseModal} maxWidth={maxWidth} fullWidth={true} sx={{ padding: 3, height: '100%', width: '100%' }}>
          <DialogTitle>
        {SelectedJobResponsibility}
          </DialogTitle>
          <DialogContent>
            <Typography component="div" dangerouslySetInnerHTML={{ __html: selectedJobDescription }} />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => handleApplyNowClick(selectedJobId)} // Open the drawer from the modal
              color="primary"
            >
              Apply Now
            </Button>
            <Button onClick={handleCloseModal} color="secondary" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Application Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
          <IconButton onClick={handleCloseDrawer} sx={{justifyContent:'end',padding:2}}>
            <Close />
          </IconButton>
          <Box sx={{ width: 400, padding: 2}}>
            <Box >
              <Typography variant="h5" sx={{marginBottom:2}}>
                Application Form
              </Typography>

            </Box>

            <Typography variant="body font-bold "  gutterBottom>
              {SelectedJobResponsibility}
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
