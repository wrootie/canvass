
import { useState, useEffect } from 'react';
import { CanvassingRecord } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useCanvassingRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<CanvassingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecords = () => {
    if (!user) {
      setRecords([]);
      setIsLoading(false);
      return;
    }
    // TODO: Replace with actual API calls!
    try {
      const allRecords = JSON.parse(localStorage.getItem('canvassing_records') || '[]');
      const userRecords = allRecords.filter((record: CanvassingRecord) => record.userId === user.id);
      setRecords(userRecords);
    } catch (error) {
      console.error('Error loading records:', error);
      setRecords([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadRecords();
  }, [user]);

  const addRecord = (name: string, email: string, notes: string): boolean => {
    if (!user) return false;

    try {
      const newRecord: CanvassingRecord = {
        id: Date.now().toString(),
        name,
        email,
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.id
      };

      const allRecords = JSON.parse(localStorage.getItem('canvassing_records') || '[]');
      allRecords.push(newRecord);
      localStorage.setItem('canvassing_records', JSON.stringify(allRecords));
      
      setRecords(prev => [...prev, newRecord]);
      return true;
    } catch (error) {
      console.error('Error adding record:', error);
      return false;
    }
  };

  const updateRecord = (id: string, name: string, email: string, notes: string): boolean => {
    if (!user) return false;

    try {
      const allRecords = JSON.parse(localStorage.getItem('canvassing_records') || '[]');
      const recordIndex = allRecords.findIndex((r: CanvassingRecord) => r.id === id && r.userId === user.id);
      
      if (recordIndex === -1) return false;

      allRecords[recordIndex] = {
        ...allRecords[recordIndex],
        name,
        email,
        notes,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('canvassing_records', JSON.stringify(allRecords));
      loadRecords();
      return true;
    } catch (error) {
      console.error('Error updating record:', error);
      return false;
    }
  };

  const deleteRecord = (id: string): boolean => {
    if (!user) return false;

    try {
      const allRecords = JSON.parse(localStorage.getItem('canvassing_records') || '[]');
      const filteredRecords = allRecords.filter((r: CanvassingRecord) => !(r.id === id && r.userId === user.id));
      
      localStorage.setItem('canvassing_records', JSON.stringify(filteredRecords));
      setRecords(prev => prev.filter(r => r.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting record:', error);
      return false;
    }
  };

  return {
    records,
    isLoading,
    addRecord,
    updateRecord,
    deleteRecord,
    refreshRecords: loadRecords
  };
};
