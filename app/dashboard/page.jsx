import Greeting from '@/components/Greeting/Greeting'
import TodoBlock from '@/components/TodoBlock/TodoBlock'
import React from 'react'

const MainBlock = () => {

  return (
    <div className='lg:px-5 px-3 py-4'>
            <Greeting/>
            <TodoBlock/>
    </div>
  )
}

export default MainBlock
