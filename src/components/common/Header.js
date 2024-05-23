import React from 'react';
import Navbar from './Navbar';  // Assuming Navbar is in the same directory

const Header = () => {
    return (
        <header style={{ backgroundColor: '#f8f9fa', padding: '10px 20px' }}>
            <h1 style={{ margin: '0', float: 'left' }}>Holidaze Booking</h1>
            <Navbar />
        </header>
    );
}

export default Header;
