const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  url: { type: String, required: true },
  heading: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, 'default': Date.now }
});

mongoose.model('Post', postSchema);