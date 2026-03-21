 const mongoose=require("mongoose");
 mongoose.connect("mongodb+srv://swastikg:EVfWdhujNecK9Ibh@cluster0.kvatner.mongodb.net/")
 
 const todoschema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
 })

 const todo=mongoose.model("todos",todoschema);

 module.exports={
    todo
 }

