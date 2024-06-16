import '../bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layouts/Layout';
import HomePage from './Pages/Home';

// Simulated authentication function
const isAuthenticated = () => {
  // Here, you'd check for user authentication status
  // For now, let's assume it returns false indicating the user is not logged in
  return false;
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
