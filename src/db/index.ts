import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// TypeScript type for the database instance
type DrizzleDB = ReturnType<typeof drizzle<typeof schema>>;

// Use a module augmentation to add _db to the global scope
declare global {
  // eslint-disable-next-line no-var
  var _db: DrizzleDB | undefined;
}

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT ?? '10', 10),
};

// Validate required environment variables
const requiredEnvVars = [
  'DB_HOST',
  'DB_USERNAME',
  'DB_DATABASE',
  'DB_PASSWORD',
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Create connection pool
const poolConnection = mysql.createPool(dbConfig);

// Create and export database instance
export const db: DrizzleDB =
  global._db ?? drizzle(poolConnection, { schema, mode: 'default' });

// Cache db instance in development
if (process.env.NODE_ENV !== 'production') {
  global._db = db;
}

// Function to test database connection
export async function testConnection(): Promise<void> {
  try {
    const connection = await poolConnection.getConnection();
    console.log('Database connection successful');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

// Graceful shutdown function
export async function closeConnection(): Promise<void> {
  try {
    await poolConnection.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
}
