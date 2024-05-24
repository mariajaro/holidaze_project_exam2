import React, { useState } from 'react';

const RegistrationForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        isVenueManager: false // Additional state to handle venue manager status
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if the email domain is 'stud.noroff.no'
        const domain = userData.email.split('@')[1];
        if (domain !== 'stud.noroff.no') {
            setMessage('Only users with a stud.noroff.no email can register as a venue manager.');
            return;
        }

        try {
            const response = await fetch('https://api.noroff.dev/v2/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...userData, venueManager: true }) // Automatically register as venue manager
            });
            if (!response.ok) {
                throw new Error('Failed to register');
            }
            const data = await response.json();
            setMessage('Registration successful! You are now registered as a venue manager.');
            console.log(data);
        } catch (error) {
            setMessage('Error registering: ' + error.message);
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Register as a Venue Manager</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={userData.name} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={userData.email} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={userData.password} onChange={handleChange} />
                </label>
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default RegistrationForm;
