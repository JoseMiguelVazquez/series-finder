import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import striptags from 'striptags'
import ImageNotAvailable from '../assets/Image-Not-Available.png'

const EpisodeDetails = () => {
  const [episode, setEpisode] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id, epSeason, epNumber } = useParams()

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/episodebynumber?season=${epSeason}&number=${epNumber}`)
      .then(response => response.json())
      .then(data => {
        setEpisode(data)
        setLoading(false)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className='container-md'>
      <h1>Chapter: {episode?.name}</h1>
      <div className='row'>
        <img
          className='mb-3 col-10 col-sm-6 col-lg-5'
          src={episode?.image ? episode?.image.medium : ImageNotAvailable}
          alt='chapter'
        />
      </div>
      <p>{striptags(episode?.summary)}</p>
      <div className='card col-12 p-2'>
        <h3>Episode Info</h3>
        <div>
          <p>
            <b>Number: </b>Season {episode?.season}, Episode {episode?.number}
          </p>
          <p>
            <b>Airdate: </b>{episode?.airdate}
          </p>
          <p><b>Runtime: </b>{episode?.runtime} minutes</p>
          <p>
            <b>Rating: </b>{episode?.rating.average}
          </p>
        </div>
      </div>
      <div style={{ height: 300 }} />
    </div>
  )
}

export default EpisodeDetails
