const zod = require("zod")

const createTodo = zod.object({
    title : zod.string(),
    description : zod.string()
})

const updateTodo = zod.object({
    id : zod.string(),
})

const updateNewTodo = zod.object({
    id : zod.string(),
    title: zod.string(),
    description: zod.string()
})

const userTodo = zod.object({
    username: zod.string(),
    mobileNumber: zod.string(),
    userEmail: zod.string().email()
})

const updateUserTodo = zod.object({
    mobileNumber: zod.string()
})

module.exports = {
    createTodo : createTodo,
    updateTodo : updateTodo,
    updateNewTodo : updateNewTodo,
    userTodo : userTodo,
    updateUserTodo : updateUserTodo
}
