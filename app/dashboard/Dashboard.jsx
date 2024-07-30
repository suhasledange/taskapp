'use client'
import TodoForm from '@/components/Forms/TodoForm';
import Sidebar from '@/components/Sidebar';
import { useTodoContext } from '@/context/TodoProvider';
import React, { useEffect, useState } from 'react'

const Dashboard = ({children}) => {


  const {fetchUserData,fetchUserTodo,userData} = useTodoContext();

  useEffect(()=>{
    fetchUserData()
  },[])


  useEffect(()=>{

    if (userData && userData._id) {
      fetchUserTodo(userData._id);
    }

  },[userData])

  return (
    <div className="flex h-full overflow-hidden relative">

    <div className=" w-1/6 h-screen shadow-md">
            <Sidebar/>
    </div>
    
    <div className="w-5/6 h-screen overflow-auto bg-gray-100">{children}</div>

    <TodoForm/>

  </div>
  )
}

export default Dashboard
