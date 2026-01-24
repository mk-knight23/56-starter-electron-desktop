import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-screen flex flex-col transition-colors duration-500 rounded-2xl overflow-hidden glass-window border border-white/10">

      <!-- Custom Titlebar -->
      <header class="h-12 flex items-center justify-between px-6 bg-white/10 backdrop-blur-md border-b border-white/5 no-drag">
         <div class="flex items-center space-x-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-desktop-accent"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Desktop // Shell v2.0</span>
         </div>

         <div class="flex items-center space-x-2 no-drag">
            <button (click)="windowAction('minimize')" class="p-1.5 hover:bg-white/10 rounded transition-colors" aria-label="Minimize window">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"/></svg>
            </button>
            <button (click)="windowAction('maximize')" class="p-1.5 hover:bg-white/10 rounded transition-colors" aria-label="Maximize window">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
            </button>
            <button (click)="windowAction('close')" class="p-1.5 hover:bg-red-500/80 rounded transition-colors" aria-label="Close window">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
         </div>
      </header>

      <div class="flex-1 flex overflow-hidden">
         <!-- Native-style Sidebar -->
         <aside class="w-64 bg-black/20 backdrop-blur-2xl border-r border-white/5 p-6 flex flex-col justify-between overflow-y-auto no-drag">
            <div class="space-y-10">
               <div class="flex items-center space-x-3 px-2">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                     <span class="font-black italic">D</span>
                  </div>
                  <span class="font-display font-black text-lg tracking-tight uppercase">Native<span class="text-desktop-accent">Kit</span></span>
               </div>

               <nav class="space-y-2">
                  <div class="sidebar-item sidebar-item-active">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                     <span class="text-sm font-bold">Workspace</span>
                  </div>
                  <div class="sidebar-item">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                     <span class="text-sm font-bold">Process Analytics</span>
                  </div>
                  <div class="sidebar-item">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                     <span class="text-sm font-bold">Local Storage</span>
                  </div>
               </nav>
            </div>

            <div class="space-y-6">
               <button (click)="toggleTheme()" class="sidebar-item w-full" [attr.aria-label]="isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'">
                  <svg *ngIf="isDarkMode()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  <svg *ngIf="!isDarkMode()" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  <span class="text-sm font-bold">{{ isDarkMode() ? 'Light Mode' : 'Dark Mode' }}</span>
               </button>
               <div class="flex items-center space-x-3 p-2 bg-white/5 rounded-2xl border border-white/5">
                  <div class="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-xs">MK</div>
                  <div class="flex flex-col min-w-0">
                     <span class="text-[10px] font-black truncate uppercase">M. Kazi</span>
                     <span class="text-[8px] font-bold text-slate-500">System Root</span>
                  </div>
               </div>
            </div>
         </aside>

         <!-- View Area -->
         <main class="flex-1 p-10 lg:p-16 overflow-y-auto custom-scrollbar space-y-12 no-drag">
            <header class="space-y-4">
               <div class="inline-flex items-center space-x-3 px-3 py-1 rounded-full bg-desktop-accent/10 border border-desktop-accent/20">
                  <span class="w-1.5 h-1.5 bg-desktop-accent rounded-full"></span>
                  <span class="text-[10px] font-black uppercase tracking-widest text-desktop-accent">IPC Connection Stable</span>
               </div>
               <h2 class="text-5xl lg:text-7xl font-display font-black tracking-tighter uppercase leading-none">
                  Native <br />
                  <span class="text-desktop-accent italic underline decoration-4 underline-offset-8 decoration-desktop-accent/20">Intelligence.</span>
               </h2>
               <p class="text-xl text-slate-500 font-medium italic max-w-xl">Bridging high-performance Angular signals with native system-level capabilities.</p>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div class="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-6 hover:border-white/10 transition-colors group">
                  <div class="flex justify-between items-start">
                     <div class="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="8" x="4" y="4" rx="2" ry="2"/><rect width="8" height="8" x="4" y="14" rx="2" ry="2"/><path d="M9 2v2"/><path d="M15 2v2"/><path d="M9 14v2"/><path d="M15 14v2"/></svg>
                     </div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-700 group-hover:text-white transition-colors"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <div class="space-y-2">
                     <h4 class="text-xl font-bold uppercase tracking-tight">System Monitor</h4>
                     <p class="text-sm text-slate-500 leading-relaxed italic">Real-time resource utilization via native Electron process bridges.</p>
                  </div>
               </div>

               <div class="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-6 hover:border-white/10 transition-colors group">
                  <div class="flex justify-between items-start">
                     <div class="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                     </div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-700 group-hover:text-white transition-colors"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <div class="space-y-2">
                     <h4 class="text-xl font-bold uppercase tracking-tight">Reactive State</h4>
                     <p class="text-sm text-slate-500 leading-relaxed italic">Synchronized signals between UI renderer and main system thread.</p>
                  </div>
               </div>
            </div>

            <div class="p-12 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[3rem] text-white space-y-6 shadow-2xl shadow-indigo-600/20">
               <h3 class="text-3xl font-display font-black tracking-tight uppercase">Ready for Deployment.</h3>
               <p class="text-indigo-100 font-medium italic max-w-lg">This shell is configured for automated cross-platform packaging for MacOS, Windows, and Linux.</p>
               <button class="px-8 py-3 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all">Package Application</button>
            </div>
         </main>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class App {
  private platformId = inject(PLATFORM_ID);
  isDarkMode = signal(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme');
      if (saved) {
        this.isDarkMode.set(saved === 'dark');
      } else {
        this.isDarkMode.set(!window.matchMedia('(prefers-color-scheme: light)').matches);
      }
      this.applyTheme();
    }
  }

  applyTheme() {
    if (isPlatformBrowser(this.platformId) && this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
    this.applyTheme();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    }
  }

  windowAction(action: string) {
    const win = (window as any).electron;
    if (win) {
      win.send('window-control', action);
    } else {
      console.warn('Native environment not detected. Action:', action);
    }
  }
}
