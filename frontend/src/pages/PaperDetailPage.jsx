import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import apiService from '../services/api';
import './PaperDetailPage.css';

const PaperDetailPage = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaperDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getPaperDetails(id);
        setPaper(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load paper details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPaperDetails();
    }
  }, [id]);

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Authors';
    return authors.map(author => author.name).join(', ');
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (loading) {
    return <LoadingSpinner message="Loading paper details..." />;
  }

  if (error) {
    return (
      <div className="paper-detail-page">
        <div className="container">
          <ErrorMessage message={error} />
          <Link to="/" className="back-link">← Back to Search</Link>
        </div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="paper-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Paper not found</h2>
            <p>The requested paper could not be found.</p>
            <Link to="/" className="back-link">← Back to Search</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-detail-page">
      <div className="container">
        <Link to="/" className="back-link">← Back to Search</Link>
        
        <article className="paper-detail">
          <header className="paper-header">
            <h1 className="paper-title">{paper.title}</h1>
            
            <div className="paper-meta">
              <div className="meta-row">
                <span className="meta-label">Authors:</span>
                <span className="meta-value">{formatAuthors(paper.authors)}</span>
              </div>
              
              {paper.year && (
                <div className="meta-row">
                  <span className="meta-label">Year:</span>
                  <span className="meta-value">{paper.year}</span>
                </div>
              )}
              
              <div className="meta-row">
                <span className="meta-label">Published in:</span>
                <span className="meta-value">{paper.venue}</span>
              </div>
              
              <div className="meta-row">
                <span className="meta-label">Citations:</span>
                <span className="meta-value">{formatNumber(paper.citationCount)}</span>
              </div>
              
              {paper.type && (
                <div className="meta-row">
                  <span className="meta-label">Type:</span>
                  <span className="meta-value">{paper.type}</span>
                </div>
              )}
            </div>

            <div className="paper-badges">
              {paper.isOpenAccess && (
                <span className="badge open-access">🔓 Open Access</span>
              )}
            </div>
          </header>

          {paper.abstract && (
            <section className="paper-section">
              <h2>Abstract</h2>
              <p className="abstract-text">{paper.abstract}</p>
            </section>
          )}

          <section className="paper-section">
            <h2>External Links</h2>
            <div className="external-links">
              {paper.doi && (
                <a 
                  href={`https://doi.org/${paper.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  📄 View on Publisher Site (DOI)
                </a>
              )}
              {paper.pdfUrl && (
                <a 
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link pdf-link"
                >
                  📄 Download PDF
                </a>
              )}
              {paper.url && (
                <a 
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  🔗 OpenAlex Record
                </a>
              )}
            </div>
          </section>

          {paper.concepts && paper.concepts.length > 0 && (
            <section className="paper-section">
              <h2>Research Topics</h2>
              <div className="concepts">
                {paper.concepts.slice(0, 10).map((concept, index) => (
                  <span key={index} className="concept-tag">
                    {concept.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {paper.references && paper.references.length > 0 && (
            <section className="paper-section">
              <h2>References ({paper.references.length})</h2>
              <p className="references-note">
                This paper references {paper.references.length} other works.
              </p>
            </section>
          )}
        </article>
      </div>
    </div>
  );
};

export default PaperDetailPage;
