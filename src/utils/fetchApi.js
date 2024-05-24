export const fetchApi = async (endpoint, options = {}) => {
  const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': process.env.REACT_APP_API_KEY,
      ...options.headers
  });

  if (localStorage.getItem('accessToken')) {
      headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
  }

  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
      const errorBody = await response.json();
      const errorMessage = errorBody.message || `HTTP Error: ${response.status}`;
      throw new Error(errorMessage);
  }
  return await response.json();
};
