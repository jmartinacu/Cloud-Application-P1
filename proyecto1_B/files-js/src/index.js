const express = require("express");
const fileUpload = require("express-fileupload");
const mariadb = require("mariadb");
const path = require("path");
const bodyParser = require("body-parser");
const Post = require("./models/file");
const { request } = require("http");
const { response } = require("express");

const app = express();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

const port = process.env.PORT || 3000;


// const url =




// Metodos de Ruta:

app.post("/api/save", (request, reponse) => {
    const data = request.body;

    var post = new Post();

    //Asignar valores:
    post.description = data.description;
    post.image = data.image;

    post.save((err, postStored) =>{

        if(err || !postStored) {
            return response.status(404).send({
                status: "Error",
                massage: "Los datos no se han guardado"
            });
        }

        return response.status(200).send({
            status: "Success",
            postStored
        })
    })
})

//Subida de las imagenes:

app.post("/api/saveimage", (req, res) => {

    const file = req.file.myFile;
    const fileName = req.file.myFile.name;

    const path = _dirname + "public/images/" + fileName;

    file.env(path, (error) =>{
        if(error){
            console.error(error);
            res.writeHead(500, {
                'Contant-Type' : 'application/json'
            });
            res.end(JSON.stringify({
                status: 'error',
                message: error
            }));
            return;
        }

        return res.status(200).send({
            status: "Success",
            path: "public/images/" + fileName
        })
    })
})

// Método para obtener todos los posts:

app.get("/api/posts", (req, res) =>{

    var query = Post.find({});

    query.sort("-date").exec((err, posts) =>{

        if(err){
            return res.status(500).send({
                status: "Error",
                message: "Error al obtener los datos"
            });
        }

        if(posts){
            return res.status(404).send({
                status: "Error",
                message: "No existen datos para mostrar"
            });
        }

        return res.status(200).send({
            status: "Success",
            posts
        })
    })
})