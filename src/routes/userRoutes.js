const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');

// Define routes with correct callback function references
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);

module.exports = router;
