const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new Schema for Promotions
const promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  price: {
    type: mongoose.SchemaTypes.Currency,
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
const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
