import styles from "./ListMenu.module.css"
import { useState } from "react"
//
const ListMenu = ({socket,listId}) => {
  const [showMenu,setShowMenu]=useState(false)
  const handleDelList=()=>{
    socket.emit("deleteList",listId)
  }
  return (
    <div>
      <div className={styles.list_menu}>
        <button onClick={()=>setShowMenu(!showMenu)}>...</button><br/>
      </div>
      {showMenu && (
      <div className={styles.menu}>
        <h2>List actions</h2>
        <button onClick={handleDelList}>Delete</button>
        <button onClick={()=>setShowMenu(!showMenu)}>Close list actions</button>
      </div>
      )}
    </div>

  )
}

export default ListMenu
