// BackButton.js
import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back in the history stack
  };

  return (   
    <ArrowBack color='primary' onClick={goBack} />
  );
};

export default BackButton;
