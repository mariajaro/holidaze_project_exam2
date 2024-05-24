import React, { useState } from 'react';

const BookingPage = ({ venueId }) => {
    const [bookingDetails, setBookingDetails] = useState({
        dateFrom: '',
        dateTo: '',
        numberOfGuests: 1
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://api.noroff.dev/v2/holidaze/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Assuming token is stored in localStorage
                },
                body: JSON.stringify({
                    ...bookingDetails,
                    venueId: venueId // Assuming venueId is passed to this component
                })
            });
            if (!response.ok) {
                throw new Error('Failed to create booking');
            }
            const data = await response.json();
            setMessage('Booking created successfully!');
            console.log(data);
        } catch (error) {
            setMessage('Error creating booking: ' + error.message);
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div>
            <h2>Create Booking</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Date From:
                    <input
                        type="date"
                        name="dateFrom"
                        value={bookingDetails.dateFrom}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Date To:
                    <input
                        type="date"
                        name="dateTo"
                        value={bookingDetails.dateTo}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Number of Guests:
                    <input
                        type="number"
                        name="numberOfGuests"
                        value={bookingDetails.numberOfGuests}
                        onChange={handleChange}
                        min="1"
                    />
                </label>
                <button type="submit">Create Booking</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BookingPage;
