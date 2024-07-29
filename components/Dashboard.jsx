import { useTodoProvider } from '@/context/TodoProvider'
import React from 'react'

const Dashboard = () => {

    const {data} = useTodoProvider()
    console.log(data)

  return (
    <div>
      
    </div>
  )
}

export default Dashboard
