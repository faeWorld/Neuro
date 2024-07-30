require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Import models
const MonthlySubscription = require('./models/monthlysubscription');
const User = require('./models/user');
const Question = require('./models/Questions');

const app = express();

const PORT = process.env.PORT || 3002; 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'my-app/build')));
// Catch-all handler to serve React's index.html for any route not handled by API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-app/build', 'index.html'));
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API routes
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  let user = await User.findOne({ email: email });

  if (!user) {
    user = new User({ email: email });
    await user.save();
    res.send('Subscription successful! You can now take the knowledge test.');
  } else {
    res.send('You are already registered.');
  }
});
app.post('/validate-code', async (req, res) => {
  const { email, code } = req.body;
  let user = await User.findOne({ email: email });

  if (user && user.code === code) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});


app.post('/submit-test', async (req, res) => {
  const { email, score } = req.body;
  let user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).send('User not found. Please register first.');
  }

  const lastResult = user.testResults.length > 0 ? user.testResults[user.testResults.length - 1] : null;
  
  if (!lastResult || score > lastResult.score) {
    user.testResults.push({ score: score });
    await user.save();
    res.send('Test submitted successfully! Your score has been updated.');
  } else {
    res.send('Test submitted successfully! Your previous score is higher.');
  }
});

app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find(); // Adjust as needed
    res.json(questions);
  } catch (err) {
    res.status(500).send('Error fetching questions');
  }
});

app.get('/monthly-subscriptions', async (req, res) => {
  try {
    const data = await MonthlySubscription.find();
    res.json(data);
  } catch (err) {
    res.status(500).send('Error retrieving monthly subscription data');
  }
});



// Monthly notification job
cron.schedule('0 0 1 * *', async () => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const monthString = `${oneMonthAgo.getFullYear()}-${String(oneMonthAgo.getMonth() + 1).padStart(2, '0')}`;

  // Retrieve new users from the last month
  const newUsers = await User.find({
    subscriptionDate: { $gte: oneMonthAgo }
  });

  if (newUsers.length > 0) {
    const userList = newUsers.map(user => user.email);

    // Save monthly subscription data to the database
    await MonthlySubscription.findOneAndUpdate(
      { month: monthString },
      { subscribers: userList },
      { upsert: true, new: true }
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send notification to your email
      subject: 'Monthly Subscription Report',
      text: `Here are the new subscribers for ${monthString}:\n\n${userList.join(', ')}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending monthly notification:', error);
      } else {
        console.log('Monthly subscription report sent:', info.response);
      }
    });
  }
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
