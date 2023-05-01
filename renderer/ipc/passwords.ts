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

export const getPasswords = async (id) => {
  return new Promise((resolve, reject) => {
    window.ipcRenderer.send("get-passwords", { id });

    // Listen for the response from main process
    window.ipcRenderer.once("get-passwords-response", (event, receivedData) => {
      resolve(receivedData);
    });
  });
};

export const createPassword = async (id) => {
  return new Promise((resolve, reject) => {
    window.ipcRenderer.send("user-login", { id });

    // Listen for the response from main process
    window.ipcRenderer.once("user-login-response", (event, receivedData) => {
      console.log(receivedData);

      resolve(receivedData);
    });
  });
};
