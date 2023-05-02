import React, { useEffect, useState } from "react";
import PasswordItem from "./PasswordItem";

const PasswordList: any = (props) => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    // Fetch the list of passwords and update the state
  }, []);

  return (
    <div className="space-y-4">
      {props.passwords.map((password) => (
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
