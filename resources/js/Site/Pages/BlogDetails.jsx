import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useMediaQuery,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { styled } from "@mui/system";
import apiClient from "../Services/api"; // Ensure this is your configured axios instance
import { CalendarMonthOutlined, CommentOutlined } from "@mui/icons-material";
import SharePage from "../Components/SharePage";
import BackButton from "../Components/BackButton";
import DownloadBrochure from "../Components/DownloadBrochure";
import RequestCallBack from "../Components/RequestCallBack";
import CommentLoginDrawer from "../Components/CommentLoginDrawer"; // Import the new component
import { useLocation } from 'react-router-dom';

const BlogDetails = () => {
    const { categorySlug, blogSlug } = useParams();
    const [blog, setBlog] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [commentData, setCommentData] = useState({
        comment: "",
    });
    const [commentError, setCommentError] = useState("");
    const [comments, setComments] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const location = useLocation();
    const fullUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`;

    const Sidebar = styled(Box)(({ theme }) => ({
        width: "25%",
        height: "fit-content",
        position: "sticky",
        top: "20px",
        overflowY: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            position: "static",
            top: "auto",
            overflowY: "visible",
            paddingRight: 0,
        },
    }));

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await apiClient.get(
                    `/blogs/${categorySlug}/${blogSlug}`
                );
                setBlog(response.data.blog);
                setCategories(response.data.categories);
                setComments(response.data.comments);

                const category = response.data.categories.find(
                    (cat) => cat.slug === categorySlug
                );
                setSelectedCategory(category ? category.id : "all");
            } catch (error) {
                console.error("Error fetching blog data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [categorySlug, blogSlug]);

    const handleCommentChange = (e) => {
        const { name, value } = e.target;
        setCommentData({
            ...commentData,
            [name]: value,
        });
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentData.comment) {
            setCommentError("Comment field is required.");
            return;
        }

        try {
            const response = await apiClient.post(
                `/blogs/${blog.id}/comments`, // Use the blog ID here
                {
                    comment: commentData.comment,
                }
            );

            setCommentData({ comment: "" });
            setCommentError("");
        } catch (error) {
            console.error("Error submitting comment:", error);
            setCommentError("Failed to submit comment.");
        }
    };

    const isLoggedIn = !!localStorage.getItem('token');

    const handleCategoryClick = (categoryId, slug) => {
        setSelectedCategory(categoryId);
        navigate(`/blogs/${slug}`);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
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

    if (!blog) {
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
                    Blog not found.
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Helmet>
                <title>{blog.seo_title}</title>
                <meta name="description" content={blog.seo_description} />
                <meta name="keywords" content={blog.seo_keywords} />
                
                <meta name="author" content="Rajesh Kumar" />
                <meta name="publisher" content="Brand Liaison India Pvt. Ltd." />
                <meta name="copyright" content="Brand Liaison India Pvt. Ltd." />
                <meta name="Classification" content="Business" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={blog.seo_title} />
                <meta property="og:description" content={blog.seo_description} />
                <meta property="og:url" content="https://bl-india.com" />
                <meta property="og:site_name" content="Brand Liaison India®" />
                <meta property="og:image" content="https://ik.imagekit.io/iouishbjd/BL-Site/logo-700x175.jpg?updatedAt=1722162753208" />
                <meta name="format-detection" content="telephone=no" />
                <link rel="canonical" href={fullUrl} />
            </Helmet>
            <Box padding={{lg:5,md:4,sm:3,xs:2}}>
                
                <Typography
                    className="page-heading"
                    variant="h4"
                    gutterBottom
                    textAlign={"center"}
                    marginBottom={4}
                >
                    Blog Details
                </Typography>
               
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
                                        handleCategoryClick(categoryId, category?.slug || "");
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
                        <Grid item xs={12} md={9}>
                            <img
                                src={"https://in.bl-india.com" + blog.image_url}
                                alt={blog.image_alt}
                                style={{
                                    width: "100%",
                                    borderRadius: "20px",
                                    marginBottom: "20px",
                                }}
                            />
                            <Typography variant="subtitle1" gutterBottom>
                                {blog.name}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    marginBlock: "2rem",
                                    gap: "2rem",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <CalendarMonthOutlined color="secondary" />
                                    <span>
                                        {`Posted on ${new Date(
                                            blog.created_at
                                        ).toLocaleDateString()}`}
                                    </span>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <CommentOutlined color="secondary" />
                                    <span>{comments.length}</span>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <SharePage color='secondary' />
                                </Box>
                            </Box>
                            <Typography variant="body1" gutterBottom>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: blog.content,
                                    }}
                                />
                            </Typography>
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Comments
                                </Typography>
                                <List>
                                    {comments.map((comment) => (
                                        <ListItem key={comment.id}>
                                            <ListItemText
                                                primary={comment.client.name}
                                                secondary={comment.comments}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                                <Box>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Add a Comment
                                    </Typography>
                                    {isLoggedIn ? (
                                        <form onSubmit={handleCommentSubmit}>
                                            <TextField
                                                fullWidth
                                                label="Comment"
                                                name="comment"
                                                value={commentData.comment}
                                                onChange={handleCommentChange}
                                                margin="normal"
                                                multiline
                                                rows={4}
                                            />
                                            {commentError && (
                                                <Alert
                                                    severity="error"
                                                    sx={{ mt: 2 }}
                                                >
                                                    {commentError}
                                                </Alert>
                                            )}
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                sx={{ mt: 2 }}
                                            >
                                                Submit Comment
                                            </Button>
                                        </form>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={toggleDrawer}
                                            sx={{ mt: 2 }}
                                        >
                                            Login to Comment
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    </>
                ) : (
                    <Grid container spacing={4}>
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignContent={"center"}
                            margin={4}
                        >
                            <Grid item xs={12} md={3}>
                            <Sidebar className="Service-section-siderbar" sx={{ width: "auto" }}>
                                <Box sx={{ border: "1px solid #0d629a", borderRadius: "25px", p: "20px"}}>

                                <Typography variant="h6" mb={2}>
                                    Blog Categories
                                </Typography>
                                <List>
                                    <ListItem
                                        button
                                        selected={selectedCategory === "all"}
                                        onClick={() => handleCategoryClick("all", "")}
                                    >
                                        <ListItemText primary="All Blogs" />
                                    </ListItem>
                                    {categories.map((category) => (
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
                                <img
                                    src={"https://in.bl-india.com" + blog.image_url}
                                    alt={blog.image_alt}
                                    style={{
                                        width: "100%",
                                        borderRadius: "20px",
                                        marginBottom: "20px",
                                    }}
                                />
                                <Typography className="page-main-heading "
                    variant="h1" gutterBottom>
                                    {blog.name}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        marginBlock: "2rem",
                                        gap: "2rem",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <CalendarMonthOutlined color="secondary" />
                                        <span>
                                            {`Posted on ${new Date(
                                                blog.created_at
                                            ).toLocaleDateString()}`}
                                        </span>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <CommentOutlined color="secondary" />
                                        <span>{comments.length}</span>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <SharePage color="secondary" />
                                    </Box>
                                </Box>
                                <Typography variant="body1" gutterBottom>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: blog.content,
                                        }}
                                    />
                                </Typography>
                                <Box sx={{mb: 2}}>
                                    <BackButton />
                                </Box>
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Comments
                                    </Typography>
                                    <List>
                                        {comments.map((comment) => (
                                            <ListItem key={comment.id}>
                                                <ListItemText
                                                    primary={comment.client.name}
                                                    secondary={comment.comments}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Box>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Add a Comment
                                        </Typography>
                                        {isLoggedIn ? (
                                            <form onSubmit={handleCommentSubmit}>
                                                <TextField
                                                    fullWidth
                                                    label="Comment"
                                                    name="comment"
                                                    value={commentData.comment}
                                                    onChange={handleCommentChange}
                                                    margin="normal"
                                                    multiline
                                                    rows={4}
                                                />
                                                {commentError && (
                                                    <Alert
                                                        severity="error"
                                                        sx={{ mt: 2 }}
                                                    >
                                                        {commentError}
                                                    </Alert>
                                                )}
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    sx={{ mt: 2 }}
                                                >
                                                    Submit Comment
                                                </Button>
                                            </form>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={toggleDrawer}
                                                sx={{ mt: 2 }}
                                            >
                                                Login to Comment
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </Grid>
                        </Box>
                    </Grid>
                )}
                 {isMobile ? (
            <Box sx={{display:'flex' ,justifyContent:'space-between',alignItems:'center',marginBlock:2}}>
            <DownloadBrochure />
            <RequestCallBack />
          </Box>

        ):(
          <></>
        )
      }
            </Box>
            <CommentLoginDrawer open={isDrawerOpen} onClose={toggleDrawer} />
            
        </>
    );
};

export default BlogDetails;
