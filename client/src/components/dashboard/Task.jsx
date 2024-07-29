import {React,useEffect} from 'react';
import TrimmedText from '../utils/TrimmedText';
import { Draggable } from 'react-beautiful-dnd';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {deleteTask} from '../../redux/taskSlice.js'
import {Link} from 'react-router-dom'

// import { FaRegClock } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";



const Task = ({ task, index }) => {
  // console.log("taskid: ", task._id)
  const {currentUser} = useSelector((state) => state.user)
  console.log("currentuser : ", currentUser)
  const dispatch = useDispatch()

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getElapsedTime = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const elapsed = now - createdDate; 
    // console.log("now:", now);
    // console.log("createdat: ",createdDate)
    // console.log("elapsed : ",elapsed)

    const msInSecond = 1000;
    const msInMinute = msInSecond * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;

    const days = Math.floor(elapsed / msInDay);
    const hours = Math.floor((elapsed % msInDay) / msInHour);
    const minutes = Math.floor((elapsed % msInHour) / msInMinute);
    const seconds = Math.floor((elapsed % msInMinute) / msInSecond);

    if (days > 0) return `${days} day(s) ago`;
    if (hours > 0) return `${hours} hour(s) ago`;
    if (minutes > 0) return `${minutes} minute(s) ago`;
    return `${seconds} second(s) ago`;
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'bg-green-500  inline p-[6px] rounded-lg text-sm';
      case 'medium':
        return 'bg-orange-400  inline p-2 rounded-lg text-sm';
      case 'urgent':
        return 'bg-red-700  inline p-2 rounded-lg text-sm';
      default:
        return '';
    }
  };

  const handleDelete = async() => {
    try {
      dispatch(deleteTask(task._id))
      
    } catch (error) {
      console.log("cannot delete: ", error)
    }
  }


  // useEffect(()=>{console.log("task: ",task)},[])

  return (
    <Draggable draggableId={`${task._id}`} index={index} key={task._id} >
      {(provided,snapshot) => (
        <div
          className="bg-[#F9F9F9] border-2  border-gray-200 flex flex-col gap-2  w-full p-4 rounded-md "
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging = {snapshot.isdragging}
        >
          <h3 className='font-normal font-serif text-xl ' >{task.title}</h3>
          <TrimmedText text={task.description} wordLimit={10} className='text-green-800' />
          <span className='inline mt-2 mb-2 text-white'><p className={getPriorityColor(task.priority)}>{task.priority}</p></span>
          <div className='flex flex-row gap-2 items-center'>
            <CiClock2 className='text-md  text-black ' />
            <p className='font-bold text-gray-400'>{formatDate(task.createdAt)}</p>
          </div>
          <p className=''> {getElapsedTime(task.createdAt)}</p>
          <div className='mt-2 flex gap-4'>
            <Link to={`/updateTask/${task._id}`}>
            <FaRegEdit className='text-black text-lg cursor-pointer'  />
            </Link>
            <MdDelete className='text-red-700 text-lg cursor-pointer' onClick={handleDelete}/>

          </div>
         
        </div>
      )}
    </Draggable>
    
  );
};

export default Task;


