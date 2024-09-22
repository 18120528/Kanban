'use strict'
const mongoose=require("mongoose")
//
const listSchema=new mongoose.Schema({
    title: {type: String, required: true},
    cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'cards'}]
})
const List=mongoose.model("lists",listSchema)
//
module.exports=List