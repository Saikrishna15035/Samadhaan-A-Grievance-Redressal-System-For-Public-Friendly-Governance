const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Load environment variables
dotenv.config({ path: './config.env' });

// Import database & models
require('./db/conn');
const User = require('./model/userSchema');

// Import routes
const Router = require('./router/auth');
require('./middleware/authenticate');

// Initialize app
const app = express();

// ✅ Enable CORS (important for frontend connection)
app.use(cors({
  origin: 'http://localhost:3000', // React frontend
  credentials: true,               // Allow cookies/session
}));

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(Router);

// ✅ Handle unknown routes (optional)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
