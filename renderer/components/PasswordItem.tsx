import React, { MouseEventHandler, useState } from "react";

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
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editEncryptedPassword, setEditEncryptedPassword] =
    useState(encryptedPassword);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // main processへデータを送信し、sqliteレコードを更新
    // ipcRenderer.send("update-password", { passwordId, title, encryptedPassword });

    // 編集モードを終了
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-md shadow-md">
      {editing ? (
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="p-2 mb-2 border rounded-md"
          />
          <input
            value={editEncryptedPassword}
            onChange={(e) => setEditEncryptedPassword(e.target.value)}
            className="p-2 mb-2 border rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="flex-grow">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm text-gray-500">{encryptedPassword}</p>
        </div>
      )}

      {!editing && (
        <div className="flex">
          <button
            onClick={handleEdit}
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
      )}
    </div>
  );
};

export default PasswordItem;
