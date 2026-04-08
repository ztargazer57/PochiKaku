"use client";

import { useState } from "react";
import { loginSchema } from "@/lib/validation/auth";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = () => {
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
      console.log("Login Success", result.data);
    }
  };

  return (
    <div className="space-y-4">
      <input
        placeholder="Email"
        className="w-full p-3 border rounded-xl"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border rounded-xl"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}

      <button
        onClick={handleSubmit}
        className="w-full bg-[#6b4f3b] text-white py-3 rounded-xl"
      >
        Login
      </button>
    </div>
  );
}