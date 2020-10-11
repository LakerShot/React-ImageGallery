import React, { useEffect, useState } from 'react'
import { Album }  from '../../components'
import { axiosInstance } from '../../utils/API'
import Loader from 'react-loader-spinner'
import { QUERY_LIMIT } from '../../constants'
import './Main.css'

const Main = () =>  {

  const [albums, setAlbums] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authorsPerPage, setAuthorsPerPage] = useState([])

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true)

        const arrayOfAlums = await axiosInstance.get(`albums${QUERY_LIMIT}`)
        const arrayOfUsers = await axiosInstance.get(`users`)

        // it's a tricky one cuz id of user override id of album so i decide to create a new 
        // obj without id [just a name] and merge it wiht album
        const mergedArray = arrayOfAlums.data.reduce((acc, album) => {
          arrayOfUsers.data.map(user => {
            if (user.id === album.userId) {
              const albumAutor = { authorName: user.name }
              acc.push({...album, ...albumAutor})
            }
            return user
          })
          return acc
        },[])

        const uniqueAuthors = []
        mergedArray.map(album => uniqueAuthors.includes(album.authorName) ? album : uniqueAuthors.push(album.authorName))
        setAuthorsPerPage(prev => [...prev, ...uniqueAuthors])

        if (!mergedArray) throw new Error()
        setAlbums(mergedArray)
        setLoading(false)
      } catch (e) {
        console.log(e);
        setLoading(false)
        setError(true)
      }
    }

    fetchAlbums()
  }, [])

  return (
    <section className="main">
      <div className="wrapper">
        <h1 className="title">It's a React Gallery App</h1>
        <p className="about">albums per page: {albums.length}</p>
        <div className="about">Author per page: {authorsPerPage.length}</div>
          <div className="author-container">
           <p>Authors: </p> {authorsPerPage.map(authorName => <small>{authorName}</small>)}
          </div>
        <div className="album-container">
          {loading && <Loader type="Bars" color="#00BFFF" height={80} width={80}/>}
          {error && <h1>Somthing went wrong. Check the console.</h1>}

          {albums.map((album, idx) => (
              <Album album={album} key={idx}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Main
