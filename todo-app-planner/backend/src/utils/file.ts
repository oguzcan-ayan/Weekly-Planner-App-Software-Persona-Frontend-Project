import fs from "fs"
import path from "path"
import { Todo } from "../types/todo"

const filePath = path.join(__dirname, "../../data/todos.json")

export const readTodos = (): Todo[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8")
    return data.trim() ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const writeTodos = (todos: Todo[]) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2))
}