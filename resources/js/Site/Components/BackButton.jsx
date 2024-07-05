// BackButton.js
import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, ArrowBackIosNewOutlined} from '@mui/icons-material';
import { Box } from '@mui/material';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back in the history stack
  };

  return (  
    <Box sx={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
      <Button variant="contained" onClick={goBack} sx={{display:'flex',alignItems:'center'}}>
      <ArrowBackIosNewOutlined fontSize='12px' sx={{textTransform:'inherit'}}/>Back
    </Button>
    </Box> 
  );
};


export default BackButton;
