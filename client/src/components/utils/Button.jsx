import React from 'react'
import {Link} from 'react-router-dom'
import { FaPlusCircle } from "react-icons/fa";


const Button = () => {
  return (
    <div>
        <>
            <div className='cursor-pointer flex flex-row gap-2 bg-black rounded-md items-center justify-center p-4 text-center text-lg font-bold hover:bg-blue-600 transition-all duration-200 mt-4 mr-2 w-full' >
              <button className='text-white text-center'>Create new task</button>
              <FaPlusCircle className='text-white'/>
            </div>
          </>
    </div>
  )
}

export default Button