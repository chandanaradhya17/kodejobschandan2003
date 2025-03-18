import React from 'react';

function AuthBackground() {
  return (
    <div className="auth-background">
      <div className="icon-group job-search">
        <div className="magnifier"></div>
        <div className="profile"></div>
      </div>
      <div className="icon-group job-listing">
        <div className="document"></div>
        <div className="checklist"></div>
      </div>
      <div className="icon-group interviews">
        <div className="calendar"></div>
        <div className="chat"></div>
      </div>
    </div>
  );
}

export default AuthBackground; 