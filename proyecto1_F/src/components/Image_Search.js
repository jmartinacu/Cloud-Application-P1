import React, { useState }  from 'react'
import '../css/SearchImage.css'

export default function ImageSearch() {

  const [images, setImages] = useState([])

  async function imageSearch(description) {
    const response = await fetch(`http://localhost:8001/api/posts/${description}`)
    const data = await response.json()
    return data
  }

  function transImages(databaseImage, indexImg) {
    const image = {
      description: databaseImage.description,
      date: new Date(databaseImage.created_at).toLocaleString(),
      /* lo que no funciona es la linea de abajo hasta que api/saveFile funcione, aunque la web sigue funcionando solo que no pinta la imagen*/
      url: 'C:\\Users\\jmart\\Dev\\Study\\ACD_P1\\proyecto1_B\\public\\images' + databaseImage.image,
      index: indexImg
    } 
    return image
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const description = e.currentTarget[0].value
    const databaseImages = await imageSearch(description)
    console.log(databaseImages)
    const newImgArray = []
    let indexImg;
    if (images.length > 0) {
      indexImg = images[images.length - 1].index + 1;
    } else {
      indexImg = 0;
    }
    for (const databaseImage of databaseImages) {
      const auxImg = transImages(databaseImage, indexImg)
      newImgArray.push(auxImg)
      indexImg++
    }
    console.log(newImgArray)
    setImages([...images, ...newImgArray])
    console.log(images)
  } 

  return (
    <div className="App">
      <div className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            <span>Enter image description: </span>
            <input type="text"/>
          </label>
          <div className="bun-submit">
            <button>Submit</button>
          </div>
        </form>
        {/* IMAGES */}
        <br></br>
        <div className="row">
          {images.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          }).map((image) => (
            <div className="col-6 col-dsm-4 col-lg-3 square" key={image.index}>
              <div className="content_img">
                <img
                  alt="algo"
                  src={image.url}
                  data-toggle="modal"
                  data-target="#ModalPreViewImg"
                  className="img-responsive"
                ></img>
              </div>
              <h2>{`Description: ${image.description}`}</h2>
              <div>{`Date: ${image.date}`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}