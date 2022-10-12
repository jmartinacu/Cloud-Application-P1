import React, { useState }  from 'react'
import '../css/SearchImage.css'

export default function ImageSearch() {

  const [image, setImage] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
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
      
      </div>
    </div>
  )
}