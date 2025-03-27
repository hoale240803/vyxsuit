import { createPool, Pool, PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// Define the possible return types from MySQL queries
export type QueryResult = RowDataPacket;
export type InsertResult = ResultSetHeader;

// Create a connection pool
const pool: Pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vyxtest',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Execute a SQL query with proper typing
 */
export async function query<T extends QueryResult>(
  sql: string, 
  params?: (string | number | boolean | null | Buffer | Date)[]
): Promise<T[]> {
  let connection: PoolConnection | null = null;
  
  try {
    connection = await pool.getConnection();
    const [results] = await connection.query<T[]>(sql, params);
    return results;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Execute an INSERT/UPDATE/DELETE query
 */
export async function execute(
  sql: string, 
  params?: (string | number | boolean | null | Buffer | Date)[]
): Promise<InsertResult> {
  let connection: PoolConnection | null = null;
  
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute<InsertResult>(sql, params);
    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Execute a transaction with multiple queries
 */
export async function transaction<T>(
  callback: (connection: PoolConnection) => Promise<T>
): Promise<T> {
  let connection: PoolConnection | null = null;
  
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const result = await callback(connection);
    
    await connection.commit();
    return result;
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Transaction error:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}