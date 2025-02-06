const mongoose = require("mongoose");
const { number } = require("zod");
const { default: errorMap } = require("zod/locales/en.js");
require("dotenv").config()

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const userTodoSchema = mongoose.Schema({
    mobileNumber: String,
    title: String,
    description: String,
    completed: Boolean
})

const userSchema = mongoose.Schema({
        username: String,
        mobileNumber: Number,
        userEmail: String
})

const todo = mongoose.model('todo', todoSchema)
const user = mongoose.model('user', userSchema)
const usertodo = mongoose.model('usertodo', userTodoSchema)

module.exports = {
    todo,
    user,
    usertodo
}
