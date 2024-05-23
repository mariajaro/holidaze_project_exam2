import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Welcome to Holidaze Booking!</h2>
            <p>Find the best places to stay during your next vacation.</p>
            <Link to="/venues">Browse Venues</Link>
            {/* Feature some venues here */}
        </div>
    );
}

export default Home;
