// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";

import { AppDataSource } from "./data-source";
import "reflect-metadata";

import { userRegister } from "./services/authService";

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
ipcMain.on("user-register", async (event, email, password) => {
  const data = await userRegister(email, password);
  if (data) {
    console.log(data);
  }

  event.reply("user-register-response", data);
});
