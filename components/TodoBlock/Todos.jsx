'use client'
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Coloumn from "./Coloumn";

const Todos = ({todos}) => {

  const [complete,setComplete] = useState([])
  const [inComplete,setInComplete] = useState([])


  useEffect(()=>{
  
    setComplete(todos.filter((todo)=> todo.completed))
    setInComplete(todos.filter((todo)=> !todo.completed))

  },[])


  const handleDargEnd = async (result)=>{

    const {destination,source,draggableId} = result

    console.log(destination," ",source," ",draggableId)

  }

  return (
    <div className="bg-white w-full h-[calc(63vh)] p-3 py-2">
      <DragDropContext onDragEnd={handleDargEnd}>
        <div className="flex w-full items-center gap-5 h-full">
          {/* <Coloumn title="To Do" id={"1"}/> */}
          <Coloumn todo={complete} title="In progress" id={"1"}/>
          {/* <Coloumn title="Under review" id={"3"}/> */}
          <Coloumn todo={inComplete} title="Finished" id={"2"}/>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Todos;
