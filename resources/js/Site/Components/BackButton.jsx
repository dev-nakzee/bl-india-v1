import React from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <IconButton onClick={goBack} color="primary">
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
