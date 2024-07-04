import '../bootstrap';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, CircularProgress } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layouts/Layout';
import theme from './Layouts/Theme';

// Lazy load the pages
const HomePage = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Services = lazy(() => import('./Pages/Services'));
const ServiceDetails = lazy(() => import('./Pages/ServiceDetails'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails'));
const Notifications = lazy(() => import('./Pages/Notifications'));
const NotificationDetails = lazy(() => import('./Pages/NotificationDetails'));
const Blogs = lazy(() => import('./Pages/Blogs'));
const BlogDetails = lazy(() => import('./Pages/BlogDetails'));
const Gallery = lazy(() => import('./Pages/Gallery'));
const TermCondition = lazy(() => import('./Pages/TermCondition'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
const WebsiteDisclaimer = lazy(() => import('./Pages/WebsiteDisclaimer'));
const HolidayList = lazy(() => import('./Pages/HolidayList'));
const KnowledgeBase = lazy(() => import('./Pages/KnowledgeBase'));
const KnowledgeBaseCategory = lazy(() => import('./Pages/KnowledgeBaseCategory'));
const Careers = lazy(() => import('./Pages/Careers'));
const Contact = lazy(() => import('./Pages/Contact'));
const Downloads = lazy(() => import('./Pages/Downloads'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Suspense fallback={<CircularProgress />}><HomePage /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<CircularProgress />}><About /></Suspense>} />
            <Route path="/services" element={<Suspense fallback={<CircularProgress />}><Services /></Suspense>} />
            <Route path="/services/:categorySlug" element={<Suspense fallback={<CircularProgress />}><Services /></Suspense>} />
            <Route path="/services/:categorySlug/:slug" element={<Suspense fallback={<CircularProgress />}><ServiceDetails /></Suspense>} />
            <Route path="/products/:slug" element={<Suspense fallback={<CircularProgress />}><ProductDetails /></Suspense>} />
            <Route path='/notifications' element={<Suspense fallback={<CircularProgress />}><Notifications /></Suspense>} />
            <Route path='/notifications/:categorySlug' element={<Suspense fallback={<CircularProgress />}><Notifications /></Suspense>} />
            <Route path='/notifications/:categorySlug/:slug' element={<Suspense fallback={<CircularProgress />}><NotificationDetails /></Suspense>} />
            <Route path='/blogs' element={<Suspense fallback={<CircularProgress />}><Blogs /></Suspense>} />
            <Route path='/blogs/:categorySlug' element={<Suspense fallback={<CircularProgress />}><Blogs /></Suspense>} />
            <Route path='/blogs/:categorySlug/:blogSlug' element={<Suspense fallback={<CircularProgress />}><BlogDetails /></Suspense>} />
            <Route path='/gallery' element={<Suspense fallback={<CircularProgress />}><Gallery /></Suspense>} />
            <Route path='/terms-conditions' element={<Suspense fallback={<CircularProgress />}><TermCondition /></Suspense>} />
            <Route path='/privacy-policy' element={<Suspense fallback={<CircularProgress />}><PrivacyPolicy /></Suspense>} />
            <Route path='/website-disclaimer' element={<Suspense fallback={<CircularProgress />}><WebsiteDisclaimer /></Suspense>} />
            <Route path='/holiday-list' element={<Suspense fallback={<CircularProgress />}><HolidayList /></Suspense>} />
            <Route path="/knowledge-base" element={<Suspense fallback={<CircularProgress />}><KnowledgeBase /></Suspense>} />
            <Route path="/knowledge-base/:categorySlug" element={<Suspense fallback={<CircularProgress />}><KnowledgeBaseCategory /></Suspense>} />
            <Route path="/careers" element={<Suspense fallback={<CircularProgress />}><Careers /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<CircularProgress />}><Contact /></Suspense>} />
            <Route path="/downloads" element={<Suspense fallback={<CircularProgress />}><Downloads /></Suspense>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
