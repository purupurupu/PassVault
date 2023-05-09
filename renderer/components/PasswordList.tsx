import React, { useEffect, useState } from "react";
import PasswordItem from "./PasswordItem";

const PasswordList: any = (props: { passwordList: any[] }) => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    // Fetch the list of passwords and update the state
  }, []);

  return (
    props.passwordList.length === 0 && (
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
    )
  );
};

export default PasswordList;
