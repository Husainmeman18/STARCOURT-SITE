const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: String,
  image: String,
  hoverImage: String,
  rating: Number,
  reviews: Number,
  discount: String,
  soldOut: Boolean,
});

module.exports = mongoose.model('Product', productSchema);
 