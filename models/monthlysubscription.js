const mongoose = require('mongoose');
const monthlySubscriptionSchema = new mongoose.Schema({
    month: String, // e.g., "2024-07"
    subscribers: [String] // Array of subscriber emails
  });
  
  const MonthlySubscription = mongoose.model('MonthlySubscription', monthlySubscriptionSchema);
  module.exports = MonthlySubscription;