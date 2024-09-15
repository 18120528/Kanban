import NavBar from "./NavBar"
import CardsContainer from "./CardsContainer"
import {io} from "socket.io-client"
import AddList from "./AddList"
//
const Board = () => {
    const socket=io("http://localhost:9000/")
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
  