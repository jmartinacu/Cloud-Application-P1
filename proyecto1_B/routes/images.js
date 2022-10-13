const express = require('express');
const pool = require('../helpers/database')
const router = express.Router();

router.get('/posts/:d', async function (req, res) {
  try {
    const sqlQuery = 'SELECT image, description, created_at FROM images WHERE description=?'
    const rows = await pool.query(sqlQuery, req.params.d)
    res.status(200).json(rows)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/save', async function (req, res) {
  try {
    const {description, image} = req.body
    const sqlQuery = 'INSERT INTO images (description, image) VALUES (?, ?)'
    const result = await pool.query(sqlQuery, [description, image])
    res.status(200).json(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router