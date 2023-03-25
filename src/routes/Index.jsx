import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ShowDetails from '../pages/ShowDetails'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shows/:id' element={<ShowDetails />} />
    </Routes>
  )
}

export default RoutesIndex
