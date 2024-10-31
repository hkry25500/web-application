import mysql from 'mysql2/promise'


const pool = mysql.createPool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: 3306,
});
  
export default pool;