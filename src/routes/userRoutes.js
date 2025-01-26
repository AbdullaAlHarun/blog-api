const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');

// User routes
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// Authentication route
router.post('/login', UserController.loginUser);

module.exports = router;
