import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchPage from './pages/SearchPage';
import PaperDetailPage from './pages/PaperDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/paper/:id" element={<PaperDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
