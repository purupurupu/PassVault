export const register = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    window.ipcRenderer.send("user-register", { email, password });
    // console.log(email, password); this line is OK

    // Listen for the response from main process
    window.ipcRenderer.once("user-register-response", (event, receivedData) => {
      resolve(receivedData);
    });
  });
};
