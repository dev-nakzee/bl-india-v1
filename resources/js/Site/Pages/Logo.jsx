import React from 'react';

// Dynamically import all .jpg files from the `logos` folder in `src`
const importAll = (r) => {
    return r.keys().map(r);
};

// Load all jpg images from the `logos` folder
const logos = importAll(require.context('../logos', false, /\.(jpg|jpeg)$/));

const Logo = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {logos.map((logo, index) => (
                <img 
                    key={index} 
                    src={logo} 
                    alt={`Logo ${index}`} 
                    style={{ width: '100px', height: '100px', objectFit: 'contain' }} 
                />
            ))}
        </div>
    );
};

export default Logo;
