import Image from 'next/image'
import React from 'react'

const GreetingCard = ({img,title,description}) => {
  return (
    <div className='flex-1 bg-white px-4 flex items-center justify-center gap-4'>
        
        <div className=' w-28 h-28 flex items-center justify-center'>
            <Image className="object-contain aspect-square" src={img} width={700} height={600} alt="greeting image"/>
        </div>
        <div>
            <h1 className='text-md font-medium mb-1 whitespace-nowrap'>{title}</h1>
            <p className=' text-gray-700 text-xs font-normal'>{description}</p>
        </div>
    </div>
  )
}

export default GreetingCard
