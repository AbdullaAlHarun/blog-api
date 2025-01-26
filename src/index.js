const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();

const app = express();

// Configure CORS to allow requests from the frontend URL on Vercel
app.use(cors({
  origin: 'https://blog-api-final.vercel.app',  // Allow frontend domain
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use(express.json());


app.use(express.static(path.join(__dirname, '..')));

// API routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);


app.get('/*', (req, res) => {
  if (req.path.startsWith('/api')) return; // Prevent interfering with API routes
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Define the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
