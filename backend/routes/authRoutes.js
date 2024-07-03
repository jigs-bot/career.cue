require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const User = require('../models/user');
const bcrypt = require('bcrypt');


const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const router = express.Router();
// Configure Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (token, tokenSecret, profile, done) => {
    try {
      const dp=profile.photos[0].value; 
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({ googleId: profile.id, username: profile.displayName, email: profile.emails[0].value, avatar: profile.photos[0].value });
        await user.save();
      }
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { });
      done(null, {token,dp});
    } catch (error) {
      done(error, null);
    }
  }));
  
 
  
  // Configure JWT strategy
  passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('jwt'),
      secretOrKey: process.env.JWT_SECRET
    }, (jwtPayload, done) => {
      console.log("ye dekho00",jwtPayload);
      return done(null, jwtPayload);
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });



// Login route
router.post('/login', async (req, res) => {
  // Login logic here
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token });
    console.log(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Register route
router.post('/register', async (req, res) => {
  // Register logic here
  const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send('Missing username, email, or password');
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Email already in use');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      res.status(201).send(user);
      console.log(user);
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(400).send('Error during registration');
    }
});

// Routes for Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google',{session: false }), (req, res) => {
  console.log("user from callback->",req.user)
  // const token = jwt.sign({ id: req.user._id ,photo: req.user.photo,}, process.env.JWT_SECRET, { expiresIn: '1h' });
  // res.json({ token });
  res.redirect(`https://localhost:5173/auth/callback?token=${req.user.token}&dp=${req.user.dp}`);
});



module.exports = router;
