const db = require('../config/db');

const Post = {
  create: (postData, callback) => {
    const sql = 'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)';
    db.query(sql, [postData.title, postData.content, postData.user_id], callback);
  },

  getAll: (callback) => {
    const sql = 'SELECT posts.*, users.name AS author FROM posts INNER JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC';
    db.query(sql, callback);
  }
};

module.exports = Post;
