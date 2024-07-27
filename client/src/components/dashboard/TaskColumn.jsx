import React from 'react';
import Task from './Task';
import { MdOutlineSort } from "react-icons/md";


// import './TaskColumn.css';

const TaskColumn = ({ status, tasks }) => {
  return (
    <div className="  ">
      <div className='flex flex-row justify-between items-center w-full  ' >
        <h2 className='text-2xl  font-sans'>{status}</h2>
        <MdOutlineSort className='text-3xl rotate-180 opacity-90' />
      </div>
      <div className='  ' >
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
