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

module.exports = {
    createTodo : createTodo,
    updateTodo : updateTodo,
    updateNewTodo : updateNewTodo
}