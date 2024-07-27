import React from 'react'
import illustration from '../assets/illustration1.jpg'

const Card = ({title, desc}) => {
  return (
    <div className='bg-white rounded-sm border-2'>
        <div className='flex flex-row justify-center items-center gap-2 w-full rounded-md  p-2 cursor-pointer'>
          <div>
            <img src={illustration} alt="" className='w-[120px]'/>
          </div>
          <div className='flex flex-col ' >
            <p className='font-bold' >{title}</p>
            <p className='text-sm ' >{desc}</p>
          </div>
        </div>
    </div>
  )
}

export default Card