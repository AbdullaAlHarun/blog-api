const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    User.create({ name, email, password: hashedPassword }, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json({ message: 'User registered successfully', id: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
};

// fetch all users
exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json(results);
  });
};

exports.updateUser = (req, res) => {
  const { name, email } = req.body;
  const userId = req.params.id;

  User.update({ name, email, id: userId }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating user' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  User.delete(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting user' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    User.getByEmail(email, async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving user' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = results[0];

      // Compare passwords
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
