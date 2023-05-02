// export const createPassword = async (
//   userId: number,
//   title: string,
//   password: string
// ) => {
//   try {
//     const response = await axios.post("/api/passwords/create", {
//       userId,
//       title,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.error);
//   }
// };

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

export const ipcCreatePassword = async (userId) => {
  return new Promise((resolve, reject) => {
    window.ipcRenderer.send("create-password", { userId });

    // Listen for the response from main process
    window.ipcRenderer.once(
      "create-password-response",
      (event, receivedData) => {
        resolve(receivedData);
      }
    );
  });
};
