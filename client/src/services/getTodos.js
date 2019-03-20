import axios from 'axios';

const getTodos = async () => {
  const todos = await axios.get('http://localhost:8000/api/todos');
  return todos;
};

export default getTodos;
