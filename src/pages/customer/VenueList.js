import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const VenueList = () => {
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = () => {
        const url = `https://v2.api.noroff.dev/holidaze/venues`;
        console.log("Query URL:", url);

        fetch(url)
            .then(response => {
                console.log('Fetch Response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched Data:', data);
                setVenues(data.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                setError(`Failed to fetch venues: ${error.message}`);
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!venues.length) return <div>No venues found.</div>;

    return (
        <div>
            <h2>Venues</h2>
            {venues.map(venue => (
                <div key={venue.id}>
                    <Link to={`/venues/${venue.id}`}>
                        <h3>{venue.name}</h3>
                        {venue.media && venue.media.length > 0 && (
                            <img src={venue.media[0].url} alt={venue.media[0].alt || venue.name} style={{ maxWidth: '100%' }} />
                        )}
                        <p>{venue.description}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default VenueList;
