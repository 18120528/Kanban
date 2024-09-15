
//
const ListMenu = ({socket,listId}) => {
  const handleDelList=()=>{
    socket.emit("deleteList",listId)
  }
  return (
    <div>
      <button onClick={handleDelList} style={{backgroundColor: "tomato"}}>Xóa</button>
    </div>
  )
}

export default ListMenu
