const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new Schema for Leaders
const leaderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  abbr: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

// Create a model using the schema
const Leader = mongoose.model('Leader', leaderSchema);

module.exports = Leader;
