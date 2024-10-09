import { useRef,useState,useEffect } from "react"
import styles from "./AddList.module.css"
//
const AddList = ({socket}) => {
  const [isShowForm,setShowForm]=useState(false)
  const inputRef=useRef(null)
  const addListRef=useRef(null)
  const handleAddList=(e)=>{
    e.preventDefault()
    socket.emit("addList",inputRef.current.value)
    inputRef.current.value=""
    setShowForm(false)
  }
  const handleClickOutside=(e)=>{
    if(!addListRef.current) return
    if(!addListRef.current.contains(e.target)){
      setShowForm(false)
    }
  }

  useEffect(()=>{
    addEventListener("mousedown",handleClickOutside)

    return ()=>{
      removeEventListener("mousedown",handleClickOutside)
    }
  },[])
  return (
    <div className={styles.addList} ref={addListRef}>
      {isShowForm ? (
      <form action="" onSubmit={handleAddList}>
        <input type="text" required autoFocus
          name="listName" id="listName" 
          ref={inputRef}
          placeholder="Enter list name..."/><br/>
        <div className={styles.button_container}>
          <button className={styles.add_list_button} type="submit">Add list</button>
          <button className={styles.close_button} onClick={()=>setShowForm(false)}>X</button>
        </div>
      </form>
      ) : (
        <label htmlFor="listName" onClick={()=>setShowForm(true)}>&#10010; Add another list</label>
      )}
    </div>
  )
}

export default AddList
