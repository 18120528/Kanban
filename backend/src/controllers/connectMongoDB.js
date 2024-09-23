'use strict'
const mongoose=require("mongoose")
//
const connectMongoDB=async ()=>{
    try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log("Connect to MongoDB successful!")
    } catch (error) {
      console.log(process.env.MONGO_URI)
      console.log(error)
    }
  }
  //
  module.exports=connectMongoDB
