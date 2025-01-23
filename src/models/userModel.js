const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [userData.name, userData.email, userData.password], callback);
  },
  getAll: (callback) => {
    const sql = 'SELECT id, name, email FROM users'; // Avoid selecting passwords
    db.query(sql, callback);
  },
};

module.exports = User;
