import React, { useState } from "react";
import { login, register } from "../ipc/users";
import { log } from "console";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const LoginForm = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { user, setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = props.isLoginForm
      ? await login(email, password)
      : await register(email, password);

    // console.log(result);

    if (result) {
      setUser(result);
      // Link to the dashboard
      console.log("Login or Registered");
      window.location.href = "/dashboard";
    } else {
      setErrorMessage(
        "Failed to login or register. Please check your email and password."
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        {errorMessage && (
          <div className="px-4 py-2 mb-4 text-white bg-red-500 rounded-md shadow-md">
            {errorMessage}
          </div>
        )}
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
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
