import axios from 'axios';

const OPENALEX_BASE_URL = 'https://api.openalex.org';

class OpenAlexService {
  constructor() {
    // setting up our connection to OpenAlex - it's free and doesn't need an API key!
    this.client = axios.create({
      baseURL: OPENALEX_BASE_URL,
      timeout: 10000,
      headers: {
        'User-Agent': 'Research-Paper-Explorer/1.0 (student-project)'
      }
    });
  }

  // this is where the magic happens - searching through millions of papers
  // takes in all the search params and returns nicely formatted results
  async searchPapers(params) {
    try {
      const {
        query,
        page = 1,
        perPage = 20,
        fromYear,
        toYear,
        openAccess,
        minCitations
      } = params;

      // building the filter string - OpenAlex uses a specific format for this
      let filter = '';
      const filters = [];

      if (fromYear) {
        filters.push(`publication_year:>=${fromYear}`);
      }
      if (toYear) {
        filters.push(`publication_year:<=${toYear}`);
      }
      if (openAccess) {
        filters.push('is_oa:true'); // only free papers
      }
      if (minCitations) {
        filters.push(`cited_by_count:>=${minCitations}`); // highly cited papers
      }

      if (filters.length > 0) {
        filter = filters.join(',');
      }

      const searchParams = {
        search: query,
        page,
        'per-page': perPage,
        sort: 'cited_by_count:desc'
      };

      if (filter) {
        searchParams.filter = filter;
      }

      const response = await this.client.get('/works', { params: searchParams });
      
      return this.normalizeSearchResults(response.data);
    } catch (error) {
      console.error('OpenAlex search error:', error.message);
      throw new Error(`Failed to search papers: ${error.message}`);
    }
  }

  /**
   * Get detailed information about a specific paper
   * @param {string} id - OpenAlex work ID
   * @returns {Promise<Object>} Normalized paper details
   */
  async getPaperById(id) {
    try {
      // Handle both full URLs and just IDs
      const workId = id.includes('openalex.org') ? id : `https://openalex.org/W${id}`;
      
      const response = await this.client.get(`/works/${workId}`);
      
      return this.normalizePaperDetails(response.data);
    } catch (error) {
      console.error('OpenAlex paper fetch error:', error.message);
      throw new Error(`Failed to fetch paper details: ${error.message}`);
    }
  }

  /**
   * Normalize search results to consistent format
   * @param {Object} data - Raw OpenAlex response
   * @returns {Object} Normalized results
   */
  normalizeSearchResults(data) {
    return {
      total: data.meta?.count || 0,
      page: data.meta?.page || 1,
      perPage: data.meta?.per_page || 20,
      totalPages: Math.ceil((data.meta?.count || 0) / (data.meta?.per_page || 20)),
      papers: data.results?.map(work => this.normalizeWork(work)) || []
    };
  }

  /**
   * Normalize a single work/paper
   * @param {Object} work - Raw OpenAlex work object
   * @returns {Object} Normalized paper object
   */
  normalizeWork(work) {
    return {
      id: work.id?.replace('https://openalex.org/W', '') || '',
      title: work.title || 'Untitled',
      authors: work.authorships?.map(authorship => ({
        name: authorship.author?.display_name || 'Unknown Author',
        id: authorship.author?.id || null,
        affiliation: authorship.institutions?.[0]?.display_name || null
      })) || [],
      year: work.publication_year || null,
      venue: work.primary_location?.source?.display_name || 'Unknown Venue',
      citationCount: work.cited_by_count || 0,
      isOpenAccess: work.open_access?.is_oa || false,
      doi: work.doi || null,
      pdfUrl: work.open_access?.oa_url || null,
      abstract: work.abstract_inverted_index ? this.reconstructAbstract(work.abstract_inverted_index) : null,
      type: work.type || 'article',
      url: work.id || null
    };
  }

  /**
   * Normalize detailed paper information
   * @param {Object} work - Raw OpenAlex work object
   * @returns {Object} Normalized paper details
   */
  normalizePaperDetails(work) {
    const normalized = this.normalizeWork(work);
    
    // Add additional details for paper detail view
    normalized.references = work.referenced_works?.slice(0, 20).map(refId => ({
      id: refId.replace('https://openalex.org/W', ''),
      url: refId
    })) || [];
    
    normalized.concepts = work.concepts?.slice(0, 10).map(concept => ({
      name: concept.display_name,
      score: concept.score,
      level: concept.level
    })) || [];

    normalized.alternateHostVenues = work.alternate_host_venues?.map(venue => ({
      name: venue.display_name,
      url: venue.url,
      isOa: venue.is_oa
    })) || [];

    return normalized;
  }

  /**
   * Reconstruct abstract from inverted index
   * @param {Object} invertedIndex - OpenAlex inverted index
   * @returns {string} Reconstructed abstract
   */
  reconstructAbstract(invertedIndex) {
    if (!invertedIndex) return null;
    
    const words = [];
    for (const [word, positions] of Object.entries(invertedIndex)) {
      for (const position of positions) {
        words[position] = word;
      }
    }
    
    return words.filter(word => word).join(' ');
  }
}

export default new OpenAlexService();
