
import { useState, useEffect } from 'react';
import { Record } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/utils/wrappers';

export const useCanvassingRecords = () => {
  const { user, token } = useAuth();
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecords = async() => {
    if (!user) {
      setRecords([]);
      setIsLoading(false);
      return;
    }
    try {
      const response = await api(`/records`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('canvassing_token')}`
        }
      });
      setRecords(response.records);
    } catch (error) {
      console.error('Error loading records:', error);
      setRecords([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
   (async function() { loadRecords() })();
  }, [user]);

  const addRecord = async(record: Omit<Record, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<boolean> => {
    if (!user) return false;

    try {
      // Will throw an error if the record is not created
      const newRecord = await api(`/records`, {
        method: 'POST',
        body: JSON.stringify(record),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('canvassing_token')}`
        }
      });
      setRecords(prev => [...prev, newRecord]);
      return true;
    } catch (error) {
      console.error('Error adding record:', error);
      return false;
    }
  };

  const updateRecord = async(record: Record): Promise<boolean> => {
    if (!user) return false;
    console.log('[useCanvassingRecord] Updating Record');
    try {
      // Will throw an error if the record is not found
      await api(`/records/${record.id}`, {
        method: 'PUT',
        body: JSON.stringify(record),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('canvassing_token')}`
        }
      });
      await loadRecords();
      return true;
    } catch (error) {
      console.error('Error updating record:', error);
      return false;
    }
  };

  const deleteRecord = async(id: number): Promise<boolean> => {
    if (!user) return false;
    console.log('[useCanvassingRecord] Deleting record');
    try {
      // Will throw an error if the record is not found
      await api(`/records/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('canvassing_token')}`
        }
      });
      setRecords(prev => prev.filter(r => r.id !== Number(id)));
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
