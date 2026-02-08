const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electron', {
    // Send-only channels (one-way)
    send: (channel, data) => {
        const validChannels = ['window-control'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    // Receive channels (listeners)
    receive: (channel, func) => {
        const validChannels = ['window-status', 'menu-action', 'files-opened'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    // Remove listener
    removeListener: (channel, func) => {
        const validChannels = ['window-status', 'menu-action', 'files-opened'];
        if (validChannels.includes(channel)) {
            ipcRenderer.removeListener(channel, func);
        }
    },
    // Invoke channels (two-way, returns Promise)
    invoke: async (channel, ...args) => {
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
