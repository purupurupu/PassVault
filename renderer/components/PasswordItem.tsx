import React from "react";

interface PasswordItemProps {
  title: string;
  encryptedPassword: string;
  onDelete: () => void;
  onEdit: () => void;
}

const PasswordItem: React.FC<PasswordItemProps> = ({
  title,
  encryptedPassword,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md flex justify-between items-center mb-4">
      <div>
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-gray-500">{encryptedPassword}</p>
      </div>

      <div>
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white py-1 px-2 mr-2 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white py-1 px-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PasswordItem;
