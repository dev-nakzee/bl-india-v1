import '../bootstrap';
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
import withFadeIn from './HOCs/withFadeIn';

const HomePageWithFadeIn = withFadeIn(HomePage);
const AboutWithFadeIn = withFadeIn(About);
const ServicesWithFadeIn = withFadeIn(Services);
const ServiceDetailsWithFadeIn = withFadeIn(ServiceDetails);
const ProductDetailsWithFadeIn = withFadeIn(ProductDetails);
const NotificationsWithFadeIn = withFadeIn(Notifications);
const NotificationDetailsWithFadeIn = withFadeIn(NotificationDetails);
const BlogsWithFadeIn = withFadeIn(Blogs);
const BlogDetailsWithFadeIn = withFadeIn(BlogDetails);
const GalleryWithFadeIn = withFadeIn(Gallery);
const TermConditionWithFadeIn = withFadeIn(TermCondition);
const PrivacyPolicyWithFadeIn = withFadeIn(PrivacyPolicy);
const WebsiteDisclaimerWithFadeIn = withFadeIn(WebsiteDisclaimer);
const HolidayListWithFadeIn = withFadeIn(HolidayList);
const KnowledgeBaseWithFadeIn = withFadeIn(KnowledgeBase);
const KnowledgeBaseCategoryWithFadeIn = withFadeIn(KnowledgeBaseCategory);
const CareersWithFadeIn = withFadeIn(Careers);
const ContactWithFadeIn = withFadeIn(Contact);
const DownloadsWithFadeIn = withFadeIn(Downloads);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePageWithFadeIn />} />
            <Route path="/about" element={<AboutWithFadeIn />} />
            <Route path="/services" element={<ServicesWithFadeIn />} />
            <Route path="/services/:categorySlug" element={<ServicesWithFadeIn />} />
            <Route path="/services/:categorySlug/:slug" element={<ServiceDetailsWithFadeIn />} />
            <Route path="/products/:slug" element={<ProductDetailsWithFadeIn />} />
            <Route path='/notifications' element={<NotificationsWithFadeIn />} />
            <Route path='/notifications/:categorySlug' element={<NotificationsWithFadeIn />} />
            <Route path='/notifications/:categorySlug/:slug' element={<NotificationDetailsWithFadeIn />} />
            <Route path='/blogs' element={<BlogsWithFadeIn />} />
            <Route path='/blogs/:categorySlug' element={<BlogsWithFadeIn />} />
            <Route path='/blogs/:categorySlug/:blogSlug' element={<BlogDetailsWithFadeIn />} />
            <Route path='/gallery' element={<GalleryWithFadeIn />} />
            <Route path='/terms-conditions' element={<TermConditionWithFadeIn />} />
            <Route path='/privacy-policy' element={<PrivacyPolicyWithFadeIn />} />
            <Route path='/website-disclaimer' element={<WebsiteDisclaimerWithFadeIn />} />
            <Route path='/holiday-list' element={<HolidayListWithFadeIn />} />
            <Route path="/knowledge-base" element={<KnowledgeBaseWithFadeIn />} />
            <Route path="/knowledge-base/:categorySlug" element={<KnowledgeBaseCategoryWithFadeIn />} />
            <Route path="/careers" element={<CareersWithFadeIn />} />
            <Route path="/contact" element={<ContactWithFadeIn />} />
            <Route path="/downloads" element={<DownloadsWithFadeIn />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
