# ElectronPrime - High-Fidelity Desktop Shell

A professional desktop application shell built with **Angular 19**, **Electron 33**, and **Tailwind CSS**. Designed for building high-performance, native-feeling desktop experiences with modern web technologies.

## Overview
ElectronPrime provides a secure, standalone foundation for desktop development. It features a custom frameless window, system-level IPC synchronization using Angular Signals, and a high-fidelity "Native Desktop" design system.

## Features Comparison

| Feature | Legacy Version | ElectronPrime (v2.0) |
| :--- | :--- | :--- |
| **Framework** | Vanilla JS | **Angular 19 Standalone** |
| **Electron** | Basic Shell | **Electron 33+ (Secure Bridge)** |
| **UI Design** | Default Chrome | **Custom Frameless Native Aesthetic** |
| **Communication**| Typed IPC | **Signal-based Main-to-Renderer Bridge** |
| **Security** | Minimal | **Strict Context Isolation & Preload Security** |
| **Tooling** | Manual | **Integrated Packaging (Electron Builder)** |

## Tech Stack
- **Shell:** Electron 33 (TypeScript)
- **Renderer:** Angular 19+ (Standalone)
- **State:** Angular Signals (IPC Sync)
- **Styling:** Tailwind CSS (System tokens)
- **Icons:** Lucide Angular

## Project Structure
```text
├── electron/           # Main & Preload process (TS)
├── src/app/            # Angular Renderer process
├── dist-electron/      # Compiled Electron scripts
└── dist/desktop-shell/ # Production Angular build
```

## Setup & Build Instructions

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation
```bash
npm install
```

### Development
```bash
# Starts Angular dev server and Electron shell concurrently
npm start
```

### Production Build
```bash
# Compile both processes for distribution
npm run build
npm run electron:build
```

## Deployment
Packaged as a standalone executable using `electron-builder`. Supports MacOS, Windows, and Linux distribution formats.

---

**License:** MIT
**Architect:** mk-knight23
