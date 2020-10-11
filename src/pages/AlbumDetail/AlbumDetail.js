import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import { useHistory, useParams } from 'react-router-dom';
import { Photo } from '../../components'
import { axiosInstance } from '../../utils/API'
import './AlbumDetail.css'

export const AlbumDetail = () => {

  const [photos, setPhotos] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentImageId, setCurrentImageId] = useState()

  const history = useHistory()
  const { id } = useParams()

  const lastImageIndexOfphotosArray = photos.length - 1

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        const {data} = await axiosInstance.get(`photos/?albumId=${id}`)
        if (!data) throw new Error()
        setPhotos(data)
        setLoading(false)
      } catch (e) {
        console.log(e);
        setLoading(false)
        setError(true)
      }
    }
    fetchPhotos()
  }, [id])

  const caruselHandler = (e, idx) => {
    e.stopPropagation()
    if (e.target.dataset.next) {
      if (idx >= lastImageIndexOfphotosArray - 1) setCurrentImageId(prev => prev - lastImageIndexOfphotosArray)
      setCurrentImageId(prev => prev + 1)
    } else {
      if (idx <= 0) setCurrentImageId(prev => prev + lastImageIndexOfphotosArray)
      setCurrentImageId(prev => prev - 1)
    }
  }

  if (currentImageId) {
    const idx = photos.findIndex(elem => elem.id === currentImageId)
    const image = photos.find(photo => photo.id === currentImageId)
    return (
      <div className="overlay-wrap" data-close="close">
        <div className="btn btn-close-img">
          <i class="fas fa-times" onClick={() => setCurrentImageId(null)}></i>
        </div>
        <div className="overlay-container">
          <div className="overlay-btn overlay-btn-left">
            <i class="fas fa-arrow-left" onClick={event => caruselHandler(event, idx)} data-prev="prev"></i>
          </div>
          <div className="image-container">
            <img src={image.url} alt="img"/>
          </div>
          <div className="overlay-btn overlay-btn-right">
            <i class="fas fa-arrow-right" onClick={event => caruselHandler(event, idx)} data-next="next"></i>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="main">
      <div className="wrapper">
        <h1 className="title">Detail Album</h1>
        <button className="btn btn-home" onClick={() => history.push('/main')}>Back to the Albums Page</button>
        <div className="album-container">
          {loading && <Loader type="Bars" color="#00BFFF" height={80} width={80}/>}
          {error && <h1>Somthing went wrong. Check the console.</h1>}

          {photos.map((photo, idx) => (
            <Photo key={idx} photo={photo}  setCurrentImageId={setCurrentImageId} />
          ))}
        </div>
      </div>
    </section>
  )
}
