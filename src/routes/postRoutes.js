const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/posts', PostController.getAllPosts);
router.get('/posts/user/:userId', PostController.getPostsByUser);

router.post('/posts', authenticateToken, PostController.createPost);
module.exports = router;
