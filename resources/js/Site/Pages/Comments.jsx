import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';
import apiClient from '../Services/api'; // Ensure this is the correct import path

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiClient.get('/client/comments');
        console.log("Comments data:", response.data); // Debugging line to check data
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
        setError('Failed to load comments');
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // Helper function to format date or return a fallback string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1), // Months are zero-indexed in JavaScript
      date.getFullYear(),
    ].join('/');
  };

  // Helper function to ensure day and month are always two digits
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Comments</Typography>
      {comments.length > 0 ? (
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={comment.comments}
                secondary={'Posted on : ' + formatDate(comment.created_at) + ' | Status: ' + (comment.is_approved ? 'Approved' : 'Pending Approval')}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No comments found.</Typography>
      )}
    </div>
  );
};

export default Comments;
