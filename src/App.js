import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import VenuePage from './Pages/VenuePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/venue" element={<VenuePage />} />
          // Add more routes as needed
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
