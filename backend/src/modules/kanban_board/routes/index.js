'use strict'
const boardHandler=require("../controllers/boardHandler")
const express=require("express")
const router=express.Router()
//
router.get("/",async (req,res)=>{
    const boardContent=await boardHandler.populateBoard(req.boardId)
    res.json(boardContent)
  })
router.get(`/:listId/:cardId`,async (req,res)=>{
    const listID=req.params.listId
    const cardID=req.params.cardId
    const response=await boardHandler.getListAndCardTitle(listID, cardID)
    res.json(response)
})
//
module.exports=router