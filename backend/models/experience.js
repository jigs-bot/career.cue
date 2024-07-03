const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  experience: { type: String, required: true }, // Long text body for the experience
  tags: [{ type: String }], // Array of tag names
  createdAt: { type: Date, default: Date.now }
});

const Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;
