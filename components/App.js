import React, { useState } from 'react';
import Task from './Task';

export default () => {
  const [tasks, setTasks] = useState([{ title: 'Sample', complete: true, dueDate: new Date(), importance: 2 }])
  const [newTask, setNewTask] = useState('');
  const [newImportance, setNewImportance] = useState(0);
  const [dueDate, setDueDate] = useState('');

  this.handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.length > 0) {
      setTasks([...tasks, { title: newTask, complete: false, dueDate: new Date(dueDate), importance: newImportance }]);
      setNewTask('');
      setNewImportance(0);
      setDueDate('');
    }
  }

  this.handleInput = (e) => {
    setNewTask(e.target.value);
  }

  this.handleImportance = (e) => {
    setNewImportance(parseInt(e.target.value));
  }

  this.handleDueDate = (e) => {
    setDueDate(e.target.value);
  }

  this.renderTasks = () => {
    return tasks.map((task, index) => {
      return <Task key={index} title={task.title} complete={task.complete} dueDate={task.dueDate} importance={task.importance} />
    })
  }
  return (
    <div className="container">
      <div className="task-board">
        <h1 style={{ fontWeight: '200', textAlign: 'center' }}>Add A Task</h1>
        <form className="add-task-container" onSubmit={this.handleSubmit}>
          <input type="text" className="new-task" placeholder="Task Title" value={newTask} onChange={this.handleInput} />
          <input type="text" className="new-date" placeholder="Due Date" value={dueDate} onChange={this.handleDueDate} />
          <select className="new-importance" placeholder="Importance" value={newImportance} onChange={this.handleImportance}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
          <button className={newTask.length > 0 ? "add-task active" : "add-task"} type="submit"><i className="fas fa-plus"></i></button>
        </form>
        <table>
          <tr style={{backgroundColor: '#9AD1AB', height: '50px'}}>
              <th>Task</th>
            <th>Due Date</th>
            <th>Completed</th>
          </tr>
          <tbody>
            {this.renderTasks()}
          </tbody>
        </table>
      </div>
    </div>
  )
}
