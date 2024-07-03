require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const User = require('./models/user');

const bcrypt = require('bcrypt');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

// SSL certificate files
const options = {
  key: fs.readFileSync('./cert.key'),
  cert: fs.readFileSync('./cert.crt')
};




const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*', // Allow all origins
  credentials: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



//routes
app.use('/auth',authRoutes);
app.use('/user', userRoutes);
app.use('/experience', experienceRoutes);








// Start the server
https.createServer(options, app).listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
