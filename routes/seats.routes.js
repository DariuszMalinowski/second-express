const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all seats
router.get('/seats', (req, res) => {
  res.json(db.seats);
});

// GET single seat
router.get('/seats/:id', (req, res) => {
  const item = db.seats.find(s => s.id == req.params.id);
  res.json(item || { message: 'Not found' });
});

// POST new reservation
router.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;

  const exists = db.seats.find(s => s.day == day && s.seat == seat);

  if (exists) {
    return res.status(400).json({
      message: 'The slot is already taken...',
    });
  }

  const newItem = {
    id: Date.now(),
    day,
    seat,
    client,
    email,
  };

  db.seats.push(newItem);

  // 🔥 KLUCZOWE – wysyłamy update do wszystkich klientów
  req.io.emit('seatsUpdated', db.seats);

  res.json({ message: 'OK' });
});

// DELETE
router.delete('/seats/:id', (req, res) => {
  const index = db.seats.findIndex(s => s.id == req.params.id);
  if (index !== -1) db.seats.splice(index, 1);

  // (opcjonalnie też możesz emitować update po usunięciu)
  req.io.emit('seatsUpdated', db.seats);

  res.json({ message: 'OK' });
});

// PUT
router.put('/seats/:id', (req, res) => {
  const item = db.seats.find(s => s.id == req.params.id);
  if (item) Object.assign(item, req.body);

  // (opcjonalnie update po edycji)
  req.io.emit('seatsUpdated', db.seats);

  res.json({ message: 'OK' });
});

module.exports = router;