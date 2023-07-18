require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require('path'); // Add the 'path' module

const cookieParserMiddleware = require('./middlewares/cookieParserMiddleware');

// Start the server
const port = 5000;

// Create Express app
const app = express();
app.use(cookieParserMiddleware);

// Middleware
app.use(express.json());

// CORS
app.use(cors());

// Serve static files from the "public" folder
app.get("*", function response(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
