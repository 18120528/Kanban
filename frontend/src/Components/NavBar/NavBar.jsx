import styles from "./NavBar.module.css"
import { Link } from "react-router-dom"
//
const NavBar = () => {
  return (
    <nav className={styles.navbar}>
        <img src="/src/assets/gridIcon.png" height="13px" width="13px"/>
        <Link to={"/"}><img src="https://trello.com/assets/87e1af770a49ce8e84e3.gif" height="16px" width="74px"/></Link>
        <select>
          <option hidden>Workspaces</option>
        </select>
        <select>
          <option hidden>Recent</option>
        </select>
        <select>
          <option hidden>Starred</option>
        </select>
        <select>
          <option hidden>Templates</option>
        </select>
        <button>Create</button>
    </nav>
  )
}

export default NavBar
