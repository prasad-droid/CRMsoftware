const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const leadRoutes = require('./routes/leads');
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth');
const followupRoutes = require('./routes/followups');
const profileRoutes = require('./routes/profile');


dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use('/api/leads', leadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/followups', followupRoutes);
app.use('/api/', profileRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));