import './Navbar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className='sidenav'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/playlists">Playlists</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar;