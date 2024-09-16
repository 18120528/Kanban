const url=import.meta.env.VITE_SERVER_API_URL
//
const NavBar = () => {console.log(url)
  return (
    <nav className="navbar">
      <h3>This is a Navigation Bar</h3>
    </nav>
  )
}

export default NavBar
