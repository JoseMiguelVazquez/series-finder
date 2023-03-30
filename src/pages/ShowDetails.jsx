import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ImageNotAvailable from '../assets/Image-Not-Available.png'
import Loading from '../components/Loading'
import striptags from 'striptags'

const ShowDetails = () => {
  const [show, setShow] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  // const id = useParams().id
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => {
        setShow(data)
        setLoading(false)
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

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <div className='container-lg'>
        <h1 className='mb-4'>{show?.name}</h1>
        <div className='d-flex justify-content-center row mb-5 px-3'>
          <div className='d-flex justify-content-center col-12 col-sm-5 col-md-4 col-xl-3 mb-3'>
            <img src={show?.image ? show?.image.medium : ImageNotAvailable} alt='show poster' />
          </div>
          <div className='ps-2 pe-4 py-1 col-12 col-sm-7 col-md-5 col-xl-5 mb-3'>
            <p>
              {striptags(show?.summary)}
            </p>
          </div>
          <div className='card col-md-3 col-xl-4 p-2'>
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
                  {/* eslint-disable-next-line react/jsx-indent */}
                   </>)}
              </p>
              <p>
                <b>Episodes: </b>
                <Link
                  className='link-dark'
                  to={`/shows/${show?.id}/episodes`}
                >{episodes.length}
                </Link>
              </p>
              <p>
                {show?.rating.average
                  ? (<><b>Rating: </b>{show?.rating.average}</>)
                  : (<></>)}
              </p>
            </div>
          </div>
        </div>
        <div id='episodes-section' className='mb-5'>
          <h2>Episodes</h2>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Episode Name</th>
                <th>Airdate</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {episodes.slice(0, 5).map((episode, index) => (
                <tr key={episode.id + index.toString()}>
                  <td><Link className='link-dark' to={`/shows/${id}/episodes/${episode.season}/${episode.number}`}>{episode.name}</Link></td>
                  <td>{episode.airdate}</td>
                  <td>{episode.rating.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link
            to={`/shows/${show?.id}/episodes`}
            className='btn btn-dark'
          >Full Episode List
          </Link>
        </div>
        <div>
          <h2>Cast</h2>
          <div className='row d-flex flex-wrap'>
            {cast.map((member, id) =>
              (<div className='d-flex col-12 col-sm-6 col-lg-3 my-2' key={member?.person.id + id.toString()}>
                <div className='col-5'>
                  <img
                    className='img-fluid'
                    src={member?.person.image ? member?.person.image.medium : ImageNotAvailable}
                    alt={member?.person.name}
                  />
                </div>
                <div className='px-3 py-1 col-6'>
                  <h4>{member.person.name}</h4>
                  <p>Voices: {member?.character.name}</p>
                </div>
                {/* eslint-disable-next-line react/jsx-indent */}
               </div>))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowDetails
