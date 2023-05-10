import React, { useEffect, useState } from "react";
import PasswordItem from "./PasswordItem";

const PasswordList: any = (props: any) => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    // Fetch the list of passwords and update the state
  }, [props.passwordList]);

  // console.log(props);
  // TODO first render, props.userId is undefined
  // TODO second render, props.userId is defined

  return (
    <div className="space-y-4">
      {props.passwordList.map((password) => (
        <PasswordItem
          key={password.id}
          title={password.title}
          encryptedPassword={password.encryptedPassword}
          onDelete={() => {}}
          onEdit={() => {}}
        />
      ))}
    </div>
  );
};

export default PasswordList;
