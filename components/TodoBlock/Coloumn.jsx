import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { BsFilterRight } from "react-icons/bs";
import Card from "./Card";
const Coloumn = ({ title, todo, id }) => {

  return (
    <div className="flex-1 column h-full overflow-scroll">
      <div className="text-gray-700 flex items-center justify-between text-md font-medium sticky top-0 bg-white pt-1 pb-3">
        <h1>{title}</h1>
        <BsFilterRight className="text-2xl" />
      </div>
      <div className="">
                {
                    todo.map(t=>(
                    <Card
                    key={t._id}
                    title={t.title}
                    description={t.description}
                    priority={t.priority}
                    deadline={t.deadline}
                    todoId={t._id}
                    updatedAt={t.updatedAt}
                />
            ))

            }

      </div>
    </div>
  );
};

export default Coloumn;
