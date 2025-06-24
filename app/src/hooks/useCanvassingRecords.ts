
import { useState, useEffect } from 'react';
import { CanvassingRecord } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { api } from '@/utils/wrappers';

export const useCanvassingRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<CanvassingRecord[]>([]);
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
    loadRecords();
  }, [user]);

  const addRecord = async(firstName: string, lastName: string, email: string, notes: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // Will throw an error if the record is not created
      await api(`/records`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, notes }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('canvassing_token')}`
        }
      });
      const newRecord: CanvassingRecord = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.id
      };
      setRecords(prev => [...prev, newRecord]);
      return true;
    } catch (error) {
      console.error('Error adding record:', error);
      return false;
    }
  };

  const updateRecord = async(id: string, firstName: string, lastName: string, email: string, notes: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // Will throw an error if the record is not found
      await api(`/records/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ firstName, lastName, email, notes }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('canvassing_token')}`
        }
      });
      loadRecords();
      return true;
    } catch (error) {
      console.error('Error updating record:', error);
      return false;
    }
  };

  const deleteRecord = async(id: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // Will throw an error if the record is not found
      await api(`/records/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('canvassing_token')}`
        }
      });
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
