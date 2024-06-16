import '../bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import ServiceCategories from './components/ServiceCategories';
import ProductCategories from './components/ProductCategories';
import Products from './components/Products';
import Processes from './components/Processes';
import Testimonials from './components/Testimonials';
import Stickers from './components/Stickers';
import SocialMedia from './components/SocialMedia';
import Pages from './components/Pages';
import PageSections from './components/PageSections';
import BlogCategories from './components/BlogCategories';
import BlogPosts from './components/BlogPosts';
import BlogComments from './components/BlogComments';

function App() {
    return (
      <React.StrictMode>
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public Route */}
            <Route path="/cms/login" element={<PublicRoute element={<Login />} />} />

            {/* Redirect directly to dashboard from /cms */}
            <Route path="/cms" element={<Navigate to="/cms/dashboard" replace />} />

            {/* Protected Route - Admin Layout */}
            <Route path="/cms/*" element={<ProtectedRoute element={<AdminLayout />} />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="services/list" element={<Services />} />
              <Route path="services/categories" element={<ServiceCategories />} />
              <Route path="products/list" element={<Products />} />
              <Route path="products/categories" element={<ProductCategories />} />
              <Route path="miscellaneous/processes" element={<Processes />} />
              <Route path="miscellaneous/testimonials" element={<Testimonials />} />
              <Route path="miscellaneous/stickers" element={<Stickers />} />
              <Route path="social-media" element={<SocialMedia />} />
              <Route path="pages" element={<Pages />} />
              <Route path="pages/sections" element={<PageSections />} />
              <Route path="blogs" element={<BlogPosts />} />
              <Route path="blogs/categories" element={<BlogCategories />} />
              <Route path="blogs/comments" element={<BlogComments />} />
              {/* You can add more nested routes under /cms here */}
            </Route>
          </Routes>
        </Router>
      </React.Fragment>
      </React.StrictMode>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
