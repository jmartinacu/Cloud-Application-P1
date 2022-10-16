import React, { useState }  from 'react'
import '../css/SearchImage.css'

export default function ImageSearch() {

  const [images, setImages] = useState([])

  async function imageLoad(description) {
    const response = await fetch(`http://localhost:8001/api/posts/${description}`)
    const data = await response.json()
    console.log(data)
    return data
  }

  function loadImages(databaseImage) {
    let indexImg;
    if (images.length > 0) {
      indexImg = images[images.length - 1].index + 1;
    } else {
      indexImg = 0;
    }
    const newImgArray = []
    const image = {
      description: databaseImage.description,
      date: new Date(databaseImage).toLocaleString(),
      url: '../../../proyecto1_B/public/images/' + databaseImage.imageName,
      index: indexImg
    } 
    newImgArray.push(image)
    return newImgArray
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const description = e.currentTarget[0].value
    const databaseImage = imageLoad(description)
    const newImgArray = loadImages(databaseImage)
    setImages([...images, ...newImgArray])
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
              <h2>{image.description}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}