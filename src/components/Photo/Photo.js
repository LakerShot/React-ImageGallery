import React from 'react'
import './Photo.css'

const Photo = ({ photo, setCurrentImageId }) => {

  return (
    <div class="card" onClick={() => setCurrentImageId(photo.id)}>
      <img src={photo.url} alt="" className="card-image"/>
      <div className="card-info">
        <h3 className="card-h3">Info: {photo.id}</h3>
        <p className="card-p">{photo.title}</p>
      </div>
  </div>
  )
}

export default Photo
