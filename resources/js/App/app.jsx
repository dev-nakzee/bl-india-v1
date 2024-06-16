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
