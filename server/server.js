const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Users file path
const USERS_FILE = path.join(__dirname, 'users.json');

// Initialize users.json if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
}

// Helper functions
const getUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data).users;
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

const saveUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
};

// Add age calculation function
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Routes
app.post('/api/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    const { name, email, password, dob } = req.body;

    if (!name || !email || !password || !dob) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const users = getUsers();

    // Check if user exists
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Calculate age from DOB
    const age = calculateAge(dob);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with age
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password: hashedPassword,
      dob,
      age, // Add calculated age
      createdAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);
    if (!saveUsers(users)) {
      throw new Error('Failed to save user data');
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: error.message || 'Error creating user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Add an endpoint to recalculate ages (useful for periodic updates)
app.post('/api/update-ages', async (req, res) => {
  try {
    const users = getUsers();
    
    // Update ages for all users
    const updatedUsers = users.map(user => ({
      ...user,
      age: calculateAge(user.dob)
    }));

    if (!saveUsers(updatedUsers)) {
      throw new Error('Failed to update ages');
    }

    res.json({ message: 'Ages updated successfully' });
  } catch (error) {
    console.error('Update ages error:', error);
    res.status(500).json({ message: 'Error updating ages' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 