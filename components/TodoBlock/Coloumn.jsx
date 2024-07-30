import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { BsFilterRight } from "react-icons/bs";
import Card from "./Card";
const Coloumn = ({ title, todo, id }) => {

    console.log(todo)

  return (
    <div className="column h-full">
      <div className="text-gray-700 flex items-center justify-between text-lg font-medium sticky top-0 bg-white pt-1 pb-3">
        <h1>{title}</h1>
        <BsFilterRight className="text-3xl" />
      </div>
      <div>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
                {
                    todo.map(t=>(
                    <Card
                    key={t.id}
                    title="Implement User Authentication"
                    description={t.todo}
                    priority="Urgent"
                    date="2024-08-15"
                    id={124}
                    index={t.userId}
                />
            ))

            }

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Coloumn;
