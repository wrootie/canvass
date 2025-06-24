import express from 'express';
import { getRecords, createRecord, updateRecord, deleteRecord } from '../controllers/recordController';
import { validateCreateRecord, validateUpdateRecord, validateRecordId } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All record routes require authentication
router.use(authenticateToken);

// Get all records for a given user
router.get('/', getRecords);

// Create a new record
router.post('/', validateCreateRecord, createRecord);

// Update a record
router.put('/:id', validateRecordId, validateUpdateRecord, updateRecord);

// Delete a record
router.delete('/:id', validateRecordId, deleteRecord);

export default router;