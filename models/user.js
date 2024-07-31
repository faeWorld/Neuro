const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  code: { type: String },
  testResults: [{
    score: Number,
    date: { type: Date, default: Date.now }
  }],
  subscriptionDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
