require("dotenv").config()
const express = require("express")
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require("cors")
const connectDB = require("./src/Config/Dbconfig")
const passport = require("passport");
require("./src/Config/passport");
const ProductRoutes = require("./src/Routes/Api")
const UserRoutes = require("./src/Routes/UserRoutes")
const razorpayRoutes = require('./src/utils/razorpay');
const orderRoutes = require('./src/Routes/OrderRoutes');

const app = express()

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}));
app.use(express.json())

app.use(
  session({
    secret: 'mySuperSecretKey',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
      url: process.env.MONGO_URL,
      ttl: 24 * 60 * 60, 
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
      httpOnly: true,
      secure: false,
    },
  })
);
// 
app.use(passport.initialize());
app.use(passport.session());
//  
app.use('/user',UserRoutes);
app.use('/api/products', ProductRoutes);
// 
app.use('/api', razorpayRoutes);
app.use('/api/order', orderRoutes);

const PORT = process.env.PORT

app.listen(PORT,()=>{
    connectDB();
    console.log("Db has been connected successfully")
})