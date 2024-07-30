import dbConnect from '@/lib/dbConnect';
import Todo from '@/models/todo.model';
import axios from 'axios';
import { NextResponse } from 'next/server';


dbConnect()

export async function POST(req,res){


        try {
                const {
                        title,
                        description, 
                        status,
                        priority,
                        deadline,
                        owner
                
                } = await req.json()


                const newTodo = new Todo({
                     title,
                     description, 
                     status: status === "" ? "Todo" : status,
                     priority,
                     deadline,
                     owner
                })
        
                const savedTodo = await newTodo.save()
        
                return NextResponse.json({
                    message: "Todo created successfully",
                    success: true,
                    savedTodo
                })
        
            } catch (error) {
                return NextResponse.json({error: error}, {status: 500})
        
            }

}