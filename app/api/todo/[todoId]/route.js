import Todo from "@/models/todo.model";
import { NextRequest,NextResponse } from "next/server";


export async function DELETE(req,params){
    const id = params.params.todoId;
    try {
       
        const res = await Todo.findByIdAndDelete({_id:id})
        return NextResponse.json({
            status: 200,
            data:res
        });

    } catch (error) {
        return NextResponse.json({ error: error.message},
            {status: 400});
    }

}