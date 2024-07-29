"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdResize } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { LuLoader } from "react-icons/lu";
import { MdLowPriority } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { useTodoContext } from "@/context/TodoProvider";

const TodoForm = ({ data }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const { formDialog, setFormDialog } = useTodoContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const setrowDataValues = () => {
    setValue("title", data.title);
    setValue("deadline", new Date(data.deadline).toISOString().substring(0, 10));
    setValue("priority", data.priority);
    setValue("status", data.status);
    setValue("description", data.description);
  };

  useEffect(() => {
    if (data) setrowDataValues();
  }, [data, setValue]);

  useEffect(() => {
    if (formDialog) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 200); 
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [formDialog]);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    isVisible && (
      <div className={`fixed inset-0 z-30 overflow-y-auto overflow-x-hidden`}>
        <div
          className={`fixed inset-0 w-full ${isAnimating ? "opacity-60":"opacity-0"} duration-200  transform h-full bg-black `}
          onClick={() => setFormDialog(false)}
        ></div>
        <div className="flex flex-col items-end min-h-screen">
          <div
            className={`relative transform w-full max-w-xl duration-300 p-4 px-6 h-screen bg-white rounded-sm shadow-lg ${
              isAnimating ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="mx-auto py-3 space-y-3">
              <div className="flex items-center text-gray-700 justify-between mb-10">
                <div className="flex items-center gap-4">
                  <IoCloseSharp
                    onClick={() => setFormDialog(false)}
                    className="text-2xl cursor-pointer"
                  />
                  <IoMdResize className="text-lg cursor-pointer" />
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <button className=" bg-input-bg/50 px-3 py-1 flex items-center gap-2 justify-center">
                    Share <CiShare2 className="text-xl" />
                  </button>
                  <button className=" bg-input-bg/50 px-3 py-1 flex items-center justify-center gap-2">
                    Favorite <CiStar className="text-xl" />{" "}
                  </button>
                </div>
              </div>

              <form className="border-b pb-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 flex flex-col">
                  <input
                    type="text"
                    placeholder="Title"
                    className={`mt-1 ${
                      errors.title ? "border-b border-b-red-500" : "border-none"
                    } block text-4xl w-full outline-none `}
                    {...register("title", { required: true })}
                  />
                </div>
                <div className="mb-4 items-center">
                  <div className="flex items-center">
                    <label className="text-gray-500 font-medium flex items-center w-1/3 gap-4">
                      <LuLoader className="text-black text-xl" />
                      Status
                    </label>

                    <select
                      className="mt-1 block w-auto outline-none p-2 sm:text-sm text-gray-400 font-medium"
                      {...register("status", { required: true })}
                    >
                      <option value="">Not selected</option>
                      <option value="Todo">Todo</option>
                      <option value="InProgress">In Progress</option>
                      <option value="UnderReview">Under Review</option>
                      <option value="Finished">Finished</option>
                    </select>
                  </div>

                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">
                      Status is required.
                    </p>
                  )}
                </div>

                <div className="mb-4 flex items-center">
                  <label className="text-gray-500 font-medium flex items-center w-1/3 gap-4">
                    <MdLowPriority className="text-gray-700 text-xl" />
                    Priority
                  </label>
                  <select
                    className="mt-1 block w-auto outline-none p-2 sm:text-sm text-gray-400 font-medium"
                    {...register("priority")}
                  >
                    <option value="">Not selected</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div className="mb-4 flex items-center">
                  <label className="text-gray-500 font-medium flex items-center w-1/3 gap-4">
                    <LuPencil className="text-gray-700 text-xl" />
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="Not selected"
                    className="mt-1 block w-auto outline-none p-2 sm:text-sm"
                    {...register("description")}
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label className="text-gray-500 font-medium flex items-center w-1/3 gap-4">
                    <RiCalendarScheduleLine className="text-gray-700 text-xl" />
                    Deadline
                  </label>
                  <input
                    type="date"
                    placeholder="Not selected"
                    className="mt-1 block relative text-gray-400 w-auto outline-none p-2 sm:text-sm"
                    {...register("deadline")}
                  />
                </div>

                <div className="flex">
                  <button
                    type="submit"
                    className="mr-4 border w-full border-slate-500 md:px-8 px-5 py-2 rounded-sm"
                  >
                    Save
                  </button>
                  {/* <button
                    type="submit"
                    className="font-medium flex items-center gap-6 rounded-sm"
                  >
                   <IoMdAdd/>  Add custom property
                  </button> */}
                </div>
              </form>
              <div>
                <p className="text-sm mt-6 text-gray-400">
                  Start writing, or drag your own files here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TodoForm;
