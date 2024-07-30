"use client";
import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { BsFilterRight } from "react-icons/bs";
import Card from "./Card";
import { IoMdAdd } from "react-icons/io";
import { useTodoContext } from "@/context/TodoProvider";
const Coloumn = ({ title, todo, id, status }) => {
  const { setInitialFormData, setFormDialog } = useTodoContext();

  const handleAdd = async () => {
    const data = { status: status };
    setInitialFormData(data);
    setFormDialog(true);
  };

  return (
    <div className="flex-1 h-full min-w-52">
      <div className="text-gray-700 flex items-center justify-between text-md font-medium sticky top-0 bg-white pt-1 pb-3">
        <h1 className= "  whitespace-nowrap ">{title}</h1>
        <BsFilterRight className="text-2xl" />
      </div>
      <div className="h-full ">
        <Droppable droppableId={id}>
          {(provided) => (
            <div
              className="h-full column1 column "
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todo.map((t, index) => (
                <Card
                  key={t._id}
                  title={t.title}
                  description={t.description}
                  priority={t.priority}
                  deadline={t.deadline}
                  status={t.status}
                  todoId={t._id}
                  updatedAt={t.updatedAt}
                  index={index}
                />
              ))}

              {provided.placeholder}
              <div>
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-between p-2 text-sm active:scale-95 hover:bg-gray-950 duration-150 bg-gray-900 w-full rounded-md text-gray-200"
                >
                  Add New <IoMdAdd className="text-xl" />{" "}
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Coloumn;
