import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('accessToken');  // Check if token is stored

    const handleLogout = () => {
        localStorage.removeItem('accessToken');  // Remove the token from localStorage
        navigate('/login');  // Redirect to the login page
    };

    return (
        <nav style={{ float: 'right' }}>
            <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                <li style={{ display: 'inline', marginRight: '20px' }}><Link to="/">Home</Link></li>
                <li style={{ display: 'inline', marginRight: '20px' }}><Link to="/venues">Venues</Link></li>
                {isLoggedIn ? (
                    <>
                        <li style={{ display: 'inline', marginRight: '20px' }}><Link to="/booking-management">Booking Management</Link></li>
                        <li style={{ display: 'inline', marginRight: '20px' }}><Link to="/venue-management">Venue Management</Link></li>
                        <li style={{ display: 'inline', marginRight: '20px' }}>
                            <button onClick={handleLogout} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li style={{ display: 'inline', marginRight: '20px' }}><Link to="/login">Login</Link></li>
                        <li style={{ display: 'inline', marginRight: '20px' }}><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
