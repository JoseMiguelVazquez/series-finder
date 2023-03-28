import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const EpisodesPage = () => {
  const [show, setShow] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
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

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <div className='container-md'>
        <h1>{show?.name} - Episode List</h1>
        <div>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Episode Name</th>
                <th>Airdate</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode, id) => (
                <tr key={episode.id + id.toString()}>
                  <td>{episode.name}</td>
                  <td>{episode.airdate}</td>
                  <td>{episode.rating.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default EpisodesPage