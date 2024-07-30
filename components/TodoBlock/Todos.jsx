"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Coloumn from "./Coloumn";
import axios from "axios";
import { useTodoContext } from "@/context/TodoProvider";
import { LinearProgress } from "@mui/material";

const Todos = ({ todos }) => {
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [underReview, setUnderReview] = useState([]);
  const [finished, setFinished] = useState([]);

  const { fetchUserTodo, userData, Todoloading } =
    useTodoContext();

  useEffect(() => {
    const todo = todos.filter((todo) => todo.status.includes("Todo"));
    const review = todos.filter((todo) => todo.status.includes("UnderReview"));
    const progress = todos.filter((todo) => todo.status.includes("InProgress"));
    const finish = todos.filter((todo) => todo.status.includes("Finished"));
    setTodo(todo);
    setInProgress(progress);
    setUnderReview(review);
    setFinished(finish);
  }, [todos]);

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const item = todos.find((todo) => todo._id === draggableId);
    const newStatus = destination.droppableId;
    const newTodos = todos.map((todo) => {
      if (todo._id === draggableId) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });

    const newTodo = newTodos.filter((todo) => todo.status === "Todo");
    const newInProgress = newTodos.filter(
      (todo) => todo.status === "InProgress"
    );
    const newUnderReview = newTodos.filter(
      (todo) => todo.status === "UnderReview"
    );
    const newFinished = newTodos.filter((todo) => todo.status === "Finished");

    setTodo(newTodo);
    setInProgress(newInProgress);
    setUnderReview(newUnderReview);
    setFinished(newFinished);

    if (userData && userData?._id) {
      try {
        const data = { status: newStatus };
        await axios.patch(`/api/todo/${draggableId}`, { data });
        fetchUserTodo(userData._id);
      } catch (error) {
        console.log("Error changing status", error);
        setTodo(todos.filter((todo) => todo.status === "Todo"));
        setInProgress(todos.filter((todo) => todo.status === "InProgress"));
        setUnderReview(todos.filter((todo) => todo.status === "UnderReview"));
        setFinished(todos.filter((todo) => todo.status === "Finished"));
      }
    }
  };

  return (
    <div className="bg-white w-full h-[64vh]">
      {
        <DragDropContext onDragEnd={handleDragEnd}>
          {Todoloading ? (
            <LinearProgress
            sx={{
              height: 4,
              borderRadius: 4,
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#766ABE', 
              }
            }}
            
            />
          ) : todo.length ||
            inProgress.length ||
            underReview.length ||
            finished.length ? (
            <div className="flex w-full items-center px-3 py-2 gap-5 scroll-none overflow-x-auto overflow-y-hidden h-full">
              <Coloumn todo={todo} title="To Do" id="Todo" status="Todo" />
              <Coloumn
                todo={inProgress}
                title="In Progress"
                id="InProgress"
                status="InProgress"
              />
              <Coloumn
                todo={underReview}
                title="Under review"
                id="UnderReview"
                status="UnderReview"
              />
              <Coloumn
                todo={finished}
                title="Finished"
                id="Finished"
                status="Finished"
              />
            </div>
          ) : (
            <div className="py-2 px-3">
              <h1>No Data found</h1>
            </div>
          )}
        </DragDropContext>
      }
    </div>
  );
};

export default Todos;
