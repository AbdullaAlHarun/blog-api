const Post = require('../models/postModel');

exports.createPost = (req, res) => {
  const { title, content, user_id } = req.body;
  Post.create({ title, content, user_id }, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).json({ message: 'Post created', id: result.insertId });
  });
};

exports.getAllPosts = (req, res) => {
  Post.getAll((err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).json(results);
  });
};
