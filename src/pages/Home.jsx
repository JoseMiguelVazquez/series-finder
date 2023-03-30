import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ImageNotAvailable from '../assets/Image-Not-Available.png'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const [series, setSeries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const showsPerPage = 10

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows?page=0')
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setSeries(data.slice(0, 100))
        setLoading(false)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  const onSearchHandle = (event) => {
    event.preventDefault()
    setLoading(true)
    fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setSeries(data.map(show => show.show))
        setLoading(false)
      }).catch(error => {
        console.log(error)
      })
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  const lastShowIndex = currentPage * showsPerPage
  const firstShowIndex = lastShowIndex - showsPerPage
  const currentSeries = series.slice(firstShowIndex, lastShowIndex)

  return (
    <>
      <div className='container-lg d-flex flex-column align-items-center'>
        <h1>TV Show Finder</h1>
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
          <button className='btn btn-block btn-dark' onClick={onSearchHandle}>Search</button>
        </form>
        <div className='row d-flex justify-content-center'>
          {currentSeries.map((show, id) => (
            <Link
              to={`/shows/${show?.id}`}
              className='m-1 bg-dark px-0 link-light text-decoration-none'
              style={{ width: '18rem' }}
              key={show.id + id.toString()}
            >
              <div className='pb-4'>
                <img
                  src={show?.image ? show.image.medium : ImageNotAvailable}
                  className='card-img-top'
                  alt='...'
                  style={{ minHeight: '405px' }}
                />
              </div>
              <div className='card-body text-center'>
                <h5 className='card-title text-white'>{show.name}</h5>
              </div>
              <div className='list-group list-group-flush text-center'>
                <p className='list-group-item bg-dark text-white'><FontAwesomeIcon icon={faStar} />    {show.rating.average}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <Pagination
          totalShows={series.length}
          showsPerPage={showsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}

export default Home
