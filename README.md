# ElectronPrime - High-Fidelity Desktop Shell

<div align="center">

![Angular](https://img.shields.io/badge/Angular_19- DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-2B2628?style=for-the-badge&logo=electron&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A professional desktop application shell built with Angular 19, Electron 33, and Tailwind CSS**

[GitHub](https://github.com/mk-knight23/59-Electron-Desktop-Starter)

</div>

---

## Overview

ElectronPrime provides a secure, standalone foundation for desktop development. It features a custom frameless window, system-level IPC synchronization using Angular Signals, and a high-fidelity "Native Desktop" design system.

### Problem Statement

Legacy desktop shells often use outdated frameworks with poor state management and heavy external dependencies that bloat the application bundle.

### Solution

ElectronPrime provides:
- **Angular 19 Signals**: Fine-grained reactivity for IPC sync
- **Standalone Components**: Zero ngModule overhead
- **Zero External Icons**: Inline SVGs eliminate runtime dependencies
- **Theme Persistence**: Dark/Light mode with localStorage
- **Secure IPC Bridge**: Type-safe main-to-renderer communication

---

## Features Comparison

| Feature | Legacy Version | ElectronPrime (v2.0) |
| :--- | :--- | :--- |
| **Framework** | Vanilla JS | **Angular 19 Standalone** |
| **Reactivity** | Zone.js | **Angular Signals** |
| **Electron** | Basic Shell | **Electron 33+ (Secure Bridge)** |
| **UI Design** | Default Chrome | **Custom Frameless Native Aesthetic** |
| **Communication**| Typed IPC | **Signal-based Main-to-Renderer Bridge** |
| **Icons** | External library | **Zero-dependency inline SVGs** |
| **Theme** | Fixed | **Dark + Light with persistence** |
| **Security** | Minimal | **Strict Context Isolation** |
| **Tooling** | Manual | **Integrated Packaging** |

---

## Tech Stack

- **Shell:** Electron 33 (TypeScript)
- **Renderer:** Angular 19+ (Standalone + Signals)
- **State:** Angular Signals (IPC Sync)
- **Styling:** Tailwind CSS (System tokens)
- **Icons:** Inline SVGs (no external dependencies)

---

## Project Structure

```
├── electron/           # Main & Preload process (TS)
├── src/app/            # Angular Renderer process
├── dist-electron/      # Compiled Electron scripts
└── dist/desktop-shell/ # Production Angular build
```

---

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

# Package as executable
npm run package
```

---

## Theme System

ElectronPrime includes a fully-featured dark/light mode with:

- **System Detection**: Auto-detects OS preference
- **Manual Toggle**: Switch via sidebar button
- **Persistence**: Preference saved in localStorage
- **Smooth Transitions**: 500ms CSS transitions

---

## Accessibility

The shell includes comprehensive accessibility features:

- **ARIA Labels**: All interactive elements labeled
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant

---

## Deployment

Packaged as a standalone executable using `electron-builder`. Supports:

- **macOS**: DMG, ZIP, MAS
- **Windows**: NSIS, MSI, AppX
- **Linux**: AppImage, Deb, RPM

```bash
# Build and package for current platform
npm run package
```

---

## License

MIT License - See [LICENSE.md](LICENSE.md) for details.

---

<div align="center">

**Built with Angular 19 + Electron 33 + Tailwind CSS**

</div>
