import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="page-header">
        <h1>Dashboard</h1>
        <p class="text-secondary">Welcome to your desktop application</p>
      </div>

      <div class="stats-grid">
        <div class="card">
          <div class="stat-icon primary">📊</div>
          <div class="stat-content">
            <div class="stat-label">Projects</div>
            <div class="stat-value">24</div>
          </div>
        </div>

        <div class="card">
          <div class="stat-icon success">✓</div>
          <div class="stat-content">
            <div class="stat-label">Completed</div>
            <div class="stat-value">18</div>
          </div>
        </div>

        <div class="card">
          <div class="stat-icon warning">⚠</div>
          <div class="stat-content">
            <div class="stat-label">Pending</div>
            <div class="stat-value">6</div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <div class="card">
          <h2>Recent Files</h2>
          <div class="file-list">
            <div class="file-item">
              <div class="file-icon">📄</div>
              <div class="file-info">
                <div class="file-name">Project_Report.pdf</div>
                <div class="file-meta">Modified 2 hours ago</div>
              </div>
              <div class="file-actions">
                <button class="icon-button">👁</button>
                <button class="icon-button">📥</button>
              </div>
            </div>
            <div class="file-item">
              <div class="file-icon">📊</div>
              <div class="file-info">
                <div class="file-name">Analytics_Data.xlsx</div>
                <div class="file-meta">Modified yesterday</div>
              </div>
              <div class="file-actions">
                <button class="icon-button">👁</button>
                <button class="icon-button">📥</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
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

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .stat-icon.primary { color: #2563eb; }
    .stat-icon.success { color: #10b981; }
    .stat-icon.warning { color: #f59e0b; }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 0.25rem;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
    }

    .content-section {
      margin-top: 2rem;
    }

    .file-list {
      margin-top: 1rem;
    }

    .file-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      margin-bottom: 0.5rem;
    }

    .file-icon {
      font-size: 1.5rem;
      margin-right: 1rem;
    }

    .file-info {
      flex: 1;
    }

    .file-name {
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 0.25rem;
    }

    .file-meta {
      font-size: 0.875rem;
      color: #64748b;
    }

    .file-actions {
      display: flex;
      gap: 0.5rem;
    }

    .icon-button {
      background: none;
      border: none;
      padding: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .icon-button:hover {
      background: #f1f5f9;
    }
  `]
})
export class DashboardComponent {}