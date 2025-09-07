import express from 'express';
import openAlexService from '../services/openAlexService.js';

const router = express.Router();

/**
 * Get detailed information about a specific paper
 * GET /api/paper/:id
 * Parameters:
 * - id: OpenAlex work ID (can be with or without the W prefix)
 */
router.get('/paper/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate paper ID
    if (!id || id.trim() === '') {
      return res.status(400).json({
        error: 'Paper ID is required',
        message: 'Please provide a valid paper ID'
      });
    }

    console.log(`📄 Fetching paper details for ID: ${id}`);

    const paperDetails = await openAlexService.getPaperById(id.trim());

    if (!paperDetails) {
      return res.status(404).json({
        error: 'Paper not found',
        message: `No paper found with ID: ${id}`
      });
    }

    res.json({
      success: true,
      data: paperDetails
    });

  } catch (error) {
    console.error('Paper fetch error:', error);
    
    // Handle specific error cases
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: 'Paper not found',
        message: `No paper found with the provided ID`
      });
    }

    res.status(500).json({
      error: 'Failed to fetch paper details',
      message: error.message
    });
  }
});

export default router;
