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

export const ipcCreatePassword = async (userId, title, password) => {
  return new Promise((resolve, reject) => {
    console.log("ipcCreatePassword");

    window.ipcRenderer.send("create-password", { userId, title, password });

    // Listen for the response from main process
    window.ipcRenderer.once(
      "create-password-response",
      (event, receivedData) => {
        console.log("create-password-response");

        resolve(receivedData);
      }
    );
  });
};
