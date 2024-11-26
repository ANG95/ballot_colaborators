import mysql from 'mysql';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'test_db'
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
