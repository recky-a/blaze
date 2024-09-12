import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

declare global {
  var _db: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});
/**
 * Add mode:default when using mysql2 (database driver)
 * @link https://orm.drizzle.team/docs/rqb#modes
 */
const db =
  globalThis._db || drizzle(poolConnection, { schema, mode: 'default' });

if (process.env.EXECUTION_MODE !== 'production') {
  globalThis._db = db;
}

export { db };
