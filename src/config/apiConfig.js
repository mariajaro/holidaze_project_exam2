// src/config/apiConfig.js

// Function to retrieve the API key stored in localStorage (or from environment variables)
export const getApiKey = () => {
    return localStorage.getItem('apiKey'); // Or use environment variable process.env.API_KEY
};

// Function to retrieve the access token stored in localStorage
export const getAccessToken = () => {
    return localStorage.getItem('accessToken'); // Or use environment variable process.env.ACCESS_TOKEN
};

// Function to set the API key in localStorage
export const setApiKey = (apiKey) => {
    localStorage.setItem('apiKey', apiKey);
};

// Function to set the access token in localStorage
export const setAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
};

// Generate headers for your API requests
export const generateAuthHeaders = () => {
    const apiKey = getApiKey();
    const accessToken = getAccessToken();
    return {
        'Authorization': `Bearer ${accessToken}`,
        'X-Noroff-API-Key': apiKey
    };
};
