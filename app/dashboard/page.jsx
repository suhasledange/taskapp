import Greeting from '@/components/Greeting/Greeting'
import TodoBlock from '@/components/TodoBlock/TodoBlock'
import React from 'react'

const MainBlock = () => {


  return (
    <div className='px-5 py-4'>
            <Greeting/>
            <TodoBlock/>
    </div>
  )
}

export default MainBlock
