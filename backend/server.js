require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const cookieParserMiddleware = require('./middlewares/cookieParserMiddleware');

// Start the server
const port = process.env.PORT || 5000;
// const port = 8080;

// Create Express app
const app = express();
app.use(cookieParserMiddleware);

// Middleware
app.use(express.json());
app.use(express.static("public"))

//CORS
app.use(cors());
//CookieParser

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/users', require('./routes/userRoutes')); // Example user routes

app.use(express.static('public'))


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});