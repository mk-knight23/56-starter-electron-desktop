"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
// Enable hot reload in development
if (process.env['NODE_ENV'] === 'development') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit',
    });
}
let mainWindow = null;
let tray = null;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        titleBarStyle: 'hidden',
        backgroundColor: '#f8fafc',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
        },
    });
    // In production, load the built index.html. In dev, load localhost.
    const appUrl = process.env['NODE_ENV'] === 'development'
        ? 'http://localhost:4201'
        : `file://${path.join(__dirname, '../dist/desktop-shell/index.html')}`;
    mainWindow.loadURL(appUrl);
    // Open DevTools in development
    if (process.env['NODE_ENV'] === 'development') {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    // Notify renderer when window is maximized/unmaximized
    mainWindow.on('maximize', () => {
        mainWindow?.webContents.send('window-status', 'maximized');
    });
    mainWindow.on('unmaximize', () => {
        mainWindow?.webContents.send('window-status', 'unmaximized');
    });
}
function createMenu() {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Project',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow?.webContents.send('menu-action', 'new-project');
                    },
                },
                { type: 'separator' },
                {
                    label: 'Open...',
                    accelerator: 'CmdOrCtrl+O',
                    click: async () => {
                        const result = await electron_1.dialog.showOpenDialog(mainWindow, {
                            properties: ['openFile', 'multiSelections'],
                            filters: [
                                { name: 'All Files', extensions: ['*'] },
                                { name: 'Text Files', extensions: ['txt', 'md', 'json'] },
                            ],
                        });
                        if (!result.canceled) {
                            mainWindow?.webContents.send('files-opened', result.filePaths);
                        }
                    },
                },
                { type: 'separator' },
                { role: 'quit' },
            ],
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectAll' },
            ],
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
                { type: 'separator' },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'CmdOrCtrl+Shift+I',
                    click: () => {
                        mainWindow?.webContents.toggleDevTools();
                    },
                },
            ],
        },
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                { type: 'separator' },
                { role: 'front' },
            ],
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        mainWindow?.webContents.send('menu-action', 'about');
                    },
                },
                {
                    label: 'Documentation',
                    click: () => {
                        mainWindow?.webContents.send('menu-action', 'docs');
                    },
                },
            ],
        },
    ];
    // macOS specific menu adjustments
    if (process.platform === 'darwin') {
        template.unshift({
            label: electron_1.app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' },
            ],
        });
    }
    const menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
}
function createTray() {
    // Only create tray on Windows and Linux
    if (process.platform === 'darwin')
        return;
    const icon = electron_1.nativeImage.createEmpty();
    tray = new electron_1.Tray(icon);
    const contextMenu = electron_1.Menu.buildFromTemplate([
        { label: 'Show App', click: () => mainWindow?.show() },
        { label: 'Hide App', click: () => mainWindow?.hide() },
        { type: 'separator' },
        {
            label: 'Quit',
            click: () => {
                electron_1.app.quit();
            },
        },
    ]);
    tray.setToolTip('DesktopApp');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
        mainWindow?.show();
    });
}
electron_1.app.whenReady().then(() => {
    createWindow();
    createMenu();
    createTray();
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.app.on('activate', () => {
    if (mainWindow === null)
        createWindow();
});
// Auto-updater configuration - disabled for now to avoid TypeScript issues
/*
if (process.env.NODE_ENV === 'production') {
  autoUpdater.setFeedURL('https://github.com/your-username/56-starter-electron-desktop/releases/latest');

  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
  });

  autoUpdater.on('update-available', (info: any) => {
    console.log('Update available:', info);
  });

  autoUpdater.on('update-not-available', () => {
    console.log('No update available');
  });

  autoUpdater.on('update-downloaded', (info: any) => {
    console.log('Update downloaded:', info);
  });

  autoUpdater.on('error', (error: any) => {
    console.error('Update error:', error);
  });
}
*/
// IPC Handlers
electron_1.ipcMain.on('window-control', (event, action) => {
    if (!mainWindow)
        return;
    switch (action) {
        case 'minimize':
            mainWindow.minimize();
            break;
        case 'maximize':
            mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
            break;
        case 'close':
            mainWindow.close();
            break;
    }
});
// Bidirectional IPC handlers
electron_1.ipcMain.handle('get-app-version', () => {
    return electron_1.app.getVersion();
});
electron_1.ipcMain.handle('get-app-name', () => {
    return electron_1.app.getName();
});
electron_1.ipcMain.handle('get-platform', () => {
    return process.platform;
});
electron_1.ipcMain.handle('show-message-box', async (event, options) => {
    const result = await electron_1.dialog.showMessageBox(mainWindow, options);
    return result;
});
electron_1.ipcMain.handle('show-save-dialog', async (event, options) => {
    const result = await electron_1.dialog.showSaveDialog(mainWindow, options);
    return result;
});
electron_1.ipcMain.handle('show-notification', async (event, options) => {
    if (electron_1.Notification.isSupported()) {
        const notification = new electron_1.Notification({
            title: options.title,
            body: options.body,
            icon: options.icon,
        });
        notification.show();
        return { success: true };
    }
    return { success: false, error: 'Notifications not supported' };
});
electron_1.ipcMain.handle('save-file', async (event, filePath, content) => {
    const fs = require('fs').promises;
    try {
        await fs.writeFile(filePath, content, 'utf-8');
        return { success: true };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
electron_1.ipcMain.handle('read-file', async (event, filePath) => {
    const fs = require('fs').promises;
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return { success: true, content };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
// Auto-updater IPC handlers
electron_1.ipcMain.handle('check-for-updates', () => {
    if (process.env.NODE_ENV === 'production') {
        electron_1.autoUpdater.checkForUpdates();
        return { success: true };
    }
    return { success: false, error: 'Auto-updater not available in development' };
});
electron_1.ipcMain.handle('quit-and-install', () => {
    electron_1.autoUpdater.quitAndInstall();
});
