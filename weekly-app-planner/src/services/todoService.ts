import { type Todo } from "../interfaces/todo";

const STORAGE_KEY = 'weekly-planner';

const getInitialTodos = (): Todo[] => [
  {
    id: 1,
    title: "Morning Workout",
    day: "Monday",
    time: "07:00",
    duration: 1,
    completed: false
  },
  {
    id: 2,
    title: "Client Meeting",
    day: "Monday",
    time: "14:00",
    duration: 2,
    completed: false
  },
  {
    id: 3,
    title: "Code Review",
    day: "Tuesday",
    time: "10:00",
    duration: 1,
    completed: false
  },
  {
    id: 4,
    title: "Team Standup",
    day: "Wednesday",
    time: "09:00",
    duration: 1,
    completed: true
  },
  {
    id: 5,
    title: "Design Sprint",
    day: "Thursday",
    time: "13:00",
    duration: 3,
    completed: false
  }
]

export const getTodos = async (): Promise<Todo[]> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const initial = getInitialTodos();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
}

export const addTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const todos = await getTodos();
  const newTodo = { ...todo, id: Date.now() };
  todos.push(newTodo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  return newTodo;
}

export const updateTodo = async (id: number, data: Partial<Todo>): Promise<Todo> => {
  const todos = await getTodos();
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    throw new Error('Todo not found');
  }

  todos[index] = { ...todos[index], ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  return todos[index];
}

export const deleteTodo = async (id: number): Promise<void> => {
  const todos = await getTodos();
  const filtered = todos.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export const resetData = async (): Promise<void> => {
  localStorage.removeItem(STORAGE_KEY);
}

export const exportData = (): string => {
  return localStorage.getItem(STORAGE_KEY) || '[]';
}

export const importData = async (data: string): Promise<void> => {
  const parsed = JSON.parse(data);
  if (!Array.isArray(parsed)) {
    throw new Error('Invalid data format');
  }
  localStorage.setItem(STORAGE_KEY, data);
}