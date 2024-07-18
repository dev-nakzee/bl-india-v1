import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Button, Grid, TextField, MenuItem, InputAdornment } from "@mui/material";
import { styled } from "@mui/system";
import apiClient from "../../Services/api"; // Ensure the import path is correct
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { countries } from 'country-data';
import { useNavigate } from "react-router-dom";

const BrochureSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginX: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
}));

const BrochureContent = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(2),
}));

const BrochureImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
}));

const HomeBrochure = () => {
  const [brochureData, setBrochureData] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    countryCode: "+91",
    service: "",
    source: "",
    message: "",
  });
  const [otp, setOtp] = useState('');
  const [clientDetails, setClientDetails] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrochureData = async () => {
      try {
        const response = await apiClient.get("/home-brochure");
        setBrochureData(response.data.section[0]);
        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching brochure data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrochureData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/submit-brochure", formData);
      if (response.data.status === "success") {
        setClientDetails(response.data.client);
        setShowOtpInput(true);
        toast.success("Form submitted successfully. Please enter the OTP sent to your email.");
      }
    } catch (error) {
      console.error("Error submitting form:", error.response.data);
      toast.error("Failed to submit the form");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await apiClient.post('/verify-otp', {
        email: formData.email,
        otp: otp,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('client', JSON.stringify(response.data.client));
        toast.success("OTP verified successfully!");
        navigate("/account/brochures");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error.response.data);
      toast.error("Failed to verify OTP.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!brochureData) {
    return null;
  }

  return (
    <BrochureSection className='Brochure-section'>
      <ToastContainer />
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <BrochureContent className="Brochure-section-data">
            <Typography variant="h3" sx={{ mt: 2 }}>{brochureData.title}</Typography>
            <Typography variant="subtitle1">{brochureData.tag_line}</Typography>
            {!showOtpInput ? (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
     <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TextField
                            select
                            variant="standard"
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleInputChange}
                            fullWidth
                          >
                            {countries.all.map((country) => (
                              <MenuItem key={country.alpha2} value={country.countryCallingCodes[0]}>
                                {country.countryCallingCodes[0]} ({country.name})
                              </MenuItem>
                            ))}
                          </TextField>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  >
                    {services.map((service) => (
                      <MenuItem key={service.id} value={service.name}>
                        {service.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Referral Source"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  >
                    <MenuItem value="social media">Social Media</MenuItem>
                    <MenuItem value="google">Google</MenuItem>
                    <MenuItem value="reference">Reference</MenuItem>
                    <MenuItem value="newspaper">Newspaper</MenuItem>
                    <MenuItem value="website article">Website Article</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit Brochure Request
                  </Button>
                </Grid>
              </Grid>
              </Box>
            ) : (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Enter OTP sent to your email:</Typography>
                <TextField
                  label="OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  fullWidth
                  required
                />
                <Button onClick={verifyOtp} variant="contained" color="secondary" sx={{ mt: 2 }}>
                  Verify OTP
                </Button>
              </Box>
            )}
          </BrochureContent>
        </Grid>
        <Grid item xs={12} md={6}>
          <BrochureImage src={"https://in.bl-india.com" + brochureData.image_url} alt={brochureData.image_alt} />
        </Grid>
      </Grid>
    </BrochureSection>
  );
};

export default HomeBrochure;
