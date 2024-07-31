require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
// Import models
const User = require('./models/user');
const Question = require('./models/Questions');
const Code = require('./models/code'); 

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3003; 
app.use(bodyParser.urlencoded({ extended: true }));



// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});



//API ROUTES-------------------------------------------------------------------------------


// Subscribe route

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  const code = crypto.randomBytes(3).toString('hex');

  try {
    // Save the code to the database
    await Code.findOneAndUpdate(
      { email },
      { code, valid: true },
      { upsert: true, new: true }
    );

    // Send email with the code
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Subscription Code',
      text: `Your unique code is: ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json('Error sending code.');
      }
      res.json('Subscription successful! Please check your email for the code.');
    });
  } catch (error) {
    console.error('Error saving code:', error);
    res.status(500).json('Error saving code.');
  }
});

app.post('/validate-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    const record = await Code.findOne({ email, code, valid: true });
    if (record) {
      // Mark the code as used
      await Code.updateOne({ email, code }, { valid: false });
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error('Error validating code:', error);
    res.status(500).json('Error validating code.');
  }
});

app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find(); // Adjust as needed
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Error fetching questions');
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




// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));




  // Serve static files from the React app
app.use(express.static(path.join(__dirname, 'my-app/build')));
// Catch-all handler to serve React's index.html for any route not handled by API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-app/build', 'index.html'));
});




  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
