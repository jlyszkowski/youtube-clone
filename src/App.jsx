import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import Search from './Pages/Search/Search'

const App = () => {

  const [sidebar, setSidebar] = useState(true)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : ''
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <BrowserRouter>
      <div>
        <Navbar setSidebar={setSidebar} theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path='/' element={<Home sidebar={sidebar} />} />
          <Route path='/video/:categoryID/:videoID' element={<Video />} />
          <Route path='/search/:searchTerm' element={<Search sidebar={sidebar} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
