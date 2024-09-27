'use strict'
const express=require("express")
const {Server}=require("socket.io")
const http=require("http")
const cors=require("cors")
require("dotenv").config()
const connectMongoDB=require("./config/mongoDB")
const boardHandler=require("./modules/kanban_board/controllers/boardHandler")
const apiRoutes=require("./modules/kanban_board/routes/index")
const socketHandler=require("./modules/kanban_board/controllers/socketHandler")
//set up
const PORT=9000
const app=express()
app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin: ["http://localhost:5173","https://q284kanban.netlify.app"]
    }
})

const startMongoDB=async ()=>{
  await connectMongoDB()
  await boardHandler.clearBoard()
  const newBoard=await boardHandler.createBoard()
  return newBoard
}
startMongoDB().then(newBoard=>{
  console.log('Init Board')
  //routes
  app.use((req, res, next) => {
    req.boardId = newBoard._id; // Pass the boardId to the request object
    next();
  });
  app.use('/api',apiRoutes)
  //socket handles
  socketHandler(io,newBoard._id)
}).catch(error=>{
  console.log(error)
})
//Start server
server.listen(process.env.PORT||PORT,()=>{
    console.log(`Server run at PORT: ${process.env.PORT||PORT}`)
})
