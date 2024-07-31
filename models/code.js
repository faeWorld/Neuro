// models/Code.js
const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  valid: { type: Boolean, default: true }
});

module.exports = mongoose.model('Code', CodeSchema);
