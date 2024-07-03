const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
