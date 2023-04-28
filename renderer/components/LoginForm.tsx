import React, { useState } from "react";
import { register } from "../ipc/auth";
import { log } from "console";
import Link from "next/link";

const LoginForm = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call the login API and handle the response
    const result = await register(email, password);

    if (result) {
      // Link to the dashboard
      console.log("Registered");
      window.location.href = "/dashboard";
    } else {
      console.log("Failed to register");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
        >
          {props.isLoginForm ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
