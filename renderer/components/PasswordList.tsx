import React, { useEffect, useState } from "react";
import PasswordItem from "./PasswordItem";
import { ipcDeletePassword } from "../ipc/passwords";

const PasswordList: any = (props: any) => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    // Fetch the list of passwords and update the state
  }, [props.passwordList]);

  const handleDelete = async (passwordId: number) => {
    const result = await ipcDeletePassword(passwordId);
    if (result) {
      // Remove the password from the state
      setPasswords(passwords.filter((password) => password.id !== passwordId));
    } else {
      console.error("Failed to delete password");
    }
  };

  // const handleEdit = async (passwordId: number, newPassword: string) => {
  //   const result = await updatePassword(passwordId, newPassword);
  //   if (result) {
  //     // Update the password in the state
  //     setPasswords(
  //       passwords.map((password) =>
  //         password.id === passwordId
  //           ? { ...password, encryptedPassword: newPassword }
  //           : password
  //       )
  //     );
  //   } else {
  //     console.error("Failed to update password");
  //   }
  // };

  console.log(props.passwordList);

  return (
    <div className="space-y-4">
      {props.passwordList.length === 0 ? (
        <p className="text-lg font-semibold">No passwords found</p>
      ) : (
        props.passwordList.map((password) => (
          <PasswordItem
            key={password.id}
            passwordId={password.id}
            title={password.title}
            encryptedPassword={password.encryptedPassword}
            onDelete={handleDelete}
            onEdit={() => {}}
          />
        ))
      )}
    </div>
  );
};

export default PasswordList;
