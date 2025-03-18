import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import './Auth.css';
import { FaBriefcase, FaSearch, FaUserTie } from 'react-icons/fa';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.dob) {
      setError('Date of birth is required');
      return;
    }

    try {
      await userService.createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dob: formData.dob
      });
      
      // Show success message before redirecting
      alert('Account created successfully! Please login.');
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Failed to create account');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <div className="floating-icons">
          <div className="icon-item icon-1">
            <FaSearch size={24} color="#2196f3" />
          </div>
          <div className="icon-item icon-2">
            <FaBriefcase size={24} color="#2196f3" />
          </div>
          <div className="icon-item icon-3">
            <FaUserTie size={24} color="#2196f3" />
          </div>
        </div>
        <div className="auth-image-content">
          <h1>Start Your Journey</h1>
          <p>Join thousands of job seekers finding their perfect match</p>
        </div>
      </div>
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Get started with KodJobs</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
          
          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup; 