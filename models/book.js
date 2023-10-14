const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  isbn: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String
  },
  publish_date: {
    type: Date,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  website: {
    type: String
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
