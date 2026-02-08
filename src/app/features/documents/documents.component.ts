import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="documents-container">
      <div class="page-header">
        <h1>Documents</h1>
        <p class="text-secondary">Manage your files and documents</p>
      </div>

      <div class="toolbar">
        <div class="search-box">
          <input type="text" placeholder="Search documents..." class="search-input" />
          <button class="search-button">🔍</button>
        </div>
        <button class="btn btn-primary">
          <span>+</span> New Document
        </button>
      </div>

      <div class="documents-grid">
        <div class="document-card" *ngFor="let doc of documents()">
          <div class="document-icon">
            <span [innerHTML]="getDocumentIcon(doc.type)"></span>
          </div>
          <div class="document-info">
            <h3 class="document-title">{{ doc.name }}</h3>
            <p class="document-meta">{{ doc.size }} • {{ doc.modified }}</p>
          </div>
          <div class="document-actions">
            <button class="action-btn">👁</button>
            <button class="action-btn">⋮</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .documents-container {
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

    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .search-box {
      display: flex;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      overflow: hidden;
    }

    .search-input {
      padding: 0.75rem;
      border: none;
      outline: none;
      width: 300px;
    }

    .search-button {
      background: none;
      border: none;
      padding: 0.75rem;
      cursor: pointer;
      border-left: 1px solid #e2e8f0;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
    }

    .btn-primary:hover {
      background: #1d4ed8;
    }

    .documents-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .document-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1.5rem;
      transition: all 0.2s;
    }

    .document-card:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .document-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .document-info {
      margin-bottom: 1rem;
    }

    .document-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .document-meta {
      font-size: 0.875rem;
      color: #64748b;
    }

    .document-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .action-btn {
      background: none;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 4px;
    }

    .action-btn:hover {
      background: #f1f5f9;
    }
  `]
})
export class DocumentsComponent {
  documents = signal([
    {
      name: 'Annual Report 2024',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2 hours ago'
    },
    {
      name: 'Project Proposal',
      type: 'doc',
      size: '1.2 MB',
      modified: 'Yesterday'
    },
    {
      name: 'Financial Analysis',
      type: 'xlsx',
      size: '3.1 MB',
      modified: '3 days ago'
    },
    {
      name: 'Meeting Notes',
      type: 'txt',
      size: '125 KB',
      modified: '1 week ago'
    }
  ]);

  getDocumentIcon(type: string): string {
    const icons: Record<string, string> = {
      pdf: '📄',
      doc: '📝',
      xlsx: '📊',
      txt: '📃'
    };
    return icons[type] || '📄';
  }
}