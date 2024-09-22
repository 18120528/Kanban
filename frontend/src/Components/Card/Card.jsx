import { useRef,useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import styles from "./Card.module.css"
import NavBar  from "../NavBar/NavBar"
//
const url=import.meta.env.VITE_SERVER_API_URL

const Card = () => {
  //
  const [commentList,setCommentList]=useState([])
  const {listId,cardId}=useParams()
  const [listCard,setListCard]=useState({})

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

  const socket=useRef(null)
  useEffect(()=>{
    socket.current=io(`${url}`)
    socket.current.on("comments",(data)=>{
      setCommentList(data)
    })
    socket.current.emit("loadComments",cardId)
    return ()=>{
      socket.current.off("comments")
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
    socket.current.emit("addComment",{comment, cardId})
    commentRef.current.value=""
  }
  //
  return (
    <>
      <NavBar/>
      <div className={styles.card_container}>
        <div className={styles.card}>
          <h2>{listCard.cardTitle}</h2>
          <p>in list <u>{listCard.listTitle}</u></p>
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
