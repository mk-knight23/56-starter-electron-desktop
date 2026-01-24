import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  Monitor, 
  Cpu, 
  Database, 
  Search, 
  Settings, 
  Bell, 
  X, 
  Minus, 
  Square,
  ChevronRight,
  Zap,
  Github,
  Sun,
  Moon,
  LogOut,
  LayoutGrid,
  Activity
} from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  template: `
    <div class="h-screen flex flex-col transition-colors duration-500 rounded-2xl overflow-hidden glass-window border border-white/10">
      
      <!-- Custom Titlebar -->
      <header class="h-12 flex items-center justify-between px-6 bg-white/10 backdrop-blur-md border-b border-white/5 no-drag">
         <div class="flex items-center space-x-3 pointer-events-none">
            <lucide-icon name="monitor" [size]="16" class="text-desktop-accent"></lucide-icon>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Desktop // Shell v2.0</span>
         </div>

         <div class="flex items-center space-x-2 no-drag">
            <button (click)="windowAction('minimize')" class="p-1.5 hover:bg-white/10 rounded transition-colors">
               <lucide-icon name="minus" [size]="14"></lucide-icon>
            </button>
            <button (click)="windowAction('maximize')" class="p-1.5 hover:bg-white/10 rounded transition-colors">
               <lucide-icon name="square" [size]="12"></lucide-icon>
            </button>
            <button (click)="windowAction('close')" class="p-1.5 hover:bg-red-500/80 rounded transition-colors">
               <lucide-icon name="x" [size]="14"></lucide-icon>
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
                     <lucide-icon name="layout-grid" [size]="18"></lucide-icon>
                     <span class="text-sm font-bold">Workspace</span>
                  </div>
                  <div class="sidebar-item">
                     <lucide-icon name="activity" [size]="18"></lucide-icon>
                     <span class="text-sm font-bold">Process Analytics</span>
                  </div>
                  <div class="sidebar-item">
                     <lucide-icon name="database" [size]="18"></lucide-icon>
                     <span class="text-sm font-bold">Local Storage</span>
                  </div>
               </nav>
            </div>

            <div class="space-y-6">
               <button (click)="toggleTheme()" class="sidebar-item w-full">
                  <lucide-icon [name]="isDarkMode() ? 'sun' : 'moon'" [size]="18"></lucide-icon>
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
                        <lucide-icon name="cpu" [size]="24"></lucide-icon>
                     </div>
                     <lucide-icon name="chevron-right" class="text-slate-700 group-hover:text-white transition-colors" [size]="16"></lucide-icon>
                  </div>
                  <div class="space-y-2">
                     <h4 class="text-xl font-bold uppercase tracking-tight">System Monitor</h4>
                     <p class="text-sm text-slate-500 leading-relaxed italic">Real-time resource utilization via native Electron process bridges.</p>
                  </div>
               </div>

               <div class="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-6 hover:border-white/10 transition-colors group">
                  <div class="flex justify-between items-start">
                     <div class="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                        <lucide-icon name="zap" [size]="24"></lucide-icon>
                     </div>
                     <lucide-icon name="chevron-right" class="text-slate-700 group-hover:text-white transition-colors" [size]="16"></lucide-icon>
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
  isDarkMode = signal(true);

  constructor() {
    if (this.isDarkMode()) document.documentElement.classList.add('dark');
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    document.documentElement.classList.toggle('dark');
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
