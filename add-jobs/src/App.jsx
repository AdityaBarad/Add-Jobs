import React, { useState } from 'react';
import AddJob from './AddJob';
import AddInternship from './AddInternship';
import AddEvent from './AddEvent';
import './App.css';

function App() {
  const [page, setPage] = useState('job');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Opportunity Portal</h1>
        <p>Add and manage different types of opportunities</p>
      </header>
      
      <nav className="app-navigation">
        <button 
          className={`nav-button ${page === 'job' ? 'active' : ''}`} 
          onClick={() => setPage('job')}>
          Add Job
        </button>
        <button 
          className={`nav-button ${page === 'internship' ? 'active' : ''}`} 
          onClick={() => setPage('internship')}>
          Add Internship
        </button>
        <button 
          className={`nav-button ${page === 'event' ? 'active' : ''}`} 
          onClick={() => setPage('event')}>
          Add Event
        </button>
      </nav>
      
      <main className="content-container">
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
