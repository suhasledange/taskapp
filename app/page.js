"use client";

import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useState } from "react";

export default function Home() {
  const [dialog, setDialog] = useState("login");

  return (
    <>
      <div className="fixed inset-0 z-50 bg-gradient">
        <div className="h-full flex max-w-xl mx-auto items-center justify-center">
          <div className="bg-white p-12 w-full rounded-md -translate-y-16">
            <h1 className="text-center text-2xl font-semibold tracking-widest mb-5 mt-2 text-gray-800">
              Welcome to <span className="text-purple-600">Workflo</span>!
            </h1>

            {dialog === "login" && <Login setDialog={setDialog} />}
            {dialog === "signup" && <Signup setDialog={setDialog} />}
          </div>
        </div>
      </div>
    </>
  );
}
