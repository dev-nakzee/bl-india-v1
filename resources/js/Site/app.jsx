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
import theme from './Layouts/Theme';

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
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
