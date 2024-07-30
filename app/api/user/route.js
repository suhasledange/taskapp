import { getDataFromToken } from "@/lib/getDataFromToken";
import User from "@/models/user.model";
import { NextResponse } from "next/server";


export async function GET(req,res){

    try {
       
        const userId = await getDataFromToken(req);

        const user = await User.findById(userId).select("-password");

        return NextResponse.json({
            message:"User found",
            status:200,
            data:user
        })

    } catch (error) {
        return NextResponse.json({ error: error.message},
            {status: 400});
    }
    
}