const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  console.log("🔥 POST /create-order hit with amount:", amount);

  try {
    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const amountInPaise = parseInt(amount * 100);
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcptid-${Date.now()}`
    });

    console.log("✅ Razorpay order created:", order.id);
    res.status(200).json(order);

  } catch (err) {
    console.error("❌ Razorpay error:", err); // FULL error object
    res.status(500).json({
      error: 'Failed to create Razorpay order',
      message: err.message,
      details: err.error ? err.error.description : null
    });
  }
});


module.exports = router;
