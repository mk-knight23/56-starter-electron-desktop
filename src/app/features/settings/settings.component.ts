import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-container">
      <div class="page-header">
        <h1>Settings</h1>
        <p class="text-secondary">Configure your application preferences</p>
      </div>

      <div class="settings-grid">
        <div class="settings-sidebar">
          <nav class="sidebar-nav">
            <button
              class="nav-item"
              [class.active]="activeTab() === 'general'"
              (click)="activeTab.set('general')"
            >
              General
            </button>
            <button
              class="nav-item"
              [class.active]="activeTab() === 'notifications'"
              (click)="activeTab.set('notifications')"
            >
              Notifications
            </button>
            <button
              class="nav-item"
              [class.active]="activeTab() === 'appearance'"
              (click)="activeTab.set('appearance')"
            >
              Appearance
            </button>
            <button
              class="nav-item"
              [class.active]="activeTab() === 'security'"
              (click)="activeTab.set('security')"
            >
              Security
            </button>
          </nav>
        </div>

        <div class="settings-content">
          <!-- General Settings -->
          <div *ngIf="activeTab() === 'general'" class="settings-section">
            <h2>General Settings</h2>

            <div class="form-group">
              <label>Application Language</label>
              <select class="form-control">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            <div class="form-group">
              <label>Time Zone</label>
              <select class="form-control">
                <option>(UTC-08:00) Pacific Time</option>
                <option>(UTC-05:00) Eastern Time</option>
                <option>(UTC+00:00) London</option>
                <option>(UTC+01:00) Berlin</option>
              </select>
            </div>

            <div class="form-group">
              <label>Auto-save</label>
              <div class="toggle-switch">
                <input type="checkbox" id="autosave" [checked]="autosave()" (change)="autosave.set(!autosave())">
                <label for="autosave">Enable auto-save</label>
              </div>
            </div>
          </div>

          <!-- Notification Settings -->
          <div *ngIf="activeTab() === 'notifications'" class="settings-section">
            <h2>Notification Settings</h2>

            <div class="form-group">
              <div class="notification-item">
                <div class="notification-info">
                  <h4>Email Notifications</h4>
                  <p>Receive updates via email</p>
                </div>
                <div class="toggle-switch">
                  <input type="checkbox" id="email-notifications" [checked]="emailNotifications()" (change)="emailNotifications.set(!emailNotifications())">
                  <label for="email-notifications">Enabled</label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="notification-item">
                <div class="notification-info">
                  <h4>Push Notifications</h4>
                  <p>Receive real-time push notifications</p>
                </div>
                <div class="toggle-switch">
                  <input type="checkbox" id="push-notifications" [checked]="pushNotifications()" (change)="pushNotifications.set(!pushNotifications())">
                  <label for="push-notifications">Enabled</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Appearance Settings -->
          <div *ngIf="activeTab() === 'appearance'" class="settings-section">
            <h2>Appearance Settings</h2>

            <div class="form-group">
              <label>Theme</label>
              <div class="theme-options">
                <div class="theme-option" [class.selected]="theme() === 'light'" (click)="theme.set('light')">
                  <div class="theme-preview light"></div>
                  <span>Light</span>
                </div>
                <div class="theme-option" [class.selected]="theme() === 'dark'" (click)="theme.set('dark')">
                  <div class="theme-preview dark"></div>
                  <span>Dark</span>
                </div>
                <div class="theme-option" [class.selected]="theme() === 'auto'" (click)="theme.set('auto')">
                  <div class="theme-preview auto"></div>
                  <span>Auto</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Font Size</label>
              <div class="font-size-options">
                <button class="size-btn" [class.active]="fontSize() === 'small'" (click)="fontSize.set('small')">Small</button>
                <button class="size-btn" [class.active]="fontSize() === 'medium'" (click)="fontSize.set('medium')">Medium</button>
                <button class="size-btn" [class.active]="fontSize() === 'large'" (click)="fontSize.set('large')">Large</button>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div *ngIf="activeTab() === 'security'" class="settings-section">
            <h2>Security Settings</h2>

            <div class="form-group">
              <div class="security-item">
                <div class="security-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <div class="toggle-switch">
                  <input type="checkbox" id="2fa">
                  <label for="2fa">Enable</label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="security-item">
                <div class="security-info">
                  <h4>Biometric Login</h4>
                  <p>Use fingerprint or face recognition to login</p>
                </div>
                <div class="toggle-switch">
                  <input type="checkbox" id="biometric" [checked]="biometric()" (change)="biometric.set(!biometric())">
                  <label for="biometric">Enabled</label>
                </div>
              </div>
            </div>
          </div>

          <div class="settings-actions">
            <button class="btn btn-secondary">Cancel</button>
            <button class="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .page-header h1 {
      font-size: 2rem;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .page-header .text-secondary {
      color: #64748b;
    }

    .settings-grid {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 2rem;
      background: white;
      border-radius: 8px;
      padding: 2rem;
    }

    .settings-sidebar {
      border-right: 1px solid #e2e8f0;
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-item {
      padding: 0.75rem 1rem;
      border: none;
      background: none;
      text-align: left;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.2s;
    }

    .nav-item:hover {
      background: #f1f5f9;
    }

    .nav-item.active {
      background: #2563eb;
      color: white;
    }

    .settings-content {
      padding-left: 2rem;
    }

    .settings-section {
      margin-bottom: 2rem;
    }

    .settings-section h2 {
      font-size: 1.5rem;
      color: #1e293b;
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 1rem;
    }

    .toggle-switch {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .toggle-switch input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .toggle-switch label {
      cursor: pointer;
      user-select: none;
    }

    .notification-item, .security-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }

    .notification-info h4, .security-info h4 {
      margin: 0 0 0.25rem 0;
      color: #1e293b;
    }

    .notification-info p, .security-info p {
      margin: 0;
      color: #64748b;
      font-size: 0.875rem;
    }

    .theme-options {
      display: flex;
      gap: 1rem;
    }

    .theme-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .theme-option:hover {
      border-color: #2563eb;
    }

    .theme-option.selected {
      border-color: #2563eb;
      background: #eff6ff;
    }

    .theme-preview {
      width: 40px;
      height: 40px;
      border-radius: 6px;
      margin-bottom: 0.5rem;
    }

    .theme-preview.light {
      background: white;
      border: 1px solid #e2e8f0;
    }

    .theme-preview.dark {
      background: #1e293b;
    }

    .theme-preview.auto {
      background: linear-gradient(to right, white 50%, #1e293b 50%);
    }

    .font-size-options {
      display: flex;
      gap: 0.5rem;
    }

    .size-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #e2e8f0;
      background: white;
      border-radius: 6px;
      cursor: pointer;
    }

    .size-btn.active {
      background: #2563eb;
      color: white;
      border-color: #2563eb;
    }

    .settings-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e2e8f0;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
    }

    .btn-primary:hover {
      background: #1d4ed8;
    }

    .btn-secondary {
      background: #f1f5f9;
      color: #64748b;
    }

    .btn-secondary:hover {
      background: #e2e8f0;
    }
  `]
})
export class SettingsComponent {
  activeTab = signal('general');
  autosave = signal(true);
  emailNotifications = signal(true);
  pushNotifications = signal(false);
  theme = signal('light');
  fontSize = signal('medium');
  biometric = signal(false);
}