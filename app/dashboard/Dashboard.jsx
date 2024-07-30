'use client'
import TodoForm from '@/components/Forms/TodoForm';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react'

const Dashboard = ({children}) => {

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
