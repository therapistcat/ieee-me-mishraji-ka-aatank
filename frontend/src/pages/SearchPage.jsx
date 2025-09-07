import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import apiService from '../services/api';
import './SearchPage.css';

const SearchPage = () => {
  // keeping track of all our search stuff here
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    limit: 20,
    fromYear: '',
    toYear: '',
    openAccess: false,
    minCitations: ''
  });

  // this handles when someone actually searches for papers
  const handleSearch = async (params) => {
    if (!params.query.trim()) {
      setError('Come on, you gotta type something to search! 😅');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchParams(params);

    try {
      const response = await apiService.searchPapers(params);
      setSearchResults(response.data);
    } catch (err) {
      setError(err.message || 'Oops! Something went wrong while searching. Maybe try again?');
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  };

  // when someone clicks to go to a different page
  const handlePageChange = (newPage) => {
    const newParams = { ...searchParams, page: newPage };
    handleSearch(newParams);
  };

  return (
    <div className="search-page">
      <div className="search-page-container">
        <div className="search-header">
          <h2>Discover Amazing Research</h2>
          <p>Dive into millions of academic papers and find exactly what you're looking for</p>
        </div>

        <SearchForm onSearch={handleSearch} loading={loading} />

        {error && <ErrorMessage message={error} />}

        {loading && <LoadingSpinner />}

        {searchResults && !loading && (
          <SearchResults 
            results={searchResults}
            onPageChange={handlePageChange}
            currentPage={searchParams.page}
          />
        )}

        {!searchResults && !loading && !error && (
          <div className="welcome-message">
            <div className="welcome-content">
              <h3>🚀 Ready to Explore?</h3>
              <p>Just type what you're curious about and let's find some awesome research together!</p>
              <div className="search-tips">
                <h4>Pro Tips from a Fellow Student:</h4>
                <ul>
                  <li>Be specific! "neural networks" works better than just "AI"</li>
                  <li>Try famous researchers like "Geoffrey Hinton" or "Yann LeCun"</li>
                  <li>Hot topics: "climate change", "CRISPR", "quantum computing"</li>
                  <li>Use those filters - they're actually pretty helpful!</li>
                  <li>Looking for free papers? Toggle that "Open Access" filter 📖</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
