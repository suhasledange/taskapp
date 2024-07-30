'use client'
import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Coloumn from "./Coloumn";
import axios from "axios";
import { useTodoContext } from "@/context/TodoProvider";

const Todos = ({todos}) => {

  const [todo,setTodo] = useState([])
  const [inProgress,setInProgress] = useState([])
  const [underReview,setUnderReview] = useState([])
  const [finished,setFinished] = useState([])

  const { fetchUserTodo,userData } =
    useTodoContext();
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

  const handleDragEnd = async (result)=>{
    
    const {destination,source,draggableId} = result
    if(destination?.droppableId === source?.droppableId) return;
    
    if (userData && userData?._id)
    try {

      const data = {
        status:destination.droppableId
      }
      const res = await axios.patch(`/api/todo/${draggableId}`,{data})
      fetchUserTodo(userData._id);

    } catch (error) {
      console.log("Error changing status",error)
    }


  }

  return (
    <div className="bg-white w-full h-[64vh] p-3 py-2 ">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex w-full items-center gap-5 scroll-none overflow-x-auto overflow-y-hidden h-full">
          <Coloumn todo={todo} title="To Do" id="Todo" status="Todo"/>
          <Coloumn todo={inProgress} title="In Progress" id="InProgress" status="InProgress"/>
          <Coloumn todo={underReview} title="Under review" id="UnderReview" status="UnderReview"/>
          <Coloumn todo={finished} title="Finished" id="Finished" status="Finished"/>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Todos;
