import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import apiClient from '../../Services/api';

const BlogSection = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(4),
    backgroundColor: '#C3E7FF',
    boxShadow: theme.shadows[3],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const BlogContent = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(2),
}));

const BlogImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
}));

const HomeBlog = () => {
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await apiClient.get('/home-blog');
                setBlogData(response.data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!blogData) {
        return null; // Or return a fallback UI if needed
    }

    const { section, blogs } = blogData;

    return (
        <BlogSection>
            <Grid container spacing={4} alignItems="center" sx={{ mx: 4 }}>
                <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff', margin: 'auto', borderRadius: 20 }}>
                        {section[0].tag_line}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <BlogImage src={'https://in.bl-india.com/' + section[0].image_url} alt={section[0].image_alt} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BlogContent>
                        <Typography variant="h2" sx={{ mt: 2, fontSize: '1.75rem', fontWeight: 500, textTransform: 'uppercase' }}>
                            {section[0].title}
                        </Typography>
                    </BlogContent>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={4}>
                        {blogs.map((blog) => (
                            <Grid item xs={12} md={4} key={blog.id}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={'https://in.bl-india.com/' + blog.image_url}
                                        alt={blog.image_alt}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {blog.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {blog.content}
                                        </Typography>
                                        <Button component={Link} to={`/blog/${blog.slug}`} sx={{ mt: 2 }} variant="outlined" color="primary">
                                            Read More
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </BlogSection>
    );
};

export default HomeBlog;
