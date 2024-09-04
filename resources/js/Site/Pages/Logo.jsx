import React from 'react';
import { Button } from '@mui/material'; // Import Material UI Button component

// Array of logos where each entry contains the base name of the logo
const logos = [
    { name: '200x48', jpg: '/logos/logo-200x48.jpg', cdr: '/logos/cdr-200x48.cdr' },
    { name: '250x60', jpg: '/logos/logo-250x60.jpg', cdr: '/logos/cdr-250x60.cdr' },
    { name: '300x75', jpg: '/logos/logo-300x75.jpg', cdr: '/logos/cdr-300x75.cdr' },
    { name: '400x100', jpg: '/logos/logo-400x100.jpg', cdr: '/logos/cdr-400x100.cdr' },
    { name: '500x125', jpg: '/logos/logo-500x125.jpg', cdr: '/logos/cdr-500x125.cdr' },
    { name: '600x150', jpg: '/logos/logo-600x150.jpg', cdr: '/logos/cdr-600x150.cdr' },
    { name: '700x175', jpg: '/logos/logo-700x175.jpg', cdr: '/logos/cdr-700x175.cdr' },
    // Add more logos as needed
];

const Logo = () => {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            {logos.map((logo, index) => (
                <div key={index} style={{ marginBottom: '20px', textAlign: 'center' }}>
                    {/* Display JPG Image */}
                    <img 
                        src={logo.jpg} 
                        alt={logo.name} 
                        style={{ width: '100%', maxWidth: '400px', height: 'auto' }} 
                    />
                    
                    {/* Download Options */}
                    <div style={{ marginTop: '10px' }}>
                        <Button
                            component="a"
                            href={logo.jpg}
                            download
                            variant="contained"
                            style={{ marginRight: '10px' }}
                        >
                            Download JPG
                        </Button>
                        <Button
                            component="a"
                            href={logo.cdr}
                            download
                            variant="contained"
                        >
                            Download CDR
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Logo;
