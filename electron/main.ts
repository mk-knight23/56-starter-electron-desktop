import { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage, dialog, Notification } from 'electron';
import * as path from 'path';

// Enable hot reload in development
if (process.env['NODE_ENV'] === 'development') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit',
  });
}

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
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
    ? 'http://localhost:4200'
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
  const template: Electron.MenuItemConstructorOptions[] = [
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
            const result = await dialog.showOpenDialog(mainWindow!, {
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
      label: app.getName(),
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

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createTray() {
  // Only create tray on Windows and Linux
  if (process.platform === 'darwin') return;

  const icon = nativeImage.createEmpty();
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow?.show() },
    { label: 'Hide App', click: () => mainWindow?.hide() },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip('DesktopApp');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow?.show();
  });
}

app.whenReady().then(() => {
  createWindow();
  createMenu();
  createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

// IPC Handlers
ipcMain.on('window-control', (event, action) => {
  if (!mainWindow) return;

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
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-app-name', () => {
  return app.getName();
});

ipcMain.handle('get-platform', () => {
  return process.platform;
});

ipcMain.handle('show-message-box', async (event, options) => {
  const result = await dialog.showMessageBox(mainWindow!, options);
  return result;
});

ipcMain.handle('show-save-dialog', async (event, options) => {
  const result = await dialog.showSaveDialog(mainWindow!, options);
  return result;
});

ipcMain.handle('show-notification', async (event, options) => {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title: options.title,
      body: options.body,
      icon: options.icon,
    });
    notification.show();
    return { success: true };
  }
  return { success: false, error: 'Notifications not supported' };
});

ipcMain.handle('save-file', async (event, filePath: string, content: string) => {
  const fs = require('fs').promises;
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('read-file', async (event, filePath: string) => {
  const fs = require('fs').promises;
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return { success: true, content };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});
