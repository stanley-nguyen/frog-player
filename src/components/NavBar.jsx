import './Navbar.css';

function NavBar() {
  return (
    <nav className='sidenav'>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/playlists">Playlists</a></li>
      </ul>
    </nav>
  )
}

export default NavBar;