'use strict'
const mongoose=require("mongoose")
//
const cardSchema=new mongoose.Schema({
    title: {type: String, required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}]
})
const Card=mongoose.model("cards",cardSchema)
//
module.exports=Card