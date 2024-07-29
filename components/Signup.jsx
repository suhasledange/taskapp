import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
const Signup = ({ setDialog }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [eye,setEye] = useState('password')

  const router = useRouter();
  const onSubmit = async (data) => {
    console.log(data);
    router.push('/dashboard')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-6">

      <div className="flex flex-col space-y-4">

      <div className="space-y-2">
          <input
            placeholder="Full name"
            type="text"
            id="fullname"
            {...register("fullname", { required: true })}
            className="mt-1 p-2 bg-input-bg rounded-md outline-btn/50 text-black border-gray-300 w-full"
          />
          {errors.fullname?.type === "required" && (
            <p role="alert" className="text-sm text-red-800 font-light">
              Full Name is required
            </p>
          )}
        </div>

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
            Sign Up
          </button>
        
      </div>
      <div className="text-center">
            <p className="text-sm">Already have an account <span onClick={()=>setDialog('login')} className="text-btn cursor-pointer">Log in.</span></p>
        </div>
    </form>
  );
};

export default Signup;
