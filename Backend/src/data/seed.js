require("dotenv").config()
const mongoose = require('mongoose');
const Product = require('../model/Product'); // Adjust path if needed
const products = require('./products'); // Import your products array here


async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    await Product.deleteMany({}); // Clear old products

    // Remove the `id` property before inserting (MongoDB uses _id)
    const productsToInsert = products.map(({ id, ...rest }) => rest);

    await Product.insertMany(productsToInsert);
    console.log("Products inserted!");

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error(error);
  }
}

seedDB();
