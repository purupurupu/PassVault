import React, { useEffect, useState } from "react";
import PasswordItem from "./PasswordItem";
import { ipcDeletePassword, ipcUpdatePassword } from "../ipc/passwords";

const PasswordList = (props: any) => {
  useEffect(() => {
    // Fetch the list of passwords and update the state
  }, [props.passwordList]);

  const handleDelete = async (passwordId: number) => {
    const result = await ipcDeletePassword(passwordId);
    if (result) {
      // Remove the password from the state
      props.setPasswordList(
        props.passwordList.filter((password: any) => password.id !== passwordId)
      );
    } else {
      console.error("Failed to delete password");
    }
  };

  const handleUpdate = async (
    passwordId: number,
    title: string,
    newPassword: string
  ) => {
    const result = await ipcUpdatePassword(passwordId, title, newPassword);
    if (result) {
      // Update the password in the state
      props.setPasswordList(
        props.passwordList.map((password: any) => {
          if (password.id === passwordId) {
            return {
              ...password,
              title: title,
              encryptedPassword: newPassword,
            };
          }
          return password;
        })
      );
    } else {
      console.error("Failed to update password");
    }
  };
  console.log(props.passwordList);

  return (
    <div className="space-y-4">
      {props.passwordList === null || props.passwordList === false ? (
        <p className="text-lg font-semibold">No passwords found</p>
      ) : (
        props.passwordList.map((password) => (
          <PasswordItem
            key={password.id}
            passwordId={password.id}
            title={password.title}
            encryptedPassword={password.encryptedPassword}
            onDelete={handleDelete}
            onSubmit={handleUpdate}
          />
        ))
      )}
    </div>
  );
};

export default PasswordList;
