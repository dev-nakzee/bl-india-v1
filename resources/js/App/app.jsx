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
import ServiceSections from './components/ServiceSections';
import ProductCategories from './components/ProductCategories';
import Products from './components/Products';
import Processes from './components/Processes';
import Testimonials from './components/Testimonials';
import Stickers from './components/Stickers';
import SocialMedia from './components/SocialMedia';
import Contacts from './components/Contacts';
import Pages from './components/Pages';
import PageSections from './components/PageSections';
import BlogCategories from './components/BlogCategories';
import BlogPosts from './components/BlogPosts';
import BlogComments from './components/BlogComments';
import NotificationCategories from './components/NotificationCategories';
import Notifications from './components/Notifications';
import DownloadCategories from './components/DownloadCategories';
import Downloads from './components/Downloads';
import Customers from './components/Customers';
import Teams from './components/Teams';
import Gallery from './components/Gallery';

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
              <Route path="services/sections" element={<ServiceSections />} />
              <Route path="products/list" element={<Products />} />
              <Route path="products/categories" element={<ProductCategories />} />
              <Route path="miscellaneous/processes" element={<Processes />} />
              <Route path="miscellaneous/testimonials" element={<Testimonials />} />
              <Route path="miscellaneous/stickers" element={<Stickers />} />
              <Route path="miscellaneous/contacts" element={<Contacts />} />
              <Route path="customers" element={<Customers />} />
              <Route path="teams" element={<Teams />} />
              <Route path="social-media" element={<SocialMedia />} />
              <Route path="pages" element={<Pages />} />
              <Route path="pages/sections" element={<PageSections />} />
              <Route path="blogs" element={<BlogPosts />} />
              <Route path="blogs/categories" element={<BlogCategories />} />
              <Route path="blogs/comments" element={<BlogComments />} />
              <Route path="notifications/categories" element={<NotificationCategories />} />
              <Route path="notifications/list" element={<Notifications />} />
              <Route path="downloads/categories" element={<DownloadCategories />} />
              <Route path="downloads/list" element={<Downloads />} />
              <Route path="gallery/list" element={<Gallery />} />
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
