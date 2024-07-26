import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Pagination,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Button,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { styled } from '@mui/system';
import apiClient from '../Services/api'; // Ensure this is your configured axios instance
import BackButton from '../Components/BackButton';
import DownloadBrochure from "../Components/DownloadBrochure";
import RequestCallBack from "../Components/RequestCallBack";

const Sidebar = styled(Box)(({ theme }) => ({
  width: '25%',
  height: 'fit-content',
  position: 'sticky',
  top: '20px',
  overflowY: 'auto',
  
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    position: 'static',
    top: 'auto',
    overflowY: 'visible',
    paddingRight: 0,
  },
}));

const Blogs = () => {
  const { categorySlug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await apiClient.get('/blogs');
        const data = response.data;
        setPageData(data.page);
        setBlogs(data.blogs);
        setCategories(data.categories);

        const category = data.categories.find(cat => cat.slug === categorySlug);
        setSelectedCategory(category ? category.id : 'all');
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [categorySlug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!pageData) {
    return null; // Or return a fallback UI if needed
  }

  const handleCategoryClick = (categoryId, slug) => {
    setSelectedCategory(categoryId);
    navigate(`/blogs/${slug}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredBlogs = selectedCategory === 'all'
    ? blogs
    : blogs.filter(blog => blog.blog_category_id === selectedCategory);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const renderBlogCards = (blogs) => (
    blogs.map(blog => (
      <Grid item xs={12} sm={6} md={4} key={blog.id}>
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '20px' }}>
          <CardActionArea component={MuiLink} href={`/blogs/${blog.blog_category.slug}/${blog.slug}`}>
            <CardMedia
              component="img"
              height="140"
              image={'https://in.bl-india.com/' + blog.image_url}
              alt={blog.image_alt}
              className='cardmedia'
            />
            <CardContent>
              <Typography gutterBottom variant="subtitle1" component="h6">
                {blog.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {blog.seo_description}
              </Typography>
              <CardActions>
                <Button sx={{ marginTop: '15px' }} variant="outlined" component={MuiLink} href={`/blogs/${blog.blog_category.slug}/${blog.slug}`}>
                  Read More
                </Button>
              </CardActions>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ))
  );

  return (
    <>
      <Helmet>
        <title>{pageData.seo_title}</title>
        <meta name="description" content={pageData.seo_description} />
        <meta name="keywords" content={pageData.seo_keywords} />
      </Helmet>
      <Box sx={{ padding: 4 }} className="blog-page">
        <Box sx={{ display: "flex", justifyContent: 'center', alignContent: 'center' }}>
          <Typography className="page-heading" variant="h4" gutterBottom textAlign={'center'} marginBottom={5}>
            {pageData.name}
          </Typography>
        </Box>
        <Grid container spacing={{ sm: 1, md: 4 }}>
          {isMobile ? (
            <>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" sx={{ marginBottom: 3 }}>
                  <InputLabel>Blog Categories</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(event) => {
                      const categoryId = event.target.value;
                      const category = categories.find((cat) => cat.id === categoryId);
                      handleCategoryClick(categoryId, category?.slug || '');
                    }}
                    label="Blog Categories"
                  >
                    <MenuItem value="all">All Blogs</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {renderBlogCards(paginatedBlogs)}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
                  <Pagination
                    count={Math.ceil(filteredBlogs.length / blogsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={3}>
              <Sidebar className="Service-section-siderbar" sx={{ width: '100%'}}>
                <Box sx={{ border: "1px solid #0d629a", borderRadius: "25px", p: "20px"}}>
                  <Typography variant="h6" mb={2}>Blog Categories</Typography>
                  <List>
                    <ListItem
                      button
                      selected={selectedCategory === 'all'}
                      onClick={() => handleCategoryClick('all', '')}
                    >
                      <ListItemText primary="All Blogs" />
                    </ListItem>
                    {categories.map(category => (
                      <ListItem
                        key={category.id}
                        button
                        selected={category.id === selectedCategory}
                        onClick={() => handleCategoryClick(category.id, category.slug)}
                      >
                        <ListItemText primary={category.name} />
                      </ListItem>
                    ))}
                  </List>
                  </Box>
                  <DownloadBrochure />
                  <RequestCallBack />
                </Sidebar>
              </Grid>
              <Grid item xs={12} md={9}>
                <Grid container spacing={2}>
                  {renderBlogCards(paginatedBlogs)}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
                  <Pagination
                    count={Math.ceil(filteredBlogs.length / blogsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
                
                <Box sx={{ display: 'flex'}}>
                <BackButton/></Box>
              </Grid>
            </>
          )}
   
        </Grid>
        {isMobile ? (
            <Box sx={{marginBlock:2,display:'flex',justifyContent:'space-between'}}>
            <DownloadBrochure />
            <RequestCallBack />
          </Box>

        ):(
          <></>
        )
      }
      </Box>
    </>
  );
};

export default Blogs;
