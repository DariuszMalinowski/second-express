const express = require('express');
const path = require('path');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();

// START SERVER (ważne: zapisujemy do zmiennej server)
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server running on port 8000');
});

// SOCKET.IO INIT
const io = socketIO(server);

// 🔌 SOCKET CONNECTION
io.on('connection', (socket) => {
  console.log('New socket!');
});

// IMPORT ROUTES
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ⭐ KLUCZOWE – middleware z dostępem do io
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API ROUTES
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

// React build
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});