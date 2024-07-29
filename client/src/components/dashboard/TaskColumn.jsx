import React from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import { MdOutlineSort } from "react-icons/md";
import Button from '../utils/Button';
import {Link} from 'react-router-dom'
 
const TaskColumn = ({ status, tasks, index }) => {
  console.log("tasks in Taskcolum.jsx", tasks)
  return (
    <Droppable droppableId={`${status}`} key={status} index={index}>
      {(provided) => (
        <div
          className="task-column"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {/* <h2>{status}</h2> */}
          <div className='flex flex-row justify-between items-center w-full   ' >
              <h2 className='text-2xl  font-sans'>{status}</h2>
              <MdOutlineSort className='text-3xl rotate-180 opacity-90' />
          </div>
          <div className=' flex flex-col gap-4 w-[280px] '>
            {tasks.map((task, index) => (
              <Task key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
          <Link to={`/create-task-on-status/${status}`}>
            <Button/>
          </Link>
        </div>
      )}
      
    </Droppable>
  );
};

export default TaskColumn;














// import React from 'react';
// import Task from './Task';
// import { MdOutlineSort } from "react-icons/md";


// // import './TaskColumn.css';

// const TaskColumn = ({ status, tasks }) => {
//   return (
//     <div className="  ">
//       <div className='flex flex-row justify-between items-center w-full   ' >
//         <h2 className='text-2xl  font-sans'>{status}</h2>
//         <MdOutlineSort className='text-3xl rotate-180 opacity-90' />
//       </div>
//       <div className=' flex flex-col gap-4 w-[280px] ' >
//         {tasks.map((task) => (
//           <Task key={task._id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskColumn;
