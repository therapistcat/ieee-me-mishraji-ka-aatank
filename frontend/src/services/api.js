// use environment variable for production, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const searchPapers = async (params) => {
  try {
    const response = await fetch(`${API_URL}/search?${new URLSearchParams(params)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
};

export const getPaperDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}/paper/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Paper details API error:', error);
    throw error;
  }
};

// Default export for the api service
const apiService = {
  searchPapers,
  getPaperDetails
};

export default apiService;
