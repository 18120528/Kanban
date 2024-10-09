import { useRef,useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import * as actions from '../../store/boadSlice'
import styles from "./Card.module.css"
import NavBar  from "../NavBar/NavBar"
//
const url=import.meta.env.VITE_SERVER_API_URL

const Card = () => {
  //
  const navigate = useNavigate();
  const {listID,cardID}=useParams()
  const dispatch=useDispatch()
  const board=useSelector(state => state.board)
  const card = board[listID]?.cards.find(card => card._id === cardID)
  //
  const fetchCardData=async ()=>
  {
    try {
      const response=await fetch(`${url}/api`)
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
    if(Object.keys(board).length===0){//fetch if absent
      fetchCardData()
    }
  },[])
  
  useEffect(() => {
    if(card){
      document.title = card.title
    }
    else if (Object.keys(board).length > 0) {
      navigate("/");
    }
  }, [board]);
  
  const socket=useRef(null)
  useEffect(()=>{
    socket.current=io(`${url}`)
    return ()=>{
      socket.current.disconnect();
    }
  },[]) 
  
  const commentRef=useRef(null)
  const handleSubmit=(e)=>{
    e.preventDefault()
    const comment={
      name: localStorage.getItem("username"),
      text: commentRef.current.value
    }
    commentRef.current.value=""
    dispatch(actions.addComment({
      listID,
      cardID,
      comment
    }))
    socket.current.emit("addComment",{comment, cardID})
    fetchCardData()
  }
  
  return (
    !card ? <NavBar/> :
    <>
      <NavBar/>
      <div className={styles.card_container}>
        <div className={styles.card}>
          <h2>{card.title}</h2>
          <p>in list <u>{board[listID].title}</u></p>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="comment"></label>
            <textarea name="comment" id="comment"
            ref={commentRef} required
            placeholder="Write a comment..."/>
            <div className={styles.button_container}>
              <button type="submit">Save</button>
            </div>
            {card.comments.map(comment=>{
              return(
                <div key={comment._id}>
                  <strong>{comment.name}:</strong>
                  <div className={styles.chat_container}>
                    <p> {comment.text}</p>
                  </div>
                </div>
              )
            })}
          </form>
        </div>
      </div>
    </>
  )
}
export default Card