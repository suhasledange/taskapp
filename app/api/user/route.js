import { getDataFromToken } from "@/lib/getDataFromToken";
import User from "@/models/user.model";
import { NextResponse } from "next/server";


export async function GET(req,res){

    try {
       
        const email = await getDataFromToken(req);
        const user = await User.findOne({email}).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

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