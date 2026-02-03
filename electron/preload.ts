const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // Send-only channels (one-way)
  send: (channel: string, data: any) => {
    const validChannels = ['window-control'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  // Receive channels (listeners)
  receive: (channel: string, func: Function) => {
    const validChannels = ['window-status', 'menu-action', 'files-opened'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  // Remove listener
  removeListener: (channel: string, func: Function) => {
    const validChannels = ['window-status', 'menu-action', 'files-opened'];
    if (validChannels.includes(channel)) {
      ipcRenderer.removeListener(channel, func);
    }
  },

  // Invoke channels (two-way, returns Promise)
  invoke: async (channel: string, ...args: any[]) => {
    const validChannels = [
      'get-app-version',
      'get-app-name',
      'get-platform',
      'show-message-box',
      'show-save-dialog',
      'show-notification',
      'save-file',
      'read-file',
    ];

    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, ...args);
    }

    throw new Error(`Invalid IPC channel: ${channel}`);
  },

  // Platform detection
  platform: process.platform,
});
