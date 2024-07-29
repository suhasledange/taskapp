import axios from 'axios';
import { NextResponse } from 'next/server';

const TODO_API_URL = 'https://dummyjson.com/todos';

export async function GET(){

        const response = await axios.get(TODO_API_URL);
        return NextResponse.json({todos:response.data.todos})

}