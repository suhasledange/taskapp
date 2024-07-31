'use client'
import axios from 'axios';
import {  createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {

  const [todoData,setTodoData] = useState([]);
  const [userData,setUserData] = useState([]);
  const [formDialog,setFormDialog] = useState(false);
  const [Todoloading,setTodoLoading] = useState(true);
  const [initialFormData,setInitialFormData] = useState(null);

  const fetchUserData = async ()=>{
    try {
      
      const res = await axios.get("/api/user")
      setUserData(res.data.data)

    } catch (error) {
        console.log("Error fetching user data",error)
    }
  }

  const fetchUserTodo = async(id)=>{

    try {

      const res = await axios.get(`/api/user/${id}`)

      if(res.data.status === 200){
        setTodoData(res.data.data)
        setTodoLoading(false)
      }


    } catch (error) {
      console.log("Error fetching user todos")
      setTodoData(false)

    }

  }

   
    return (
        <TodoContext.Provider value={
          {
            fetchUserTodo,
            fetchUserData,
            userData,
            setUserData,
            initialFormData,
            setInitialFormData,
            setFormDialog,
            formDialog,
            Todoloading,
            setTodoLoading,
            todoData,
            setTodoData
             }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => useContext(TodoContext)