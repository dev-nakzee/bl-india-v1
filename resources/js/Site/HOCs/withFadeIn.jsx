// src/HOCs/withFadeIn.jsx
import React, { useState, useEffect } from 'react';
import './fade.css';

const withFadeIn = (WrappedComponent) => {
  return (props) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
      setFadeIn(true);
    }, []);

    return (
      <div className={`fade-enter ${fadeIn ? 'fade-enter-active' : ''}`}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withFadeIn;
