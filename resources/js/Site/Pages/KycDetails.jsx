import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Typography,
    Button,
    Grid,
    TextField,
    Box,
} from "@mui/material";
import kyc from "../../../../public/logos/kyc.svg";

// Define the passwords for access
const user_access_password = "bl@user"; // Replace with your actual password
const office_access_password = "bl@2014"; // Replace with your actual password

const KycDetails = () => {
    const [enteredPassword, setEnteredPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState("");

    const documentLinks = {
        pan: "/storage/download_files/GS6xkgwWKxbutWRW3Tim7VypznhI6KrD9X1IZvUj.pdf",
        gst: "/storage/download_files/7k52HkoEhVtz2jAjOaSQypUa0JXsXzwnLgYchhXd.pdf",
        tan: "/storage/download_files/BiAcMiqaCFmjPXzjJTGTahbOkeQW8PzM38wALXlz.pdf",
        iec: "/storage/download_files/KShIpA9McG4omMxtrnMhzcu2QHC5ohSma018VAfh.pdf",
        hsn: "/storage/download_files/nE4oKYehWcpeUMm4WKvhDaIncbu5t9aTtPq1YFFw.pdf",
        lut: "/storage/download_files/oLCrSIjBt9QlhaNLZUgkZqqVnKR5D2nmCKsFWcHW.pdf",
        tax: "/storage/download_files/zTtHUDdBrGDRRMnvbFRUVmKjvc0cI6LtCaYeUFSw.pdf",
        incorporation:
            "/storage/download_files/oJQMubVJGKO5fEtVxsOYxFm7Pd4f6TDXn4VAWfZd.pdf",
        msme: "/storage/download_files/g3ovzpDLnjnPbDVt7awnRE6rVq9QymNO7LXi8RwK.pdf",
        iso: "/storage/download_files/KSvadPJOyWL7NrcH3hjxfM74GJMFlRS7JFMAgWtY.pdf",
        bankAd: "/storage/download_files/4RlTJahkFuW9CRE1udl8soWdIKv6HNGDED8j6wP5.pdf",
        CRISILCertificate:
            "/storage/download_files/zUU8CjP3ViSoDVgbEhG48bDMkTnp4nuUjvLtj6Hq.pdf",
        DunandBradstreet:
            "/storage/download_files/Czl96ZFzLYZsykHd9AjQbcdaDG7rXqgxPN74vT4O.pdf",
    };

    // Function to handle password submission
    const handlePasswordSubmit = () => {
        if (
            enteredPassword === user_access_password ||
            enteredPassword === office_access_password
        ) {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Invalid password. Please try again.");
        }
    };

    return (
        <div style={{ margin: "0 auto", padding: "24px", minHeight: "500px" }}>
            {!isAuthenticated ? (
                <>
                    <Grid container    sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                        {/* Left Column - Form */}
                        <Grid
                            item
                            xs={12}
                            md={4}
                           
                        >
                            <Paper
                                sx={{ maxWidth: 500, padding: 3 ,textAlign:'center'}}
                                elevation={3}
                            >
                                  <img
                                src={kyc}
                                alt="KYC verification"
                                style={{
                                    width: "100%",
                                    height: "250px",
                                    objectFit: "contain",
                                }}
                            />
                                <Typography variant="h5" gutterBottom>
                                    Enter Password to Access KYC Details
                                </Typography>
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={enteredPassword}
                                    onChange={(e) =>
                                        setEnteredPassword(e.target.value)
                                    }
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <Typography
                                    component="p"
                                    variant="body2"
                                    marginBottom={2}
                                >
                                    If you don't know the password, please
                                    contact Brand Liaison.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handlePasswordSubmit}
                                >
                                    Submit
                                </Button>
                                {error && (
                                    <Typography color="error" variant="body1">
                                        {error}
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>

                       
                       
                    </Grid>
                </>
            ) : (
                <>
                    <Typography
                        className=""
                        variant="h3"
                        gutterBottom
                        marginBottom={{ md: 5, sm: 3, xs: 3 }}
                    >
                        KYC Details
                    </Typography>

                    <Grid
                        container
                        spacing={{ md: 8, sm: 4, xs: 4 }}
                        marginBottom={{ md: 4, sm: 3, xs: 2 }}
                    >
                        {/* Left Column - Bank Details and Billing Address */}
                        <Grid item xs={12} md={5}>
                            {/* Bank Details Table */}
                            <Typography
                                variant="h6"
                                marginBottom={{ md: 2, sm: 1, xs: 1 }}
                            >
                                Bank Details
                            </Typography>
                            <TableContainer
                                component={Paper}
                                sx={{
                                    outline: "1px solid #ccc", // Outline added
                                }}
                            >
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    Account Holder Name:
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                Brand Liaison India Pvt. Ltd.
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Name of Bank:</strong>
                                            </TableCell>
                                            <TableCell>
                                                Punjab National Bank
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    Bank Account Number:
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                1603000000000000
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    Type of Account:
                                                </strong>
                                            </TableCell>
                                            <TableCell>Current</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    IFS Code (RTGS / NEFT):
                                                </strong>
                                            </TableCell>
                                            <TableCell>PUNB0160300</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>SWIFT Code:</strong>
                                            </TableCell>
                                            <TableCell>PUNBINBBISB</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    Address of Bank Branch:
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                Punjab National Bank,
                                                Shakarpur-Laxminagar, Delhi –
                                                110092, India
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Billing Address Table */}
                            <Typography
                                variant="h6"
                                gutterBottom
                                marginTop={{ md: 4, sm: 3, xs: 2 }}
                                marginBottom={{ md: 2, sm: 1, xs: 1 }}
                            >
                                Billing Address
                            </Typography>
                            <TableContainer
                                component={Paper}
                                sx={{
                                    outline: "1px solid #ccc", // Outline added
                                }}
                            >
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Company Name:</strong>
                                            </TableCell>
                                            <TableCell>
                                                Brand Liaison India Pvt. Ltd.
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Address:</strong>
                                            </TableCell>
                                            <TableCell>
                                                110, Sharma Complex
                                                <br />
                                                A2, Guru Nanak Pura, Laxmi Nagar
                                                <br />
                                                Delhi - 110092
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Mobile:</strong>
                                            </TableCell>
                                            <TableCell>
                                                +91-9810363988
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>GSTIN:</strong>
                                            </TableCell>
                                            <TableCell>
                                                07AAFCB7720A1Z5
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Email:</strong>
                                            </TableCell>
                                            <TableCell>
                                                accounts@bl-india.com
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Contact:</strong>
                                            </TableCell>
                                            <TableCell>
                                                +91-8130744678 (Accounts)
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        {/* Right Column - Company Details - KYC */}
                        <Grid item xs={12} md={7}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                marginBottom={{ md: 2, sm: 1, xs: 1 }}
                            >
                                Company Details - KYC
                            </Typography>
                            <TableContainer
                                component={Paper}
                                sx={{
                                    outline: "1px solid #ccc", // Outline added
                                }}
                            >
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <strong>PAN No:</strong>
                                            </TableCell>
                                            <TableCell>AAFCB7720A</TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.pan}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.pan}
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    GST Registration No:
                                                </strong>
                                            </TableCell>
                                            <TableCell>
                                                07AAFCB7720A1Z5
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.gst}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.gst}
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>TAN No:</strong>
                                            </TableCell>
                                            <TableCell>DELB14438E</TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.tan}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.tan}
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>IEC Code:</strong>
                                            </TableCell>
                                            <TableCell>0516906722</TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.iec}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.iec}
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>HSN / SAC Code:</strong>
                                            </TableCell>
                                            <TableCell>998311</TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.hsn}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.hsn}
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>LUT No:</strong>
                                            </TableCell>
                                            <TableCell>
                                                AD0702220232705
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.lut}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.lut}
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    Tax Registration
                                                    Certificate:
                                                </strong>
                                            </TableCell>
                                            <TableCell> 2024 - 2025</TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.tax}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.tax}
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    Certificate of
                                                    Incorporation:
                                                </strong>
                                            </TableCell>
                                            <TableCell>U74900DL2014PTC263016</TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={
                                                        documentLinks.incorporation
                                                    }
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={
                                                        documentLinks.incorporation
                                                    }
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    Bank AD Code:
                                                </strong>
                                            </TableCell>
                                            <TableCell>0302056 - 2900009</TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.bankAd}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.bankAd}
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    MSME Certificate:
                                                </strong>
                                            </TableCell>
                                            <TableCell>UDYAM-DL-02-0013478</TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.msme}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.msme}
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>
                                                    ISO Certificate:
                                                </strong>
                                            </TableCell>
                                            <TableCell>24MEQPO94</TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.iso}
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={documentLinks.iso}
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        
                                        <TableRow>
                                            <TableCell>
                                                <strong>CRISIL Certificate</strong>
                                            </TableCell>
                                            <TableCell>2020 - 2021</TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={
                                                        documentLinks.CRISILCertificate
                                                    }
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={
                                                        documentLinks.CRISILCertificate
                                                    }
                                                    download
                                                >
                                                    Download
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Dun & Bradstreet Certificate</strong>
                                            </TableCell>
                                            <TableCell>87-414-3948</TableCell>
                                            <TableCell>
                                                <Button
                                                    component="a"
                                                    href={
                                                        documentLinks.DunandBradstreet
                                                    }
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    component="a"
                                                    href={
                                                        documentLinks.DunandBradstreet
                                                    }
                                                    download
                                                >
                                                    Download
                                                </Button>
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
