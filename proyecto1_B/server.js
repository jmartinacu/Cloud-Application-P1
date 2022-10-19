const express = require('express');
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config({path: '.env'})

const PORT = process.env.APP_PORT || '3000';

const app = express();

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/temp/'
}))
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
/*  THE REASON THE APP IS NOT WORKING MIGHT BE THE UNDER LINE */
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept")
    res.header('Access-Control-Allow-Methods', 'GET, POST')
    next();
})

app.get('/', (req, res) => {
  res.status(200).send('Backend for proyect 1 of Cloud Application Development')
})

const imagesRoutes = require('./routes/images')
app.use('/api', imagesRoutes)

app.listen(PORT, () => {
  console.log(`Listening for requests on port: ${PORT}`)
})