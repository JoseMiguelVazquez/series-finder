import React from 'react'

const Pagination = ({ totalShows, showsPerPage, setCurrentPage, currentPage }) => {
  const pages = []

  for (let i = 1; i <= Math.ceil(totalShows / showsPerPage); i++) {
    pages.push(i)
  }

  return (
    <div className='btn-group my-3' role='group'>
      {
        pages.map((page, index) => {
          return (
            <button
              className={'btn btn-dark ' + (page === currentPage ? 'active' : '')}
              key={index}
              onClick={() => setCurrentPage(page)}
              data-bs-toggle='button'
            >{page}
            </button>
          )
        })
      }
    </div>
  )
}

export default Pagination
