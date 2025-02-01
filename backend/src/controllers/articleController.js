const Article = require('../models/Article');
const parseMetadata = require('../utils/parser');

exports.createArticle = async (req, res) => {
  try {
    const { url, tags } = req.body;
    // Metadata parsing
    const { title, description } = await parseMetadata(url);
    
    // Article creation
    const article = new Article({
      url,
      title,
      description,
      tags,
      user: req.user.userId // from JWR-middleware
    });

    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: 'Error saving article' });
  }
};

exports.getUserArticles = async (req, res) => {
  try {
    const articles = await Article.find({ user: req.user.userId });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Error loading articles' });
  }
};


exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json({ message: 'Article removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting' });
  }
};