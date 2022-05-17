const express = require("express");
const bodyParser = require("body-parser");
const cors=require("cors");
const mongoose= require("mongoose");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/todo")


const listSchema={
  title:String,
  pri:Number,
  completed:Number
}

const task=mongoose.model("tasks",listSchema);


app.post("/task",(req,res)=>{
  const Task=new task({
    title:req.body.task,
    pri:req.body.pri,
    completed:req.body.completed
  });
  Task.save();
  res.send("done");
});

app.get("/list",(req,res)=>{
  task.find((err,foundlist)=>{
    res.send(foundlist);
  });
});

app.post("/delete",(req,res)=>{
    const itemIDremove=req.body.checkbox;
    task.findByIdAndDelete(itemIDremove,(err)=>{
        res.send("deleted");
    });
});

app.post("/update",(req,res)=>{
  const id=req.body._id;
  const upd=req.body.pri;
     task.findByIdAndUpdate(id,{pri:upd},(err,result)=>{
       if(err){
         res.send(err);
       }else{
         res.send("success");
       }
     })
})

app.get("/clear",(req,res)=>{
  
  task.deleteMany({},(err,result)=>{
    if(err){
      res.send(err);
    }else{
      res.send("sucess");
    }
  });
}) 

app.post("/completed",(req,res)=>{
  const id=req.body._id;
  const upd=req.body.completed;
  task.findByIdAndUpdate(id,{completed:upd},(err,result)=>{
    if(err){
      res.send(err);
    }else{
      res.send("success");
    }
  })
})

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));