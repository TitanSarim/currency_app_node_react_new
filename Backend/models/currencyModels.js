const { pool } = require('../config/database');


// Check if category table exists
pool.query(`SHOW TABLES LIKE 'currency'`, (err, results) => {

  if (err) {
    console.error('Error checking if  currency table exists: ', err);
    
    return;
  }

  // If category table exists, do nothing
  if (results.length > 0) {
    console.log('currency table already exists');
    return;
  }

    // Otherwise, create category table
    pool.query(`CREATE TABLE category (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      cnic BIGINT NOT NULL,
      currency VARCHAR(255) NOT NULL,
      amount INT NOT NULL,
      totalamount INT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`, (err) => {
  
      if (err) {
  
        console.error('Error creating category table: ', err.message);
        return;
  
      }
      
      console.log('category table created successfully');
      
    });
  });

