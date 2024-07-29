import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, updateTaskStatus } from '../redux/taskSlice';
import { Link } from 'react-router-dom';
import TaskColumn from '../components/dashboard/TaskColumn';
// import { FaRegBell } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";

import { IoPlayForwardOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { CiViewBoard } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { PiMicrosoftTeamsLogoThin } from "react-icons/pi";
import { SiSimpleanalytics } from "react-icons/si";
import { FaPlusCircle } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { DragDropContext } from 'react-beautiful-dnd';
import {useNavigate} from 'react-router-dom'


import '../App.css'
import Card from '../components/Card';
import SearchModal from '../components/SearchModal';
import CustomizeArea from '../components/CustomizeArea';
import usePreventWindowScrollOnDrag from '../customHooks/preventScrollHook';
import { setToken, setUser } from '../redux/authSlice';



const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [taskArray,setTaskArray ] = useState([tasks])
  const navigate = useNavigate();
  // usePreventWindowScrollOnDrag();
  console.log("tasks in dashboard: ", tasks)

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  useEffect(() => {
    dispatch(fetchTasks(currentUser._id));
  }, [dispatch,currentUser]);

  const columns = {
    'To-Do': [],
    'In Progress': [],
    'Under Review': [],
    'Completed': [],
  };

  tasks.forEach((task) => {
    columns[task.status].push(task);
  });
  // console.log("colums data: ", columns)

  const onDragEnd = (result) => {
    
    const { destination, source, draggableId } = result;
    // console.log("destination",destination)
    // console.log("source",source)
    // console.log("draggableId",draggableId)
    if (!destination) return;

    if (destination.droppableId == source.droppableId) {
      return;
    }
    const currentStatus = source.droppableId;
    const newStatus = destination.droppableId;
    // console.log("new stataus : ", newStatus)
    dispatch(updateTaskStatus({ taskId: draggableId, newStatus: destination.droppableId }));
    
    

    
  };

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate('/signin')
  }
  
  return (
    <div className="dashboard">
      <div className='item1 flex flex-col justify-between' >
        <div>
        <div className='flex flex-row gap-4 items-center mb-2'>
          <img src={currentUser.image} className='rounded-full w-8 h-8 '  alt="" />
          <p className='text-xl  font-serif font-semibold' >{currentUser.firstName}</p>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row gap-4' >
            <CiBellOn className='text-center flex flex-row items-center justify-center text-[20px]' />
            <IoPlayForwardOutline className='text-center flex flex-row items-center justify-center text-[20px]'/>
          </div>
          <button className=' text-center rounded-md bg-gray-400 text-black p-2 hover:bg-gray-300 transition-all duration-200 mr-2' onClick= {handleLogout}>Logout</button>
        </div>

        <div className='w-full text-left flex flex-col gap-2' >
          <div className='flex flex-row items-center cursor-pointer  gap-2' >
              <IoHomeOutline/>
              <p>Home</p>
          </div>
          <div className='flex flex-row  items-center cursor-pointer gap-2'>
              <CiViewBoard/>
              <p>Board</p>
          </div>
          <div className='flex flex-row items-center cursor-pointer gap-2'>
              <CiSettings/>
              <p>Settings</p>
          </div>
          <div className='flex flex-row items-center cursor-pointer gap-2'>
              <PiMicrosoftTeamsLogoThin/>
              <p>Teams</p>
          </div>
          <div className='flex flex-row items-center cursor-pointer gap-2'>
              <SiSimpleanalytics/>
              <p>Analytics</p>
          </div>
        </div>
        <div>
          <Link to='/create-task' >
            <div className='cursor-pointer flex flex-row gap-2 bg-gradient-to-r from-cyan-200 to-cyan-400 rounded-md items-center p-4 w-3/4 text-lg font-bold hover:bg-blue-600 transition-all duration-200 mt-4 mr-2' >
              <button>Create new task</button>
              <FaPlusCircle/>
            </div>
          </Link>
        </div>
        </div>
        <div className=' flex flex-row justify-center items-center gap-2 bg-gray-400 rounded-md w-3/4 p-2 cursor-pointer hover:bg-gray-500 transition-all duration-200  '>
          <div className='h-full text-[40px] opacity-70'><GoDownload/></div>
          <div className='flex flex-col items-center justify-between' >
            <p className='font-bold' >Dowload the App</p>
            <p className='text-sm ' >Get the full experience</p>
          </div>
        </div>
      </div>

      <div className='item2' >
        <p className='font-bold text-5xl font-serif ' >{getGreeting()}, <span className='uppercase font-serif text-blue-900' >{currentUser.firstName}</span></p>
        
        <div className='flex flex-row justify-evenly items-center text-left mt-5'>
          <Card title={"Introducing Tags"} desc={"Easily categorize and find your notes by adding tags. keep your workspace clutter free and efficient."}/>
          <Card title={"Share Notes Instantly"} desc={"Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options"}/>
          <Card title={"Access Anywhere"} desc={"Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer."}/>
        </div>

        <div className='flex flex-row justify-between items-center mt-4' >
          <SearchModal/>
          <CustomizeArea/>
        </div>

        {loading && <p>Loading tasks...</p>}
        {error && <p>Error loading tasks: {error}</p>}

        <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row justify-between items-start mt-4">
          {Object.keys(columns).map((status,index) => (
            <TaskColumn key={status} status={status} tasks={columns[status]} index = {index} />
          ))}
        </div>
      </DragDropContext>

        
      </div>
    </div>
  );
};

export default Dashboard;
