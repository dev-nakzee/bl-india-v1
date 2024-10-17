import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent, Button, CardActions } from '@mui/material';
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
        <BlogSection className='Blog-section'>
            <Grid container spacing={4} alignItems="center" marginBlock={{ xs:0 ,sm:1,md: 4 }}>
                <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 500, background: '#0D629A', maxWidth: 280, color: '#ffffff', margin: 'auto', borderRadius: 20 }}>
                        {section[0].tag_line}
                    </Typography>
                    <Typography variant="h3" sx={{ textAlign: 'center', mt: 2}}>
                        {section[0].title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={{xs:1, sm:2,md:4}}>
                        {blogs.map((blog) => (
                            <Grid item xs={12} sm={4} md={4} key={blog.id}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' ,borderRadius:'20px'}}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={'https://bl-india.com/' + blog.image_url}
                                        sx={{  backgroundSize: 'cover', objectFit: 'unset'}}
                                        alt={blog.image_alt}
                                    />
                                    <CardContent>
                                        <Typography variant="subtitle1" component="div">
                                            {blog.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" 
                                      
                                      sx={{
                                        marginTop: '5px',
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2,
                                        overflow: "hidden",
                                    }}
                                      >
                                            {blog.content}
                                        </Typography>
                                        <CardActions>
                                        <Button component={Link} to={`/blogs/${blog.blog_category.slug}/${blog.slug}`} sx={{ mt: 2 }} variant="outlined" color="primary">
                                            Read More
                                        </Button>
                                </CardActions>
                                       
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Button component={Link} to="/blogs" variant="contained" color="primary">
                            View All
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </BlogSection>
    );
};

export default HomeBlog;
