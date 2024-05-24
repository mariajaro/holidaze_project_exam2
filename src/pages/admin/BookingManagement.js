// This can be a temporary script you run once in any component or standalone JS file in your project
const createAPIKey = async () => {
    const response = await fetch('https://v2.api.noroff.dev/auth/create-api-key', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer your_access_token_here', // Replace with your actual access token
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: "My Custom API Key"}) // Optional: provide a custom name
    });

    const data = await response.json();
    if (response.ok) {
        console.log("API Key Created:", data.data.key);
        // You might want to save this key somewhere safe now!
        return data.data.key;
    } else {
        throw new Error(data.message || "Failed to create API key");
    }
}

createAPIKey(); // Run this function once to create and log the API key
