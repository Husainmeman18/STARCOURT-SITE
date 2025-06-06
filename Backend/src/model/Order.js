const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [
    {
      productId: String,
      title: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  paymentInfo: {
    id: String,
    status: String,
    method: String,
  },
  contactInfo: {
    emailOrPhone: String,
    emailOffers: Boolean,
  },
  deliveryInfo: {
    country: String,
    firstName: String,
    lastName: String,
    address: String,
    apartment: String,
    postalCode: String,
    city: String,
    saveInfo: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);