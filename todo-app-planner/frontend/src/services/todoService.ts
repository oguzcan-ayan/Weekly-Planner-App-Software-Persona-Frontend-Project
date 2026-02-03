import { type Todo } from "../interfaces/todo"

const API_URL = "http://localhost:5000/todos"

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_URL)
  return res.json()
}

export const addTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  })
  return res.json()
}

export const updateTodo = async (id: number, data: Partial<Todo>): Promise<Todo> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const deleteTodo = async (id: number) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
}