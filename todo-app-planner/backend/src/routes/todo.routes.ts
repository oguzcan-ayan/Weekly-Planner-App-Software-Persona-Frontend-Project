import { Router } from "express"
import { readTodos, writeTodos } from "../utils/file"

const router = Router()

// GET - List all todos
router.get("/", (_, res) => {
  res.json(readTodos())
})

// POST - Create a new todo
router.post("/", (req, res) => {
  const todos = readTodos()
  const newTodo = {
    id: Date.now(),
    ...req.body
  }
  todos.push(newTodo)
  writeTodos(todos)
  res.status(201).json(newTodo)
})

// PUT - Update an existing todo
router.put("/:id", (req, res) => {
  const todos = readTodos()
  const index = todos.findIndex(todo => todo.id === Number(req.params.id))

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" })
  }

  todos[index] = { ...todos[index], ...req.body }
  writeTodos(todos)
  res.json(todos[index])
})

// DELETE - Remove a todo
router.delete("/:id", (req, res) => {
  const todos = readTodos()
  const index = todos.findIndex(todo => todo.id === Number(req.params.id))

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" })
  }

  todos.splice(index, 1)
  writeTodos(todos)
  res.json({ success: true })
})

export default router