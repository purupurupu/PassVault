import React, { useEffect, useState } from "react";
import PasswordItem from "./PasswordItem";

const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    // Fetch the list of passwords and update the state
  }, []);

  return (
    <div className="space-y-4">
      {passwords.map((password) => (
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
