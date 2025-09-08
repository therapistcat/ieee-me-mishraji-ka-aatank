// use environment variable for production, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'https://ieee-me-mishraji-ka-aatank-backend.onrender.com/api';

export const searchPapers = async (params) => {
  try {
    const url = `${API_URL}/search?${new URLSearchParams(params)}`;
    console.log('Making API request to:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Search API error:', error);
    console.error('API_URL being used:', API_URL);
    throw error;
  }
};

export const getPaperDetails = async (id) => {
  try {
    const url = `${API_URL}/paper/${id}`;
    console.log('Making paper details API request to:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    console.log('Paper details API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Paper details API error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Paper details API error:', error);
    console.error('API_URL being used:', API_URL);
    throw error;
  }
};

// Default export for the api service
const apiService = {
  searchPapers,
  getPaperDetails
};

export default apiService;
