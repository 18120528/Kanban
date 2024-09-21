import { useEffect, useRef,useState } from "react"
import styles from "./AddCard.module.css"
//
const AddCard = ({listId, socket}) => {
  const [showForm,setShowForm]=useState(false)
  const inputRef=useRef(null)
  const addCardRef=useRef(null)

  const handleSubmit=(e)=>{
    e.preventDefault()
    socket.emit("addCard",{listId, title: inputRef.current.value})
    inputRef.current.value=""
    setShowForm(false)
  }
  const handleClickOutside=(e)=>{
    if(!addCardRef.current) return
    if(!addCardRef.current.contains(e.target)){
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
    <div className={styles.add_card} ref={addCardRef}>
      {showForm ? (
      <form onSubmit={handleSubmit}>
        <textarea type="text" required autoFocus
        name="taskContent" id="taskContent"
        placeholder="Enter a name for this card..."
        ref={inputRef}/><br/>
        <button className={styles.add_button} type="submit">Add card</button>
        <button className={styles.close_button} onClick={()=>setShowForm(false)}>X</button>
      </form>
      ) : (
      <label htmlFor="taskContent" onClick={()=>setShowForm(true)}>➕ Add a card</label>
      )}
    </div>
  )
}

export default AddCard
