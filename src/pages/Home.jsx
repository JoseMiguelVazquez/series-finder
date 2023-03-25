import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ImageNotAvailable from '../assets/Image-Not-Available.png'

const Home = () => {
  const [series, setSeries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=batman')
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setSeries(data)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  const onSearchHandle = (event) => {
    event.preventDefault()
    fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setSeries(data)
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <div className='container-lg d-flex flex-column align-items-center'>
        <h1>Series Finder</h1>
        <form className='form-inline my-2 my-lg-0 w-75 d-flex mb-4'>
          <input
            type='text'
            className='form-control'
            id='search'
            placeholder='Search For TV Series'
            autoComplete='off'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button className='btn btn-block btn-primary' onClick={onSearchHandle}>Search</button>
        </form>
        <div className='row d-flex justify-content-center'>
          {series.map(show => (
            <Link to={`/shows/${show.show.id}`} className='card m-1' style={{ width: '18rem' }} key={show.show.id}>
              <div className='px-2 py-4'>
                <img src={show.show.image ? show.show.image.medium : ImageNotAvailable} className='card-img-top' alt='...' />
              </div>
              <div className='card-body text-center'>
                <h5 className='card-title'>{show.show.name}</h5>
                {/* <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
              </div>
              <ul className='list-group list-group-flush text-center'>
                <li className='list-group-item'>{show.show.rating.average}</li>
                {/* <li className='list-group-item'>A second item</li>
                <li className='list-group-item'>A third item</li> */}
              </ul>
              {/* <div className='card-body'>
                <a href='#' className='card-link'>Card link</a>
                <a href='#' className='card-link'>Another link</a>
              </div> */}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
