const { createPool } = require("mysql2/promise");

const pool = createPool({
    host: process.env.host,
    port: "3306",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 100000,
    queueLimit: 0,
  });

  pool
  .getConnection()
  .then((connection) => {
    console.log(`Connected to MySQL database as ID ${connection.threadId}`);
    connection.release();
  })
  .catch((error) => {
    console.error(`Unable to connect to MySQL database: ${error}`);
    process.exit(1);
  });


module.exports = pool;