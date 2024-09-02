import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import KnowledgeBaseCategory from './Pages/KnowledgeBaseCategory';
import Careers from './Pages/Careers';
import Contact from './Pages/Contact';
import Downloads from './Pages/Downloads';
import Account from './Pages/Account';
import Comments from './Pages/Comments';
import Brochures from './Pages/Brochures';
import Tutorials from './Pages/Tutorials';
import Projects from './Pages/Projects';
import Profile from './Pages/Profile';
import ResetPassword from './Pages/ResetPassword';
import ProtectedRoute from './Components/ProtectedRoute';
import AccountLayout from './Layouts/AccountLayout';
import ScrollToTop from './Components/ScrollToTop';
import Enquiryform from './Pages/Enquiryform';
import BussinessCard from './Pages/BussinessCard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:categorySlug" element={<Services />} />
            <Route path="/services/:categorySlug/:slug" element={<ServiceDetails />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/notifications/:categorySlug" element={<Notifications />} />
            <Route path="/notifications/:categorySlug/:slug" element={<NotificationDetails />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:categorySlug" element={<Blogs />} />
            <Route path="/blogs/:categorySlug/:blogSlug" element={<BlogDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/terms-conditions" element={<TermCondition />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/website-disclaimer" element={<WebsiteDisclaimer />} />
            <Route path="/holiday-list" element={<HolidayList />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/knowledge-base/:categorySlug" element={<KnowledgeBaseCategory />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/enquiryform" element={<Enquiryform />}  />
            <Route path="/bussinesscard" element={<BussinessCard />} />
            <Route path="/account" element={
            <ProtectedRoute>
              <AccountLayout/>
            </ProtectedRoute>
          } >
                  <Route index element={<Account />} />
                  <Route path="comments" element={<Comments />} />
                  <Route path="brochures" element={<Brochures />} />
                  <Route path="tutorials" element={<Tutorials />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="profile" element={<Profile />} />
                 
            </Route>
            <Route path="/password-reset/:token" element={<ResetPassword />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
