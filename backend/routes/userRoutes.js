require('dotenv').config;
const express = require('express');
const passport=require('passport');
const User = require('../models/user'); 
const Tag = require('../models/tags');  
const jwt = require('jsonwebtoken');

const router = express.Router();


// Route to allow a user to follow a tag
router.post('/follow',passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const {tagId } = req.body;
  
      if (!tagId) {
        return res.status(400).json({ error: 'UserId and tagId are required' });
      }
      const userId = req.user._id;
      // Find or create the tag
      let tag = await Tag.findById(tagId);
      if (!tag) {
        return res.status(404).json({ error: 'Tag not found' });
      }
  
      // Update the tag's followers
      if (!tag.followers.includes(userId)) {
        tag.followers.push(userId);
        await tag.save();
      }
  
      // Update the user's followedTags
      const user = await User.findByIdAndUpdate(userId, { $addToSet: { followedTags: tagId } }, { new: true });
  
      res.status(200).json({ message: `User ${userId} is now following tag ${tagId}` });
    } catch (error) {
      console.error('Error following tag:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Protected route example
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user);
});

module.exports =router;
