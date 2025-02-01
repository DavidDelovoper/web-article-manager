const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   const authRoutes = require('./routes/auth');
   const articleRoutes = require('./routes/articles');
   require("dotenv").config();

// Connect to MongoDB
   mongoose.connect(process.env.MONGODB_URI)
     .then(() => console.log('Connected to MongoDB'))
     .catch(err => console.error('MongoDB connection error:', err));

   const app = express();
   app.use(express.json());
   app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
   }));

   app.use('/api/auth', authRoutes);
   app.use('/api/articles', articleRoutes);

   app.listen(5000, () => {
     console.log('The server is running on port 5000');
   });