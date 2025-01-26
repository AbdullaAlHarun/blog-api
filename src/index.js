const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files from the root directory
app.use(express.static(path.join(__dirname, '../')));

// API routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);

// Handle frontend routing for direct access (e.g., /home.html, /login.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
