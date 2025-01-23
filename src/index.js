const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
