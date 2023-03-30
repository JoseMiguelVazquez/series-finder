import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTv } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-md bg-body-tertiary bg-dark navbar-dark mb-3'>
        <div className='container-fluid'>
          <NavLink className='navbar-brand text-white' to='#'>
            <FontAwesomeIcon icon={faTv} /> FIND TV
          </NavLink>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink className='nav-link active' aria-current='page' to='/'>Home</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/about'>About</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
