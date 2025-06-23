
import { CanvassingRecord } from '../types';

export const exportToCSV = (records: CanvassingRecord[], filename: string = 'canvassing-records.csv') => {
  const headers = ['Name', 'Email', 'Notes', 'Created Date', 'Last Updated'];
  
  const csvContent = [
    headers.join(','),
    ...records.map(record => [
      `"${record.name.replace(/"/g, '""')}"`,
      `"${record.email.replace(/"/g, '""')}"`,
      `"${record.notes.replace(/"/g, '""')}"`,
      `"${new Date(record.createdAt).toLocaleDateString()}"`,
      `"${new Date(record.updatedAt).toLocaleDateString()}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
