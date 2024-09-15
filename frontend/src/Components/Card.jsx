import { useRef,useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { useNavigate } from "react-router-dom"
//
const Card = () => {
  const socket=io("http://localhost:9000")
  const commentRef=useRef(null)
  const handleSubmit=(e)=>{
    e.preventDefault()
    const comment={
      name: localStorage.getItem("username"),
      text: commentRef.current.value,
      id: ""
    }
    commentRef.current.value=""
    socket.emit("addComment",{comment, listId, cardId})
    commentRef.current.value=""
  }
  //
  const [commentList,setCommentList]=useState([])
  const {listId,cardId}=useParams()
  const navigate=useNavigate()
  useEffect(()=>{
    socket.emit("loadComments",{listId,cardId})
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

    return ()=>{
      socket.off("comments")
    }
  },[socket])
  //
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="comment"></label>
        <textarea name="comment" id="comment"
        ref={commentRef} required
        placeholder="Write a comment..."/>
        <button type="submit">Save</button>
        {commentList.map(comment=>{
          return(
            <div key={comment.id}>
              <p><strong>{comment.name}:</strong> {comment.text}</p>
          </div>
          )
        })}
      </form>
    </div>
  )
}

export default Card
