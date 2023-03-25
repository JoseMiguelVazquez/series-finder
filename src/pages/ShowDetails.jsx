import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageNotAvailable from '../assets/Image-Not-Available.png'

const ShowDetails = () => {
  const [show, setShow] = useState(null)
  // const id = useParams().id
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => {
        setShow(data)
      }).catch(error => {
        console.log(error)
      })
  }, [])
  return (
    <div>
      <h1>{show?.name}</h1>
      <div>
        <div>
          <img src={show?.image ? show?.image.medium : ImageNotAvailable} alt='' />
        </div>
        {show?.summary}
      </div>
    </div>
  )
}

export default ShowDetails
