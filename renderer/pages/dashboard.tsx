import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";
// import { getPasswords } from "../services/passwords";

export default function Dashboard() {
  const [passwords, setPasswords] = useState([]);
  const router = useRouter();

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const data = await getPasswords();
  //         setPasswords(data);
  //       } catch (err) {
  //         console.error(err);
  //         router.push("/");
  //       }
  //     }

  //     fetchData();
  //   }, []);

  return (
    <div className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-cyan-400 to-light-blue-500 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="mb-4 text-4xl font-bold">Password Manager</h1>
          {/* <PasswordForm setPasswords={setPasswords} />
          <PasswordList passwords={passwords} setPasswords={setPasswords} /> */}
        </div>
      </div>
    </div>
  );
}
