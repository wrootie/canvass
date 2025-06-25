import { pool } from '../config/database';
import { Record, UpdateRecordData } from '../types/index.js';
import { RowDataPacket } from 'mysql2';

//TODO: TEST!
/**
 * Record model
 * @class RecordModel
 * @static
 */
export class RecordModel {
  static async findByUserId(userId: number): Promise<Record[]> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM records WHERE userId = ? ORDER BY createdAt DESC',
        [userId]
      );
      
      return rows as Record[];
    } catch (error) {
      throw new Error('Database error during records lookup');
    }
  }

  static async findById(id: number, userId: number): Promise<Record | null> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM records WHERE id = ? AND userId = ?',
        [id, userId]
      );
      
      if (rows.length === 0) return null;
      
      return rows[0] as Record;
    } catch (error) {
      throw new Error('Database error during record lookup');
    }
  }

  static async create(userId: number, firstName: string, lastName: string, email: string, notes: string): Promise<Record> {
    try {
      const [result] = await pool.execute(
        'INSERT INTO records (userId, firstName, lastName, email, notes) VALUES (?, ?, ?, ?, ?)',
        [userId, firstName, lastName, email, notes]
      );
      
      const insertId = (result as any).insertId;
      const record = await this.findById(insertId, userId);
      
      if (!record) throw new Error('Failed to create record');
      
      return record;
    } catch (error: any) {
      throw new Error('Database error during record creation');
    }
  }

  static async update(id: number, userId: number, updates: UpdateRecordData): Promise<Record | null> {
    try {
      const setParts: string[] = [];
      const values: any[] = [];

      if (updates.firstName !== undefined) {
        setParts.push('firstName = ?');
        values.push(updates.firstName);
      }

      if (updates.lastName !== undefined) {
        setParts.push('lastName = ?');
        values.push(updates.lastName);
      }

      if (updates.email !== undefined) {
        setParts.push('email = ?');
        values.push(updates.email);
      }

      if (updates.notes !== undefined) {
        setParts.push('notes = ?');
        values.push(updates.notes);
      }

      if (setParts.length === 0) {
        throw new Error('No fields to update');
      }

      setParts.push('updatedAt = CURRENT_TIMESTAMP');
      values.push(id, userId);

      const [result] = await pool.execute(
        `UPDATE records SET ${setParts.join(', ')} WHERE id = ? AND userId = ?`,
        values
      );

      if ((result as any).affectedRows === 0) {
        return null;
      }

      return await this.findById(id, userId);
    } catch (error: any) {
      throw new Error('Database error during record update');
    }
  }

  static async delete(id: number, userId: number): Promise<boolean> {
    try {
      const [result] = await pool.execute(
        'DELETE FROM records WHERE id = ? AND userId = ?',
        [id, userId]
      );

      return (result as any).affectedRows > 0;
    } catch (error) {
      throw new Error('Database error during record deletion');
    }
  }
}