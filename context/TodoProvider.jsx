'use client'
import {  createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {

  const [data,setData] = useState([]);
  const [formDialog,setFormDialog] = useState(false);
  const [loading,setLoading] = useState(true);
    
    const fetchTodos = async()=>{

        try {
    
          const res = await fetch('/api/todo');
          const data = await res.json();
          return data.todos
    
        } catch (error) {
          console.log("Error fetching Todos",error)
        }
    
      }

    const addTodos = async(data)=>{
            try {
                const response = await fetch('/api/Todo', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  });

                  return response.json();
            } catch (error) {
                console.log("error adding Todo",error);
            }
    }

    const updateTodos = async (id, TodoData) => {

        const response = await fetch(`/api/Todo/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(TodoData),
        });
        return await response.json();

    };

    const deleteTodo = async (id) => {
      
        try {
            const response = await fetch(`/api/Todo/${id}`, {
                method: 'DELETE',
            });
            return response.json();
        } catch (error) {
            console.log("Error deleting Todo", error);
        }

        
    };


    const fetchData = async()=>{

      try {
        setLoading(true);
        const res = await fetchTodos();
        setData(res)
        setLoading(false);
      } catch (error) {
        console.log("Error fetching Todos",error)
      }
  
    }
    useEffect(()=>{
  
      fetchData();
  
    },[])
  
   
    return (
        <TodoContext.Provider value={{ formDialog,setFormDialog,loading,fetchTodos,addTodos,updateTodos,deleteTodo,data,setData }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => useContext(TodoContext)