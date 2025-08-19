const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sortinghat',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

async function connectDB() {
  try {
    if (!pool) {
      pool = mysql.createPool(dbConfig);
      console.log('MySQL connection pool created.');
    }
    // Ping the database to check the connection
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('Successfully connected to the database.');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // Depending on your application's needs, you might want to exit the process
    // process.exit(1);
  }
}

function getPool() {
  if (!pool) {
    throw new Error('Database pool not initialized. Call connectDB first.');
  }
  return pool;
}

module.exports = { connectDB, getPool };