const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();

const app = express();

// Configure CORS to allow requests from the frontend URL on Vercel
app.use(cors({
  origin: ['https://blog-api-final.vercel.app', 'http://localhost:5500'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.json());

// Serve frontend static files correctly
app.use(express.static(path.join(__dirname, '../')));

// API routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);

// Serve HTML files for specific routes
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../register.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../home.html'));
});

// Catch-all route to serve index.html for other frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
