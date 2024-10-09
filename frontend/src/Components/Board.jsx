import { useRef, useEffect, useState } from "react"
import NavBar from "./NavBar/NavBar"
import CardsContainer from "./CardsContainer/CardsContainer"
import {io} from "socket.io-client"
import AddList from "./AddList/AddList"
//
const url=import.meta.env.VITE_SERVER_API_URL

const Board = () => {
  const socket=useRef(null)
  const [isConnected, setConnected]=useState(false)
  useEffect(()=>{
    socket.current=io(`${url}`)
    setConnected(true)
    return ()=>{
      socket.current.disconnect()
    }
  },[])
  
  return (
    <>
      <NavBar/>
      <div className="board">
        <div className="board_content" style={{display: "flex"}}>
          {isConnected && (//prevent child component use undefined socket
            <>
              <CardsContainer socket={socket.current}/>
              <AddList socket={socket.current}/>
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default Board
  