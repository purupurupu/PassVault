// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";

import { AppDataSource } from "./data-source";
import "reflect-metadata";

import { userLogin, userRegister } from "./services/authService";
import {
  createPassword,
  deletePassword,
  getPasswordList,
  updatePassword,
} from "./services/passwordService";

// Prepare the renderer once the app is ready

app.on("ready", async () => {
  AppDataSource.initialize()
    .then(async () => {
      console.log("Yeahhhhhhhhhhhhhhhhhhhhhhh!!!!!!!!!!!!!!!!.");
    })
    .catch((error) => console.log(error));

  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // def is false
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });
  mainWindow.loadURL(url);
  mainWindow.webContents.openDevTools();
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});

// Listen for IPC requests from renderer process
ipcMain.on(
  "user-login",
  async (event: IpcMainEvent, data: { email: string; password: string }) => {
    const res = await userLogin(data.email, data.password);
    event.reply("user-login-response", res);
  }
);

ipcMain.on(
  "user-register",
  async (event: IpcMainEvent, data: { email: string; password: string }) => {
    const res = await userRegister(data.email, data.password);
    event.reply("user-register-response", res);
  }
);

ipcMain.on(
  "get-all-passwords",
  async (event: IpcMainEvent, data: { userId: number }) => {
    const res = await getPasswordList(data.userId);
    event.reply("get-all-passwords-response", res);
  }
);

ipcMain.on(
  "create-password",
  async (
    event: IpcMainEvent,
    data: { userId: number; title: string; password: string }
  ) => {
    const res = await createPassword(data.userId, data.title, data.password);
    event.reply("create-password-response", res);
  }
);

ipcMain.on(
  "delete-password",
  async (event: IpcMainEvent, data: { passwordId: number }) => {
    const res = await deletePassword(data.passwordId);
    event.reply("delete-password-response", res);
  }
);

ipcMain.on(
  "update-password",
  async (
    event: IpcMainEvent,
    data: { passwordId: number; title: string; newPassword: string }
  ) => {
    const res = await updatePassword(
      data.passwordId,
      data.title,
      data.newPassword
    );
    event.reply("update-password-response", res);
  }
);
