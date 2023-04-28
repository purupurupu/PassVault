import { useState } from "react";
import LoginForm from "../components/LoginForm";

export default function Home() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-cyan-400 to-light-blue-500 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="mb-4 text-4xl font-bold">
            {showLoginForm ? "Login" : "Register"}
          </h1>
          <LoginForm isLoginForm={showLoginForm} />
          <button
            className="mt-4 text-cyan-600 hover:text-cyan-800"
            onClick={toggleForm}
          >
            {showLoginForm
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
