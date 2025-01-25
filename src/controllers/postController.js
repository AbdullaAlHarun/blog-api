const Post = require('../models/postModel');
const db = require('../config/db');

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;  // Get user ID from JWT token

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  Post.create({ title, content, user_id: userId }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating post' });
    }
    res.status(201).json({ message: 'Post created successfully', id: result.insertId });
  });
};

exports.getAllPosts = (req, res) => {
  const sql = `
    SELECT posts.id, posts.title, posts.content, users.name AS author
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err.sqlMessage || err);
      return res.status(500).json({ message: 'Error fetching posts', error: err.sqlMessage || err });
    }
    res.status(200).json(results);
  });
};


// Get post by User 
exports.getPostsByUser = (req, res) => {
  const userId = req.params.userId;
  const sql = `SELECT posts.*, users.name AS author 
               FROM posts 
               INNER JOIN users ON posts.user_id = users.id 
               WHERE users.id = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching posts' });
    }
    res.status(200).json(results);
  });
};
