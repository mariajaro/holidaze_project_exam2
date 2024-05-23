// src/pages/LoginPage.js
import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = { email, password };

        try {
            const response = await fetch('https://api.noroff.dev/v2/holidaze/profiles/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            setLoginStatus('Login successful!');
            console.log(data); // For debug
        } catch (error) {
            setLoginStatus('Login failed.');
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
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            <p>{loginStatus}</p>
        </div>
    );
}

export default LoginPage;
