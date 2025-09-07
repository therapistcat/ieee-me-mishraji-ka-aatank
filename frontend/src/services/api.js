// use environment variable for production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Make a GET request to the API
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} API response
   */
  async get(endpoint, params = {}) {
    try {
      const url = new URL(`${this.baseURL}${endpoint}`);
      
      // Add query parameters
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          url.searchParams.append(key, params[key]);
        }
      });

      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Search for research papers
   * @param {Object} searchParams - Search parameters
   * @param {string} searchParams.query - Search query
   * @param {number} searchParams.page - Page number
   * @param {number} searchParams.limit - Results per page
   * @param {number} searchParams.fromYear - Start year filter
   * @param {number} searchParams.toYear - End year filter
   * @param {boolean} searchParams.openAccess - Open access filter
   * @param {number} searchParams.minCitations - Minimum citations filter
   * @returns {Promise<Object>} Search results
   */
  async searchPapers(searchParams) {
    const params = {
      q: searchParams.query,
      page: searchParams.page || 1,
      limit: searchParams.limit || 20
    };

    // Add optional filters
    if (searchParams.fromYear) {
      params.fromYear = searchParams.fromYear;
    }
    if (searchParams.toYear) {
      params.toYear = searchParams.toYear;
    }
    if (searchParams.openAccess) {
      params.openAccess = 'true';
    }
    if (searchParams.minCitations) {
      params.minCitations = searchParams.minCitations;
    }

    return this.get('/search', params);
  }

  /**
   * Get detailed information about a specific paper
   * @param {string} paperId - Paper ID
   * @returns {Promise<Object>} Paper details
   */
  async getPaperDetails(paperId) {
    return this.get(`/paper/${paperId}`);
  }

  /**
   * Check if the API is healthy
   * @returns {Promise<Object>} Health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseURL.replace('/api', '')}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
}

export default new ApiService();
