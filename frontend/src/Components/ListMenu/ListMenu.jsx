import styles from "./ListMenu.module.css"
import { useState, useRef,useEffect } from "react"
//
const ListMenu = ({socket,listId}) => {
  const [isShowMenu,setShowMenu]=useState(false)
  const menuRef=useRef(null)
  const handleDelList=()=>{
    socket.emit("deleteList",listId)
    setShowMenu(false)
  }
  const handleClickOutside=(e)=>{
    if(!menuRef.current) return
    if(!menuRef.current.contains(e.target)){
      setShowMenu(false)
    }
  }

  useEffect(()=>{
    addEventListener("mousedown",handleClickOutside)

    return ()=>{
      removeEventListener("mousedown",handleClickOutside)
    }
  },[])
  return (
    <div>
      <div className={styles.list_menu}>
        <button onClick={()=>setShowMenu(!isShowMenu)}>...</button><br/>
      </div>
      {isShowMenu && (
      <div className={styles.menu} ref={menuRef}>
        <h2>List actions</h2>
        <button onClick={handleDelList}>Delete</button>
        <button>...</button>
      </div>
      )}
    </div>

  )
}

export default ListMenu
