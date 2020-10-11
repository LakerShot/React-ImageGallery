import React from 'react'
import { useHistory } from "react-router-dom";
import './Album.css'

const Album = ({album}) => {

  let history = useHistory()

  function handleClick() {
    history.push(`/album/${album.id}`);
  }

  return (
    <div className="album">
      <small className="album__name">Album Name :</small>
      <h3 className="album__title" onClick={handleClick}>{album.title}</h3>
      <p className="album__author">Author: {album.authorName}</p>
    </div>
  )
}

export default Album
