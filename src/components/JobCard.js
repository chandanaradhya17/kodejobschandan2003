import React from 'react';
import { Link } from 'react-router-dom';
import './JobCard.css';

function JobCard({ job }) {
  return (
    <div className="job-card">
      <img src={job.employer_logo} alt={`${job.employer_name} logo`} onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/50'; }} />
      <h3>{job.job_title}</h3>
      <p><strong>Company:</strong> {job.employer_name}</p>
      <p><strong>Location:</strong> {job.job_city}, {job.job_country}</p>
      <p><strong>Skills:</strong> 
        {job.job_required_skills.map(skill => (
          <span className="skill-tag" key={skill}>{skill}</span>
        ))}
      </p>
      <p><strong>Estimated Salary:</strong> {job.estimated_salary}</p>
      <p><strong>Posted:</strong> {new Date(job.job_posted_at_timestamp).toLocaleDateString()}</p>
      <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer" className="apply-button">Apply Now</a>
    </div>
  );
}

export default JobCard; 