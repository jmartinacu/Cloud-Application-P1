const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: '.env'})

const PORT = process.env.APP_PORT || '3000';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.status(200).json({name: 'Joaquin'})
})

const imagesRoutes = require('./routes/images')
app.use('/api', imagesRoutes)

app.listen(PORT, () => {
  console.log(`Listening for requests on port: ${PORT}`)
})