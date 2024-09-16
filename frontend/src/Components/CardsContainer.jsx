import AddCard from "./AddCard"
import ListMenu from "./ListMenu"
import {Link} from "react-router-dom"
import { useEffect,useState } from "react"
import {DragDropContext,Droppable,Draggable} from "react-beautiful-dnd"
//
const url=import.meta.env.VITE_SERVER_API_URL

const CardsContainer = ({socket}) => {
  const [lists,setLists]=useState({})

useEffect(()=>{//useEffect only return func, not Promise=> async inside useEffect
  const fetchCards=async ()=>
    {
      try {
        const response=await fetch(`${url}/api`)//object
        const data=await response.json()
        setLists(data)
      } catch (error) {
        console.log(error)
      }
    }
  fetchCards()
},[])

useEffect(()=>{
  socket.on("change", (data)=>{
    setLists(data)
  })
  return ()=>{
    socket.off("change")
  }
},[socket])

const handleDragEnd=(result)=>{
  const {source,destination}=result
  
  if(!destination) return

  if(source.droppableId===destination.droppableId &&
      source.index===destination.index
  ) return

  socket.emit("taskDragged",{source,destination})
}

const handleDelCard=(listId,cardId)=>{
  socket.emit("deleteCard",{listId,cardId})
}

  return (
    <div className="list_container" style={{display:"flex"}}>
      <DragDropContext onDragEnd={handleDragEnd}>
          {Object.entries(lists).map(([key, value])=>{
            return(
              <Droppable droppableId={key} key={key} >
                {(provided, snapshot)=>{
                  return(
                    <div 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{background: snapshot.isDraggingOver && 'lightblue'}}
                    >
                      <div className="list" style={{backgroundColor:"lightseagreen",border: "2px solid white",position: "relative"}}>
                        <div className="listmenu">
                          <ListMenu socket={socket} listId={key}/>
                        </div>
                        <h2>{value.title}</h2>
                        {value.cards.map((card, index)=>{
                          return(
                            <Draggable key={card.id} draggableId={card.id} index={index}>
                              {(provided,snapshot)=>{
                                return(
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    style={{
                                      userSelect:"none",
                                      padding:16,
                                      margin: '0 0 8px 0',   
                                      backgroundColor: snapshot.isDragging ? "#263B4A" : "#9ce4e6",
                                      ...provided.draggableProps.style                                 
                                    }}
                                  >
                                    <div className="card">
                                      <Link to={`/card/${key}/${card.id}`}>
                                        <p>{card.title}</p>
                                        <p>💬 {card.comments.length}</p>
                                      </Link>
                                      <button onClick={()=>handleDelCard(key, card.id)} style={{backgroundColor: "tomato"}}>Xóa</button>
                                    </div>
                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                          }
                        )}
                        {provided.placeholder}
                        <AddCard listId={key} socket={socket}/>
                      </div>
                    </div>
                  )
                }}
              </Droppable>
            )
          })}
      </DragDropContext>
    </div>
  )
}
export default CardsContainer
