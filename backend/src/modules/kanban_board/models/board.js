'use strict'
const mongoose=require("mongoose")
//
const boardSchema=new mongoose.Schema({
    lists: [{type: mongoose.Schema.Types.ObjectId, ref:'lists'}]
})
const Board=mongoose.model('boards',boardSchema)
//
module.exports=Board
