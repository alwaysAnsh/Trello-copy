import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/taskSlice';
import { Link } from 'react-router-dom';
import TaskColumn from '../components/dashboard/TaskColumn';
import { FaRegBell } from "react-icons/fa";
import { IoPlayForwardOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { CiViewBoard } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { PiMicrosoftTeamsLogoThin } from "react-icons/pi";
import { SiSimpleanalytics } from "react-icons/si";
import { FaPlusCircle } from "react-icons/fa";
import { GoDownload } from "react-icons/go";


import '../App.css'
import Card from '../components/Card';
import SearchModal from '../components/SearchModal';
import CustomizeArea from '../components/CustomizeArea';

// import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks(currentUser._id));
  }, [dispatch]);

  const columns = {
    'To-Do': [],
    'In Progress': [],
    'Under Review': [],
    'Completed': [],
  };

  tasks.forEach((task) => {
    columns[task.status].push(task);
  });

  return (
    <div className="dashboard">
      <div className='item1 flex flex-col justify-between' >
        <div>
        <p className='uppercase' >{currentUser.firstName}</p>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row gap-4' >
            <FaRegBell className='text-center flex flex-row items-center justify-center text-[20px]' />
            <IoPlayForwardOutline className='text-center flex flex-row items-center justify-center text-[20px]'/>
          </div>
          <button className=' text-center rounded-md bg-gray-400 text-black p-2 hover:bg-gray-300 transition-all duration-200 mr-2' >Logout</button>
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
            <div className='cursor-pointer flex flex-row gap-2 bg-blue-500 rounded-md items-center p-4 w-3/4 text-lg font-bold hover:bg-blue-600 transition-all duration-200 mt-4 mr-2' >
              <button>Create new task</button>
              <FaPlusCircle/>
            </div>
          </Link>
        </div>
        </div>
        <div className='flex flex-row justify-center items-center gap-2 bg-gray-400 rounded-md w-3/4 p-2 cursor-pointer hover:bg-gray-500 transition-all duration-200  '>
          <div className='h-full text-[40px] opacity-70'><GoDownload/></div>
          <div className='flex flex-col items-center justify-between' >
            <p className='font-bold' >Dowload the App</p>
            <p className='text-sm ' >Get the full experience</p>
          </div>
        </div>
      </div>

      <div className='item2' >
        <p className='font-bold text-5xl ' >Good Morning, <span className='uppercase' >{currentUser.firstName}</span></p>
        
        <div className='flex flex-row justify-evenly items-center text-left mt-5'>
          <Card title={"Introducing Tags"} desc={"Easily categorize and find your notes by adding tags. keep your workspace clutter free and efficient."}/>
          <Card title={"Introducing Tags"} desc={"Easily categorize and find your notes by adding tags. keep your workspace clutter free and efficient."}/>
          <Card title={"Introducing Tags"} desc={"Easily categorize and find your notes by adding tags. keep your workspace clutter free and efficient."}/>
        </div>

        <div className='flex flex-row justify-between items-center mt-4' >
          <SearchModal/>
          <CustomizeArea/>
        </div>

        {loading && <p>Loading tasks...</p>}
        {error && <p>Error loading tasks: {error}</p>}

        <div className=" flex flex-row justify-between items-start   border-2 border-red-500">
          {Object.keys(columns).map((status) => (
            <TaskColumn key={status} status={status} tasks={columns[status]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;















// import React from 'react'
// import {Link} from 'react-router-dom'
// import { useSelector } from 'react-redux';


// const Dashboard = () => {
//   const {currentUser} = useSelector((state) => state.user) 
//   return (
//     <div>
//         <p>Dashboard</p>
//         <p>Welcome {currentUser.firstName}</p>
//         <Link to='/create-task' >
//             <button>
//                 Create
//             </button>
//         </Link>
//     </div>
//   )
// }

// export default Dashboard