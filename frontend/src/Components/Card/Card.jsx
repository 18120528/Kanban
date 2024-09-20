import { useRef,useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { useNavigate } from "react-router-dom"
import styles from "./Card.module.css"
import NavBar  from "../NavBar/NavBar"
//
const url=import.meta.env.VITE_SERVER_API_URL

const Card = () => {
  const socket=io(`${url}`)
  const commentRef=useRef(null)
  const handleSubmit=(e)=>{
    e.preventDefault()
    const comment={
      name: localStorage.getItem("username"),
      text: commentRef.current.value
    }
    commentRef.current.value=""
    socket.emit("addComment",{comment, listId, cardId})
    commentRef.current.value=""
  }
  //
  const [commentList,setCommentList]=useState([])
  const {listId,cardId}=useParams()
  const [listCard,setListCard]=useState({})

  const navigate=useNavigate()
  useEffect(()=>{
    const fetchInfo=async ()=>
    {
      try {
        const response=await fetch(`${url}/api/${listId}/${cardId}`)//object
        const data=await response.json()
        setListCard(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchInfo()
  },[])

  useEffect(()=>{
    socket.on("comments",(data)=>{
      if(data){
        setCommentList(data)
      }
      else{
        navigate("/404")
      }
    })
    socket.emit("loadComments",{listId,cardId})
    return ()=>{
      socket.off("comments")
    }
  },[socket])
  //
  return (
    <>
      <NavBar/>
      <div className={styles.card_container}>
        <div className={styles.card}>
          <h2>{listCard.cardName}</h2>
          <p>in list <u>{listCard.listName}</u></p>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="comment"></label>
            <textarea name="comment" id="comment"
            ref={commentRef} required
            placeholder="Write a comment..."/>
            <div className={styles.button_container}>
              <button type="submit">Save</button>
            </div>
            {commentList.map(comment=>{
              return(
                <div key={comment.id}>
                  <strong>{comment.name}:</strong>
                  <div className={styles.chat_container} key={comment.id}>
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
