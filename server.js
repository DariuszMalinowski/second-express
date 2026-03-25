const express = require('express');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

// prefix /api
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

//test
app.get('/', (req, res) => {
  res.send('API działa 🚀');
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

// start
app.listen(8000, () => {
  console.log('Server running on port 8000');
});