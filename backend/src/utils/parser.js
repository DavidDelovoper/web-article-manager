const axios = require('axios');
const cheerio = require('cheerio');

const parseMetadata = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return {
      title: $('title').text().trim(),
      description: $('meta[name="description"]').attr('content') || ''
    };
  } catch (err) {
    console.loq(err)
    return { title: 'Failed to load', description: '' };
  }
};

module.exports = parseMetadata;