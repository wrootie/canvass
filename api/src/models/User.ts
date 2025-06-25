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
  /**
   * Find a user by their email
   * @param email - The email of the user to find
   * @returns The user if found, null otherwise
   */
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

  /**
   * Find a user by their ID
   * @param id - The ID of the user to find
   * @returns The user if found, null otherwise
   */
  static async findById(id: number): Promise<Omit<User, 'password'> | null> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT id, email, firstName, lastName, createdAt, updatedAt FROM users WHERE id = ?',
        [id]
      );
      
      if (rows.length === 0) return null;
      
      return rows[0] as Omit<User, 'password'>;
    } catch (error) {
      throw new Error('Database error during user lookup');
    }
  }

  /**
   * Create a new user
   * @param firstName - The first name of the user
   * @param lastName - The last name of the user
   * @param email - The email of the user
   * @param hashedPassword - The hashed password of the user
   * @returns The created user
   */
  static async create(firstName: string, lastName: string, email: string, hashedPassword: string): Promise<User> {
    try {
      const [result] = await pool.execute(
        'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, hashedPassword]
      );
      
      const insertId = (result as any).insertId;
      const user = await this.findById(insertId);
      
      // If we don't find the user, throw an error
      if (!user) throw new Error('Failed to create user');
      
      return { ...user, password: hashedPassword };
    } catch (error: any) {
      console.log('[UserModel] Error:', error);
      // https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw new Error('Database error during user creation');
    }
  }
}