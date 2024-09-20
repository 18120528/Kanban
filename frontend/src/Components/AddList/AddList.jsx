import { useRef,useState } from "react"
import styles from "./AddList.module.css"
//
const AddList = ({socket}) => {
  const [showForm,setShowForm]=useState(false)
  const addedListRef=useRef()
  const handleAddList=(e)=>{
    e.preventDefault()
    socket.emit("addList",addedListRef.current.value)
    addedListRef.current.value=""
    setShowForm(false)
  }
  
  return (
    <div className={styles.addList} >
      {showForm ? (
      <form action="" onSubmit={handleAddList}>
        <input type="text" required autoFocus
          name="listName" id="listName" 
          ref={addedListRef}
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
