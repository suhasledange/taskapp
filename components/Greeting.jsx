import { greetingData } from '@/lib/constant';
import React from 'react'
import { FiHelpCircle } from "react-icons/fi";
import GreetingCard from './GreetingCard';
const Greeting = () => {
  return (
    <div className='w-full py-2 mb-1'>
        <div className='flex items-center justify-between mb-3'>
            <h1 className='text-3xl font-semibold'>Good morning, Joe!</h1>
            <button className='font-medium text-gray-700 flex items-center justify-center gap-1'>Help & feedback <FiHelpCircle/> </button>
        </div>
        <div className='flex items-center justify-center gap-3 flex-wrap'>
            {
                greetingData.map(value => (
                    <GreetingCard img={value.img} description={value.description} title={value.title}/>
                ))
            }

        </div>
    </div>
  )
}

export default Greeting
