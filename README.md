# DesktopApp - Professional Electron Desktop Starter

<div align="center">

![Angular](https://img.shields.io/badge/Angular_19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-33-2B2628?style=for-the-badge&logo=electron&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**A production-ready desktop application shell built with Angular 19, Electron 33, and Tailwind CSS**

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Building](#building)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Development](#development)
- [Building](#building)
- [Platform-Specific Notes](#platform-specific-notes)
- [IPC Communication](#ipc-communication)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

DesktopApp provides a secure, modern foundation for desktop application development. It features a custom frameless window, native menu integration, system-level IPC communication, and a professional native-feel UI design.

### Why DesktopApp?

- **Modern Stack**: Angular 19 Standalone Components with Signals + Electron 33
- **Native Feel**: Custom frameless window with platform-specific styling
- **Secure IPC**: Type-safe main-to-renderer communication
- **Cross-Platform**: First-class support for macOS, Windows, and Linux
- **Developer Experience**: Hot reload, TypeScript, and modern tooling
- **Production Ready**: Electron-builder configuration for all platforms

---

## Features

### Desktop-Native Features

| Feature | Description |
|---------|-------------|
| **Frameless Window** | Custom titlebar with window controls (minimize, maximize, close) |
| **Native Menus** | Application menu with keyboard shortcuts and platform-specific adjustments |
| **System Tray** | Tray icon on Windows/Linux with context menu |
| **Native Dialogs** | File open/save dialogs, message boxes |
| **System Notifications** | Native OS notifications (cross-platform) |
| **Auto-Reload** | Hot module replacement in development |

### Angular Features

| Feature | Description |
|---------|-------------|
| **Standalone Components** | Zero ngModule overhead |
| **Angular Signals** | Fine-grained reactivity for IPC sync |
| **Type-Safe IPC** | Typed main-to-renderer communication |
| **Tailwind CSS** | Utility-first styling with platform-specific adjustments |
| **Custom UI Components** | Sidebar, cards, tables, badges, buttons |

---

## Tech Stack

- **Shell**: Electron 33 (TypeScript)
- **Renderer**: Angular 19 (Standalone + Signals)
- **State**: Angular Signals (IPC sync)
- **Styling**: Tailwind CSS 3.4
- **Build**: electron-builder 24
- **Package Manager**: npm

---

## Project Structure

```
56-starter-electron-desktop/
├── electron/                 # Electron main & preload process
│   ├── main.ts              # Main process entry
│   ├── preload.ts           # Preload script (IPC bridge)
│   └── main.js              # Compiled main process
├── src/                     # Angular renderer process
│   ├── app/
│   │   ├── app.component.ts # Root component
│   │   ├── core/           # Core services
│   │   ├── features/       # Feature modules
│   │   └── shared/         # Shared components
│   ├── styles.css          # Global styles
│   └── index.html          # HTML entry
├── dist-electron/          # Compiled Electron scripts
├── dist/desktop-shell/     # Production Angular build
├── release/                # Packaged installers
└── package.json            # Dependencies & build config

```

---

## Quick Start

### Prerequisites

- **Node.js**: 20.x or higher
- **npm**: 10.x or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd 56-starter-electron-desktop

# Install dependencies
npm install
```

### Development

```bash
# Start Angular dev server and Electron concurrently
npm start
```

This will:
1. Start Angular dev server on `http://localhost:4200`
2. Wait for Angular to be ready
3. Launch Electron with hot-reload enabled

### Test the Features

- Click window controls (minimize, maximize, close)
- Use "Test Notification" to see native notifications
- Use "Test Dialog" to see native message boxes
- Explore the native menu (File, Edit, View, Window, Help)
- Try keyboard shortcuts (CmdOrCtrl+N, CmdOrCtrl+O, etc.)

---

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with Electron |
| `npm run ng:serve` | Start Angular dev server only |
| `npm run electron:serve` | Start Electron only (requires Angular running) |
| `npm run build` | Build Angular for production |
| `npm run electron:build` | Compile Electron TypeScript |
| `npm run package` | Build and package for current platform |
| `npm run package:win` | Build and package for Windows |
| `npm run package:mac` | Build and package for macOS |
| `npm run package:linux` | Build and package for Linux |

### File Watching

The development setup includes:
- **Angular**: Hot module replacement (HMR) for instant updates
- **Electron**: Auto-reload when main process files change
- **Preload**: Auto-recompiled and reloaded on changes

### Debugging

- **Renderer Process**: Open DevTools with `CmdOrCtrl+Shift+I` or via View menu
- **Main Process**: Use VS Code debugger with launch configuration
- **Console Logs**: Check both renderer console and terminal

---

## Building

### Production Build

```bash
# Build for current platform
npm run build && npm run electron:build && npm run package
```

### Platform-Specific Builds

```bash
# Windows (NSIS installer + portable)
npm run package:win

# macOS (DMG + ZIP)
npm run package:mac

# Linux (AppImage + deb + rpm)
npm run package:linux
```

### Build Artifacts

Packaged applications are output to the `release/` directory:

**macOS**:
- `DesktopApp-2.0.0.dmg` - Disk image installer
- `DesktopApp-2.0.0-mac.zip` - ZIP archive

**Windows**:
- `DesktopApp Setup 2.0.0.exe` - NSIS installer
- `DesktopApp 2.0.0.exe` - Portable executable

**Linux**:
- `DesktopApp-2.0.0.AppImage` - Universal AppImage
- `desktopapp_2.0.0_amd64.deb` - Debian package
- `desktopapp-2.0.0-1.x86_64.rpm` - RPM package

---

## Platform-Specific Notes

### macOS

- **Titlebar Height**: 28px (standard macOS height)
- **Window Controls**: Traffic light buttons (red, yellow, green)
- **Menu**: Application menu appears in system menu bar
- **Signing**: Configure code signing in `package.json`
- **Notarization**: Required for distribution outside Mac App Store

### Windows

- **Titlebar Height**: 32px (Windows 11 style)
- **Window Controls**: Minimize, maximize, close buttons
- **Menu**: Application menu appears in window title bar
- **Installer**: NSIS with custom installation directory
- **Icons**: Requires `build/icon.ico`

### Linux

- **Titlebar Height**: Varies by desktop environment
- **Window Controls**: Follow system theme
- **Menu**: Application menu appears in window
- **Packaging**: AppImage (universal), deb (Ubuntu/Debian), rpm (Fedora)
- **Icons**: Requires `build/icon.png`

---

## IPC Communication

### Architecture

DesktopApp uses a secure, type-safe IPC bridge:

```
┌─────────────────┐         ┌─────────────────┐
│   Main Process  │         │ Renderer Process│
│   (Electron)    │◄────────│   (Angular)     │
└─────────────────┘         └─────────────────┘
        │                           │
        │                           │
    ipcMain                    contextBridge
        │                           │
        └───────── preload.ts ──────┘
```

### One-Way Communication (Renderer → Main)

```typescript
// Renderer (Angular)
window.electron.send('window-control', 'minimize');

// Main (Electron)
ipcMain.on('window-control', (event, action) => {
  if (action === 'minimize') mainWindow.minimize();
});
```

### Two-Way Communication (Renderer ↔ Main)

```typescript
// Renderer (Angular)
const version = await window.electron.invoke('get-app-version');
console.log('App version:', version);

// Main (Electron)
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});
```

### One-Way Communication (Main → Renderer)

```typescript
// Main (Electron)
mainWindow.webContents.send('window-status', 'maximized');

// Renderer (Angular)
window.electron.receive('window-status', (status) => {
  console.log('Window status:', status);
});
```

### Available IPC Channels

| Channel | Direction | Purpose |
|---------|-----------|---------|
| `window-control` | Renderer → Main | Minimize, maximize, close |
| `window-status` | Main → Renderer | Maximize state changes |
| `menu-action` | Main → Renderer | Menu item clicks |
| `files-opened` | Main → Renderer | File dialog results |
| `get-app-version` | Renderer ↔ Main | Get app version |
| `get-app-name` | Renderer ↔ Main | Get app name |
| `get-platform` | Renderer ↔ Main | Get OS platform |
| `show-message-box` | Renderer ↔ Main | Show native dialog |
| `show-save-dialog` | Renderer ↔ Main | Show save dialog |
| `show-notification` | Renderer ↔ Main | Show notification |
| `save-file` | Renderer ↔ Main | Write file to disk |
| `read-file` | Renderer ↔ Main | Read file from disk |

---

## Security

### Implemented Security Measures

- **Context Isolation**: Enabled (prevents renderer from accessing Node APIs)
- **Node Integration**: Disabled (prevents renderer from running Node code)
- **Sandbox**: Enabled for renderer process
- **IPC Channel Whitelist**: Only specific channels allowed
- **Preload Script**: Secure bridge for IPC communication

### Security Best Practices

1. **Never** disable context isolation or node integration
2. **Always** validate IPC messages before processing
3. **Never** expose sensitive APIs via context bridge
4. **Always** use `handle` for two-way communication (returns Promise)
5. **Never** use `send` for sensitive operations (no return value)

### Content Security Policy

Add to `src/index.html`:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self';
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               font-src 'self';">
```

---

## Troubleshooting

### Electron fails to start

```bash
# Clear Electron cache
rm -rf ~/Library/Caches/electron
rm -rf ~/.config/electron

# Rebuild native modules
npm rebuild
```

### Angular dev server not accessible

```bash
# Check if port 4200 is available
lsof -i :4200

# Kill existing process
kill -9 <PID>
```

### Build fails on Windows

```bash
# Install Windows build tools
npm install --global windows-build-tools

# Run as administrator
```

### Code signing issues on macOS

```bash
# Install Xcode command line tools
xcode-select --install

# Configure signing in package.json
# "build": { "mac": { "identity": "Developer ID Application: Your Name" } }
```

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Format

Follow conventional commits:

```
<type>: <description>

feat: Add native menu support
fix: Correct window control behavior
docs: Update IPC documentation
refactor: Simplify preload script
test: Add IPC unit tests
chore: Update dependencies
```

---

## License

MIT License - See [LICENSE.md](LICENSE.md) for details.

---

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Angular Documentation](https://angular.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [electron-builder Documentation](https://www.electron.build)

---

<div align="center">

**Built with Angular 19 + Electron 33 + Tailwind CSS**

</div>
