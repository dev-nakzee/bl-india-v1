import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Button, Grid, TextField } from '@mui/material';

// Define the passwords for access
const user_access_password = '3BhqvxpSC88s'; // Replace with your actual password
const office_access_password = 'EwzA5eSmfWGz'; // Replace with your actual password

const KycDetails = () => {
    const [enteredPassword, setEnteredPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    const documentLinks = {
        pan: "/storage/download_files/GS6xkgwWKxbutWRW3Tim7VypznhI6KrD9X1IZvUj.pdf",
        gst: "/storage/download_files/7k52HkoEhVtz2jAjOaSQypUa0JXsXzwnLgYchhXd.pdf",
        tan: "/storage/download_files/BiAcMiqaCFmjPXzjJTGTahbOkeQW8PzM38wALXlz.pdf",
        iec: "/storage/download_files/KShIpA9McG4omMxtrnMhzcu2QHC5ohSma018VAfh.pdf",
        hsn: "/storage/download_files/nE4oKYehWcpeUMm4WKvhDaIncbu5t9aTtPq1YFFw.pdf",
        lut: "/storage/download_files/oLCrSIjBt9QlhaNLZUgkZqqVnKR5D2nmCKsFWcHW.pdf",
        tax: "/storage/download_files/zTtHUDdBrGDRRMnvbFRUVmKjvc0cI6LtCaYeUFSw.pdf",
        incorporation: "/storage/download_files/oJQMubVJGKO5fEtVxsOYxFm7Pd4f6TDXn4VAWfZd.pdf",
        msme: "/storage/download_files/g3ovzpDLnjnPbDVt7awnRE6rVq9QymNO7LXi8RwK.pdf",
        iso: "/storage/download_files/KSvadPJOyWL7NrcH3hjxfM74GJMFlRS7JFMAgWtY.pdf",
        bankAd: "/storage/download_files/4RlTJahkFuW9CRE1udl8soWdIKv6HNGDED8j6wP5.pdf",
        undertaking: "/storage/download_files/IQx0znj1UBkZ3wl9OhNfpcdFv13IqCWr84WKhMRO.pdf",
    };

    // Function to handle password submission
    const handlePasswordSubmit = () => {
        if (enteredPassword === user_access_password || enteredPassword === office_access_password) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {!isAuthenticated ? (
                <div>
                    <Typography variant="h4" gutterBottom>
                        Enter Password to Access KYC Details
                    </Typography>
                    <TextField
                        label="Password"
                        type="password"
                        value={enteredPassword}
                        onChange={(e) => setEnteredPassword(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handlePasswordSubmit}>
                        Submit
                    </Button>
                    {error && <Typography color="error" variant="body1">{error}</Typography>}
                </div>
            ) : (
                <>
                    <Typography variant="h4" gutterBottom>
                        KYC Details
                    </Typography>

                    <Grid container spacing={3}>
                        {/* Left Column - Bank Details and Billing Address */}
                        <Grid item xs={12} md={6}>
                            {/* Bank Details Table */}
                            <Typography variant="h6" gutterBottom>
                                Bank Details
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>Account Holder Name:</strong></TableCell>
                                            <TableCell>Brand Liaison India Pvt. Ltd.</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Name of Bank:</strong></TableCell>
                                            <TableCell>Punjab National Bank</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Bank Account Number:</strong></TableCell>
                                            <TableCell>1603000000000000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Type of Account:</strong></TableCell>
                                            <TableCell>Current</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>IFS Code (RTGS / NEFT):</strong></TableCell>
                                            <TableCell>PUNB0160300</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>SWIFT Code:</strong></TableCell>
                                            <TableCell>PUNBINBBISB</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Address of Bank Branch:</strong></TableCell>
                                            <TableCell>Punjab National Bank, Shakarpur-Laxminagar, Delhi – 110092, India</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Billing Address Table */}
                            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                                Billing Address
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>Company Name:</strong></TableCell>
                                            <TableCell>Brand Liaison India Pvt. Ltd.</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Address:</strong></TableCell>
                                            <TableCell>
                                                110, Sharma Complex<br />
                                                A2, Guru Nanak Pura, Laxmi Nagar<br />
                                                Delhi - 110092
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Mobile:</strong></TableCell>
                                            <TableCell>+91-9810363988</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>GSTIN:</strong></TableCell>
                                            <TableCell>07AAFCB7720A1Z5</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Email:</strong></TableCell>
                                            <TableCell>accounts@bl-india.com</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Contact:</strong></TableCell>
                                            <TableCell>+91-8130744678 (Accounts)</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        {/* Right Column - Company Details - KYC */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                Company Details - KYC
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>PAN No:</strong></TableCell>
                                            <TableCell>AAFCB7720A</TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.pan} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.pan} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>GST Registration No:</strong></TableCell>
                                            <TableCell>07AAFCB7720A1Z5</TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.gst} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.gst} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>TAN No:</strong></TableCell>
                                            <TableCell>DELB14438E</TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.tan} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.tan} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>IEC Registration:</strong></TableCell>
                                            <TableCell>514013168</TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.iec} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.iec} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>HSN / SAC Code:</strong></TableCell>
                                            <TableCell>998311</TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.hsn} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.hsn} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>LUT Letter:</strong></TableCell>
                                            <TableCell>2024-25</TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.lut} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.lut} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Tax Residency Certificate:</strong></TableCell>
                                            <TableCell>2024-25</TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.tax} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.tax} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Incorporation Certificate:</strong></TableCell>
                                            <TableCell>U74900DL2014PTC263016</TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.incorporation} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.incorporation} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>MSME / Udyam Certificate:</strong></TableCell>
                                            <TableCell>UDYAM-DL-02-0013478</TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.msme} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.msme} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>ISO Certificate:</strong></TableCell>
                                            <TableCell>24MEQPO94</TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.iso} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.iso} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Bank AD Code:</strong></TableCell>
                                            <TableCell>0302056 - 2900009</TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.bankAd} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.bankAd} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Undertaking for Section 206AB and Section 206CCA:</strong></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>
                                                <Button component="a" href={documentLinks.undertaking} target="_blank" rel="noopener">View</Button>
                                                <Button component="a" href={documentLinks.undertaking} download>Download</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </>
            )}
        </div>
    );
};

export default KycDetails;
