const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

router.get('/concerts/:id', (req, res) => {
  const item = db.concerts.find(c => c.id == req.params.id);
  res.json(item || { message: 'Not found' });
});

router.post('/concerts', (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  db.concerts.push(newItem);
  res.json({ message: 'OK' });
});

router.put('/concerts/:id', (req, res) => {
  const item = db.concerts.find(c => c.id == req.params.id);
  if (item) Object.assign(item, req.body);
  res.json({ message: 'OK' });
});

router.delete('/concerts/:id', (req, res) => {
  const index = db.concerts.findIndex(c => c.id == req.params.id);
  if (index !== -1) db.concerts.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;