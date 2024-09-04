import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Button } from '@mui/material';

const KycDetails = () => {
    const handleView = (documentName) => {
        // Implement the logic to view the document
        alert(`Viewing: ${documentName}`);
    };

    const handleDownload = (documentName) => {
        // Implement the logic to download the document
        alert(`Downloading: ${documentName}`);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                KYC Details
            </Typography>

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

            {/* Company Details KYC Table */}
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                Company Details - KYC
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell><strong>PAN No:</strong></TableCell>
                            <TableCell>AAFCB7720A</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('PAN No')}>View</Button>
                                <Button onClick={() => handleDownload('PAN No')}>Download</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>GST Registration No:</strong></TableCell>
                            <TableCell>07AAFCB7720A1Z5</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('GST Registration No')}>View</Button>
                                <Button onClick={() => handleDownload('GST Registration No')}>Download</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>TAN No:</strong></TableCell>
                            <TableCell>DELB14438E</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('TAN No')}>View</Button>
                                <Button onClick={() => handleDownload('TAN No')}>Download</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>IEC Registration:</strong></TableCell>
                            <TableCell>514013168</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('IEC Registration')}>View</Button>
                                <Button onClick={() => handleDownload('IEC Registration')}>Download</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>HSN / SAC Code:</strong></TableCell>
                            <TableCell>998311</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('HSN / SAC Code')}>View</Button>
                                <Button onClick={() => handleDownload('HSN / SAC Code')}>Download</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>LUT Letter:</strong></TableCell>
                            <TableCell>2024-25</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('LUT Letter')}>View</Button>
                                <Button onClick={() => handleDownload('LUT Letter')}>Download</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Tax Residency Certificate:</strong></TableCell>
                            <TableCell>2024-25</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('Tax Residency Certificate')}>View</Button>
                                <Button onClick={() => handleDownload('Tax Residency Certificate')}>Download</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Incorporation Certificate:</strong></TableCell>
                            <TableCell>U74900DL2014PTC263016</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('Incorporation Certificate')}>View</Button>
                                <Button onClick={() => handleDownload('Incorporation Certificate')}>Download</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>MSME / Udyam Certificate:</strong></TableCell>
                            <TableCell>UDYAM-DL-02-0013478</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('MSME / Udyam Certificate')}>View</Button>
                                <Button onClick={() => handleDownload('MSME / Udyam Certificate')}>Download</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>ISO Certificate:</strong></TableCell>
                            <TableCell>24MEQPO94</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('ISO Certificate')}>View</Button>
                                <Button onClick={() => handleDownload('ISO Certificate')}>Download</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Bank AD Code:</strong></TableCell>
                            <TableCell>0302056 - 2900009</TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('Bank AD Code')}>View</Button>
                                <Button onClick={() => handleDownload('Bank AD Code')}>Download</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Undertaking for Section 206AB and Section 206CCA:</strong></TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <Button onClick={() => handleView('Undertaking for Section 206AB and Section 206CCA')}>View</Button>
                                <Button onClick={() => handleDownload('Undertaking for Section 206AB and Section 206CCA')}>Download</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default KycDetails;
