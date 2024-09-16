import NavBar from "./NavBar"
import CardsContainer from "./CardsContainer"
import {io} from "socket.io-client"
import AddList from "./AddList"
//
const url=import.meta.env.VITE_SERVER_API_URL

const Board = () => {
    const socket=io(`${url}`)
    return (
      <>
        <NavBar/>
        <div className="board">
          <div className="board_content" style={{display: "flex"}}>
            <CardsContainer socket={socket}/>
            <AddList socket={socket}/>
          </div>
        </div>
      </>
    )
  }
  
  export default Board
  