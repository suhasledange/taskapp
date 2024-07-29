'use client'
import { useTodoContext } from '@/context/TodoProvider';
import React from 'react'
import { CiSearch, CiShare2 } from "react-icons/ci";
import { MdAddCircle } from 'react-icons/md';

import { FiCalendar } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
const TodoBlock = () => {

    const ButtonOperations = [
        {id:1,title:"Calendar view",value:"calendar",icn:<FiCalendar/>},
        {id:2,title:"Automation",value:"automation",icn:<BsStars/>},
        {id:3,title:"Filter",value:"filter",icn:<CiFilter/>},
        {id:4,title:"Share",value:"share",icn:<CiShare2/>},
    
    ]

    const handleBtn = async (event)=>{
            console.log(event)
    }

    const {formDialog,setFormDialog} = useTodoContext()

  return (
    <div className='py-1'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1 bg-white p-2'>
            <input type='text' placeholder='Search'/>
            <CiSearch className='text-lg'/>
        </div>
        <div className='text-md flex items-center gap-8 text-gray-700'>

           {
            ButtonOperations.map(btn => (
                <button key={btn.id} onClick={()=>handleBtn(btn.value)} className='flex items-center gap-3'>{btn.title} {btn.icn} </button>

            ))
           }

            <button onClick={()=>setFormDialog(true)} className='flex items-center justify-center bg-purple-900 text-white font-normal text-md rounded-md py-1 px-2 gap-2'>Create new <MdAddCircle/></button>

        </div>
      </div>


    </div>
  )
}

export default TodoBlock
