import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import apiClient from "../../Services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    countryCode: "+91", // Default country code
    service: "",
    source: "",
    message: "",
  });

  const countryCodes = [
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "Australia" },
    { code: "+81", country: "Japan" },
    { code: "+49", country: "Germany" },
    { code: "+86", country: "China" },
    { code: "+33", country: "France" },
    { code: "+39", country: "Italy" },
    { code: "+7", country: "Russia" },
    { code: "+55", country: "Brazil" },
    { code: "+27", country: "South Africa" },
    { code: "+34", country: "Spain" },
    { code: "+82", country: "South Korea" },
    { code: "+971", country: "UAE" },
    { code: "+52", country: "Mexico" },
    { code: "+62", country: "Indonesia" },
    { code: "+60", country: "Malaysia" },
    { code: "+65", country: "Singapore" },
    { code: "+66", country: "Thailand" },
    { code: "+64", country: "New Zealand" },
    { code: "+31", country: "Netherlands" },
    { code: "+46", country: "Sweden" },
    { code: "+41", country: "Switzerland" },
    { code: "+48", country: "Poland" },
    { code: "+45", country: "Denmark" },
    { code: "+47", country: "Norway" },
    { code: "+92", country: "Pakistan" },
    { code: "+63", country: "Philippines" },
    { code: "+20", country: "Egypt" },
    { code: "+98", country: "Iran" },
    { code: "+90", country: "Turkey" },
    { code: "+58", country: "Venezuela" },
    { code: "+56", country: "Chile" },
    { code: "+51", country: "Peru" },
    { code: "+57", country: "Colombia" },
    { code: "+54", country: "Argentina" },
    { code: "+964", country: "Iraq" },
    { code: "+880", country: "Bangladesh" },
    { code: "+94", country: "Sri Lanka" },
    { code: "+32", country: "Belgium" },
    { code: "+353", country: "Ireland" },
    { code: "+386", country: "Slovenia" },
    { code: "+357", country: "Cyprus" },
    { code: "+358", country: "Finland" },
    { code: "+961", country: "Lebanon" },
    { code: "+359", country: "Bulgaria" },
    { code: "+385", country: "Croatia" },
    { code: "+380", country: "Ukraine" },
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("https://pms.bl-india.com/api/lead", formData);
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!brochureData) {
    return null; // Or return a fallback UI if needed
  }

  return (
    <BrochureSection className='Brochure-section'>
      <ToastContainer />
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <BrochureContent className="Brochure-section-data">
            <Typography variant="h3" sx={{ mt: 2 }}>
              {brochureData.title}
            </Typography>
            <Typography variant="subtitle1">
              {brochureData.tag_line}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TextField
                            select
                            variant="standard"
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleInputChange}
                            sx={{ width: "100px" }}
                            displayEmpty
                          >
                            <MenuItem value="" disabled>
                              Country Code
                            </MenuItem>
                            {countryCodes.map((code) => (
                              <MenuItem key={code.code} value={code.code}>
                                {code.code} ({code.country})
                              </MenuItem>
                            ))}
                          </TextField>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  >
                    {services.map((service) => (
                      <MenuItem key={service.id} value={service.name}>
                        {service.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Referral Source"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" type="submit">
                Download Brochure
              </Button>
            </Box>
          </BrochureContent>
        </Grid>
        <Grid item xs={12} md={6}>
          <BrochureImage
            src={"https://in.bl-india.com/" + brochureData.image_url}
            alt={brochureData.image_alt}
          />
        </Grid>
      </Grid>
    </BrochureSection>
  );
};

export default HomeBrochure;
