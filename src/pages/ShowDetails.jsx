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
    <>
      <div className='container-md'>
        <h1>{show?.name}</h1>
        <div className='d-flex'>
          <div>
            <img src={show?.image ? show?.image.medium : ImageNotAvailable} alt='' />
          </div>
          <div className='px-3 py-1'>
            <p>
              {show?.summary}
            </p>
          </div>
          <div>
            <h3>Show Info</h3>
            <div>
              <p>
                {show?.network
                  ? (<><b>Network: </b>{show?.network.name}</>)
                  : (<><b>Web Channel: </b>{show?.webChannel.name}</>)}
              </p>
            </div>
          </div>
        </div>
        <div>
          Episodes
        </div>
        <div>
          Actors
        </div>
      </div>
    </>
  )
}

export default ShowDetails
