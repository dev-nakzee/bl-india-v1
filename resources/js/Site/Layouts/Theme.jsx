// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize your primary color
    },
    secondary: {
      main: '#dc004e', // Customize your secondary color
    },
    background: {
      default: '#f5f5f5', // Customize your background color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '2rem',
      color: '#0D629A'
    },
    h2: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1.5rem',
            color: '#0D629A'
    },
    h3: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1.25rem',
            color: '#0D629A'
    },
    h4: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1.125rem',
        color: '#0D629A'
    },
    h5: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1rem',
      color: '#0D629A'
    },
    h6: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '0.875rem',
      color: '#0D629A'
    },
    subtitle1: {
      fontFamily: '"Raleway", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1rem',
    },
    subtitle2: {
      fontFamily: '"Raleway", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '0.875rem',
    },
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1rem',
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '0.875rem',
    },
    caption: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '0.75rem',
    },
    overline: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '0.625rem',
    },
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '0.875rem',
    },
    iconMenu: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '1.25rem',
        fontWeight: 500,
        color: '#0D629A',
    }
  },
});

export default theme;
