# 📚 Research Paper Explorer

A beautiful, modern web application for discovering and exploring academic research papers. Built with React.js and Node.js, featuring stunning typography, smooth animations, and an intuitive user experience that makes academic research actually enjoyable!

## ✨ Features

### 🔍 Search & Discovery
- **Advanced Search**: Search papers by keywords, authors, or topics
- **Smart Filters**: Filter by year range, open access status, and minimum citations
- **Real-time Results**: Fast search with pagination support
- **Comprehensive Results**: View title, authors, venue, citation count, and publication year

### 📄 Paper Details
- **Full Paper Information**: Complete abstract, author details, and publication info
- **Citation Metrics**: View citation counts and research impact
- **External Links**: Direct access to DOI, PDF downloads, and publisher sites
- **Research Topics**: Explore related concepts and research areas
- **Reference Tracking**: See reference counts and related works

### 🎨 Beautiful Design & User Experience
- **Stunning Typography**: Premium Google Fonts (Inter, Playfair Display, JetBrains Mono)
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Modern Gradients**: Eye-catching color schemes and glass-morphism effects
- **Responsive Design**: Flawless experience on desktop, tablet, and mobile
- **Intuitive Interface**: Student-friendly design that makes research fun
- **Fast Loading**: Optimized performance with elegant loading states
- **Smart Error Handling**: Helpful, conversational error messages

## 🚀 Quick Start

### Prerequisites
- Node.js (version 20.19+ or 22.12+)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd research-paper-explorer
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to use the application

## 🌐 Deployment

Ready to share your awesome research tool with the world? Check out our comprehensive [Deployment Guide](DEPLOYMENT.md) for step-by-step instructions on deploying to Render, Vercel, Netlify, and more!

### Quick Render Deployment Summary:

**Backend (Web Service):**
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: `NODE_ENV=production`, `FRONTEND_URL=your-frontend-url`

**Frontend (Static Site):**
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variables: `VITE_API_URL=your-backend-url/api`

## 🏗️ Project Structure

```
research-paper-explorer/
├── backend/                 # Node.js backend
│   ├── routes/             # API route handlers
│   │   ├── search.js       # Search endpoint
│   │   └── paper.js        # Paper details endpoint
│   ├── services/           # External API integrations
│   │   └── openAlexService.js  # OpenAlex API service
│   ├── server.js           # Express server setup
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── frontend/               # React.js frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── SearchForm.jsx
│   │   │   ├── SearchResults.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── SearchPage.jsx
│   │   │   └── PaperDetailPage.jsx
│   │   ├── services/       # API client
│   │   │   └── api.js
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
└── README.md               # This file
```

## 🔧 API Endpoints

### Backend API

- **GET /api/search** - Search for research papers
  - Query parameters: `q`, `page`, `limit`, `fromYear`, `toYear`, `openAccess`, `minCitations`
  
- **GET /api/paper/:id** - Get detailed paper information
  - Parameters: `id` (OpenAlex work ID)

- **GET /health** - Health check endpoint

### External API Integration

The application integrates with the **OpenAlex API** (https://openalex.org/), which provides:
- Free access to scholarly metadata
- Comprehensive coverage of academic papers
- No API key required
- High-quality, normalized data

## 🎯 Usage Examples

### Basic Search
1. Enter keywords like "machine learning" or "climate change"
2. Click the Search button to see results
3. Use pagination to browse through results

### Advanced Filtering
1. Click the "Filters" button to expand filter options
2. Set year range (e.g., 2020-2024)
3. Enable "Open Access Only" for freely available papers
4. Set minimum citation count for high-impact papers

### Viewing Paper Details
1. Click "View Details" on any paper card
2. Read the full abstract and author information
3. Access external links for DOI, PDF, or publisher sites
4. Explore related research topics and concepts

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Starts nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server with hot reload
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend (no build step needed)
cd backend
npm start
```

## 🌐 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
```

## 🎨 Design Philosophy

### Typography & Fonts
- **Inter**: Primary font for clean, readable body text and UI elements
- **Playfair Display**: Elegant serif font for headings and titles
- **JetBrains Mono**: Monospace font for code and technical elements

### Visual Design
- **Glass-morphism**: Subtle transparency and blur effects
- **Gradient Magic**: Beautiful color transitions throughout the interface
- **Micro-interactions**: Smooth hover effects and button animations
- **Student-Friendly**: Conversational tone and approachable design

### Responsive Design
- **Desktop**: Full-featured interface with side-by-side layouts
- **Tablet**: Adapted layouts with touch-friendly controls
- **Mobile**: Stacked layouts with optimized navigation
- **Progressive Enhancement**: Works great on any device

## 🔍 Search Tips

- Use specific keywords for better results
- Try author names like "Einstein" or "Hawking"
- Search for broad topics like "artificial intelligence"
- Combine filters to narrow down results
- Use year filters to find recent research

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- **OpenAlex** for providing free access to scholarly data
- **React** and **Vite** for the frontend framework
- **Express.js** for the backend framework
- **Node.js** community for excellent tooling
