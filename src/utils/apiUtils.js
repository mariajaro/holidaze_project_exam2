const API_BASE_URL = 'https://v2.api.noroff.dev';

export const createApiKey = async (accessToken) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/create-api-key`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: "My Custom API Key" }) // Optional name for the API key
        });

        if (!response.ok) {
            throw new Error('Failed to create API key');
        }

        const { data } = await response.json();
        localStorage.setItem('apiKey', data.key);  // Store the API key in localStorage
        return data.key;  // You might need to return it for immediate use
    } catch (error) {
        console.error("Error creating API key:", error);
        throw error;
    }
};
