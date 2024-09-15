
//
const AddList = ({socket}) => {
  const handleAddList=()=>{
    socket.emit("addList")
  }
  return (
    <div>
      <button  onClick={handleAddList}>Add List</button>
    </div>
  )
}

export default AddList
