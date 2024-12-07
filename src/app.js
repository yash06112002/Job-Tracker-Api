const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

module.exports = app;
