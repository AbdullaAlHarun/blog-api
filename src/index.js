const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://blog-api-final.vercel.app'  
    : 'http://127.0.0.1:5500',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.json());

// Serve frontend static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);

// Handle unknown routes (serve frontend)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
