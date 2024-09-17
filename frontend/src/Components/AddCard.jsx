import { useRef,useState } from "react"
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
    <div className="add_card">
      {showForm ? (
      <form onSubmit={handleSubmit} style={{backgroundColor:"lightsalmon",border: "3px solid black"}}>
        <input type="text" required
        name="taskContent" id="taskContent"
        placeholder="Enter a name for this card..."
        ref={taskRef}/><br/>
        <button type="submit">Add Card</button>
        <button onClick={()=>setShowForm(false)}>Close</button>
      </form>
      ) : (
        <label htmlFor="taskContent" onClick={()=>setShowForm(true)}>+ Add a card</label>
      )}
    </div>
  )
}

export default AddCard
