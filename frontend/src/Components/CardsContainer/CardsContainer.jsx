import AddCard from "../AddCard/AddCard"
import ListMenu from "../ListMenu/ListMenu"
import {Link} from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as actions from '../../store/boadSlice'
import {DragDropContext,Droppable,Draggable} from "@hello-pangea/dnd"
import styles from "./CardsContainer.module.css"
//
const url=import.meta.env.VITE_SERVER_API_URL
const CardsContainer = ({socket}) => {
  const dispatch=useDispatch()
  const board = useSelector((state) => state.board)
  //
  const fetchBoard=async ()=>
  {
    try {
      const response=await fetch(`${url}/api`)//object
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data=await response.json()
      dispatch(actions.fetchBoard(data))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchBoard()
  },[])

  useEffect(()=>{
    document.title="Board | Kanban"
    socket.on("change", (data)=>{
      dispatch(actions.fetchBoard(data))
    })
    return ()=>{
      socket.off("change")
    }
  },[])

  const handleDragEnd=(result)=>{
    const {source,destination,draggableId}=result
    if(!destination) return
    if(source.droppableId===destination.droppableId &&
        source.index===destination.index
    ) return
    socket.emit("cardDragged",{source,destination,draggableId})
  }

  const handleDelCard=(cardId, listId)=>{
    socket.emit("deleteCard",{cardId, listId})
  }

  return (
    <div className={styles.list_container}>
      <DragDropContext onDragEnd={handleDragEnd}>
          {Object.entries(board).map(([key, value])=>{
            return(
              <Droppable droppableId={key} key={key} >
                {(provided, snapshot)=>{
                  return(
                    <div 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <div className={styles.list} style={{border: snapshot.isDraggingOver &&  '2px solid lightblue', borderRadius:'10px'}}>
                        <ListMenu socket={socket} listId={key}/>
                        <h2>{value.title}</h2>
                        {value.cards.map((card, index)=>{
                          return(
                            <Draggable key={card._id} draggableId={card._id} index={index}>
                              {(provided,snapshot)=>{
                                return(
                                  <div
                                    className={styles.card}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    style={{
                                      userSelect:"none", 
                                      backgroundColor: snapshot.isDragging ? "#263B4A" : "#22272b",
                                      ...provided.draggableProps.style                                 
                                    }}
                                  >
                                    <Link to={`/card/${key}/${card._id}`}>
                                      <p>{card.title}</p>
                                      <p>💬 {card.comments && card.comments.length}</p>
                                    </Link>
                                    <button onClick={()=>handleDelCard(card._id, key)}>&#128465;</button>
                                  </div>
                                )
                              }}
                            </Draggable>
                          )}
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