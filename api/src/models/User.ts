import { pool } from '../config/database';
import { User } from '../types';
import { RowDataPacket } from 'mysql2';

//TODO: TEST!

/**
 * User model
 * @class UserModel
 * @static
 */
export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      
      if (rows.length === 0) return null;
      
      return rows[0] as User;
    } catch (error) {
      throw new Error('Database error during user lookup');
    }
  }

  static async findById(id: number): Promise<Omit<User, 'password'> | null> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT id, email, createdAt, updatedAt FROM users WHERE id = ?',
        [id]
      );
      
      if (rows.length === 0) return null;
      
      return rows[0] as Omit<User, 'password'>;
    } catch (error) {
      throw new Error('Database error during user lookup');
    }
  }

  static async create(firstName: string, lastName: string, email: string, hashedPassword: string): Promise<User> {
    try {
      const [result] = await pool.execute(
        'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, hashedPassword]
      );
      
      const insertId = (result as any).insertId;
      const user = await this.findById(insertId);
      
      if (!user) throw new Error('Failed to create user');
      
      return { ...user, password: hashedPassword };
    } catch (error: any) {
      console.log('[UserModel] Error:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw new Error('Database error during user creation');
    }
  }
}