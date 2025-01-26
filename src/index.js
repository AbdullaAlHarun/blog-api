const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();

const app = express();

// Allow Vercel frontend to access backend
app.use(cors({
  origin: ['https://blog-api-final.vercel.app', 'http://localhost:5500'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../')));

// Handle direct access to pages via URL
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../register.html'));
});

app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../home.html'));
});

// Serve index.html for root and unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
