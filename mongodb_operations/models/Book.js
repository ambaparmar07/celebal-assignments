const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: String,
  readStatus: {
    type: String,
    enum: ['Not Started', 'Reading', 'Completed'],
    default: 'Not Started'
  }
});

module.exports = mongoose.model('Book', bookSchema);
