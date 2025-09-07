import express from 'express';
import openAlexService from '../services/openAlexService.js';

const router = express.Router();

/**
 * Search for research papers
 * GET /api/search
 * Query parameters:
 * - q: search query (required)
 * - page: page number (default: 1)
 * - limit: results per page (default: 20, max: 50)
 * - fromYear: start year filter
 * - toYear: end year filter
 * - openAccess: open access filter (true/false)
 * - minCitations: minimum citations filter
 */
router.get('/search', async (req, res) => {
  try {
    const {
      q: query,
      page = 1,
      limit = 20,
      fromYear,
      toYear,
      openAccess,
      minCitations
    } = req.query;

    // Validate required parameters
    if (!query || query.trim() === '') {
      return res.status(400).json({
        error: 'Search query is required',
        message: 'Please provide a search query using the "q" parameter'
      });
    }

    // Validate and sanitize parameters
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 20));
    
    const searchParams = {
      query: query.trim(),
      page: pageNum,
      perPage: limitNum
    };

    // Add optional filters
    if (fromYear) {
      const year = parseInt(fromYear);
      if (year >= 1900 && year <= new Date().getFullYear()) {
        searchParams.fromYear = year;
      }
    }

    if (toYear) {
      const year = parseInt(toYear);
      if (year >= 1900 && year <= new Date().getFullYear()) {
        searchParams.toYear = year;
      }
    }

    if (openAccess === 'true') {
      searchParams.openAccess = true;
    }

    if (minCitations) {
      const citations = parseInt(minCitations);
      if (citations >= 0) {
        searchParams.minCitations = citations;
      }
    }

    console.log(`🔍 Searching papers with params:`, searchParams);

    const results = await openAlexService.searchPapers(searchParams);

    res.json({
      success: true,
      data: results,
      query: searchParams
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Search failed',
      message: error.message
    });
  }
});

export default router;
