const jwt  = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorhandler")
const pool = require('../config/database');


const isAuthenticatedUser = catchAsyncError(async(req, res, next) =>{

    const token = req.cookies.token;

    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401))
    }

    try {

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);

      const connection = await pool.getConnection();

      const [user] = await connection.execute('SELECT userid, username, email FROM user WHERE userid = ?', [decodedData.userid]);
      if (!user) {
        return next(new ErrorHandler("User Not Found", 401))
      }

      const userData = {
        userid: user[0]?.userid,
        username: user[0]?.username,
        userEmail: user[0]?.email
      };
      // console.log(userData.username);
      
      req.user = userData;
      next();
      connection.release();

    } catch (error) {
      console.error('Error while executing database query:', error.message);
      return next(new ErrorHandler("Unable to login", 403))
    }

    

});


module.exports = {
  isAuthenticatedUser,
}