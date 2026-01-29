import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex h-screen w-full bg-[#f8fafc]">
      <!-- Sidebar -->
      <aside class="sidebar">
        <!-- Logo Area -->
        <div class="p-4 border-b border-white/10">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center text-white font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
            </div>
            <span class="text-white font-semibold">DesktopApp</span>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex-1 py-4">
          <div class="sidebar-section-title">Main</div>
          <nav class="space-y-1 px-2">
            <div class="sidebar-item sidebar-item-active">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
              <span>Dashboard</span>
            </div>
            <div class="sidebar-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>Messages</span>
              <span class="ml-auto bg-[#2563eb] text-white text-[10px] px-1.5 py-0.5 rounded-full">3</span>
            </div>
            <div class="sidebar-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              <span>Documents</span>
            </div>
            <div class="sidebar-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              <span>Projects</span>
            </div>
          </nav>

          <div class="divider mx-4"></div>

          <div class="sidebar-section-title">Team</div>
          <nav class="space-y-1 px-2">
            <div class="sidebar-item">
              <div class="relative">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="" class="w-6 h-6 rounded-full" />
                <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-[#1e1e2e]"></span>
              </div>
              <span>Sarah Chen</span>
            </div>
            <div class="sidebar-item">
              <div class="relative">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" alt="" class="w-6 h-6 rounded-full" />
                <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-[#1e1e2e]"></span>
              </div>
              <span>Mike Johnson</span>
            </div>
            <div class="sidebar-item">
              <div class="relative">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" alt="" class="w-6 h-6 rounded-full" />
                <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#f59e0b] rounded-full border-2 border-[#1e1e2e]"></span>
              </div>
              <span>Emma Wilson</span>
            </div>
          </nav>
        </div>

        <!-- User Profile -->
        <div class="p-4 border-t border-white/10">
          <div class="flex items-center gap-3">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="" class="w-9 h-9 rounded-full" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">John Doe</p>
              <p class="text-xs text-[#71717a] truncate">john&#64;example.com</p>
            </div>
            <button class="p-1.5 hover:bg-[#2a2a3c] rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#a1a1aa]"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Titlebar -->
        <header class="titlebar drag">
          <div class="window-controls flex items-center gap-2">
            <div class="window-button bg-[#ff5f57]"></div>
            <div class="window-button bg-[#febc2e]"></div>
            <div class="window-button bg-[#28c840]"></div>
          </div>
          <div class="flex-1 text-center text-sm text-[#64748b] font-medium">
            Dashboard - DesktopApp
          </div>
          <div class="flex items-center gap-4">
            <span class="text-xs text-[#64748b]">12:45 PM</span>
          </div>
        </header>

        <!-- Content Area -->
        <main class="content-area p-8 custom-scrollbar">
          <!-- Page Header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-2xl font-bold text-[#1e293b]">Dashboard</h1>
              <p class="text-sm text-[#64748b] mt-1">Welcome back, John. Here's your overview.</p>
            </div>
            <div class="flex items-center gap-3">
              <button class="button-secondary gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Export
              </button>
              <button class="button-primary gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                New Project
              </button>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-4 gap-6 mb-8">
            <div class="card p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-medium text-[#64748b]">Total Projects</span>
                <span class="badge badge-success">+12%</span>
              </div>
              <p class="text-3xl font-bold text-[#1e293b]">48</p>
              <p class="text-xs text-[#94a3b8] mt-1">4 active this week</p>
            </div>
            <div class="card p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-medium text-[#64748b]">Team Members</span>
                <span class="badge badge-success">+3</span>
              </div>
              <p class="text-3xl font-bold text-[#1e293b]">12</p>
              <p class="text-xs text-[#94a3b8] mt-1">2 pending invites</p>
            </div>
            <div class="card p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-medium text-[#64748b]">Tasks Completed</span>
                <span class="badge badge-warning">-5%</span>
              </div>
              <p class="text-3xl font-bold text-[#1e293b]">847</p>
              <p class="text-xs text-[#94a3b8] mt-1">This month</p>
            </div>
            <div class="card p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-medium text-[#64748b]">Storage Used</span>
                <span class="badge badge-danger">85%</span>
              </div>
              <p class="text-3xl font-bold text-[#1e293b]">42.5 GB</p>
              <p class="text-xs text-[#94a3b8] mt-1">of 50 GB total</p>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card">
            <div class="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[#1e293b]">Recent Activity</h2>
              <button class="text-sm text-[#2563eb] font-medium hover:underline">View All</button>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Project</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="flex items-center gap-3">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="" class="w-8 h-8 rounded-full" />
                      <span class="font-medium">Sarah Chen</span>
                    </div>
                  </td>
                  <td>Completed task</td>
                  <td>Dashboard Redesign</td>
                  <td>2 hours ago</td>
                  <td><span class="badge badge-success">Done</span></td>
                </tr>
                <tr>
                  <td>
                    <div class="flex items-center gap-3">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" alt="" class="w-8 h-8 rounded-full" />
                      <span class="font-medium">Mike Johnson</span>
                    </div>
                  </td>
                  <td>Commented on</td>
                  <td>API Integration</td>
                  <td>4 hours ago</td>
                  <td><span class="badge badge-warning">Pending</span></td>
                </tr>
                <tr>
                  <td>
                    <div class="flex items-center gap-3">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" alt="" class="w-8 h-8 rounded-full" />
                      <span class="font-medium">Emma Wilson</span>
                    </div>
                  </td>
                  <td>Uploaded file</td>
                  <td>Brand Guidelines</td>
                  <td>5 hours ago</td>
                  <td><span class="badge badge-success">Done</span></td>
                </tr>
              </tbody>
            </table>
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

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('DesktopApp initialized');
    }
  }
}
