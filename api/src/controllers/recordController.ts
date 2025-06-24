import { Response } from 'express';
import { RecordModel } from '../models/Records';
import { AuthRequest, CreateRecordData, UpdateRecordData } from '../types';

// TODO: Test this
// Get all records for a user
/**
 * @param req - The request object
 * @param res - The response object
 * @returns - A JSON object with the records, count, and message
 */
export const getRecords = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      // Return all records
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const records = await RecordModel.findByUserId(req.user.id);

    res.json({
      message: 'Records retrieved successfully',
      records,
      count: records.length
    });
  } catch (error: any) {
    console.error('Get records error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// TODO: Test this
// Create a new record
/**
 * @param req - The request object
 * @param res - The response object
 * @returns - A JSON object with the record, and message
 */
export const createRecord = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const { firstName, lastName, email, notes }: CreateRecordData = req.body as unknown as CreateRecordData; // TODO: Fix

    const record = await RecordModel.create(req.user.id, firstName, lastName, email || '', notes || '');

    res.status(201).json({
      message: 'Record created successfully',
      record
    });
  } catch (error: any) {
    console.error('Create record error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// TODO: Test this
// Update a record
/**
 * @param req - The request object
 * @param res - The response object
 * @returns - A JSON object with the record, and message
 */
export const updateRecord = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const { id } = req.params;
    const recordId = parseInt(id);
    const updates: UpdateRecordData = req.body as unknown as UpdateRecordData; // TODO: Fix

    const record = await RecordModel.update(recordId, req.user.id, updates);

    if (!record) { 
      res.status(404).json({ error: 'Record not found' });
      return;
    }

    res.json({
      message: 'Record updated successfully',
      record
    });
  } catch (error: any) {
    console.error('Update record error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// TODO: Test this
// Delete a record
/**
 * @param req - The request object
 * @param res - The response object
 * @returns - A JSON object with the message
 */
export const deleteRecord = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const { id } = req.params;
    const recordId = parseInt(id);

    const deleted = await RecordModel.delete(recordId, req.user.id);

    if (!deleted) {
      res.status(404).json({ error: 'Record not found' });
      return;
    }

    res.json({
      message: 'Record deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete record error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};