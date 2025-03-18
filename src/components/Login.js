import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import './Auth.css';
import { FaBriefcase, FaSearch, FaUserTie, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await userService.login(formData.email, formData.password);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/jobs');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <h1>Find Your Dream Job</h1>
          <p>Connect with the best opportunities across the globe</p>
        </div>
      </div>
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Please login to your account</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <button type="submit" className="auth-button">Login</button>
          </form>
          
          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login; 