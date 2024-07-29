import Image from 'next/image'
import React from 'react'

const GreetingCard = ({img,title,description}) => {
  return (
    <div className='flex-1 bg-white px-4 flex items-center justify-center gap-4'>
        
        <div className=' w-32 h-32'>
            <Image className="object-contain w-full h-full" src={img} width={700} height={600} alt="greeting image"/>
        </div>
        <div>
            <h1 className='text-lg font-medium mb-1'>{title}</h1>
            <p className=' text-gray-700 text-sm font-normal'>{description}</p>
        </div>
    </div>
  )
}

export default GreetingCard
