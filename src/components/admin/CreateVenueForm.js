import React, { useState } from 'react';

const CreateVenueForm = () => {
    const [venueData, setVenueData] = useState({
        name: '',
        description: '',
        price: '',
        maxGuests: '',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in venueData.meta || name in venueData.location) {
            setVenueData({
                ...venueData,
                meta: { ...venueData.meta, [name]: value },
                location: { ...venueData.location, [name]: value }
            });
        } else {
            setVenueData({ ...venueData, [name]: value });
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setVenueData({
            ...venueData,
            meta: { ...venueData.meta, [name]: checked }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://v2.api.noroff.dev/holidaze/venues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(venueData)
            });
            if (!response.ok) throw new Error('Failed to create venue');
            const data = await response.json();
            setMessage('Venue created successfully!');
            console.log(data);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Create a Venue</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={venueData.name} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={venueData.description} onChange={handleChange} required />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={venueData.price} onChange={handleChange} required />
                </label>
                <label>
                    Maximum Guests:
                    <input type="number" name="maxGuests" value={venueData.maxGuests} onChange={handleChange} required />
                </label>
                <label>
                    Rating:
                    <input type="number" name="rating" value={venueData.rating} onChange={handleChange} />
                </label>
                {/* Checkboxes for meta information */}
                <div>
                    <label>
                        Wifi:
                        <input type="checkbox" name="wifi" checked={venueData.meta.wifi} onChange={handleCheckboxChange} />
                    </label>
                    <label>
                        Parking:
                        <input type="checkbox" name="parking" checked={venueData.meta.parking} onChange={handleCheckboxChange} />
                    </label>
                    <label>
                        Breakfast:
                        <input type="checkbox" name="breakfast" checked={venueData.meta.breakfast} onChange={handleCheckboxChange} />
                    </label>
                    <label>
                        Pets Allowed:
                        <input type="checkbox" name="pets" checked={venueData.meta.pets} onChange={handleCheckboxChange} />
                    </label>
                </div>
                {/* Location information */}
                <div>
                    <label>
                        Address:
                        <input type="text" name="address" value={venueData.location.address} onChange={handleChange} />
                    </label>
                    <label>
                        City:
                        <input type="text" name="city" value={venueData.location.city} onChange={handleChange} />
                    </label>
                    <label>
                        Zip Code:
                        <input type="text" name="zip" value={venueData.location.zip} onChange={handleChange} />
                    </label>
                    <label>
                        Country:
                        <input type="text" name="country" value={venueData.location.country} onChange={handleChange} />
                    </label>
                    <label>
                        Continent:
                        <input type="text" name="continent" value={venueData.location.continent} onChange={handleChange} />
                    </label>
                    <label>
                        Latitude:
                        <input type="number" name="lat" value={venueData.location.lat} onChange={handleChange} />
                    </label>
                    <label>
                        Longitude:
                        <input type="number" name="lng" value={venueData.location.lng} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit">Create Venue</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateVenueForm;
