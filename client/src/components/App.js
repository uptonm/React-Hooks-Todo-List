import React from 'react';
import Task from './Task';
import { getTodos, postTodo, putTodo } from '../services/todoService';

class App extends React.Component {
  state = {
    tasks: [],
    input: {
      title: '',
      importance: '',
      dueDate: ''
    },
    filters: {
      showCompleted: ''
    }
  };
  componentDidMount = async () => {
    const todos = await getTodos();
    this.setState({ tasks: todos.data });
  };
  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.input.title.length > 0) {
      const { title, importance, dueDate } = this.state.input;
      this.setState({
        tasks: [
          ...this.state.tasks,
          { title, completed: false, dueDate: new Date(dueDate), importance: importance }
        ],
        input: {
          title: '',
          importance: 0,
          dueDate: ''
        }
      });
      await postTodo({ title, importance, dueDate });
    }
  };
  handleInput = e => {
    this.setState({
      input: {
        ...this.state.input,
        title: e.target.value
      }
    });
  };
  handleImportance = e => {
    this.setState({
      input: {
        ...this.state.input,
        importance: e.target.value
      }
    });
  };
  handleDueDate = e => {
    this.setState({
      input: {
        ...this.state.input,
        dueDate: e.target.value
      }
    });
  };
  handleShowCompleted = e => {
    this.setState({
      filters: {
        ...this.state.filters,
        showCompleted: !this.state.filters.showCompleted
      }
    });
  };
  togglecompleted = async index => {
    let tasks = this.state.tasks;
    tasks[index].completed = !tasks[index].completed;
    this.setState({ tasks });
    console.log(tasks[index]._id);
    await putTodo(tasks[index]._id, { completed: tasks[index].completed });
  };
  renderTasks = () => {
    if (this.state.tasks.length > 0) {
      return this.state.tasks.map((task, index) => {
        if (this.state.filters.showCompleted) {
          return (
            <Task
              key={index}
              index={index}
              title={task.title}
              completed={task.completed}
              dueDate={task.dueDate}
              importance={task.importance}
              toggleComplete={this.togglecompleted}
            />
          );
        } else {
          return task.completed ? (
            ''
          ) : (
            <Task
              key={index}
              index={index}
              title={task.title}
              completed={task.completed}
              dueDate={task.dueDate}
              importance={task.importance}
              toggleComplete={this.togglecompleted}
            />
          );
        }
      });
    } else {
      return;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="task-board">
          <h1 style={{ fontWeight: '200', textAlign: 'center' }}>Add A Task</h1>

          <form className="add-task-container" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              className="new-task"
              placeholder="Task Title"
              value={this.state.input.title}
              onChange={this.handleInput}
            />
            <input
              type="text"
              className="new-date"
              placeholder="Due Date"
              value={this.state.input.dueDate}
              onChange={this.handleDueDate}
            />
            <select
              className="new-importance"
              placeholder="Importance"
              value={this.state.input.importance}
              onChange={this.handleImportance}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
            <button
              className={this.state.input.title.length > 0 ? 'add-task active' : 'add-task'}
              type="submit"
            >
              <i className="fas fa-plus" />
            </button>
          </form>
          <button
            className="show-complete-btn"
            value={this.state.filters.showCompleted}
            onClick={this.handleShowCompleted}
          >
            {!this.state.filters.showCompleted ? 'Show Completed Tasks' : 'Hide Complete Tasks'}
          </button>
          <table>
            <tr style={{ backgroundColor: '#9AD1AB', height: '50px' }}>
              <th>Task</th>
              <th>Due Date</th>
              <th>Completed</th>
            </tr>
            <tbody>{this.renderTasks()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
