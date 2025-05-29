const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const leadRoutes = require('./routes/leads');
const userRoutes = require('./routes/users')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/leads', leadRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));