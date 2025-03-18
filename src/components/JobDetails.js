import React from 'react';
import { useParams } from 'react-router-dom';

function JobDetails({ jobs = [] }) {
  const { jobId } = useParams();
  const job = jobs.find(job => job.id === jobId);

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <h1>{job.job_title}</h1>
      <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">Apply Now</a>
    </div>
  );
}

export default JobDetails; 