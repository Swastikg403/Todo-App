   const express=require("express");
   const { createTodo, updateTodo } = require("./types");
   const { todo } = require("./db");
   const cors=require("cors");
   const app=express();

    app.use(cors());

   //  This is when we want a specific frontend to hit this backend
   //  app.use(cors({
   //    origin:"https://localhost:5173"
   //  }));

   app.use(express.json());
  
 app.post("/todo",async function(req,res){
    const createPayload=req.body;
    const parsePayload=createTodo.safeParse(createPayload);
    if(!parsePayload.success){
      res.status(411).json({
         msg:"You sent the wrong inputs",
      })
      return;
    }
    //put it in mongoDB
    todo.create({
      title:createPayload.title,
      description:createPayload.description,
      completed:false 
    })

    res.json({
      msg:"Todo is created"
    })
 })
 
 app.get("/todos",async function(req,res){
   //You can add some conditions as well here  
    const todos=await todo.find({});

    res.json({
      todos
    })
 })

 app.put("/completed",async function(req,res){
   const updatePayLoad=req.body;
   const parsePayLoad=updateTodo.safeParse(updatePayLoad);
   if(!parsePayLoad.success){
      res.status(411).json({
         msg:"You sent the wrong input",
      })
      return;
   }
   await todo.updateOne({
      _id:req.body.id,
   },{
      completed:true
   })

   res.json({
      msg:"Todo marked as completed"
   })
 })
 app.listen(3000);