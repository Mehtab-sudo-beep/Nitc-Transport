const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

const locationRoutes = require('./routes/locationRoutes');
dotenv.config();
connectDB();

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/rides', require('./routes/rides'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/locations', locationRoutes);
app.use('/api/admin', require('./routes/admin'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port the ${PORT}'));
