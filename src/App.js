import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobList from './components/JobList';
import Login from './components/Login';
import Signup from './components/Signup';
import JobDetails from './components/JobDetails';
import './App.css';

function App() {
  const jobs = [ /* your job data here */ ];

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect root to signup */}
          <Route path="/" element={<Navigate to="/signup" replace />} />
          
          {/* Main routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={
            <>
              <header className="app-header">
                <h1>KodJobs</h1>
              </header>
              <main>
                <JobList />
              </main>
            </>
          } />
          <Route path="/jobs/:jobId" element={<JobDetails jobs={jobs} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 