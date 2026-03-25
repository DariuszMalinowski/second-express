const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all
router.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

// GET by id
router.get('/concerts/:id', (req, res) => {
  const item = db.concerts.find(c => c.id == req.params.id);
  res.json(item || { message: 'Not found' });
});

// POST
router.post('/concerts', (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  db.concerts.push(newItem);
  res.json({ message: 'OK' });
});

// PUT
router.put('/concerts/:id', (req, res) => {
  const item = db.concerts.find(c => c.id == req.params.id);

  if (item) Object.assign(item, req.body);

  res.json({ message: 'OK' });
});

// DELETE
router.delete('/concerts/:id', (req, res) => {
  const index = db.concerts.findIndex(c => c.id == req.params.id);

  if (index !== -1) db.concerts.splice(index, 1);

  res.json({ message: 'OK' });
});

module.exports = router;