'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { RiHome2Line } from "react-icons/ri";
import { IoAnalyticsOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { MdOutlineAnalytics } from "react-icons/md";
import Image from 'next/image';
import { GoBell } from "react-icons/go";
import { LuLoader } from "react-icons/lu";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { useTodoContext } from '@/context/TodoProvider';
import axios from 'axios';
import { IoMenuSharp } from "react-icons/io5";
const Sidebar = () => {

    const pathname = usePathname()
    const router = useRouter();
    const {setFormDialog,userData,setTodoData,setUserData} = useTodoContext()

    const [smallMenu,setSmallMenu] = useState(false)

    const links = [

        {id:1,text:'Home',link:"/dashboard",logo:<RiHome2Line/>},
        {id:2,text:'Boards',link:"/dashboard/boards",logo:<MdOutlineAnalytics/>},
        {id:3,text:'Settings',link:"/dashboard/settings",logo:<CiSettings/>},
        {id:4,text:'Teams',link:"/dashboard/teams",logo:<PiUsers/>},
        {id:5,text:'Analytics',link:"/dashboard/analytics",logo:<IoAnalyticsOutline/>},
    ]

    const handleLogout = async () => {
        try {

            const res = await axios.get("/api/logout")
            if (res.status === 200) {
                localStorage.setItem('logout', Date.now());
                router.replace('/');
                setTodoData([]);
                setUserData([]);
            } else {
                console.log("Logout failed with status:", res.status);
            }
        } catch (error) {
            console.log("Failed to logout", error);
        }
    };
 
  return (
    <div className={`lg:h-screen md:h-full ${smallMenu ? "h-full":"h-[3.8rem]"}  lg:py-0 md:py-3 py-3 flex flex-col justify-between overflow-hidden`}>
        
        <div className='flex lg:flex-col lg:px-3 lg:mt-4 mt-0 md:mt-0 w-full'>

        <div className='flex lg:flex-col md:flex-row flex-row justify-between w-full'>

            <div className='flex items-center gap-3' >
            
            <div onClick={()=>setSmallMenu(prev => !prev)} className='lg:hidden md:hidden block cursor-pointer'>
                    <IoMenuSharp size={25}/>
            </div>

                    <div className='w-8 h-8 cursor-pointer flex items-center justify-center'>
                        <Image alt="logouser" className='aspect-square object-contain' src="/DefaultProfile.svg" width={500} height={500}/>
                    </div>
                    <h1 className='font-semibold tracking-wider text-md'>{userData?.fullname}</h1>
            </div>

            <div className='lg:hidden md:flex hidden'>
            { 
            links.map(l => (  
                <Link  href={l.link} className={`text-sm hover:bg-gray-100/70 duration-200 text-gray-700 font-normal ${pathname === l.link ? "bg-gray-100 ":"bg-transparent"} rounded-sm px-2 md:mx-1 mx-0 flex items-center gap-2 duration-200 `} key={l.id}> {l.logo} { l.text } </Link>
            ))
            }
        
        </div>

            <div className='lg:mt-4 mt-0 md:mt-0 flex lg:gap-4 gap-4 md:gap-2 justify-between items-center'>
                <div className='flex items-center lg:gap-4 md:gap-3 gap-4 text-lg text-gray-700 pl-1'>
                    <button className=''><GoBell/></button>
                    <button className='relative'><LuLoader/> <div className='absolute rounded-full w-3  h-3 bg-yellow-500 -top-1 -right-1'></div> </button>
                    <button className=''><MdKeyboardDoubleArrowRight/></button>
                </div>
                <button onClick={handleLogout} className='bg-gray-100 px-3 py-1 md:w-auto w-full active:scale-95 font-medium lg:text-sm text-md text-md hover:bg-gray-200/60 duration-150 text-gray-600'>Logout</button>
            </div>
        </div>


        <div className='flex-col w-full my-4 lg:flex md:hidden hidden'>
            { 
            links.map(l => (  
                <Link  href={l.link} className={`text-sm text-gray-700 font-normal ${pathname === l.link ? "bg-gray-100 ":"bg-transparent"} rounded-sm p-2 flex items-center gap-2 duration-200 `} key={l.id}> {l.logo} { l.text } </Link>
            ))
            }
        </div>

        <div className='lg:block hidden'>
            <button onClick={()=>setFormDialog(true)} className='flex w-full md:text-sm text-xs lg:text-md items-center justify-center bg-purple-900 text-white font-normal text-md rounded-md p-2 px-6 gap-2'>Create new task <MdAddCircle className='text-lg'/></button>
        </div>
      
        </div>

        <div className='flex-col w-full mt-4 mb-0 lg:hidden md:hidden block'>
            { 
            links.map(l => (  
                <Link  href={l.link} className={`text-sm text-gray-700 font-normal ${pathname === l.link ? "bg-gray-100 ":"bg-transparent"} rounded-sm p-2 flex items-center gap-2 duration-200 `} key={l.id}> {l.logo} { l.text } </Link>
            ))
            }
        </div>

            <div className='lg:flex md:hidden hidden items-center justify-center w-full px-3 mb-8'>
               
                <div className='flex cursor-pointer items-center gap-3 bg-gray-100 rounded-md w-full p-3'>
                <IoMdDownload className='text-2xl'/>
                <div className='text-gray-800'>
                <h1 className='text-md mb-1 font-medium'>Download the app </h1>
                <p className='text-xs'>Get the full experience</p>
                </div>

                </div>
            </div>
        </div>
  )
}

export default Sidebar
