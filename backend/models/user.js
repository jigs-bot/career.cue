const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  avatar: { type: String, default: 'https://www.gravatar.com/avatar/'},
  followedTags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  posts:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
module.exports = User;
