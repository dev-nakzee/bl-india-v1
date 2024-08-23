import React, { useState } from "react";
import {
    Box,
    Button,
    Drawer,
    TextField,
    Typography,
    IconButton,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormGroup,
    Tooltip,
    MenuItem,
    Grid,
    Alert,
    CircularProgress,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { countries } from "country-data";
import apiClient from "../../Services/api";

const partnerTypes = ["Service Partner", "Channel Partner"];
const entityTypes = ["Company", "Individual"];

const PartnerWithUsLink = ({ displayType = "text" }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const [formData, setFormData] = useState({
        partnerType: "Service Partner",
        entityType: "Individual",
        name: "",
        email: "",
        phone: "",
        countryCode: "+1",
        companyName: "",
        designation: "",
        fieldOfExpertise: "",
        yearsOfExperience: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const toggleDrawer = (open) => (event) => {
        if (
            event?.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setIsDrawerOpen(open);
        if (!open) {
            resetForm();
        }
    };

    const resetForm = () => {
        setFormData({
            partnerType: "Service Partner",
            entityType: "Individual",
            name: "",
            email: "",
            phone: "",
            countryCode: "+1",
            companyName: "",
            designation: "",
            fieldOfExpertise: "",
            yearsOfExperience: "",
        });
        setErrors({});
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        try {
            await apiClient.post("/partner-with-us", {
                name: formData.name,
                email: formData.email,
                country_code: formData.countryCode,
                phone: formData.phone,
                partner_type: formData.partnerType,
                entity_type: formData.entityType,
                organization: formData.companyName,
                designation: formData.designation,
                field_of_expertise: formData.fieldOfExpertise,
                year_of_experience: formData.yearsOfExperience,
            });
            setLoading(false);
            setErrors({});
            setSuccessMessage("Partner request submitted successfully");
            resetForm();
        } catch (error) {
            setLoading(false);
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: "Error submitting partner request" });
            }
        }
    };

    return (
        <>
            {displayType === "text" ? (
                <Typography
                    variant="bodytext"
                    className="Service-list"
                    onClick={() => toggleDrawer(true)()}
                    sx={{ cursor: "pointer" }}
                >
                    Partner With Us
                </Typography>
            ) : (
                <Tooltip title="Partner With Us" arrow>
                    <IconButton
                        onClick={() => toggleDrawer(true)()}
                        aria-label="partner with us"
                    >
                        {isMobile ? (
                            <HandshakeIcon
                                fontSize="inherit"
                                style={{ color: "#0d629a" }}
                            />
                        ) : (
                            <HandshakeIcon
                                fontSize="inherit"
                                style={{ color: "#fff" }}
                            />
                        )}
                    </IconButton>
                </Tooltip>
            )}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => toggleDrawer(false)()}
            >
                <Box sx={{ width: 350, padding: 2 }} role="presentation">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <IconButton onClick={() => toggleDrawer(false)()}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Typography variant="h5" gutterBottom>
                        Partner With Us
                    </Typography>

                    {errors.general && (
                        <Alert severity="error">{errors.general}</Alert>
                    )}
                    {successMessage && (
                        <Alert severity="success">{successMessage}</Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <FormControl
                            component="fieldset"
                            margin="normal"
                            required
                        >
                            <FormLabel component="legend">
                                Partner Type
                            </FormLabel>
                            <FormGroup row>
                                <RadioGroup
                                    row
                                    name="partnerType"
                                    value={formData.partnerType}
                                    onChange={handleChange}
                                >
                                    {partnerTypes.map((type) => (
                                        <FormControlLabel
                                            key={type}
                                            value={type}
                                            control={<Radio />}
                                            label={type}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormGroup>
                            {errors.partner_type && (
                                <Alert severity="error">
                                    {errors.partner_type[0]}
                                </Alert>
                            )}
                        </FormControl>
                        <FormControl
                            component="fieldset"
                            margin="normal"
                            required
                        >
                            <FormLabel component="legend">
                                Entity Type
                            </FormLabel>
                            <FormGroup row>
                                <RadioGroup
                                    row
                                    name="entityType"
                                    value={formData.entityType}
                                    onChange={handleChange}
                                >
                                    {entityTypes.map((type) => (
                                        <FormControlLabel
                                            key={type}
                                            value={type}
                                            control={<Radio />}
                                            label={type}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormGroup>
                            {errors.entity_type && (
                                <Alert severity="error">
                                    {errors.entity_type[0]}
                                </Alert>
                            )}
                        </FormControl>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            error={!!errors.name}
                            helperText={errors.name && errors.name[0]}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            error={!!errors.email}
                            helperText={errors.email && errors.email[0]}
                        />
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <TextField
                                    select
                                    label="Code"
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    fullWidth
                                    error={!!errors.country_code}
                                    helperText={
                                        errors.country_code &&
                                        errors.country_code[0]
                                    }
                                    SelectProps={{
                                        MenuProps: {
                                            sx: { zIndex: 2000 },
                                        },
                                    }}
                                >
                                    {countries.all.map((country) => (
                                        <MenuItem
                                            key={country.alpha2}
                                            value={
                                                country.countryCallingCodes[0]
                                            }
                                        >
                                            {country.countryCallingCodes[0]} (
                                            {country.name})
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                    error={!!errors.phone}
                                    helperText={errors.phone && errors.phone[0]}
                                />
                            </Grid>
                        </Grid>
                        {formData.entityType === "Company" && (
                            <>
                                <TextField
                                    label="Company Name"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                    error={!!errors.organization}
                                    helperText={
                                        errors.organization &&
                                        errors.organization[0]
                                    }
                                />
                                <TextField
                                    label="Designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                    error={!!errors.designation}
                                    helperText={
                                        errors.designation &&
                                        errors.designation[0]
                                    }
                                />
                            </>
                        )}
                        {formData.entityType === "Individual" && (
                            <>
                                <TextField
                                    label="Field of Expertise"
                                    name="fieldOfExpertise"
                                    value={formData.fieldOfExpertise}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                    error={!!errors.field_of_expertise}
                                    helperText={
                                        errors.field_of_expertise &&
                                        errors.field_of_expertise[0]
                                    }
                                />
                                <TextField
                                    label="Years of Experience"
                                    name="yearsOfExperience"
                                    type="number"
                                    value={formData.yearsOfExperience}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    required
                                    error={!!errors.year_of_experience}
                                    helperText={
                                        errors.year_of_experience &&
                                        errors.year_of_experience[0]
                                    }
                                />
                            </>
                        )}
                        {loading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mt: 2,
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Submit
                            </Button>
                        )}
                    </form>
                </Box>
            </Drawer>
        </>
    );
};

export default PartnerWithUsLink;
