'use client'
import { useTodoContext } from '@/context/TodoProvider';
import React, { useEffect, useState } from 'react'
import { CiSearch, CiShare2 } from "react-icons/ci";
import { MdAddCircle } from 'react-icons/md';
import { FiCalendar } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import Todos from './Todos';
const TodoBlock = () => {

    const ButtonOperations = [
        {id:1,title:"Calendar view",value:"calendar",icn:<FiCalendar/>},
        {id:2,title:"Automation",value:"automation",icn:<BsStars/>},
        {id:3,title:"Filter",value:"filter",icn:<CiFilter/>},
        {id:4,title:"Share",value:"share",icn:<CiShare2/>},
    
    ]

    const [searchTerm, setSearchTerm] = useState('');
    const {formDialog,setFormDialog,todoData} = useTodoContext()

    const handleBtn = async (event)=>{
            console.log(event)
    }


    const filteredTodos = todoData?.filter((todo) => {
      const lowerCaseSearch = searchTerm.toLowerCase();
      return (
        todo.title.toLowerCase().includes(lowerCaseSearch) ||
        todo.priority.toLowerCase().includes(lowerCaseSearch)
      );
    });


  return (
    <div className='py-1'>
      <div className='flex flex-wrap items-center justify-between gap-3 mb-3'>
        <div className='flex lg:w-auto w-full items-center justify-between gap-1 bg-white p-2'>
            <input
             className=' outline-none'
             type='text' 
             placeholder='Search'
             value={searchTerm}
             onChange={(e)=>setSearchTerm(e.target.value)}
             />
            <CiSearch className='text-lg'/>
        </div>
        <div className='text-md flex flex-wrap items-center text-gray-700 gap-3'>

           {
            ButtonOperations.map(btn => (
                <button key={btn.id} onClick={()=>handleBtn(btn.value)} className='flex mr-8 items-center gap-3'>{btn.title} {btn.icn} </button>

            ))
           }

            <button onClick={()=>setFormDialog(true)} className='flex items-center justify-center bg-purple-900 text-white font-normal text-md rounded-md py-1 px-2 gap-2'>Create new <MdAddCircle/></button>

        </div>

      </div>

      <div>

          <Todos todos={filteredTodos}/>

      </div>

      </div>

  )
}

export default TodoBlock
