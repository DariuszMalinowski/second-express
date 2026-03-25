const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all
router.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

// GET by id
router.get('/testimonials/:id', (req, res) => {
  const item = db.testimonials.find(t => t.id == req.params.id);
  res.json(item || { message: 'Not found' });
});

// GET random
router.get('/testimonials/random', (req, res) => {
  const random = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(random);
});

// POST
router.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  const newItem = {
    id: Date.now(),
    author,
    text,
  };

  db.testimonials.push(newItem);
  res.json({ message: 'OK' });
});

// PUT
router.put('/testimonials/:id', (req, res) => {
  const item = db.testimonials.find(t => t.id == req.params.id);

  if (item) {
    item.author = req.body.author;
    item.text = req.body.text;
  }

  res.json({ message: 'OK' });
});

// DELETE
router.delete('/testimonials/:id', (req, res) => {
  const index = db.testimonials.findIndex(t => t.id == req.params.id);

  if (index !== -1) {
    db.testimonials.splice(index, 1);
  }

  res.json({ message: 'OK' });
});

module.exports = router;