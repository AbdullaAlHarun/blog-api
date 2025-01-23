const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

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

// Add this function to fetch all users
exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json(results);
  });
};
