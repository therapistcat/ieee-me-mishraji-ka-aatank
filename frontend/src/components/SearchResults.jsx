import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import './SearchResults.css';

const SearchResults = ({ results, onPageChange, currentPage }) => {
  const { papers, total, totalPages } = results;

  if (!papers || papers.length === 0) {
    return (
      <div className="no-results">
        <h3>No papers found</h3>
        <p>Try adjusting your search terms or filters.</p>
      </div>
    );
  }

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Authors';
    if (authors.length === 1) return authors[0].name;
    if (authors.length === 2) return `${authors[0].name} and ${authors[1].name}`;
    return `${authors[0].name} et al.`;
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="search-results">
      <div className="results-header">
        <h3>Search Results</h3>
        <p>{total.toLocaleString()} papers found</p>
      </div>

      <div className="papers-list">
        {papers.map((paper) => (
          <div key={paper.id} className="paper-card">
            <div className="paper-header">
              <Link to={`/paper/${paper.id}`} className="paper-title">
                {paper.title}
              </Link>
              <div className="paper-badges">
                {paper.isOpenAccess && (
                  <span className="badge open-access">🔓 Open Access</span>
                )}
                {paper.year && (
                  <span className="badge year">{paper.year}</span>
                )}
              </div>
            </div>

            <div className="paper-authors">
              <span className="authors-label">Authors:</span>
              <span className="authors-text">{formatAuthors(paper.authors)}</span>
            </div>

            <div className="paper-venue">
              <span className="venue-label">Published in:</span>
              <span className="venue-text">{paper.venue}</span>
            </div>

            <div className="paper-stats">
              <div className="stat">
                <span className="stat-icon">📊</span>
                <span className="stat-text">{formatNumber(paper.citationCount)} citations</span>
              </div>
              {paper.type && (
                <div className="stat">
                  <span className="stat-icon">📄</span>
                  <span className="stat-text">{paper.type}</span>
                </div>
              )}
            </div>

            <div className="paper-actions">
              <Link to={`/paper/${paper.id}`} className="view-details-btn">
                View Details
              </Link>
              {paper.doi && (
                <a 
                  href={`https://doi.org/${paper.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  DOI
                </a>
              )}
              {paper.pdfUrl && (
                <a 
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link pdf-link"
                >
                  📄 PDF
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default SearchResults;
