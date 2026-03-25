const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all
router.get('/seats', (req, res) => {
  res.json(db.seats);
});

// GET by id
router.get('/seats/:id', (req, res) => {
  const item = db.seats.find(s => s.id == req.params.id);
  res.json(item || { message: 'Not found' });
});

// POST
router.post('/seats', (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  db.seats.push(newItem);
  res.json({ message: 'OK' });
});

// PUT
router.put('/seats/:id', (req, res) => {
  const item = db.seats.find(s => s.id == req.params.id);

  if (item) Object.assign(item, req.body);

  res.json({ message: 'OK' });
});

// DELETE
router.delete('/seats/:id', (req, res) => {
  const index = db.seats.findIndex(s => s.id == req.params.id);

  if (index !== -1) db.seats.splice(index, 1);

  res.json({ message: 'OK' });
});

module.exports = router;