import { useRef,useState } from "react"
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
    <div>
      {showForm ? (
      <form action="" onSubmit={handleAddList}>
        <input type="text" required
          name="listName" id="listName" 
          ref={addedListRef}
          placeholder="Enter list name..."/><br/>
        <button type="submit">Add list</button>
        <button onClick={()=>setShowForm(false)}>Close</button>
      </form>
      ) : (
        <label htmlFor="listName" onClick={()=>setShowForm(true)}>+ Add another list</label>
      )}
    </div>
  )
}

export default AddList
