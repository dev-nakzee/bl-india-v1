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
import Holidays from './components/Holidays';
import KnowledgeBaseCategory from './components/KnowledgeBaseCategory';
import KnowledgeBase from './components/KnowledgeBase';
import Tutorials from './components/Tutorials';
import ProtectedComponent from './components/ProtectedComponent';

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
              <Route path="services/list" element={<ProtectedComponent element={<Services />} allowedUserTypes={['admin']} />} />
              <Route path="services/categories" element={<ProtectedComponent element={<ServiceCategories />} allowedUserTypes={['admin']} />} />
              <Route path="services/sections" element={<ProtectedComponent element={<ServiceSections />} allowedUserTypes={['admin']} />} />
              <Route path="products/list" element={<ProtectedComponent element={<Products />} allowedUserTypes={['admin']} />} />
              <Route path="products/categories" element={<ProtectedComponent element={<ProductCategories />} allowedUserTypes={['admin']} />} />
              <Route path="miscellaneous/processes" element={<ProtectedComponent element={<Processes />} allowedUserTypes={['admin']} />} />
              <Route path="miscellaneous/testimonials" element={<ProtectedComponent element={<Testimonials />} allowedUserTypes={['admin']} />} />
              <Route path="miscellaneous/stickers" element={<ProtectedComponent element={<Stickers />} allowedUserTypes={['admin']} />} />
              <Route path="miscellaneous/contacts" element={<ProtectedComponent element={<Contacts />} allowedUserTypes={['admin']} />} />
              <Route path="customers" element={<ProtectedComponent element={<Customers />} allowedUserTypes={['admin']} />} />
              <Route path="teams" element={<ProtectedComponent element={<Teams />} allowedUserTypes={['admin']} />} />
              <Route path="social-media" element={<ProtectedComponent element={<SocialMedia />} allowedUserTypes={['admin']} />} />
              <Route path="pages" element={<ProtectedComponent element={<Pages />} allowedUserTypes={['admin']} />} />
              <Route path="pages/sections" element={<ProtectedComponent element={<PageSections />} allowedUserTypes={['admin']} />} />
              <Route path="blogs" element={<ProtectedComponent element={<BlogPosts />} allowedUserTypes={['admin']} />} />
              <Route path="blogs/categories" element={<ProtectedComponent element={<BlogCategories />} allowedUserTypes={['admin']} />} />
              <Route path="blogs/comments" element={<ProtectedComponent element={<BlogComments />} allowedUserTypes={['admin']} />} />
              <Route path="notifications/categories" element={<ProtectedComponent element={<NotificationCategories />} allowedUserTypes={['admin', 'user']} />} />
              <Route path="notifications/list" element={<ProtectedComponent element={<Notifications />} allowedUserTypes={['admin', 'user']} />} />
              <Route path="downloads/categories" element={<ProtectedComponent element={<DownloadCategories />} allowedUserTypes={['admin']} />} />
              <Route path="downloads/list" element={<ProtectedComponent element={<Downloads />} allowedUserTypes={['admin']} />} />
              <Route path="gallery/list" element={<ProtectedComponent element={<Gallery />} allowedUserTypes={['admin']} />} />
              <Route path="holidays" element={<ProtectedComponent element={<Holidays />} allowedUserTypes={['admin']} />} />
              <Route path="knowledge-base/categories" element={<ProtectedComponent element={<KnowledgeBaseCategory />} allowedUserTypes={['admin']} />} />
              <Route path="knowledge-base/faqs" element={<ProtectedComponent element={<KnowledgeBase />} allowedUserTypes={['admin']} />} />
              <Route path="tutorials" element={<ProtectedComponent element={<Tutorials />} allowedUserTypes={['admin']} />} />
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
