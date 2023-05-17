const express = require('express');
require('dotenv').config();
const connectDB = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');




// Create Express app
const app = express();

// Middleware
app.use(express.json());

//CORS
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      
    ],
  })
);
//CookieParser
app.use(cookieParser());
// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/users', require('./routes/userRoutes')); // Example user routes

app.use(express.static('public'))

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});