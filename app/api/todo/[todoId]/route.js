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

export async function PATCH(req,params){

    try {
        const id = params.params.todoId;
        const {data} = await req.json()
        const updatedTodo = await Todo.findByIdAndUpdate(id,data,{new:true});

        if (!updatedTodo) {
            return NextResponse.json({
                message: "Todo not found",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Todo updated successfully",
            success: true,
            updatedTodo
        });

    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})

    }
}