const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/errorhandler');
const {generatedToken} = require('../utils/jwtToken')
const {setTokenCookie} = require('../utils/sendToken')


const createUser = async (req, res, next) => {
  
    const { firstname, lastname, username, email, age, country, phoneno, avatar, password} = req.body;


    try {

        const connection = await pool.getConnection();

        const hashedPassword = await bcrypt.hash(password, 10);


        const [result] = await connection.execute(
            `INSERT INTO user (firstname, lastname, username, email, age, country, phoneno, avatar, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [firstname, lastname, username, email, age, country, phoneno, avatar, hashedPassword]
        );

        const userid = result.insertId;
        const userEmail = email

        const token = generatedToken(userid, username, userEmail)
        // set cookie
        setTokenCookie(res, token);

        res.status(201).json({
            success: true,
            message: "User with username ${username} created successfully",
            token: token,
        });

        
    } catch (error) {
        console.error('Error creating User: ', error);
        return next(new ErrorHandler('Internal Server Error', 500));
    }

}

const logOut = async (req, res) => {

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.cookie("data", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out"
    });
  
}


const loginUser = catchAsyncError(async (req, res, next) => {

    const {email, password} = req.body;
  
    try{
  
      // Get a connection from the pool
      const connection = await pool.getConnection();
  
      const [rows] = await connection.execute(
        `SELECT * FROM user WHERE email = ?`,
        [email]
      );
      
      // Check if the user exists in the database
      if (rows.length === 0) {
        return next(new ErrorHandler('Invalid email', 400));
      }
  
      // Compare the stored password hash with the provided password
      const storedPasswordHash = rows[0].password;
      const passwordMatches = await bcrypt.compare(password, storedPasswordHash);
  
      if (!passwordMatches) {
        return next(new ErrorHandler('Invalid Password', 401));
      }
  
  
      console.log(`User loggedin successfully`);
      
  
      connection.release();
  
       // Create JWT token and with user ID
        const  userid = rows[0].userid;
        const username = rows[0].username;
        const userEmail = rows[0].email;
    
        const token = generatedToken(userid, username, userEmail);
  
        // set cookie
        setTokenCookie(res, token);
  
  
        res.status(201).json({
          success: true,
          message: `Hi ${rows[0].username} iam logged In`,
          token,
        });
  
    }catch(err){
      console.error('Error logging User: ', err);
      return next(new ErrorHandler('Internal Server Error', 500));
    }
  
  });

  const getUser = async(req, res, next) => {

    try {

        const userid = req.user.userid;

        const connection = await pool.getConnection();

        const [name] = await connection.execute('SELECT * FROM user WHERE userid = ?', [userid])

        const user = {
            name: name[0].username,
        }

        connection.release();

        res.status(200).json({
        success: true,
        message: 'Profile is retrived',
        user
        
        });

      
        
    } catch (error) {
        console.error('Please Login to access: ', err);
        return next(new ErrorHandler('Internal Server Error', 500));
    }

  }

module.exports = {
    createUser,
    loginUser,
    getUser,
    logOut
};