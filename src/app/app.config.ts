import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { 
  LucideAngularModule, 
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick({ 
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
    }))
  ]
};
