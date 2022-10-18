import React, { useState }  from 'react'
import { Link } from 'react-router-dom'

export default function ImageForm() {
  const [Images, setImages] = useState([])
  async function imageUpload(formData) {
    await fetch('http://localhost:8001/api/saveFile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
        body: formData
    })
  }

  async function databaseUpload(description, imageName) {
    const response = await fetch('http://localhost:8001/api/saveDatabase', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000'
      }, 
      body: JSON.stringify({
        "description": description,
        "imageName": imageName
      })
    })

    const data = await response.json()
    console.log(data)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const imageInformation = e.currentTarget[1].files[0];
    console.log(imageInformation)
    const description = e.currentTarget[0].value;
    console.log(e.currentTarget[1].files)
    //esto es el indice que se le dará a cada imagen, a partir del indice de la ultima foto
    let indexImg;

    let r = (Math.random() + 1).toString(36).substring(2)
    let extension = imageInformation.name.split('.').pop()
    let imageName = r + '.' + extension
    const formData = new FormData()
    formData.append('prueba', 'clavePrueba') // Eliminar 
    formData.append('myFile', imageInformation , imageName)
    console.log(formData)
/*     console.log(formData.files.myFile.name) */
    if (imageInformation === '' || description === '' ) alert('The fields images and description must be completed')
    else {
      imageUpload(formData)
      databaseUpload(description, imageName)
    } 

    //aquí evaluamos si ya hay imagenes antes de este input, para saber en dónde debe empezar el index del proximo array
    if (Images.length > 0) {
      indexImg = Images[Images.length - 1].index + 1;
    } else {
      indexImg = 0;
    }

    let newImgsToState = readmultifiles(e, indexImg);
    let newImgsState = [...Images, ...newImgsToState];
    setImages(newImgsState);

    console.log(newImgsState);
/*     fetch('http://localhost:8001/api/saveDatabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        'description': description 
      }}) */
  }


  function readmultifiles(e, indexInicial) {
    const files = e.currentTarget[1].files;
    const description = e.currentTarget[0].value;

    //el array con las imagenes nuevas
    const arrayImages = [];

    Object.keys(files).forEach((i) => {
      const file = files[i];

      let url = URL.createObjectURL(file);

      console.log(file);
      arrayImages.push({
        index: indexInicial,
        description: description,
        url,
        file
      });

      indexInicial++;
    });

    //despues de haber concluido el ciclo retornamos las nuevas imagenes
    return arrayImages;
  }
  /*
  function handleSubmit (event) {
    event.preventDefault()
    console.log(event)
  } */
  return (
    <div className="container-fluid">
      <br></br>
      {/* NAVIGATE TO SEARCHIMAGE */}
      <nav>
        <li>
          <Link to={'search'}> Search Images!! </Link>
        </li>
      </nav>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* INPUT DESCRIPTION */}
        <label>
          <span> Description: </span>
          <input type='text' required/>
        </label>
        <br></br>
        {/* INPUT IMAGES */}
        <label className="btn btn-warning">
          <span> Select Images: </span>
          <input type="file" accept='.jpg, .jpeg, .png' required></input>
        </label>

        {/* SEND IMAGES TO BACKEND */}
        <div className="bun-submit">
          <button> Submit </button>
        </div>
      </form>

      {/* VIEW IMAGES */}
      <br></br>
      <div className="row">
        {Images.map((image) => (
          <div style={{width: '18rem'}} class="card" key={image.index}>
          <div class="card-img-top" style={{width: '18rem'}}>
            <img
              style={{
                width: '17rem',
                marginRight: '100px'
            }}  
              alt="Could not be found"
              src={image.url}
              data-toggle="modal"
              data-target="#ModalPreViewImg"
              className="img-responsive"
            ></img>
          </div>
          <div class="card-body">
            <h2 class="card-tittle" style={{color: 'black'}}>{image.description}</h2>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}