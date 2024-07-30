'use client'
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { IoTimeOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { findDays } from "@/lib/findDays";
import axios from "axios";
import { useTodoContext } from "@/context/TodoProvider";

const Card = ({ title, description, priority, deadline,status,todoId ,updatedAt,index}) => {

  const {fetchUserTodo,userData,setInitialFormData,setFormDialog} = useTodoContext()

  function bgcolorChange(props) {
    return props.isDragging
      ? "lightblue"
      : props.isDraggable
      ? props.isBacking
        ? "#F2D7D5"
        : "#DCDCDC"
      : props.isBacking
      ? "#F2D7D5"
      : "#fffada";
  }

  const handleDelete = async()=>{
      
    if(!confirm("Do you want to delete ?")) return 

    try {
        
        const res = await axios.delete(`/api/todo/${todoId}`)
        if(res.status === 200) fetchUserTodo(userData._id)
        
      } catch (error) {
          console.log("Error deleting todo",error)
      }

  }
  const handleEdit = async()=>{
        const data = { title, description, priority, deadline,status,todoId}
        setInitialFormData(data);
        setFormDialog(true)
  }

  return (
      <Draggable draggableId={todoId} index={index}>
        {
          (provided)=>(

        <div 
          {...provided.draggableProps}
          {...provided.dragHandleProps}    
          ref={provided.innerRef}
        className="bg-gray-100 rounded-md mb-3 p-3">
          <h1 className="text-md font-medium text-gray-700 mb-1">{title}</h1>
          <p className="text-gray-700 text-sm mb-2">{description}</p>
         <div className="flex items-center justify-start mb-4">
          <div
            className={`${
              priority === "Urgent"
                ? "bg-red-500"
                : priority === "Medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            } p-1 text-sm rounded-md text-gray-200`}
          >
            {priority}
          </div>
          </div>
          <p className="text-gray-800 text-sm font-medium flex items-center justify-start text-md gap-1 mb-3"><IoTimeOutline className="text-xl text-black"/> {deadline}</p>
          <div className="text-sm flex items-center justify-between text-gray-500 font-medium">
            <p>
              {findDays(updatedAt)}
            </p>
            <div className="flex items-center justify-end gap-4">
              <LuPencil onClick={handleEdit} className="text-lg cursor-pointer hover:text-gray-800 duration-200"/>
              <MdDelete onClick={handleDelete} className="text-xl cursor-pointer hover:text-gray-800 duration-200"/>
            </div>

          </div>
        </div>

)
}
      </Draggable>

  );
};

export default Card;
