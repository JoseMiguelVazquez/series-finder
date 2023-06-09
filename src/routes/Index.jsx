import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EpisodesPage from '../pages/EpisodesPage'
import Home from '../pages/Home'
import ShowDetails from '../pages/ShowDetails'
import About from '../pages/About'
import EpisodeDetails from '../pages/EpisodeDetails'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/shows/:id' element={<ShowDetails />} />
      <Route path='/shows/:id/episodes' element={<EpisodesPage />} />
      <Route path='/shows/:id/episodes/:epSeason/:epNumber' element={<EpisodeDetails />} />
    </Routes>
  )
}

export default RoutesIndex
