import { ipcRenderer, contextBridge } from "electron";

// Define a safe subset of ipcRenderer to expose to the renderer process
const ipcRendererSubset = {
  send: (channel: string, data: any) => {
    ipcRenderer.send(channel, data);
  },
  once: (
    channel: string,
    callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ) => {
    ipcRenderer.once(channel, callback);
  },
  // Add any other ipcRenderer methods you need to expose
};

contextBridge.exposeInMainWorld("ipcRenderer", ipcRendererSubset);

declare global {
  interface Window {
    ipcRenderer: {
      send: (channel: string, data: any) => void;
      once: (
        channel: string,
        callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
      ) => void;
      // Add any other ipcRenderer methods you need to expose
    };
  }
}
