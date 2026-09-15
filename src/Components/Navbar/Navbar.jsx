import { useState } from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import logo_dark from '../../assets/logo_dark.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/whiskey-five-niner.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ setSidebar, theme, toggleTheme }) => {

  const [searchInput, setSearchInput] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchInput.trim() === "") return
    navigate(`/search/${searchInput}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <nav className='flex-div'>
        <div className="nav-left flex-div">
            <img className="menu-icon" onClick={() => setSidebar(prev => !prev)} src={menu_icon} alt=""/>
            <Link to='/'><img className="logo" src={theme === "dark" ? logo_dark : logo} alt="" /></Link>
        </div>

        <div className="nav-middle flex-div">
            <div className="search-box flex-div">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img src={search_icon} alt="" onClick={handleSearch} />
            </div>
        </div>

        <div className="nav-right flex-div">
           <span className="theme-toggle" onClick={toggleTheme}>
             {theme === "dark" ? "\u2600\ufe0f" : "\ud83c\udf19"}
           </span>
           <img src={upload_icon} alt="" /> 
           <img src={more_icon} alt="" /> 
           <img src={notification_icon} alt="" /> 
           <img src={profile_icon} className="user-icon" alt="" /> 
        </div>
    </nav>
  )
}

export default Navbar
