'use client'
import axios from 'axios';
import {  createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {

  const [todoData,setTodoData] = useState([]);
  const [userData,setUserData] = useState([]);
  const [formDialog,setFormDialog] = useState(false);
  const [loading,setLoading] = useState(true);
  const [initialFormData,setInitialFormData] = useState(null);

  const fetchUserData = async ()=>{
    try {
      
      const res = await axios.get("/api/user")
      if(res.status === 200){
        setUserData(res.data.data)
      }

    } catch (error) {
        console.log("Error fetching user data",error)
    }
  }

  const fetchUserTodo = async(id)=>{

    try {

      const res = await axios.get(`/api/user/${id}`)

      if(res.data.status === 200){
        setTodoData(res.data.data)
      }


    } catch (error) {
      console.log("Error fetching user todos")
    }

  }

   
    return (
        <TodoContext.Provider value={{fetchUserTodo,fetchUserData,userData, initialFormData,formDialog,setFormDialog,loading,todoData,setTodoData }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => useContext(TodoContext)