import Greeting from '@/components/Greeting'
import TodoBlock from '@/components/TodoBlock'
import React from 'react'

const MainBlock = () => {
  return (
    <div className='p-6 '>
            <Greeting/>
            <TodoBlock/>
    </div>
  )
}

export default MainBlock
