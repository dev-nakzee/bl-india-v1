
// export default HolidayList;
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Container,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { styled } from '@mui/system';
import apiClient from "../Services/api"; // Ensure this is your configured axios instance
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation } from 'react-router-dom';


const HolidayList = () => {
    const [pageData, setPageData] = useState(null);
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const location = useLocation();
    const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;


    useEffect(() => {
        fetchHolidayList();
    }, []);

    const Sidebar = styled(Box)(({ theme }) => ({
        width: "auto",
        height: "fit-content",
        position: "sticky",
        top: "20px",
        overflowY: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100%", // Make sidebar full width on small screens
            position: "static", // Remove sticky positioning on small screens
            top: "auto", // Reset top spacing on small screens
            overflowY: "visible", // Reset overflow on small screens
            paddingRight: 0, // Reset right padding on small screens
        },
    }));

    const fetchHolidayList = async (retryCount = 3) => {
        try {
            const response = await apiClient.get("/holiday-list");
            setPageData(response.data.page);
            setHolidays(response.data.holidays);
        } catch (error) {
            console.error("Error fetching holiday list:", error);
            if (retryCount > 0) {
                setTimeout(() => fetchHolidayList(retryCount - 1), 3000); // Retry after 3 seconds
            } else {
                setError(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const groupHolidaysByMonthAndYear = () => {
        return holidays.reduce((acc, holiday) => {
            const date = new Date(holiday.date);
            const month = date.getMonth();
            const year = date.getFullYear();

            if (year === selectedYear) {
                if (!acc[month]) {
                    acc[month] = [];
                }
                acc[month].push(holiday);
            }
            return acc;
        }, {});
    };

    const holidaysByMonthAndYear = groupHolidaysByMonthAndYear();

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    const tileClassName = ({ date, view }) => {
        if (view === "month") {
            const day = date.getDay();
            const localDateString = new Date(
                date.getTime() - date.getTimezoneOffset() * 60000
            )
                .toISOString()
                .split("T")[0];
            const holiday = holidays.find(
                (holiday) => holiday.date === localDateString
            );

            if (holiday) {
                return holiday.holiday_type === "Gazetted"
                    ? "gazetted-holiday"
                    : "restricted-holiday";
            } else if (day === 0) {
                return "sunday";
            } else if (day === 6) {
                return "saturday";
            }
        }
        return null;
    };

    const formatDateToIST = (date) => {
        const options = {
            timeZone: "Asia/Kolkata",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Typography variant="h6" color="error">
                    Failed to load data. Please try again later.
                </Typography>
            </Box>
        );
    }

    if (!pageData) {
        return null; // Or return a fallback UI if needed
    }

    const currentMonthHolidays = holidaysByMonthAndYear[selectedMonth] || [];

    return (
        <>
            <Helmet>
                <title>{pageData.seo_title}</title>
                <meta name="description" content={pageData.seo_description} />
                <meta name="keywords" content={pageData.seo_keywords} />
                
                <meta name="author" content="Rajesh Kumar" />
                <meta name="publisher" content="Brand Liaison India Pvt. Ltd." />
                <meta name="copyright" content="Brand Liaison India Pvt. Ltd." />
                <meta name="Classification" content="Business" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />
                <meta property="og:locale" content="en_US" />
                 <meta property="og:type" content="website" />
                <meta property="og:title" content={data.page.seo_title} />
                <meta property="og:description" content={pageData.seo_description} />
                <meta property="og:url" content="https://bl-india.com" />
                <meta property="og:site_name" content="Brand Liaison India®" />
                <meta property="og:image" content={'https://bl-india.com'+pageData.image_url} />
                <meta name="format-detection" content="telephone=no" />
                <link rel="canonical" href={fullUrl} />
            </Helmet>
            <>
                <Box padding={{lg:5,md:4,sm:3,xs:2}} className="holiday-list">
                    <Typography
                        className="page-main-heading page-heading"
                        variant="h1"
                        textAlign="center"
                        gutterBottom
                        marginBottom={5}
                    >
                        <Typography
                            variant="h4"
                            textAlign="center"
                            gutterBottom
                        >
                            {pageData.name}
                        </Typography>
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={3}>
                            <Sidebar className="Service-section-siderbar">
                                <Box sx={{ border: "1px solid #0d629a", borderRadius: "25px", p: "20px"}}>
                                    <List>
                                        <Typography
                                            variant="h6"
                                            textAlign="left"
                                            gutterBottom
                                        >
                                            Holidays for Month
                                        </Typography>
                                        {currentMonthHolidays.map((holiday) => (
                                            <ListItem key={holiday.id} sx={{paddingLeft:0}}>
                                                <ListItemText
                                                    primary={holiday.title}
                                                    secondary={`${formatDateToIST(
                                                        holiday.date
                                                    )}`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Sidebar>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Calendar
                                tileClassName={tileClassName}
                                activeStartDate={new Date(selectedYear, selectedMonth)}
                                onActiveStartDateChange={({
                                    activeStartDate,
                                }) => {
                                    handleMonthClick(activeStartDate.getMonth());
                                    handleYearChange(activeStartDate.getFullYear());
                                }}
                                locale="en-IN"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </>
        </>
    );
};

export default HolidayList;

