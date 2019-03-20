import axios from 'axios';

export async function getTodos() {
  const todos = await axios.get('http://localhost:8000/api/todos');
  return todos;
}

export async function postTodo(todo) {
  await axios.post('http://localhost:8000/api/todos', todo);
}

export async function putTodo(id, update) {
  await axios.put(`http://localhost:8000/api/todos/${id}`, update);
}
