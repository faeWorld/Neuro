
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  date: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema, 'questions');
module.exports = Question;
