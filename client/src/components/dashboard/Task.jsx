import React from 'react';
// import './Task.css';

const Task = ({ task }) => {
  return (
    <div className="bg-red-300 border-2 border-black w-full ">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
