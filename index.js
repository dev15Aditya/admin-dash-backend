const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');

dotenv.config();

const app = express();

// Allow requests only from 'http://localhost:3000' in production
const corsOptions = [
  'http://localhost:3000',
  'https://cms-vert.vercel.app',
  'landing-page-cms.vercel.app',
];

app.use(
  cors({
    origin: corsOptions,
    credentials: true,
  })
);

app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api', authRoutes);
app.use('/api', contentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
