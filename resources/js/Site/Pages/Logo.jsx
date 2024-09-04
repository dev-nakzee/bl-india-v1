import React from 'react';

// Array of logos where each entry contains the base name of the logo
const logos = [
    { name: '200x48', jpg: '/logos/logo-200x48.jpg', cdr: '/logos/cdr-200x48.cdr' },
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
