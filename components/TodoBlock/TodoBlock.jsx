'use client'
import { useTodoContext } from '@/context/TodoProvider';
import React, { useState, useRef, useEffect } from 'react';
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
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState('');
    const { setFormDialog, todoData } = useTodoContext();
    const filterButtonRef = useRef(null);
    const filterDialogRef = useRef(null);

    const handleBtn = (event) => {
        if (event === 'filter') {
            setIsPopoverOpen(prev => !prev);
        }
    };

    const handlePriorityFilter = (priority) => {
        setSelectedPriority(prevPriority => prevPriority === priority ? '' : priority);
    };

    const handlePriorityFilterDoubleClick = () => {
        setSelectedPriority('');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filterDialogRef.current &&
                !filterDialogRef.current.contains(event.target) &&
                filterButtonRef.current &&
                !filterButtonRef.current.contains(event.target)
            ) {
                setIsPopoverOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [filterDialogRef, filterButtonRef]);

    const filteredTodos = todoData?.filter((todo) => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        const matchesSearch = todo.title.toLowerCase().includes(lowerCaseSearch) || todo.priority.toLowerCase().includes(lowerCaseSearch);
        const matchesPriority = selectedPriority ? todo.priority.toLowerCase() === selectedPriority.toLowerCase() : true;
        return matchesSearch && matchesPriority;
    });

    return (
        <div className='py-1'>
            <div className='flex flex-wrap items-center justify-between gap-3 mb-3'>
                <div className='flex lg:w-auto w-full items-center justify-between gap-1 bg-white p-2'>
                    <input
                        className='outline-none w-full text-sm'
                        type='text'
                        placeholder='Search'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <CiSearch className='text-lg' />
                </div>
                <div className='text-sm flex flex-wrap relative items-center text-gray-700 gap-3'>
                    {
                        ButtonOperations.map(btn => (
                            <button
                                key={btn.id}
                                onClick={() => handleBtn(btn.value)}
                                ref={btn.value === 'filter' ? filterButtonRef : null}
                                className='flex mr-8 items-center gap-3'
                            >
                                {btn.title} {btn.icn}
                            </button>
                        ))
                    }
                    {
                        isPopoverOpen &&
                        <div ref={filterDialogRef} className='flex flex-col rounded-md gap-2 absolute top-10 left-[17rem] z-20 shadow-md border w-[8rem] p-1 bg-white'>
                          <div className='border-b p-1 px-2 text-md font-semibold'>
                            Filter
                          </div>
                            {['Low', 'Medium', 'Urgent'].map(priority => (
                                <button
                                    key={priority}
                                    onClick={() => handlePriorityFilter(priority)}
                                    onDoubleClick={handlePriorityFilterDoubleClick}
                                    className={`py-1 px-2 text-left rounded ${selectedPriority === priority ? 'bg-btn font-medium text-white' : 'bg-white text-gray-700'}`}
                                >
                                    {priority}
                                </button>
                            ))}
                        </div>
                    }
                    <button onClick={() => setFormDialog(true)} className='flex items-center justify-center bg-purple-900 text-white font-normal text-md rounded-md py-1 px-2 gap-2'>Create new <MdAddCircle/></button>
                </div>
            </div>

            <div>
                <Todos todos={filteredTodos} />
            </div>
        </div>
    );
}

export default TodoBlock;
