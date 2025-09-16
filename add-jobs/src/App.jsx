import React, { useState } from 'react';
import AddJob from './AddJob';
import AddInternship from './AddInternship';
import AddEvent from './AddEvent';
import './App.css';

function App() {
  const [page, setPage] = useState('job');

  return (
      <div className="app-container">
        <header className="app-header" role="banner">
          <h1 tabIndex="0">Opportunity Portal</h1>
          <p>Add and manage different types of opportunities</p>
        </header>

        <nav className="app-navigation" role="navigation" aria-label="Main">
          <button
            className={`nav-button ${page === 'job' ? 'active' : ''}`}
            onClick={() => setPage('job')}
            aria-current={page === 'job' ? 'page' : undefined}
            aria-label="Add Job"
          >
            Add Job
          </button>
          <button
            className={`nav-button ${page === 'internship' ? 'active' : ''}`}
            onClick={() => setPage('internship')}
            aria-current={page === 'internship' ? 'page' : undefined}
            aria-label="Add Internship"
          >
            Add Internship
          </button>
          <button
            className={`nav-button ${page === 'event' ? 'active' : ''}`}
            onClick={() => setPage('event')}
            aria-current={page === 'event' ? 'page' : undefined}
            aria-label="Add Event"
          >
            Add Event
          </button>
        </nav>

        <main className="content-container" role="main" tabIndex="-1">
          {page === 'job' && <AddJob />}
          {page === 'internship' && <AddInternship />}
          {page === 'event' && <AddEvent />}
        </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Opportunity Portal</p>
      </footer>
    </div>
  );
}

export default App;
