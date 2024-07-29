import React from 'react'
import { SlCalender } from "react-icons/sl";
import { IoMdStarOutline } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";

import {Link} from 'react-router-dom'


const CustomizeArea = () => {
  return (
    <div className='flex flex-row gap-2 items-center justify-center' >
        <div className='flex flex-row gap-1 items-center justify-center' >
            <p>Calender</p>
            <SlCalender/>
        </div>
        <div className='flex flex-row gap-1 items-center justify-center' >
            <p>Automation</p>
            <IoMdStarOutline/>
        </div>
        <div className='flex flex-row gap-1 items-center justify-center' >
            <p>Filter</p>
            <CiFilter/>
        </div>
        <div className='flex flex-row gap-1 items-center justify-center' >
            <p>Share</p>
            <CiShare2/>
        </div>
        <Link to='/create-task' >
            <div className='cursor-pointer flex flex-row gap-2 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-md items-center p-2 text-lg font-bold  hover:bg-gradient-to-r hover:from-indigo-300 hover:to-cyan-300 hover:transition-all hover:duration-300  mr-2' >
              <button>Create new task</button>
              <FaPlusCircle/>
            </div>
          </Link>
    </div>
  )
}

export default CustomizeArea