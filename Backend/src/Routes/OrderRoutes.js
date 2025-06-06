const express = require('express');
const router = express.Router();
const Order = require('../model/Order');
const isAuthenticated = require('../middleware/auth');

router.post('/place', isAuthenticated, async (req, res) => {
  try {
    const { cartItems, totalAmount, paymentId, orderId, contactInfo, deliveryInfo } = req.body;

    const newOrder = new Order({
      user: req.session.user._id,
      cartItems,
      totalAmount,
      paymentInfo: {
        id: paymentId,
        status: 'completed',
        method: 'Razorpay',
      },
      contactInfo,
      deliveryInfo,
    });

    await newOrder.save();
    res.status(200).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;