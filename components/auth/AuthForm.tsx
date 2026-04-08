"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === "login" ? "Welcome Back" : "Create Account"}
      </h2>

      {mode === "login" ? <LoginForm /> : <RegisterForm />}

      <div className="text-center mt-6 text-sm">
        {mode === "login" ? "No account?" : "Already have an account?"}
        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="ml-2 text-[#6b4f3b] font-semibold"
        >
          {mode === "login" ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}