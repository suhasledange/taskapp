import dbConnect from "@/lib/dbConnect";
import { getDataFromToken } from "@/lib/getDataFromToken";
import User from "@/models/user.model";
import { NextResponse } from "next/server";


export async function GET(req,res){
    await dbConnect()

    try {
       
        const email = await getDataFromToken(req);
        const user = await User.findOne({email}).select("-password");

        if (!user) {
            const response = NextResponse.json({ error: "User not found" }, { status: 404 });

            response.cookies.set("token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                expires: new Date(0),
                path: "/",              
                domain: "todonext-app.vercel.app" 
              });
          
           
            return response;

        }

        return NextResponse.json({
            message:"User found",
            status:200,
            data:user
        })

    } catch (error) {
        const response = NextResponse.json({ error: error.message }, { status: 401 });
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0),
            path: "/",              
            domain: "todonext-app.vercel.app" 
          });
      
        return response;
    }
    
}