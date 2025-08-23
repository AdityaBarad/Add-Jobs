import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Welcome to the Opportunity Management System</h2>
      <p>This system allows you to add and manage job listings, internships, and events.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <Link to="/add-job" className="submit-button">Add a New Job</Link>
        <Link to="/add-internship" className="submit-button">Add an Internship</Link>
        <Link to="/add-event" className="submit-button">Add an Event</Link>
      </div>
    </div>
  );
}

export default Home;
