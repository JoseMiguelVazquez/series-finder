import React from 'react'

const Pagination = ({ totalShows, showsPerPage, setCurrentPage, currentPage }) => {
  const pages = []

  for (let i = 1; i <= Math.ceil(totalShows / showsPerPage); i++) {
    pages.push(i)
  }

  return (
    <div className='d-flex flex-wrap justify-content-center px-2 my-3' role='group'>
      {
        pages.map((page, index) => {
          return (
            <button
              className={'btn btn-dark mx-1 mt-1 ' + (page === currentPage ? 'active' : '')}
              key={index}
              onClick={() => setCurrentPage(page)}
              data-bs-toggle='button'
              style={{ minWidth: '44px', maxHeight: '38px' }}
            >{page}
            </button>
          )
        })
      }
    </div>
  )
}

export default Pagination
