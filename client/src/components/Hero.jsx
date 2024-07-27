import React from 'react'
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {Link} from 'react-router-dom'


const Hero = () => {

  return (
    <div className='flex flex-col mx-auto items-center justify-center gap-8 ' >
      <Link to='/signin' >
        <button className='p-5 bg-black rounded-md text-center font-mono text-white ' >Sign In</button>
        </Link>

        <Link to='/signup' >
        <button  className='p-5 bg-black rounded-md text-center font-mono text-white '>Sign Up</button>
        </Link>
    </div>
  )
}

export default Hero