import React from 'react'
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {Link} from 'react-router-dom'
import '../Button.css'
import Calender from './utils/Calender';


const Hero = () => {

  return (
    <div className='flex flex-col mx-auto items-center justify-center gap-8 bg-black h-screen ' >
      <div className='text-white font-serif font-bold text-4xl '>
        Project by - Ansh Jain
      </div>
      <div className='flex gap-4 ' >
      <Link to='/signin' >
        <button className='btn' >Sign In</button>
        </Link>

        <Link to='/signup' >
        <button  className=' btn'>Sign Up</button>
        </Link>
        

      </div>
      <a href='https://github.com/alwaysAnsh' target='_blank' >
        <button  className='btn '>Github</button>
        </a>
        
      
    </div>
  )
}

export default Hero