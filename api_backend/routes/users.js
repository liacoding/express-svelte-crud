const express = require('express');
const router = express.Router();
const pool = require('../db');

// Change 'users' to your database name in all SQL queries

// GET /users - Get all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET /users/:id - Get a user by ID
router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST /users - Add a new user
router.post('/', async (req, res) => {
  console.log('Received data:', req.body); // Log the received data

  const { first_name, last_name, age, city, state } = req.body;

  // Check if all fields are present
  if (!first_name || !last_name || age == null || !city || !state) {
    return res.status(400).send('All fields are required');
  }

  try {
    const result = await pool.query(
        'INSERT INTO users (first_name, last_name, age, city, state) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [first_name, last_name, age, city, state]
    );
    console.log('Inserted user:', result.rows[0]); // Log the inserted user
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error creating user: ' + err.message);
  }
});

// PUT /users/:id - Update a user by ID
router.put('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;
  try {
    const result = await pool.query('UPDATE users SET name = $1 WHERE id = $2 RETURNING *', [name, userId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE /users/:id - Delete a user by ID
router.delete('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    if (result.rows.length > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
