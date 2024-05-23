import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ float: 'right' }}>
            <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                <li style={{ display: 'inline', marginRight: '20px' }}><Link to="/">Home</Link></li>
                <li style={{ display: 'inline', marginRight: '20px' }}><Link to="/venues">Venues</Link></li>
                <li style={{ display: 'inline', marginRight: '20px' }}><Link to="/login">Login</Link></li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
}

export default Navbar;
