const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/seats', (req, res) => {
  res.json(db.seats);
});

router.get('/seats/:id', (req, res) => {
  const item = db.seats.find(s => s.id == req.params.id);
  res.json(item || { message: 'Not found' });
});

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

  res.json({ message: 'OK' });
});

router.delete('/seats/:id', (req, res) => {
  const index = db.seats.findIndex(s => s.id == req.params.id);
  if (index !== -1) db.seats.splice(index, 1);
  res.json({ message: 'OK' });
});

router.put('/seats/:id', (req, res) => {
  const item = db.seats.find(s => s.id == req.params.id);
  if (item) Object.assign(item, req.body);
  res.json({ message: 'OK' });
});

module.exports = router;