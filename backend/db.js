const mongoose = require("mongoose");
const { default: errorMap } = require("zod/locales/en.js");
require("dotenv").config()

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed : Boolean
})


const todo = mongoose.model('todo', todoSchema)

module.exports = {
    todo
}