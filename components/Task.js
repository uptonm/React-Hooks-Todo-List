import React, { useState } from 'react';

const Task = ({title, dueDate, importance, complete}) => {
  const [isComplete, setIsComplete] = useState(complete || false);
  const date = new Date(dueDate) || false;

  const taskStyle = {
    textDecoration: (isComplete ? 'line-through' : ''), 
    color: (isComplete ? 'grey' : 'black'),
    transition: '0.3s'
  }

  this.renderImportance = () => {
    switch (importance) {
      case 0:
        return "";
      case 1:
        return (
          <span>
            <i className="fas fa-exclamation"></i>
          </span>
        )
      case 2:
        return (
          <span>
            <i className="fas fa-exclamation"></i>
            <i className="fas fa-exclamation"></i>
          </span>
        );
      case 3:
        return (
          <span>
            <i className="fas fa-exclamation"></i>
            <i className="fas fa-exclamation"></i>
            <i className="fas fa-exclamation"></i>
          </span>
        );
      default:
        return "";
    }
  }

  this.renderCompleteButton = () => {
    switch(isComplete) {
      case true:
        return (
          <button className="complete task" onClick={this.toggleCompleted}><i class="fas fa-check-square"></i></button>
        );
      case false:
        return (
          <button className="incomplete task" onClick={this.toggleCompleted}><i class="far fa-window-close"></i></button>
        )
      default:
    }
  }

  this.toggleCompleted = () => {
    setIsComplete(!isComplete);
  }

  return (
    <tr className="task-container">
      <td className="task-title" style={taskStyle}>{title} {this.renderImportance()}</td>
      <td className="task-date" style={taskStyle}>{!isNaN(date) ? date.toDateString() : "No Due Date"}</td>
      <td>{this.renderCompleteButton()}</td>
    </tr>
  )
}

export default Task;