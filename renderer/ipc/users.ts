export const register = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    window.ipcRenderer.send("user-register", { email, password });

    // Listen for the response from main process
    window.ipcRenderer.once("user-register-response", (event, receivedData) => {
      resolve(receivedData);
    });
  });
};

export const login = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    window.ipcRenderer.send("user-login", { email, password });

    // Listen for the response from main process
    window.ipcRenderer.once("user-login-response", (event, receivedData) => {
      console.log(receivedData);

      resolve(receivedData);
    });
  });
};
