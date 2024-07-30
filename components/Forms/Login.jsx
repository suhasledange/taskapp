import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Loader from "../Loader";
import axios from "axios";
const Login = ({ setDialog }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const[eye,setEye] = useState('password');
  const [loading,setLoading] = useState(false)

  const onSubmit = async (data) => {
  
  try {
    setLoading(true)
    const res = await axios.post("/api/login",data)
    if(res.status === 200){
      router.replace("/dashboard")
      setLoading(false)
    } 

  } catch (error) {
    console.log("Login Failed",error)
    if(error.response.status === 400){
      alert("Invalid Crendentials")
    }
    setLoading(false)
  }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-6">

      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <input
            placeholder="Your email"
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="mt-1 p-2 bg-input-bg rounded-md outline-btn/50 text-black border-gray-300 w-full"
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-sm text-red-800 font-light">
              Email is required
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className=" space-y-2 relative">
            <input
              placeholder="Password"
              type={eye}
              id="password"
              {...register("password", { required: true })}
              className="mt-1 p-2 bg-input-bg rounded-md outline-btn/50 text-black border-gray-300 w-full"
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-sm text-red-800 font-light">
                Password is required
              </p>
            )}
            <div className="absolute cursor-pointer right-2 text-xl text-gray-700 top-[0.35rem]">
                { eye === 'password' && <IoMdEyeOff onClick={()=>setEye('text')}/> }
                { eye === 'text' && <IoMdEye onClick={()=>setEye('password')} /> } 
            </div>
          </div>
        </div>


          <button
            type="submit"
            className="text-lg gap-3 flex items-center justify-center bg-btn text-white p-2 rounded-md w-full hover:bg-btn/[0.9] transition duration-150"
          >
            Login {loading && <Loader/>}
          </button>
        
      </div>
      <div className="text-center">
            <p className="text-sm">Don't have an account? Create a <span onClick={()=>setDialog('signup')} className="text-btn cursor-pointer">new account.</span></p>
        </div>
    </form>
  );
};

export default Login;
