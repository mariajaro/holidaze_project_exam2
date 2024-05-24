import React, { useState, useEffect } from 'react';

const UpdateVenueForm = ({ venueId }) => {
    const [venueData, setVenueData] = useState({
        name: '',
        description: '',
        media: [{ url: '', alt: '' }],
        price: 0,
        maxGuests: 0,
        rating: 0,
        meta: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false
        },
        location: {
            address: '',
            city: '',
            zip: '',
            country: '',
            continent: '',
            lat: 0,
            lng: 0
        }
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch the current venue data to prefill the form (not shown here for brevity)
    }, [venueId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Handle changes for nested objects appropriately
        setVenueData(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (event, key) => {
        const { name, value, type, checked } = event.target;
        setVenueData(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `https://v2.api.noroff.dev/holidaze/venues/${venueId}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Make sure you have an access token
                },
                body: JSON.stringify(venueData)
            });
            if (!response.ok) throw new Error('Failed to update venue');
            const data = await response.json();
            setMessage('Venue updated successfully!');
            console.log(data);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Update Venue</h2>
            <form onSubmit={handleSubmit}>
                {/* Input fields for venue details */}
                <input type="text" name="name" value={venueData.name} onChange={handleChange} />
                <textarea name="description" value={venueData.description} onChange={handleChange} />
                {/* Include other fields such as price, maxGuests, etc., similar to the above inputs */}
                <button type="submit">Update Venue</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateVenueForm;
