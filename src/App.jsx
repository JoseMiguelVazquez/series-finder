import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import RoutesIndex from './routes/Index'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <RoutesIndex />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
