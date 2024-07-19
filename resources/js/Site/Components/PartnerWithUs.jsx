import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';

const PartnerWithUs = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container>
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <HandshakeIcon style={{ fontSize: 50, color: theme.palette.primary.main }} />
        <Typography variant="h6" gutterBottom sx={{ cursor: 'pointer', marginTop: 2 }}>
          Partner with us
        </Typography>
      </Box>
    </Container>
  );
};

export default PartnerWithUs;
