import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Helmet } from 'react-helmet';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import '../styles/Calendar.css'; // Custom styles for Calendar

const HolidayList = () => {
  const [pageData, setPageData] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    fetchHolidayList();
  }, []);

  const fetchHolidayList = async (retryCount = 3) => {
    try {
      const response = await apiClient.get('/holiday-list');
      setPageData(response.data.page);
      setHolidays(response.data.holidays);
    } catch (error) {
      console.error('Error fetching holiday list:', error);
      if (retryCount > 0) {
        setTimeout(() => fetchHolidayList(retryCount - 1), 3000); // Retry after 3 seconds
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const groupHolidaysByMonth = () => {
    return holidays.reduce((acc, holiday) => {
      const month = new Date(holiday.date).getMonth();
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(holiday);
      return acc;
    }, {});
  };

  const holidaysByMonth = groupHolidaysByMonth();

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const day = date.getDay();
      const localDateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      const holiday = holidays.find((holiday) => holiday.date === localDateString);
      
      if (holiday) {
        return holiday.holiday_type === 'Gazetted' ? 'gazetted-holiday' : 'restricted-holiday';
      } else if (day === 0) {
        return 'sunday';
      } else if (day === 6) {
        return 'saturday';
      }
    }
    return null;
  };

  const formatDateToIST = (date) => {
    const options = { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Failed to load data. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!pageData) {
    return null; // Or return a fallback UI if needed
  }

  const currentMonthHolidays = holidaysByMonth[selectedMonth] || [];

  return (
    <>
      <Helmet>
        <title>{pageData.seo_title}</title>
        <meta name="description" content={pageData.seo_description} />
        <meta name="keywords" content={pageData.seo_keywords} />
      </Helmet>
      <Container>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h3" gutterBottom>
            {pageData.name}
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Paper>
                <List>
                  {currentMonthHolidays.map((holiday) => (
                    <ListItem key={holiday.id}>
                      <ListItemText
                        primary={holiday.title}
                        secondary={`${formatDateToIST(holiday.date)}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={9}>
              <Calendar
                tileClassName={tileClassName}
                activeStartDate={new Date(2024, selectedMonth)}
                onActiveStartDateChange={({ activeStartDate }) => handleMonthClick(activeStartDate.getMonth())}
                locale="en-IN"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HolidayList;
