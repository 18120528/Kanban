import { useRef } from "react"
//
const AddCard = ({listId, socket}) => {
  const taskRef=useRef(null)

  const handleSubmit=(e)=>{
    e.preventDefault()
    socket.emit("addCard",{listId, title: taskRef.current.value})
    taskRef.current.value=""
  }

  return (
    <div className="add_card">
      <form onSubmit={handleSubmit} style={{backgroundColor:"lightsalmon",border: "3px solid black"}}>
        <label htmlFor="taskContent">Add a card</label>
        <input type="text" required
        name="taskContent" id="taskContent"
        placeholder="Enter a name for this card..."
        ref={taskRef}/>
        <button type="submit">Add Card</button>
      </form>
    </div>
  )
}

export default AddCard
