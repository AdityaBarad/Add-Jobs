import React from 'react';
import { ChakraProvider, Container, Box, Heading } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Import pages
import JobForm from './components/JobForm';
import InternshipForm from './components/InternshipForm';
import EventForm from './components/EventForm';
import Home from './components/Home';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Container maxW="container.xl" py={10}>
          <Box textAlign="center" mb={8}>
            <Heading as="h1" size="xl">Opportunity Management System</Heading>
          </Box>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add-job">Add Job</Link></li>
              <li><Link to="/add-internship">Add Internship</Link></li>
              <li><Link to="/add-event">Add Event</Link></li>
            </ul>
          </nav>
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-job" element={<JobForm />} />
              <Route path="/add-internship" element={<InternshipForm />} />
              <Route path="/add-event" element={<EventForm />} />
            </Routes>
          </main>
        </Container>
      </Router>
    </ChakraProvider>
  );
}

export default App;
