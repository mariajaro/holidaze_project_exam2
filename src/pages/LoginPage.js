import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate(); // Hook for navigating to other routes

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = { email, password };

        try {
            const response = await fetch('https://v2.api.noroff.dev/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();

            if (!response.ok) {
                // Extract message from response if possible, otherwise provide a default error message
                throw new Error(data.message || 'Failed to login. Please check your credentials and try again.');
            }

            // Assuming the response includes a JWT token or similar authentication credential
            localStorage.setItem('accessToken', data.accessToken);  // Store the access token securely
            setLoginStatus('Login successful!');
            console.log(data);  // Logging for debugging; consider removing in production
            navigate('/dashboard');  // Redirect to the dashboard or another appropriate page

        } catch (error) {
            setLoginStatus('Login failed: ' + error.message);
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            <p>{loginStatus}</p>
        </div>
    );
}

export default LoginPage;
