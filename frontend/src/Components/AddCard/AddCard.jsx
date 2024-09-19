import { useRef,useState } from "react"
import styles from "./AddCard.module.css"
//
const AddCard = ({listId, socket}) => {
  const [showForm,setShowForm]=useState(false)
  const taskRef=useRef(null)

  const handleSubmit=(e)=>{
    e.preventDefault()
    socket.emit("addCard",{listId, title: taskRef.current.value})
    taskRef.current.value=""
    setShowForm(false)
  }

  return (
    <div className={styles.add_card}>
      {showForm ? (
      <form onSubmit={handleSubmit}>
        <textarea type="text" required resize autoFocus
        name="taskContent" id="taskContent"
        placeholder="Enter a name for this card..."
        ref={taskRef}/><br/>
        <button className={styles.add_button} type="submit">Add Card</button>
        <button className={styles.close_button} onClick={()=>setShowForm(false)}>X</button>
      </form>
      ) : (
      <label htmlFor="taskContent" onClick={()=>setShowForm(true)}>➕ Add a card</label>
      )}
    </div>
  )
}

export default AddCard
