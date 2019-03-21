import axios from 'axios';

export async function getTodos() {
  const todos = await axios.get('/api/todos');
  return todos;
}

export async function postTodo(todo) {
  await axios.post('/api/todos', todo);
}

export async function putTodo(id, update) {
  await axios.put(`/api/todos/${id}`, update);
}
