const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    url: String,
    title: String,
    description: String,
    tags: [{type: String}],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });

  module.exports = mongoose.model('Article', articleSchema);