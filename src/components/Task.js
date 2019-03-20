import React, { useState } from 'react';

const Task = ({ index, title, dueDate, importance, complete, toggleComplete }) => {
  const [isComplete, setIsComplete] = useState(complete || false);
  const date = new Date(dueDate) || false;
  const overdue = date <= new Date();

  const taskStyle = {
    textDecoration: isComplete ? 'line-through' : '',
    color: isComplete ? 'grey' : overdue ? 'red' : 'black',
    transition: '0.3s'
  };

  const renderImportance = () => {
    switch (importance) {
      case 0:
        return '';
      case 1:
        return (
          <span>
            <i className="fas fa-exclamation" />
          </span>
        );
      case 2:
        return (
          <span>
            <i className="fas fa-exclamation" />
            <i className="fas fa-exclamation" />
          </span>
        );
      case 3:
        return (
          <span>
            <i className="fas fa-exclamation" />
            <i className="fas fa-exclamation" />
            <i className="fas fa-exclamation" />
          </span>
        );
      default:
        return '';
    }
  };

  const renderCompleteButton = () => {
    switch (isComplete) {
      case true:
        return (
          <button className="complete task" onClick={toggleCompleted}>
            <i className="fas fa-check-square" />
          </button>
        );
      case false:
        return (
          <button className="incomplete task" onClick={toggleCompleted}>
            <i className="far fa-window-close" />
          </button>
        );
      default:
    }
  };

  const toggleCompleted = () => {
    setIsComplete(!isComplete);
    toggleComplete(index);
    complete = !complete;
  };

  return (
    <tr className="task-container">
      <td className="task-title" style={taskStyle}>
        {title} {renderImportance()}
      </td>
      <td className="task-date" style={taskStyle}>
        {!isNaN(date) ? date.toDateString() : 'No Due Date'}
      </td>
      <td>{renderCompleteButton()}</td>
    </tr>
  );
};

export default Task;
