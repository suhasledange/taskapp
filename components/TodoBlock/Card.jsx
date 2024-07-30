import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { IoTimeOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { LuPencil } from "react-icons/lu";

const Card = ({ title, description, priority, date, index,id }) => {
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

  return (
    <Draggable draggableId={`${id}`} key={id} index={index}>
      {(provided, snapshot) => (
        <div className="bg-gray-100 rounded-md my-3 p-3">
          <h1 className="text-lg font-medium text-gray-700 mb-1">{title}</h1>
          <p className="text-gray-700 text-sm mb-2">{description}</p>
         <div className="flex items-center justify-start mb-4">
          <div
            className={`${
              priority === "Urgent"
                ? "bg-red-500"
                : priority === "Medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            } p-1 text-sm font-medium rounded-md text-gray-200`}
          >
            {priority}
          </div>
          </div>
          <p className="text-gray-800 text-md font-medium flex items-center justify-start text-md gap-1 mb-3"><IoTimeOutline className="text-2xl text-black"/> {date}</p>
          <div className="text-sm flex items-center justify-between text-gray-500 font-medium">
            <p>
              1 hr ago
            </p>
            <div className="flex items-center justify-end gap-4">
              <LuPencil className="text-xl cursor-pointer hover:text-gray-800 duration-200"/>
              <MdDelete className="text-2xl cursor-pointer hover:text-gray-800 duration-200"/>
            </div>

          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
