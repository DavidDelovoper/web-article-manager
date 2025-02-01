const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/auth');
const articleController = require('../controllers/articleController');

// All routes below require authentication
router.use(authMiddleware);

// Get all articles of the user
router.get('/', articleController.getUserArticles);

// Add a new article
router.post('/', articleController.createArticle);

// Delete article
router.delete('/:id', articleController.deleteArticle);

module.exports = router;