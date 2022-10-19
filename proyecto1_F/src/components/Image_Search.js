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
      url: 'http://localhost:8001/images/' + databaseImage.image,
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
      const url = images.map(img => img.url)
      const setUrl = new Set(url)
      if (!setUrl.has(auxImg.url)) {
        newImgArray.push(auxImg)
        indexImg++
      } 
    }
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
            <div style={{width: '18rem'}} className="card" key={image.index}>
              <div className="card-img-top" style={{width: '18rem'}}>
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
              <div className="card-body">
                <h2 className="card-tittle" style={{color: 'black'}}>{image.description}</h2>
                <div className="card-text" style={{color: 'black'}}>{`Date: ${image.date}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}