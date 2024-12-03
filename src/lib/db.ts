import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.NEXT_PUBLIC_DATABASE_HOST,
  user: process.env.NEXT_PUBLIC_DATABASE_USER,
  password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
  database: process.env.NEXT_PUBLIC_DATABASE_NAME,
  waitForConnections: true,
});

export const query = (sql: string, values: unknown[] = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
