import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/customer/Home';
import VenueList from './pages/customer/VenueList';
import VenueDetails from './pages/customer/VenueDetails';
import Login from './pages/LoginPage';
import RegistrationForm from './pages/RegisterPage';
import VenueManagement from './pages/admin/VenueManagement';  

function App() {
  return (
    <Router>
      <Header />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<VenueList />} />
          <Route path="/venues/:venueId" element={<VenueDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/venue-management" element={<VenueManagement />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
