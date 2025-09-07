import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch, loading }) => {
  // all the form data lives here
  const [formData, setFormData] = useState({
    query: '',
    fromYear: '',
    toYear: '',
    openAccess: false,
    minCitations: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // handles any input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // when someone hits that search button
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ ...formData, page: 1 });
  };

  // clears all the filters but keeps the search query
  const clearFilters = () => {
    setFormData({
      query: formData.query, // keep what they're searching for
      fromYear: '',
      toYear: '',
      openAccess: false,
      minCitations: ''
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            name="query"
            value={formData.query}
            onChange={handleInputChange}
            placeholder="What are you curious about today? 🤔"
            className="search-input"
            disabled={loading}
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading || !formData.query.trim()}
          >
            {loading ? '🔄 Searching...' : '🔍 Let\'s Go!'}
          </button>
        </div>

        <div className="filter-controls">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="filter-toggle"
          >
            🎛️ More Options {showFilters ? '▲' : '▼'}
          </button>

          {(formData.fromYear || formData.toYear || formData.openAccess || formData.minCitations) && (
            <button
              type="button"
              onClick={clearFilters}
              className="clear-filters"
            >
              ✨ Reset Filters
            </button>
          )}
        </div>

        {showFilters && (
          <div className="filters">
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="fromYear">From Year:</label>
                <input
                  type="number"
                  id="fromYear"
                  name="fromYear"
                  value={formData.fromYear}
                  onChange={handleInputChange}
                  min="1900"
                  max={currentYear}
                  placeholder="e.g., 2020"
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label htmlFor="toYear">To Year:</label>
                <input
                  type="number"
                  id="toYear"
                  name="toYear"
                  value={formData.toYear}
                  onChange={handleInputChange}
                  min="1900"
                  max={currentYear}
                  placeholder="e.g., 2024"
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label htmlFor="minCitations">Min Citations:</label>
                <input
                  type="number"
                  id="minCitations"
                  name="minCitations"
                  value={formData.minCitations}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="e.g., 10"
                  className="filter-input"
                />
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group checkbox-group">
                <label htmlFor="openAccess" className="checkbox-label">
                  <input
                    type="checkbox"
                    id="openAccess"
                    name="openAccess"
                    checked={formData.openAccess}
                    onChange={handleInputChange}
                    className="filter-checkbox"
                  />
                  <span className="checkmark"></span>
                  Open Access Only
                </label>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
