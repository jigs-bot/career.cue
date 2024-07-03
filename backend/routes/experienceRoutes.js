require('dotenv').config();
const express = require('express');
const passport = require('passport');
const router = express.Router();

const Experience = require('../models/experience');
const User = require('../models/user');
const Tag = require('../models/tags');


// Add experience post route
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // console.log("req_user ->>",req.user)
    // console.log("req_user_id ->>",req.user.user._id)
    try {
        const { title, company, role, experience } = req.body;
        let { tags } = req.body;

        if (!title || !company || !role || !experience || !tags) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const userId = req.user.user._id;
        // console.log("userId in experience:",userId)
        // Extract tags from text
        // const tagNames = parseTags(tags).map(tag => tag.substring(1)); // Remove leading '#'
        const tagNames = tags;

        const newExperience = new Experience({
            userId,
            title,
            company,
            role,
            experience,
            tags: tagNames // Assign parsed tag names to experience
        });

        const savedExperience = await newExperience.save();

        // Update tags with the new experience ID
        await Promise.all(
            tagNames.map(async tagName => {
                const tag = await Tag.findOne({ name: tagName });

                if (tag) {
                    tag.posts.push(savedExperience._id);
                    await tag.save();
                } else {
                    const newTag = new Tag({
                        name: tagName,
                        posts: [savedExperience._id]
                    });
                    await newTag.save();
                }
            })
        );

        // Update the user's posts
        await User.findByIdAndUpdate(
            userId,
            { $push: { posts: savedExperience._id } },
            { new: true, useFindAndModify: false }
        );

        res.status(201).json(savedExperience);
    } catch (error) {
        console.error('Error creating experience:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/a', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { val } = req.query;
    const userId = req.user.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;  // Fetch 10 records at a time
  
    try {
      let blogs, count;
  
      if (val === 'myexp') {
        const user = await User.findById(userId).populate({
          path: 'posts',
          options: {
            skip: (page - 1) * limit,
            limit: limit,
          },
        }).exec();
        blogs = user.posts;
        count = user.posts.length;
      } else if (val === 'all') {
        const user = await User.findById(userId).populate('followedTags').exec();
        const tagIds = user.followedTags.map(tag => tag._id);
        blogs = await Experience.find({ tags: { $in: tagIds } })
          .skip((page - 1) * limit)
          .limit(limit)
          .exec();
        count = await Experience.countDocuments({ tags: { $in: tagIds } });
      } else {
        blogs = await Experience.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .exec();
        count = await Experience.countDocuments();
      }
  
      res.json({
        blogs,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;
