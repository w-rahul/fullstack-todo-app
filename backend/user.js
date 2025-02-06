const express = require("express")
const { todo, user, usertodo } = require("./db")
const { userTodo, updateNewTodo, updateUserTodo } = require("./type")
require('dotenv').config()
const app = express();
const cors = require("cors");
const { deleteModel } = require("mongoose");
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());

app.post("/signup", async (req,res) => {
    const createPayload = req.body;
    const parsedPayload = userTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            message: "You sent the wrong inputs"
        })

        return
    }

    await user.create({
        username: createPayload.username,
        mobileNumber: createPayload.mobileNumber,
        userEmail: createPayload.userEmail
    })

    res.json({
        message: "User created"
    })
});

app.post("/user-todo", async (req, res) => {
    const userExists = await user.findOne({ 
        mobileNumber: req.body.mobileNumber 
    });

    if (!userExists) {
     res.status(400).json({ 
        message: "User not signed up" 
    });

    } else {
        const newTodo = await usertodo.create({
            mobileNumber: req.body.mobileNumber, 
            title: req.body.title,
            description: req.body.description,
        });

         res.json({
             message: "Todo created", todo: newTodo 
        });
    }
});

app.put("/update-todo", async (req,res) => {
    const updatePayload = req.body
    const Paresdupdated = updateUserTodo.safeParse(updatePayload);
    if(!Paresdupdated.success){
        res.status(411).json({
            message: "You sent the wrong input"
        })

        return
    }

    const userExists = await user.findOne({ 
        mobileNumber: updatePayload.mobileNumber 
    });

    if (!userExists) {
     res.status(400).json({ 
        message: "User not signed up" 
    });
}

    await usertodo.updateOne({
        mobileNumber: updatePayload.mobileNumber
    },{ $set: {
        title: updatePayload.title,
        description: updatePayload.description,
        completed: true
    }
    })
    res.json({
        message: "user todo is updated"
    })
})

app.get("/todo-details", async (req, res) => {
        const mobileNumber = req.query.mobileNumber; 
        if (!mobileNumber) {
            return res.status(400).json({
                 message: "Mobile number is required" 
                });
        }

        const check = await usertodo.findOne(
            { 
            mobileNumber: mobileNumber
            }, 
            { title: 1,
             description: 1}
        );

        if (check) {
            res.json({ 
                todo: check 
            });
        } else {
            res.status(404).json({ 
                message: "Not found" 
            });
        }
});

app.delete("/delete-todo", async (req, res) => {
    const mobileNumber = req.query.mobileNumber;
    const userEmail = req.query.email;

    if (!mobileNumber) {
        return res.status(400).json({
            message: "Mobile number is required"
        });
    }

    if(!userEmail){
        return res.status(400).json({
            message: "Email is required"
        });
    }
     
        const deleteResult = await usertodo.deleteMany({
            mobileNumber: mobileNumber
        });

        if (deleteResult.deletedCount > 0) {
            return res.json({ message: "User deleted successfully" });
        } else {
            return res.status(404).json({
                message: "No user found"
            });
        } 
});

app.listen(port, () => {
    console.log("Port is running at 6000");
})
