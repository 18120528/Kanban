'use strict'
const boardHandler=require('./boardHandler')
//
const socketHandler=(io,newBoardId)=>{
  io.on("connection",(socket)=>{
    console.log(`${socket.id} User Connected!`)
    //
    socket.on("addList",async (data)=>{
      await boardHandler.createList(data, newBoardId)
      const boardContent=await boardHandler.populateBoard(newBoardId)
      io.sockets.emit("change",boardContent)
    })
    socket.on("deleteList",async (data)=>{
      await boardHandler.deleteList(data, newBoardId)
      const boardContent=await boardHandler.populateBoard(newBoardId)
      io.sockets.emit("change",boardContent)
    })
    socket.on("cardDragged",async (data)=>{
      const {source, destination, draggableId}=data
      await boardHandler.cardDragged(source, destination, draggableId)
      const boardContent=await boardHandler.populateBoard(newBoardId)
      io.sockets.emit("change",boardContent) 
    })
    socket.on("addCard",async (data)=>{
      const {listId, title}=data
      await boardHandler.createCard(title, listId)
      const boardContent=await boardHandler.populateBoard(newBoardId)
      io.sockets.emit("change",boardContent)
    })
    socket.on("deleteCard",async (data)=>{
      const {cardId, listId}=data
      await boardHandler.deleteCard(cardId, listId)
      const boardContent=await boardHandler.populateBoard(newBoardId)
      io.sockets.emit("change",boardContent)
    })
    socket.on("loadComments",async (data)=>{//not used anymore
      const comments=await boardHandler.getComments(data)
      socket.emit("comments",comments)
    })
    socket.on("addComment",async (data)=>{
      const {comment, cardID}=data
      await boardHandler.createComment(comment.name, comment.text, cardID)
      // const comments=await boardHandler.getComments(cardID)
      // socket.emit("comments",comments)
    })
    socket.on("disconnect",()=>{
      console.log(`${socket.id} User Disconnected!`)
      socket.disconnect()
    })
})
}
//
module.exports=socketHandler
