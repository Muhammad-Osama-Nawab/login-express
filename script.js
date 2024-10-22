
const express = require('express');
const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Static data
const users = [
  { email: 'osama@gmail.com', password: '12345',token:'1010' },
  { email: 'qasim@gmail.com', password: '67890',token:'1011' },
  { email: 'hamza@gmail.com', password: '67891',token:'1012' },
  { email: 'ali@gmail.com', password: '67892', token:'1013'}
];

app.post('/login', function (req, res) {
    const  email =req.body.email;
    const password  = req.body.password; // Extract email and password from request body
  
    // Check if email and password match any static user
    const user = users.find(u => u.email === email && u.password === password);
  
    if (user) {
      return res.status(200).json({
        message: 'Login successful',
        token: user.token,
        user: user.username
      });
    } else {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }
  });
 // Route to get user info based on token in headers
app.get('/user-from-header', function (req, res) {
    const token = req.headers.authorization; // Extract token from headers
  
    const user = users.find(u => u.token === token); // Find user by token
    if (user) {
      return res.status(200).json({
        message: 'User found',
        password: user.password,
        email: user.email
      });
    } else {
      return res.status(401).json({
        message: 'Invalid token'
      });
    }
  });
  
  // Route to get user info based on query parameters
  app.get('/user-from-query', function (req, res) {
    const email = req.query.email; // Extract email from query parameters
    const password = req.query.password; // Extract password from query parameters
  
    const user = users.find(u => u.email === email && u.password === password); // Find user by email and password
    if (user) {
      return res.status(200).json({
        message: 'User found',
        password: user.password,
        email: user.email
      });
    } else {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }
  });
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });