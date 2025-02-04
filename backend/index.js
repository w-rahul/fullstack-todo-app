const express = require("express")
const { createTodo, updateTodo } = require("./type")
const { todo } = require("./db")
require('dotenv').config()
const cors = require("cors")
const PORT = process.env.PORT || 6000
const app = express() 

app.use(express.json())
app.use(cors())

app.post("/create",async (req,res)=>{
    const createPayload = req.body
    const parsedPayload = createTodo.safeParse(createPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            message: "You sent the wrong inputs"
        })
        return 
    }
    // put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        message: "Todo created"
    })
})

app.get("/todos", async (req,res)=>{
    const todos = await todo.find({})
    res.json({
        todos
    })
})

app.put("/completed",async (req,res)=>{
    const updatePayload = req.body
    const Paresdupdated = updateTodo.safeParse(updatePayload)
    if(!Paresdupdated.success){
        res.status(411).json({
            message: "You sent the wrong inputs"
        })
        return 
    }

    await todo.updateOne({
        _id: req.body.id
    },{
        completed: true
    })
     res.json({
        message: "Todo is mark as completed"
     })
})

app.put("/Update-todo", async(req,res) => {
    const updatePayload = req.body
    const Paresdupdated = updateTodo.safeParse(updatePayload)
    if(!Paresdupdated.success){
        res.status(411).json({
            message: "You sent the worng input"
        })
        return 
    }

    await todo.updateOne({
        _id: req.body.id
    },{
        title: updatePayload.title,
        description:  updatePayload.description,
    })
    res.json({
        message: "new todo is updated"
    })
})

app.use((err,req,res,next)=>{
    res.status(500).json({
        err : "Something is up with our server"
    })
})

app.listen(PORT, () => {
    console.log("Port is running at 3000");
})
