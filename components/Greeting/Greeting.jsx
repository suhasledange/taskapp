'use client'
import { greetingData } from '@/lib/constant';
import React, { useEffect, useState } from 'react'
import { FiHelpCircle } from "react-icons/fi";
import GreetingCard from './GreetingCard';
import { useTodoContext } from '@/context/TodoProvider';
const Greeting = () => {

    const [greeting,setGreeting] = useState("Good Morning")
    const {userData} = useTodoContext()
    const [name,setName] = useState("");


    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) return "Good morning";
        if (currentHour < 18) return "Good afternoon";
        return "Good evening";
    };

    useEffect(()=>{

        if(userData && userData.fullname)
        {
            setName(userData?.fullname?.split(' ')[0])
        }
       setGreeting(getGreeting())

    },[userData])


  return (
    <div className='w-full mb-1'>
        <div className='flex items-center justify-between mb-3'>
            <h1 className='text-2xl font-semibold'>{greeting}, {name}</h1>
            <button className='font-medium text-sm text-gray-700 flex items-center justify-center gap-1'>Help & feedback <FiHelpCircle/> </button>
        </div>
        <div className='flex items-center justify-center flex-grow gap-3 flex-wrap'>
            {
                greetingData.map(value => (
                    <GreetingCard key={value.id} img={value.img} description={value.description} title={value.title}/>
                ))
            }

        </div>
    </div>
  )
}

export default Greeting
