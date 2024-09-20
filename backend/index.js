const express=require("express")
const {Server}=require("socket.io")
const http=require("http")
const cors=require("cors")
const { v4: uuidv4 } = require("uuid")
//set up
const app=express()
const PORT=9000
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin: ["http://localhost:5173","https://q284kanban.netlify.app"]
    }
})
//middlewares
app.use(cors())
// Dummy data
let tasks = {
    [uuidv4()]: {
      title: "Mock list",
      cards: [
        {
          id: uuidv4(),
          title: "Mock title",
          comments: [
            {
              name: "John",
              text: "This is a mock comment",
              id: uuidv4(),
            },
          ],
        },
      ],
    },
  };
//
io.on("connection",(socket)=>{
    console.log(`${socket.id} User Connected!`)
    //
    socket.on("addList",(data)=>{
      const newList={
        title:`${data}`,
        cards: []
      }
      tasks={...tasks, [uuidv4()]:newList}
      io.sockets.emit("change",tasks)
    })
    //
    socket.on("deleteList",(data)=>{
      if(tasks[data]){
        delete tasks[data]
        io.sockets.emit("change",tasks)
      }
    })
    //
    socket.on("taskDragged",(data)=>{
      const {source, destination}=data
      const srcList=tasks[source.droppableId]//point to 
      const dstList=tasks[destination.droppableId]
      if(srcList && dstList){
        if(srcList.cards[source.index] && destination.index===0 || dstList.cards[destination.index-1]){
          const movedCard={...srcList.cards[source.index]}// new copy
          srcList.cards.splice(source.index,1)
          dstList.cards.splice(destination.index,0,movedCard)
          io.sockets.emit("change",tasks) 
        }
      }
      }
    )
    //
    socket.on("addCard",(data)=>{
      const {listId, title}=data
      const newCard={ id: uuidv4(), title: `${title}`, comments: [] }

      if(tasks[listId]){
        tasks[listId].cards.push(newCard)
      }
      io.sockets.emit("change",tasks)
    })
    //
    socket.on("deleteCard",(data)=>{
      const {listId,cardId}=data
      let index=-1
      if(tasks[listId]){
        index=tasks[listId].cards.findIndex(card=>card.id===cardId)
      }
      if(index!==-1){
        tasks[listId].cards.splice(index,1)
      }
      socket.emit("change",tasks)
    })
    //
    socket.on("loadComments",(data)=>{
      const {listId,cardId}=data
      //check if list/card exist
      if(tasks[listId]){
        const card=tasks[listId].cards.filter(card=>card.id===cardId)
        if(card.length>0){
          socket.emit("comments",card[0].comments)
        }
        else{
          console.log("List or Card not exist")
          socket.emit("comments",false)
        }
      }
      else{
        console.log("List or Card not exist")
        socket.emit("comments",false)
      }
    })
    //
    socket.on("addComment",(data)=>{
      const {comment, listId, cardId}=data
      comment['id']=uuidv4()

      if(tasks[listId]){
        const card=tasks[listId].cards.filter(card=>card.id===cardId)
        if(card.length>0){
          card[0].comments.push(comment)
          socket.emit("comments",card[0].comments)
        }
        else{
          console.log("List or Card not exist")
          socket.emit("comments",false)
        }
      }
      else{
        console.log("List or Card not exist")
        socket.emit("comments",false)
      }
    })
    //
    socket.on("disconnect",()=>{
      console.log(`${socket.id} User Disconnected!`)
      socket.disconnect()
    })
})
//
app.get("/api",(req,res)=>{
    res.json(tasks)
})
app.get(`/api/:listId/:cardId`,(req,res)=>{
  const listID=req.params.listId
  const cardId=req.params.cardId
  const response={}
  response['listName']=tasks[listID].title
  response['cardName']=tasks[listID].cards.filter(card=>card.id===cardId)[0].title
  res.json(response)
})
//
server.listen(process.env.PORT||PORT,()=>{
    console.log(`Server run at PORT: ${process.env.PORT||PORT}`)
})
//
