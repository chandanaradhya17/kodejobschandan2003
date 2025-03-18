import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

class UserService {
  async createUser(userData) {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      console.error('Create user error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Failed to create user'
      );
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Invalid credentials'
      );
    }
  }
}

export const userService = new UserService(); 