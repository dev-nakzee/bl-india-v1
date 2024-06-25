import '../bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layouts/Layout';
import HomePage from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import ServiceDetails from './Pages/ServiceDetails';
import ProductDetails from './Pages/ProductDetails';
import Notifications from './Pages/Notifications';
import NotificationDetails from './Pages/NotificationDetails';
import Blogs from './Pages/Blogs';
import BlogDetails from './Pages/BlogDetails';
import Gallery from './Pages/Gallery';
import TermCondition from './Pages/TermCondition';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import WebsiteDisclaimer from './Pages/WebsiteDisclaimer';
import HolidayList from './Pages/HolidayList';
import theme from './Layouts/Theme';
import KnowledgeBase from './Pages/KnowledgeBase';

function App() {
  return (    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:categorySlug" element={<Services />} />
            <Route path="/services/:categorySlug/:slug" element={<ServiceDetails />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/notifications/:categorySlug' element={<Notifications />} />
            <Route path='/notifications/:categorySlug/:slug' element={<NotificationDetails />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blogs/:categorySlug' element={<Blogs />} />
            <Route path='/blogs/:categorySlug/:blogSlug' element={<BlogDetails />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/terms-conditions' element={<TermCondition />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/website-disclaimer' element={<WebsiteDisclaimer />} />
            <Route path='/holiday-list' element={<HolidayList />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/knowledge-base/:categorySlug" element={<KnowledgeBase />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
