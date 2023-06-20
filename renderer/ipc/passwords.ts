export const ipcGetPasswordList = async (userId) => {
  return new Promise((resolve, reject) => {
    // console.log("ipcGetAllPasswords");

    window.ipcRenderer.send("get-all-passwords", { userId });

    // Listen for the response from main process
    window.ipcRenderer.once(
      "get-all-passwords-response",
      (event, receivedData) => {
        resolve(receivedData);
      }
    );
  });
};

export const ipcCreatePassword = async (
  userId: number,
  title: string,
  password: string
) => {
  return new Promise((resolve, reject) => {
    console.log("ipcCreatePassword");
    console.log(userId, title, password);

    window.ipcRenderer.send("create-password", { userId, title, password });

    // Listen for the response from main process
    window.ipcRenderer.once(
      "create-password-response",
      (event, receivedData) => {
        console.log("create-password-response");
        console.log(receivedData);
        resolve(receivedData);
      }
    );
  });
};

export const ipcDeletePassword = async (passwordId: number) => {
  return new Promise((resolve, reject) => {
    console.log("ipcDeletePassword");
    console.log(passwordId);

    window.ipcRenderer.send("delete-password", { passwordId });

    // Listen for the response from main process
    window.ipcRenderer.once(
      "delete-password-response",
      (event, receivedData) => {
        console.log("delete-password-response");
        console.log(receivedData);
        resolve(receivedData);
      }
    );
  });
};

// update password
export const ipcUpdatePassword = async (
  passwordId: number,
  title: string,
  newPassword: string
) => {
  return new Promise((resolve, reject) => {
    console.log("ipcUpdatePassword");
    console.log(passwordId);

    window.ipcRenderer.send("update-password", {
      passwordId,
      title,
      newPassword,
    });

    // Listen for the response from main process
    window.ipcRenderer.once(
      "update-password-response",
      (event, receivedData) => {
        console.log("update-password-response");
        console.log(receivedData);
        resolve(receivedData);
      }
    );
  });
};
