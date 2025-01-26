const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();

const app = express();

// Configure CORS to allow requests from the frontend URL on Vercel
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://blog-api-final.vercel.app'  
    : 'http://localhost:5500', 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.json());

// Serve frontend static files from the root directory
app.use(express.static(path.join(__dirname, '../')));

app.use('/api', userRoutes);
app.use('/api', postRoutes);

// Catch-all route to serve the frontend for non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
