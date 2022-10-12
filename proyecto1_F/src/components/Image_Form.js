import React, { useState }  from 'react'
import { Link } from 'react-router-dom'

export default function ImageForm() {
  const [Images, setImages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.currentTarget[1].files)
    //esto es el indice que se le dará a cada imagen, a partir del indice de la ultima foto
    let indexImg;

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
  }


  function readmultifiles(e, indexInicial) {
    const files = e.currentTarget[1].files;

    //el array con las imagenes nuevas
    const arrayImages = [];

    Object.keys(files).forEach((i) => {
      const file = files[i];

      let url = URL.createObjectURL(file);

      console.log(file);
      arrayImages.push({
        index: indexInicial,
        name: file.name,
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
      <form onSubmit={handleSubmit}>
        {/* NAVIGATE TO SEARCHIMAGE */}
        <nav>
          <li>
            <Link to={'search'}> Search Images!! </Link>
          </li>
        </nav>
        {/* INPUT DESCRIPTION */}
        <label>
          <span> Description: </span>
          <input type='text' />
        </label>
        <br></br>
        {/* INPUT IMAGES */}
        <label className="btn btn-warning">
          <span> Select Images: </span>
          <input type="file" multiple></input>
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
          <div className="col-6 col-sm-4 col-lg-3 square" key={image.index}>
            <div className="content_img">
              <img
                alt="algo"
                src={image.url}
                data-toggle="modal"
                data-target="#ModalPreViewImg"
                className="img-responsive"
              ></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}