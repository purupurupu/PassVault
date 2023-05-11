import React, { MouseEventHandler } from "react";

interface PasswordItemProps {
  passwordId: number;
  title: string;
  encryptedPassword: string;
  onDelete: (passwordId: number) => void;
  onEdit: () => void;
}

const PasswordItem: React.FC<PasswordItemProps> = ({
  passwordId,
  title,
  encryptedPassword,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-md shadow-md">
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{encryptedPassword}</p>
      </div>

      <div>
        <button
          onClick={onEdit}
          className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(passwordId)}
          className="px-2 py-1 text-white bg-red-500 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PasswordItem;
