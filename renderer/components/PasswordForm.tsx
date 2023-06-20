import React, { useState } from "react";
import { ipcCreatePassword } from "../ipc/passwords";

interface PasswordFormProps {
  id: number;
  title: string;
  encrypted_password: string;
}

const PasswordForm: any = (props: any) => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(props.userId, title, password);

    let result: any = await ipcCreatePassword(props.userId, title, password);

    props.setPasswordList((prev: any) => [
      ...prev,
      {
        id: result.id,
        title: result.title,
        encrypted_password: result.encrypted_password,
      },
    ]);
    setTitle("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        Save
      </button>
    </form>
  );
};

export default PasswordForm;
