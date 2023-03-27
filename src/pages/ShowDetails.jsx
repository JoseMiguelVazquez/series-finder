import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageNotAvailable from '../assets/Image-Not-Available.png'

const ShowDetails = () => {
  const [show, setShow] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [cast, setCast] = useState([])
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

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then(response => response.json())
      .then(data => {
        setEpisodes(data)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
      .then(response => response.json())
      .then(data => {
        setCast(data)
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
                  : show?.webChannel
                    ? (<><b>Web Channel: </b>{show?.webChannel.name}</>)
                    : (<></>)}
              </p>
              <p>
                {(show?.schedule.days === undefined || show?.schedule.days.length === 0)
                  ? (<></>)
                  : (<><b>Schedule: </b>{show?.schedule.days + 's'}</>)}
                {show?.schedule.time !== ''
                  ? (<> at {show?.schedule.time}</>)
                  : (<></>)}
              </p>
              <p><b>Status: </b>{show?.status}</p>
              <p>{show?.genres === undefined || show?.genres.length === 0
                ? (<></>)
                : (<><b>Genres: </b>
                  {show?.genres.length === 1
                    ? show?.genres[0]
                    : show?.genres.map((element, i, array) => (
                      i < array.length - 1 ? `${element} | ` : `${element}`
                    ))}
                </>)}
              </p>
              <p><b>Episodes: </b><a href='#episodes-section'>{episodes.length}</a></p>
            </div>
          </div>
        </div>
        <div id='episodes-section'>
          <h2>Episodes</h2>
          <table>
            <thead>
              <tr>
                <th>Episode Name</th>
                <th>Airdate</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map(episode => (
                <tr key={episode.id}>
                  <td>{episode.name}</td>
                  <td>{episode.airdate}</td>
                  <td>{episode.rating.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Cast</h2>
          <div className='row'>
            {cast.map(member => (
              <div key={member.person.id}>
                <h4>{member.person.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowDetails
