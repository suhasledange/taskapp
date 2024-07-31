import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/todo.model";
import { NextRequest,NextResponse } from "next/server";


await dbConnect()

export async function GET(req,params){


    const id = params.params.userID;

    try {
       
        const todos = await Todo.find({ owner: id }).select("-owner");
        return NextResponse.json({
            status: 200,
            data: todos
        });

    } catch (error) {
        return NextResponse.json({ error: error.message},
            {status: 400});
    }

}