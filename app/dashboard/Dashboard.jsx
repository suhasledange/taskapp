"use client";
import TodoForm from "@/components/Forms/TodoForm";
import Sidebar from "@/components/Sidebar";
import { useTodoContext } from "@/context/TodoProvider";
import useSyncLogout from "@/lib/useSyncLogOut";
import React, { useEffect, useState } from "react";

const Dashboard = ({ children }) => {
  const { fetchUserData, fetchUserTodo, userData } = useTodoContext();

  useEffect(() => {
    fetchUserData();
  }, []);

  useSyncLogout();

  useEffect(() => {
    if (userData && userData._id) {
      fetchUserTodo(userData._id);
    }
  }, [userData]);

  return (
    <div className="flex lg:flex-row flex-col md:flex-col h-full overflow-hidden relative">
      
      <div className="transform z-40 bg-white px-2 border lg:h-screen shadow-sm lg:w-1/6 left-100 top-0">
        <Sidebar />
      </div>

      <div className="w-full h-screen overflow-auto bg-gray-100 md:w-full lg:w-5/6">
        {children}
      </div>
      <TodoForm />
    </div>
  );
};

export default Dashboard;
