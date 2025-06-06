const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.serializeUser((user, done) => {
  done(null, user); 
});

passport.deserializeUser((user, done) => {
  done(null, user); 
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/user/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/user/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
