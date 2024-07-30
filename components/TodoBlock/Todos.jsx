'use client'
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Coloumn from "./Coloumn";

const Todos = ({todos}) => {

  const [todo,setTodo] = useState([])
  const [inProgress,setInProgress] = useState([])
  const [underReview,setUnderReview] = useState([])
  const [finished,setFinished] = useState([])


  useEffect(()=>{

    const todo =  todos.filter(todo => todo.status.includes('Todo'))
    const review =  todos.filter(todo => todo.status.includes('UnderReview'))
    const progress =  todos.filter(todo => todo.status.includes('InProgress'))
    const finish =  todos.filter(todo => todo.status.includes('Finished'))

    setTodo(todo) 
    setInProgress(progress)
    setUnderReview(review)
    setFinished(finish)

  },[todos])

  const handleDargEnd = async (result)=>{

    const {destination,source,draggableId} = result

    console.log(destination," ",source," ",draggableId)

  }

  return (
    <div className="bg-white w-full h-[calc(63vh)] p-3 py-2">
        <div className="flex w-full items-center gap-5 h-full">
          <Coloumn todo={todo} title="To Do" id={"1"}/>
          <Coloumn todo={inProgress} title="In Progress" id={"1"}/>
          <Coloumn todo={underReview} title="Under review" id={"3"}/>
          <Coloumn todo={finished} title="Finished" id={"2"}/>
        </div>
    </div>
  );
};

export default Todos;
