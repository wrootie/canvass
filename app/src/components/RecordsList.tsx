import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCanvassingRecords } from '../hooks/useCanvassingRecords';
import { exportToCSV } from '../utils/csvExport';
import { useToast } from '@/hooks/useToast';
import { Search, Download, Edit, Trash2, Calendar, Mail } from 'lucide-react';
import { AddRecordForm } from './AddRecordForm';
import { Record } from '@/types';

export const RecordsList: React.FC = () => {
  const { records, isLoading, deleteRecord, refreshRecords } = useCanvassingRecords();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const stringifiedRecords = JSON.stringify(records);
  // Filtered records based on search term - return whole list if there is no search query
  const filteredRecords = useMemo(() => {
    if (!searchTerm) return records;
    const term = searchTerm.toLowerCase();
    return records.filter(record =>
      record.firstName.toLowerCase().includes(term) ||
      record.lastName.toLowerCase().includes(term) ||
      record.email.toLowerCase().includes(term) ||
      record.notes.toLowerCase().includes(term)
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedRecords, records, searchTerm]);

  const handleExportCSV = () => {
    if (filteredRecords.length === 0) {
      toast({
        title: "No Records",
        description: "No records to export",
        variant: "destructive"
      });
      return;
    }

    exportToCSV(filteredRecords);
    toast({
      title: "Export Successful",
      description: `Exported ${filteredRecords.length} records to CSV`
    });
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete the record for ${name}?`)) {
      const success = deleteRecord(id);
      if (success) {
        toast({
          title: "Record Deleted",
          description: `Record for ${name} has been deleted`
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete record",
          variant: "destructive"
        });
      }
    }
  };

  const handleEdit = (record: Record) => {
    setEditingRecord(record);
  };

  const handleEditSuccess = async() => {
    setEditingRecord(null);
    await refreshRecords();
    toast({
      title: "Success",
      description: "Record updated successfully"
    });
  };

  // If in edit mode, show the form
  if (editingRecord) {
    return (
      <div>
        <AddRecordForm
          editingRecord={editingRecord}
          onSuccess={handleEditSuccess}
        />
      </div>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading records...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name, email, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            {filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''}
          </Badge>
          <Button onClick={handleExportCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              {records.length === 0 ? (
                <>
                  <h3 className="text-lg font-medium mb-2">No records yet</h3>
                  <p>Start by adding your first canvassing record!</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium mb-2">No matching records</h3>
                  <p>Try adjusting your search terms</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{(record.firstName || '') + ' ' + (record.lastName || '')}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {record.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(record.createdAt).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(record)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(record.id, (record.firstName || '') + ' ' + (record.lastName || ''))}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Conversation Notes:</h4>
                  <p className="text-gray-900 whitespace-pre-wrap">{record.notes}</p>
                </div>
                {record.updatedAt !== record.createdAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    Last updated: {new Date(record.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
