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

router.post('/saveDatabase', async function (req, res) {
  try {
    const {description, imageName} = req.body;
    const sqlQuery = 'INSERT INTO images (description, image) VALUES (?, ?)';
    const result = await pool.query(sqlQuery, [description, imageName]);
    res.status(200).json({id: `${result.insertId}`})
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/saveFile', function (req, res) {
  console.log(req)
  const file = req.files[0]
  const fileName = file.name

  const path = __dirname + '/../public/images' + fileName

  file.mv(path, (error) => {
    if (error) {
      console.log(error)
      res.writeHead(500, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({
        status: 'error',
        message: error
      }))
      return
    }
    return res.status(200).send({
      status: 'Sucess',
      path: `public/images/${fileName}`
    })
  })
})

module.exports = router