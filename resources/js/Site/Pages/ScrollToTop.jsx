// ScrollToTopButton.js

import React, { useState } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Styled component for the button
const ScrollTopButton = styled(Button)({
  position: 'fixed',
  right: 16,
  bottom: 16,
  zIndex: 1000,
});

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Add scroll event listener
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <ScrollTopButton onClick={scrollToTop} color="primary" variant="contained" className='scrolltopbutton'>
          <KeyboardArrowUpIcon />
        </ScrollTopButton>
      )}
    </div>
  );
};

export default ScrollToTopButton;
