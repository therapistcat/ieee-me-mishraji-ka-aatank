import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-content">
            <span className="logo-icon">📚</span>
            <div className="logo-text">
              <h1>Research Explorer</h1>
              <span className="logo-subtitle">Academic Papers Made Simple</span>
            </div>
          </div>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🔍</span>
            Search Papers
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
