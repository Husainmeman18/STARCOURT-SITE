const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user');

router.post('/', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/session', userController.getSession);
router.post('/sendOTP', userController.sendOtp);
router.post('/forgotpassword', userController.forgotPassword);

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(401).json({ error: "Not authenticated" });
  }
});

router.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/signin",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173");
  }
);

router.get("/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get("/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:5173/signin",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173");
  }
);

module.exports = router;
