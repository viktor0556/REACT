const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
const port = 3000;

app.use(cors());

const pool = new Pool ({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "postgres",
  port: 5432,
});

app.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books')
    res.json(result.rows)
  } catch (error) {
  console.err(error)
  res.status(500).json({ message: 'An error occurred while querying the data', error});
  }
});

app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM books WHERE id = $1 RETURNING *',
      [id]
      );
    if (result.rowCount === 0) {
      res.status(404).send({ message: 'Book is not available'})
    }
    res.status(201).json(result.rows[0])
    console.log('Succesfully deleted')
  } catch (error) {
  console.err(error)
  res.status(500).json({ message: 'An error occurred while querying the data', error});
  }
});

app.get('/api/books/authors', async (req, res) => {
  try {
    const result = await pool.query('SELECT author FROM books')
    res.json(result.rows);
  } catch (error) {
    console.error('An error occured while quering author', error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`)
})
