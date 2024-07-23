import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Grid
} from '@mui/material';
import apiClient from '../services/api'; // Ensure this path is correct

const Settings = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await apiClient.get('/site-settings');
                setSettings(response.data);
            } catch (err) {
                setError('Error fetching site settings.');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (id, value) => {
        setSettings(settings.map(setting => setting.id === id ? { ...setting, value } : setting));
    };

    const handleFileChange = (id, file) => {
        setSettings(settings.map(setting => setting.id === id ? { ...setting, value: file } : setting));
    };

    const handleSubmit = async (id) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const setting = settings.find(setting => setting.id === id);
            const formData = new FormData();
            formData.append('value', setting.value);

            await apiClient.post(`/site-settings/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            setSuccess('Setting updated successfully.');
        } catch (err) {
            setError('Error updating setting.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Site Settings
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Grid container spacing={2}>
                {settings.map(setting => (
                    <Grid container item spacing={2} key={setting.id}>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6"> {setting.name === 'logo' ? 'Website Logo' : 'Website Icon'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {setting.value && typeof setting.value === 'string' && (
                                <Box sx={{ marginBottom: 1 }}>
                                    <img src={setting.value} alt={setting.name} style={{ maxHeight: '100px' }} />
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {setting.name === 'logo' || setting.name === 'site_icon' ? (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    type="file"
                                    onChange={(e) => handleFileChange(setting.id, e.target.files[0])}
                                    sx={{ marginBottom: 1 }}
                                />
                            ) : (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    value={setting.value || ''}
                                    onChange={(e) => handleChange(setting.id, e.target.value)}
                                    sx={{ marginBottom: 1 }}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" color="primary" onClick={() => handleSubmit(setting.id)}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Settings;
